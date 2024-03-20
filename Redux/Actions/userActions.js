import baseURL from "../../assets/common/baseurl";

export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST
  };
};

export const fetchUserSuccess = (user) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: user
  };
};

export const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error
  };
};

export const fetchUser = (userId) => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    fetch(`${baseURL}users/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      dispatch(fetchUserSuccess(data));
    })
    .catch((error) => {
      dispatch(fetchUserFailure(error.message));
    });
  };
};
