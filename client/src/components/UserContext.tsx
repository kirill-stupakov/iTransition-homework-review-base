import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

import { apiURI } from "../constants";

export const userContext = createContext({});
const UserContext = (props: any) => {
  const [userObject, setUserObject] = useState<any>();

  console.log("userObject: ", userObject);

  useEffect(() => {
    axios.get(apiURI + "getUser", { withCredentials: true }).then((res) => {
      if (res.data) {
        setUserObject(res.data);
      }
    });
  }, []);

  return (
    <userContext.Provider value={userObject}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserContext;
