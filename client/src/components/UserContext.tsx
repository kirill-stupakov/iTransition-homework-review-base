import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

import { apiURI } from "../constants";
import { user } from "../types";

export const userContext = createContext({});
const UserContext = (props: any) => {
  const [userObject, setUserObject] = useState<user>();

  useEffect(() => {
    axios.get(apiURI + "getUser", { withCredentials: true }).then((res) => {
      if (res.data) {
        setUserObject(res.data);
      }
    });
  }, []);

  return (
    <userContext.Provider value={{ userObject, setUserObject }}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserContext;
