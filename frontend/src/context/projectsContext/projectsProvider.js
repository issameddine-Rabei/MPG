import { createContext, useContext, useReducer } from "react";
import {
  projectsReducer,
  initialProjectsState,
  READ_PROJECTS,
  DELETE_PROJECT,
  CREATE_PROJECT,
  UPDATE_PROJECT,
} from "./projectsReducer";
import axios from "axios";
import { TASK_STATUS_COMPLETED, TASK_STATUS_DOING } from "utils/constants";

const ProjectsContext = createContext({});

export const useProjects = () => useContext(ProjectsContext);

const ProjectsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectsReducer, initialProjectsState);

  const createProject = (project) => {
    axios
      .post("http://localhost:8000/api/v1/projects/create", project)
      .then((res) =>
        dispatch({
          type: CREATE_PROJECT,
          payload: res.data.project,
        })
      )
      .then(() => getAllProjects())
      .catch((err) => console.log(err));
  };

  const getAllProjects = () => {
    axios
      .get("http://localhost:8000/api/v1/projects")
      .then((res) =>
        dispatch({
          type: READ_PROJECTS,
          payload: res.data.projects,
        })
      )
      .catch((err) => console.log(err));
  };

  const getProjectsByManager = (managerId) =>
    state.projects.filter((project) => {
      return project.productionManager?._id === managerId;
    });

  const getTasksByEmployee = async (empId) => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/tasks");

      const taskList = response.data.tasks;
      const tasks = taskList.filter((task) => task.employee._id === empId);
      console.log(tasks);
      return tasks;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const setTaskInprogress = (task) => {
    axios
      .put(
        `http://localhost:8000/api/v1/projects/${task.project._id}/tasks/${task._id}`,
        {
          ...task,

          project: task.project._id,
          machine: task.machine._id,
          employee: task.employee._id,
          state: TASK_STATUS_DOING,
        }
      )
      .then((res) => {
        getAllProjects();
        getTasksByEmployee();
      })
      .catch((res) => console.log(res));
  };

  const setTaskFinished = (task) => {
    axios
      .put(
        `http://localhost:8000/api/v1/projects/${task.project._id}/tasks/${task._id}`,
        {
          ...task,

          project: task.project._id,
          machine: task.machine._id,
          employee: task.employee._id,
          state: TASK_STATUS_COMPLETED,
        }
      )
      .then((res) => {
        getAllProjects();
        getTasksByEmployee();
      })
      .catch((res) => console.log(res));
  };

  const deletProject = (id) => {
    axios
      .delete("http://localhost:8000/api/v1/projects/" + id)
      .then((res) =>
        dispatch({
          type: DELETE_PROJECT,
          payload: id,
        })
      )
      .catch((err) => console.log(err));
  };

  const updateProject = (project) => {
    axios
      .put("http://localhost:8000/api/v1/projects/" + project._id, project)
      .then((res) =>
        dispatch({
          type: UPDATE_PROJECT,
          payload: res.data.updatedProject,
        })
      )
      .catch((err) => console.log(err));
  };

  const addTask = (task) => {
    axios
      .post(
        "http://localhost:8000/api/v1/projects/" + task.project + "/tasks",
        task
      )
      .then((res) => {
        getAllProjects();
      })
      .catch((err) => console.log(err));
  };
  return (
    <ProjectsContext.Provider
      value={{
        state,
        createProject,
        updateProject,
        deletProject,
        getAllProjects,
        addTask,
        getProjectsByManager,
        getTasksByEmployee,
        setTaskInprogress,
        setTaskFinished,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsProvider;
