const CREATE_USER = "CREATE_USER";
const READ_USERS = "READ_USERS";
const UPDATE_USER = "UPDATE_USER";
const DELETE_USER = "DELETE_USER";

export const initialUsersState = {
  users: [],
};

export const usersReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_USER:
      return {
        ...state,
        users: [...state.users, payload],
      };

    case READ_USERS:
      return {
        ...state,
        users: payload,
      };

    case UPDATE_USER:
      const updatedTable = state.users.map((obj) => {
        if (obj._id === payload._id) {
          return { ...obj, ...payload };
        }
        return obj;
      });

      return updatedTable;

    case DELETE_USER:
      const users = state.users.filter((user) => user._id != payload);
      return {
        users,
      };
  }
};

export { CREATE_USER, READ_USERS, UPDATE_USER, DELETE_USER };
