const CREATE_CLIENT = "CREATE_CLIENT";
const READ_CLIENTS = "READ_CLIENTS";
const UPDATE_CLIENT = "UPDATE_CLIENT";
const DELETE_CLIENT = "DELETE_CLIENT";

export const initialClientsState = {
  clients: [],
};

export const clientsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_CLIENT:
      return {
        ...state,
        clients: [...state.clients, payload],
      };

    case READ_CLIENTS:
      return {
        ...state,
        clients: payload,
      };

    case UPDATE_CLIENT:
      const updatedTable = state.clients.map((obj) => {
        if (obj._id === payload._id) {
          return { ...obj, ...payload };
        }
        return obj;
      });

      return updatedTable;

    case DELETE_CLIENT:
      const clients = state.clients.filter((client) => client._id != payload);
      return {
        clients,
      };
  }
};

export { CREATE_CLIENT, READ_CLIENTS, UPDATE_CLIENT, DELETE_CLIENT };
