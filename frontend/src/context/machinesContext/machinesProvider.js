import { createContext, useContext, useReducer } from "react";
import {
  machinesReducer,
  initialMachinesState,
  READ_MACHINES,
  DELETE_MACHINE,
  UPDATE_MACHINE,
  CREATE_MACHINE,
} from "./machinesReducer";
import axios from "axios";

const MachinesContext = createContext({});

export const useMachines = () => useContext(MachinesContext);

const MachinesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(machinesReducer, initialMachinesState);

  const createMachine = (machine) => {
    console.log(machine);
    axios
      .post("http://localhost:8000/api/v1/machines/create/", machine)
      .then((res) =>
        dispatch({
          type: CREATE_MACHINE,
          payload: res.data.machine,
        })
      )
      .catch((err) => console.log(err));
  };

  const getAllMachines = () => {
    axios
      .get("http://localhost:8000/api/v1/machines/")
      .then((res) =>
        dispatch({
          type: READ_MACHINES,
          payload: res.data.machines,
        })
      )
      .catch((err) => console.log(err));
  };

  const deleteMachine = (id) => {
    axios
      .delete("http://localhost:8000/api/v1/machines/" + id)
      .then((res) =>
        dispatch({
          type: DELETE_MACHINE,
          payload: id,
        })
      )
      .catch((err) => console.log(err));
  };

  const updateMachine = (machine) => {
    axios
      .put("http://localhost:8000/api/v1/machines/" + machine._id, machine)
      .then((res) =>
        dispatch({
          type: UPDATE_MACHINE,
          payload: res.data.updatedmachine,
        })
      )
      .catch((err) => console.log(err));
  };

  const makeTaskCompleted = () => {};
  const makeTaskStarted = () => {};
  return (
    <MachinesContext.Provider
      value={{
        state,
        createMachine,
        deleteMachine,
        updateMachine,
        getAllMachines,
      }}
    >
      {children}
    </MachinesContext.Provider>
  );
};

export default MachinesProvider;
