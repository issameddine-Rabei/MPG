import { createContext, useContext, useReducer } from "react";
import {
  usersReducer,
  initialUsersState,
  READ_USERS,
  DELETE_USER,
  CREATE_USER,
  UPDATE_USER,
} from "./usersReducer";
import axios from "axios";
import { ROLE_EMPLOYE, ROLE_MANAGER } from "utils/constants";

const UsersContext = createContext({});

export const useUsers = () => useContext(UsersContext);

const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, initialUsersState);

  const createUser = (user) => {
    axios
      .post("http://localhost:8000/api/v1/users/create", user)
      .then((res) =>
        dispatch({
          type: CREATE_USER,
          payload: res.data.user,
        })
      )
      .catch((err) => console.log(err));
  };

  const getAllUsers = () => {
    axios
      .get("http://localhost:8000/api/v1/users")
      .then((res) =>
        dispatch({
          type: READ_USERS,
          payload: res.data.users,
        })
      )
      .catch((err) => console.log(err));
  };

  const deletUser = (id) => {
    axios
      .delete("http://localhost:8000/api/v1/users/" + id)
      .then((res) =>
        dispatch({
          type: DELETE_USER,
          payload: id,
        })
      )
      .catch((err) => console.log(err));
  };

  const updateUser = (user) => {
    axios
      .put("http://localhost:8000/api/v1/users/" + user._id, user)
      .then((res) =>
        dispatch({
          type: UPDATE_USER,
          payload: res.data.updatedUser,
        })
      )
      .catch((err) => console.log(err));
  };

  const getManagers = () =>
    state.users.filter((user) => user.role === ROLE_MANAGER);

  const getEmployees = () =>
    state.users.filter((user) => user.role === ROLE_EMPLOYE);

  return (
    <UsersContext.Provider
      value={{
        state,
        createUser,
        getAllUsers,
        deletUser,
        updateUser,
        getManagers,
        getEmployees,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
