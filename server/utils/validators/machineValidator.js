const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// Finds the validation errors in this request and wraps them in an object with handy functions

exports.getMachineByIdValidator = [
  check("id").isMongoId().withMessage("invalid Machine ID format"),
  validatorMiddleware,
];

exports.createMachineValidator = [
  check("name")
    .notEmpty()
    .withMessage("Machine name required")
    .isLength({ min: 3 })
    .withMessage("Too short Machine name")
    .isLength({ max: 32 })
    .withMessage("Too long Machine name")
    .optional(),
  check("state").notEmpty().withMessage("Machine state required").optional(),
  check("costPerHour")
    .notEmpty()
    .withMessage("Cost per hour should be specified")
    .optional(),
  check("imageCover")
    .optional()
    .notEmpty()
    .withMessage("Image cover required")
    .optional(),
  validatorMiddleware,
];

exports.updateMachineValidator = [
  check("id").isMongoId().withMessage("invalid Machine ID format"),
  check("name")
    .notEmpty()
    .withMessage("Machine name required")
    .isLength({ min: 3 })
    .withMessage("Too short Machine name")
    .isLength({ max: 32 })
    .withMessage("Too long Machine name")
    .optional(),
  check("state").notEmpty().withMessage("Machine state required").optional(),
  check("costPerHour")
    .notEmpty()
    .withMessage("Cost per hour should be specified")
    .optional(),
  check("imageCover").notEmpty().withMessage("Image cover required").optional(),
  validatorMiddleware,
];

exports.deleteMachineValidator = [
  check("id").isMongoId().withMessage("invalid Machine ID format"),
  validatorMiddleware,
];
