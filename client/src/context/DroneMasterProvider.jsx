import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage } from "../helper/localStorageDroneMaster";
import jwDecode from "jwt-decode";
import axios from "axios";
export const DroneMasterContext = createContext();

const DroneMasterProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const [isLogged, setIsLogged] = useState();
  const [course, setCourse] = useState();
  const [courseMaterial, setCourseMaterial] = useState();
  const [resetData, setResetData] = useState(false);

  // Getting token from localStorage and decode to set user
  useEffect(() => {
    const tokenLocalStorage = getLocalStorage("token");
    setToken(tokenLocalStorage);
    if (tokenLocalStorage) {
      const id = jwDecode(tokenLocalStorage).user.user_id;
      axios
        .get(`http://localhost:4000/myProfile/${id}`)
        .then((res) => {
          setUser(res.data[0]);
          setIsLogged(true);
        })
        .catch((err) => { });
    }
  }, [isLogged, resetData]);

  return (
    <div>
      <DroneMasterContext.Provider
        value={{
          user,
          setUser,
          token,
          setToken,
          isLogged,
          setIsLogged,
          course,
          setCourse,
          courseMaterial,
          setCourseMaterial,
          resetData,
          setResetData,
        }}
      >
        {children}
      </DroneMasterContext.Provider>
    </div>
  );
};
export default DroneMasterProvider;
