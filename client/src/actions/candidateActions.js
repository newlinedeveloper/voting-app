import axios from "axios";
import { SERVER_URI, APP_KEY } from "../globals";

export const registerCandidate = async (
  name,
  email,
  phone,
) => {
  try {
    let res = null;
    let url = null;
    url = `${SERVER_URI}/candidates/register`;
    res = await axios.post(
      url,
      { name, email, phone},
      {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          "X-Key": APP_KEY,
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getCandidates = async (paginate) => {
  try {
    const resObj = await fetch(SERVER_URI + `/candidates/fetch/all/${paginate}`, {
      method: "get",
      headers: {
        "X-Key": APP_KEY,
        Authorization: `Bearer ${localStorage.getItem("user")}`,
      },
    });

    const res = await resObj.json();
    console.log(res.data)
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};



export const deleteCandidate = async (candidateId) => {
  
  try {
    console.log(candidateId);
    let res = null;
    let url = null;
    url = `${SERVER_URI}/candidates/delete/${candidateId}`;
    res = await axios.post(
      url,
      {},
      {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          "X-Key": APP_KEY,
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
      }
    );
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};


export const updateCandidate = async (_id, name, phone) => {
  try {
    console.log(_id+":"+name+":"+phone)
    let res = null;
    let url = null;
    url = `${SERVER_URI}/candidates/update`;
    res = await axios.post(
      url,
      { _id, name, phone},
      {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          "X-Key": APP_KEY,
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
      }
    );
    // console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getCandidateById = async (candidateId) => {
  try {
    let res = null;
    let url = null;
    url = `${SERVER_URI}/candidates/fetch/details/${candidateId}`;
    res = await axios.get(url, {
        headers: {
            "X-Key": APP_KEY,
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          }
    })
    return res.data
}
catch(error) {
    return error
}
};


