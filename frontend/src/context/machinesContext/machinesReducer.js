const CREATE_MACHINE = "CREATE_MACHINE";
const READ_MACHINES = "READ_MACHINES";
const UPDATE_MACHINE = "UPDATE_MACHINE";
const DELETE_MACHINE = "DELETE_MACHINE";

export const initialMachinesState = {
  machines: [],
};

export const machinesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_MACHINE:
      return {
        ...state,
        machines: [...state.machines, payload],
      };

    case READ_MACHINES:
      return {
        ...state,
        machines: payload,
      };

    case UPDATE_MACHINE:
      const updatedTable = state.machines.map((obj) => {
        if (obj._id === payload._id) {
          return { ...obj, ...payload };
        }
        return obj;
      });

      return updatedTable;

    case DELETE_MACHINE:
      const machines = state.machines.filter((client) => client._id != payload);
      return {
        machines,
      };
  }
};

export { CREATE_MACHINE, READ_MACHINES, UPDATE_MACHINE, DELETE_MACHINE };
