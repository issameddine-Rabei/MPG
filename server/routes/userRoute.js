const express = require("express");

const taskRouter = require("./taskRoute");

const upload = require("../middlewares/multerMiddleware");

const {
  createFilterObj,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getEmployeeList,
  getManagersList,
} = require("../controllers/userController");

const {
  getUserByIdValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
} = require("../utils/validators/userValidator");

const router = express.Router();

router.use("/:userId/tasks", taskRouter);

router.route("/").get(createFilterObj, getAllUsers);
router.route("/employees").get(getEmployeeList);
router.route("/managers").get(getManagersList);

router.route("/create").post(
  createUserValidator,
  upload.single("profileImg"),

  createUser
);

router
  .route("/:id")
  .get(getUserByIdValidator, getUserById)
  .put(updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

router.route("/login").post(loginUser);

module.exports = router;
