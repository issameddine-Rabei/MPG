const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const {
  isValidProject,
  isValidEmployee,
  isValidMachine,
} = require("../../middlewares/customCheck");

// Finds the validation errors in this request and wraps them in an object with handy functions

exports.getTaskByIdValidator = [
  check("id").isMongoId().withMessage("invalid Task ID format"),
  validatorMiddleware,
];

exports.createTaskValidator = [
  check("name")
    .notEmpty()
    .withMessage("Task name required")
    .isLength({ min: 5 })
    .withMessage("Too short Task name")
    .isLength({ max: 32 })
    .withMessage("Too long Task name")
    .optional(),
  check("number")
    .notEmpty()
    .withMessage("Task number required")

    .optional(),
  check("description")
    .isString()
    .withMessage("description should be a String")
    .optional(),

  check("machine")
    .notEmpty()
    .withMessage("Machine required")
    .isMongoId()
    .withMessage("machine field should reference a Machine  with a valid ID")
    .custom(isValidMachine)
    .optional(),

  check("employee")
    .notEmpty()
    .withMessage("Employee required")
    .isMongoId()
    .withMessage("employee field should reference an Employee with a valid ID")
    .custom(isValidEmployee)
    .optional(),

  check("project")
    .notEmpty()
    .withMessage("Project required")
    .isMongoId()
    .withMessage("project field should reference a Project with a valid ID")
    .custom(isValidProject)
    .optional(),

  validatorMiddleware,
];

exports.updateTaskValidator = [
  check("name")
    .notEmpty()
    .withMessage("Task name required")
    .isLength({ min: 5 })
    .withMessage("Too short Task name")
    .isLength({ max: 32 })
    .withMessage("Too long Task name")
    .optional(),
  check("description")
    .isString()
    .withMessage("description should be a String")
    .optional(),
  check("machine")
    .notEmpty()
    .withMessage("Machine required")
    .isMongoId()
    .withMessage("machine field should reference a Machine  with a valid ID")
    .custom(isValidMachine)
    .optional(),
  check("employee")
    .notEmpty()
    .withMessage("Employee required")
    .isMongoId()
    .withMessage("employee field should reference an Employee with a valid ID")
    .custom(isValidEmployee)
    .optional(),
  check("project")
    .notEmpty()
    .withMessage("Project required")
    .isMongoId()
    .withMessage("project field should reference a Project with a valid ID")
    .custom(isValidProject)
    .optional(),
  validatorMiddleware,
];

exports.deleteTaskValidator = [
  check("id").isMongoId().withMessage("invalid Task ID format"),
  validatorMiddleware,
];
