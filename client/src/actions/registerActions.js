import axios from "axios";
import { SERVER_URI, APP_KEY } from "../globals";

// User Register /users/register
export const registerUser = async (name, email, password) => {
  try {
    let res = null;
    let url = null;
    url = `${SERVER_URI}/users/register`;
    res = await axios.post(
      url,
      { name, email, password },
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
    return err;
  }
};
