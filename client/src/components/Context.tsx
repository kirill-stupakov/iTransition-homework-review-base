import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

import { apiURI } from "../types";

export const myContext = createContext({});
const Context = (props: any) => {
  const [userObject, setUserObject] = useState<any>();

  useEffect(() => {
    axios.get(apiURI + "getUser", { withCredentials: true }).then((res) => {
      if (res.data) {
        setUserObject(res.data);
      }
    });
  }, []);

  return (
    <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
  );
};

export default Context;
