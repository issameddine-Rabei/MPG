const asyncHandler = require("express-async-handler");
//const { v4: uuidv4 } = require('uuid');
//const sharp = require('sharp');
const bcrypt = require("bcryptjs");
const slugify = require("slugify");
const jwt = require("jsonwebtoken");

//const factory = require('./handlersFactory');
const ApiError = require("../utils/apiError");
//const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
//const createToken = require('../utils/createToken');
const UserModel = require("../models/userModel");

exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.query) filterObject = { ...req.query };
  console.log(req.query);
  const excludeFields = ["page", "sort", "limit"];
  excludeFields.forEach((field) => delete filterObject[field]);
  req.filterObject = filterObject;

  next();
};

// @desc    Get list of users
// @route   GET /api/v1/users
// @access  Private/Admin
exports.getAllUsers = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;
  const users = await UserModel.find({ ...req.filterObject })
    .skip(skip)
    .limit(limit);

  res.status(200).json({ results: users.length, page, users });
});

// @desc    Get specific user by id
// @route   GET /api/v1/users/:id
// @access  Private/Admin
exports.getUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  if (!user) {
    //return res.status(404).json({message: `cannot find any client with the same id ${id}`})
    return next(
      new ApiError(`cannot find any user with the same id ${id}`, 404)
    );
  }
  res.status(200).json({ message: "User succesfully retrieved ", user: user });
});

// @desc    Create user
// @route   POST  /api/v1/users
// @access  Private/Admin
exports.createUser = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file received" });
  }

  const filePath = req.file.path;

  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create({
    ...req.body,
    slug: slugify(req.body.name),
    password: hashedPassword,
    profileImg: filePath,
  });
  res.status(200).json({ message: "User created succesfully", user: user });
});

// @desc    Update specific user
// @route   PUT /api/v1/users/:id
// @access  Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const { name, password } = req.body;
  const updatedUser = { ...req.body };

  if (name) {
    updatedUser.slug = slugify(name);
  }
  if (password) {
    updatedUser.password = await bcrypt.hash(password, 10);
  }
  const user = await UserModel.findByIdAndUpdate(req.params.id, updatedUser, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new ApiError(`No User for this id ${req.params.id}`, 404));
  }
  res
    .status(200)
    .json({ message: "User succesfully updated", updatedUser: user });
});

// @desc    Delete specific user
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await UserModel.findByIdAndDelete(id);
  if (!user) {
    //return res.status(404).json({message:`cannot find any client with the same id ${id}`})
    return next(
      new ApiError(`cannot find any User with the same id ${id}`, 404)
    );
  }
  res.status(200).json({ message: "User successfully deleted", user: user });
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    //return res.status(404).json({message:`cannot find any client with the same id ${id}`})
    return next(
      new ApiError(
        `cannot find any User with the same username ${username}`,
        404
      )
    );
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return next(new ApiError(`Username or password is incorrect !`, 404));
  }
  const jwtKey = process.env.JWT_KEY;
  const token = jwt.sign({ id: user._id }, jwtKey);
  res.json({ token, user });
});

exports.getEmployeeList = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;
  const employees = await UserModel.find({ role: "Employee" })
    //.select("name")
    .skip(skip)
    .limit(limit);
  if (!employees) {
    return next(new ApiError(`No existing Employee`, 404));
  }
  res.status(200).json({
    message: `Here's the list of your ${employees.length} employees `,
    employees,
  });
});

exports.getManagersList = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;
  const managers = await UserModel.find({ role: "Production Manager" })
    //.select("name")
    .skip(skip)
    .limit(limit);
  if (!managers) {
    return next(new ApiError(`No existing managers`, 404));
  }
  res.status(200).json({
    message: `Here's the list of your ${managers.length} managers `,
    managers,
  });
});
