import {useContext, createContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/UserService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  const lastPath = localStorage.getItem('lastPath') || null
  const refreshAction = async () => {
    try {
      const response = await userService.getNewTokens().then(res => res.data)
      if (response) {
        setUser(response.profile);
        setToken(response.token);
        setIsAuth(true)
        return navigate(lastPath ? lastPath : "/");
      }
      throw new Error(response.message);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    refreshAction()
    return () => refreshAction()
  }, [])

  const loginAction = async (email, password) => {
    const response = await userService.login(email, password).then(res => res.response)
    if (response.status >= 200 && response.status <= 299) {
      setUser(response.data.profile);
      setToken(response.data.token);
      setIsAuth(true)
      return navigate(lastPath ? lastPath : "/");
    }
    throw response.data.message;
  };

  const logOut = () => {
    setUser(null);
    setIsAuth(false)
    setToken("");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuth, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};