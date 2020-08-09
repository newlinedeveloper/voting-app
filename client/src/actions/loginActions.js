import axios from "axios";
import { SERVER_URI, APP_KEY } from "../globals";

// User login /users/login
export const loginUser = async (email, password) => {
  try {
    let res = null;
    let url = null;
    url = `${SERVER_URI}/users/login`;
    res = await axios.post(
      url,
      { email, password },
      {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          "X-Key": APP_KEY,
        },
      }
    );

    return res.data;
  } catch (err) {
    console.log("Internal server error")
    return err;
  }
};
