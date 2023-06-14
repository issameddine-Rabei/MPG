const mongoose = require("mongoose");

const asyncHandler = require("express-async-handler");
//const { v4: uuidv4 } = require('uuid');
//const sharp = require('sharp');
//const bcrypt = require('bcryptjs');
//const factory = require('./handlersFactory');
const ApiError = require("../utils/apiError");
//const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
//const createToken = require('../utils/createToken');
const taskModel = require("../models/taskModel");

exports.setProjectIdToBody = (req, res, next) => {
  //Nested routes
  //accessing the params(projectId in this case ) from another route through nested routes
  //so that i can add it to my req.body and do my query on it(creating a task for my project)
  if (!req.body.project) req.body.project = req.params.projectID;

  next();
};

exports.createFilterObj = (req, res, next) => {
  //putting my filterobj(projectid in my req.params) if provided in my request so that i can do my query on it
  //to get the chainOftasks for my project
  let filterObject = {};
  if (req.params.projectID) filterObject = { project: req.params.projectID };

  req.filterObject = filterObject;
  next();
};

// @desc    Get list of tasks
// @route   GET /api/v1/:projectid/tasks
// @access  Private/Admin
exports.getProjectTasks = asyncHandler(async (req, res) => {
  const task = await taskModel.find(req.filterObject).populate([
    {
      path: "machine",
      select: "name costPerHour -_id",
    },
    {
      path: "employee",
      select: "name salary _id",
    },
    {
      path: "project",
      select: "name state -_id",
    },
  ]);
  res.status(200).json({ results: task.length, tasks: task });
});

// @desc    Get specific task by id
// @route   GET /api/v1/:projectid/tasks/:id
// @access  Private/Admin
exports.getTaskById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const task = await taskModel.findById(id).populate([
    {
      path: "machine",
      select: "name -_id",
    },
    {
      path: "employee",
      select: "name -_id",
    },
    {
      path: "project",
      select: "name -_id",
    },
  ]);
  if (!task) {
    //return res.status(404).json({message: `cannot find any client with the same id ${id}`})
    return next(
      new ApiError(`cannot find any task with the same id ${id}`, 404)
    );
  }
  res.status(200).json({ message: "task succesfully retrieved ", task });
});

// @desc    Create task
// @route   POST  /api/v1/:projectid/tasks/:id
// @access  Private/Admin
exports.createTask = asyncHandler(async (req, res) => {
  const Project = mongoose.model("Project");

  const { project } = req.body;
  const projectt = await Project.findById(project);

  const task = await taskModel.create({ ...req.body });

  projectt.chainOfTasks.push(task._id); // Push the task ID into projectt
  const updatedProject = await projectt.save();
  res
    .status(200)
    .json({ message: "task created succesfully", task, updatedProject });
});

// @desc    Update specific task
// @route   PUT /api/v1/tasks/:id
// @access  Private/Admin
exports.updateTask = asyncHandler(async (req, res, next) => {
  const taskk = await taskModel.findById(req.params.id).populate([
    {
      path: "machine",
      select: "costPerHour -_id",
    },
    {
      path: "employee",
      select: "salary -_id",
    },
  ]);

  // eslint-disable-next-line prefer-const
  let updateData = { ...req.body };

  if (req.body.state === "Being Done") {
    updateData.started = new Date();
  } else if (req.body.state === "Completed") {
    updateData.ended = new Date();
    const started = new Date(taskk.started);
    const durationMilliseconds = updateData.ended - started;

    const durationHours = durationMilliseconds / (1000 * 60 * 60);

    const employeeSalary = taskk.employee.salary; // Assuming you have an employee object with a salary property
    const machineCost = parseFloat(taskk.machine.costPerHour); // Assuming you have a machine object with a cost property

    updateData.cost = durationHours * (employeeSalary + machineCost);
  }

  const task = await taskModel
    .findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    })

    .populate([
      {
        path: "machine",
        select: "name -_id",
      },
      {
        path: "employee",
        select: "name -_id",
      },
      {
        path: "project",
        select: "name -_id",
      },
    ]);

  if (!task) {
    return next(new ApiError(`No task for this id ${req.params.id}`, 404));
  }

  res
    .status(200)
    .json({ message: "task succesfully updated", updatedtask: task });
});

// @desc    Delete specific task
// @route   DELETE /api/v1/:projectsid/tasks/:id
// @access  Private/Admin
exports.deleteTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const task = await taskModel.findByIdAndDelete(id);
  if (!task) {
    //return res.status(404).json({message:`cannot find any client with the same id ${id}`})
    return next(
      new ApiError(`cannot find any task with the same id ${id}`, 404)
    );
  }
  res.status(200).json({ message: "task successfully deleted", task });
});
