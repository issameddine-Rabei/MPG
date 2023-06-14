const CREATE_PROJECT = "CREATE_PROJECT";
const READ_PROJECTS = "READ_PROJECTS";
const UPDATE_PROJECT = "UPDATE_PROJECT";
const DELETE_PROJECT = "DELETE_PROJECT";

export const initialProjectsState = {
  projects: [],
};

export const projectsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PROJECT:
      return {
        ...state,
        projects: [...state.projects, payload],
      };

    case READ_PROJECTS:
      return {
        ...state,
        projects: payload,
      };

    case UPDATE_PROJECT:
      const updatedTable = state.projects.map((obj) => {
        if (obj._id === payload._id) {
          return { ...obj, ...payload };
        }
        return obj;
      });

      return updatedTable;

    case DELETE_PROJECT:
      const projects = state.projects.filter(
        (project) => project._id != payload
      );
      return {
        projects,
      };
  }
};

export { CREATE_PROJECT, READ_PROJECTS, DELETE_PROJECT, UPDATE_PROJECT };
