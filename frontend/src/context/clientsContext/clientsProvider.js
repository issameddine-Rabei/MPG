import { createContext, useContext, useReducer } from "react";
import {
  clientsReducer,
  initialClientsState,
  READ_CLIENTS,
  DELETE_CLIENT,
  CREATE_CLIENT,
  UPDATE_CLIENT,
} from "./clientsReducer";
import axios from "axios";

const ClientsContext = createContext({});

export const useClients = () => useContext(ClientsContext);

const ClientsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(clientsReducer, initialClientsState);

  const createClient = (client) => {
    axios
      .post("http://localhost:8000/api/v1/clients/create", client)
      .then((res) =>
        dispatch({
          type: CREATE_CLIENT,
          payload: res.data.Client,
        })
      )
      .catch((err) => console.log(err));
  };

  const getAllClients = () => {
    axios
      .get("http://localhost:8000/api/v1/clients")
      .then((res) =>
        dispatch({
          type: READ_CLIENTS,
          payload: res.data.Clients,
        })
      )
      .catch((err) => console.log(err));
  };

  const deletClient = (id) => {
    axios
      .delete("http://localhost:8000/api/v1/clients/" + id)
      .then((res) =>
        dispatch({
          type: DELETE_CLIENT,
          payload: id,
        })
      )
      .catch((err) => console.log(err));
  };

  const updateClient = (client) => {
    axios
      .put("http://localhost:8000/api/v1/clients/" + client._id, client)
      .then((res) =>
        dispatch({
          type: UPDATE_CLIENT,
          payload: res.data.updatedClient,
        })
      )
      .catch((err) => console.log(err));
  };
  return (
    <ClientsContext.Provider
      value={{ state, createClient, deletClient, updateClient, getAllClients }}
    >
      {children}
    </ClientsContext.Provider>
  );
};

export default ClientsProvider;
