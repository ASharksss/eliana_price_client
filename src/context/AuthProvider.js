import {useContext, createContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/UserService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(true)
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
    setUser(JSON.parse(localStorage.getItem('user')))
    setToken(localStorage.getItem('token'))
    setIsAuth(true)
    // refreshAction()
    // return () => refreshAction()
  }, [])

  const loginAction = async (email, password) => {
    try {
      const response = await userService.login(email, password).then(res => res)
      if (response.token) {
        setUser(response.profile);
        setToken(response.token);
        localStorage.setItem('user', JSON.stringify(response.profile))
        localStorage.setItem('token', response.token)
        setIsAuth(true)
        return {path: lastPath ? lastPath : "/"};
      } else {
        throw {error: response.response.data.message};
      }
    } catch (e) {
      return e;
    }
  };

  const logOut = async () => {
    const response = await userService.logout()
    if (response.status === 200) {
      setUser(null);
      setIsAuth(false)
      setToken("");
      navigate("/login");
    }
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