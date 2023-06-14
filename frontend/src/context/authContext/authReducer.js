const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILED = "LOGIN_FAILED";

const READ_USERS = "LOGIN_FAILED";

const localUser = localStorage.getItem("user");
const localToken = localStorage.getItem("token");

export const initialAuthState = {
  user: localUser ? JSON.parse(localUser) : null,
  token: localToken ? localToken : null,
  isAuthenticated: localToken ? true : false,
  isLoading: null,
};

export const authReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return {
        ...state,
        isLoading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        isLoading: false,
        isAuthenticated: true,
      };

    case LOGOUT:
      return {
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: null,
      };

    case LOGIN_FAILED:
      return {
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: null,
      };
  }
};

export { LOGIN, LOGIN_SUCCESS, LOGOUT, LOGIN_FAILED };
