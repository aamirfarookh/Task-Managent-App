import react, {  createContext, useState, useEffect } from "react";

//create Context
export const AppContext = createContext();

//provide Context
const AppContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [accessToken,setAccessToken] = useState(null);
  const [userName, setUserName] = useState("");

    // Load authentication state from localStorage on component mount
    useEffect(() => {
      const storedIsAuth = localStorage.getItem("isAuth");
      const storedUserName = localStorage.getItem("userName");
      const storedAccessToken = localStorage.getItem("accessToken");
  
      if (storedIsAuth) setIsAuth(JSON.parse(storedIsAuth));
      if (storedUserName) setUserName(storedUserName);
      if (storedAccessToken) setAccessToken(storedAccessToken);
    }, []);
  
    // Save authentication state to localStorage whenever it changes
    useEffect(() => {
      localStorage.setItem("isAuth", JSON.stringify(isAuth));
      localStorage.setItem("userName", userName);
      localStorage.setItem("accessToken", accessToken);
    }, [isAuth, userName, accessToken]);

  return (
    <AppContext.Provider
      value={{
        setIsAuth,
        isAuth,
        loading,
        setIsLoading,
        user,
        setUser,
        userName,
        setUserName,
        accessToken,
        setAccessToken
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
