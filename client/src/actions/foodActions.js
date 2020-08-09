import axios from "axios";
import { SERVER_URI, APP_KEY,FOOD_URI } from "../globals";


export const fetchAllFoods = async () => {
  try {
    const resObj = await fetch(FOOD_URI + `/recipe`, {
      method: "get",
    });

    const res = await resObj.json();
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
};

