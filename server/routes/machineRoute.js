const express = require("express");

const {
  getAllmachines,
  getmachineById,
  createmachine,
  updatemachine,
  deletemachine,
} = require("../controllers/machineController");

const {
  getMachineByIdValidator,
  createMachineValidator,
  updateMachineValidator,
  deleteMachineValidator,
} = require("../utils/validators/machineValidator");

const router = express.Router();

router.route("/create").post(createMachineValidator, createmachine);

router.route("/").get(getAllmachines);

router
  .route("/:id")
  .get(getMachineByIdValidator, getmachineById)
  .put(updateMachineValidator, updatemachine)
  .delete(deleteMachineValidator, deletemachine);

module.exports = router;
