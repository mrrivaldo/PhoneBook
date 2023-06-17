import axios from "axios";

const getUsers = () => {
  return axios
    .get("https://telephonebook-29c4e-default-rtdb.firebaseio.com/users.json")
    .then((response) => {
      // Handle the response data
      return response.data;
    })
    .catch((error) => {
      // Handle the error
      throw error;
    });
};

export default getUsers;
