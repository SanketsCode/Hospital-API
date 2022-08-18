import { useContext } from "react";
import AuthContext from "./context";
import authStorage from './storage';



export default useAuth = () => {
    const {user,setUser} = useContext(AuthContext);


    const logout = () => {
        setUser(null);
        authStorage.removeData();
    }

    const logIn = (user) => {
            authStorage.storeData(user);
    }

    return {user,setUser,logout,logIn};
  }
   
