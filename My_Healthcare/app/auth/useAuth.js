import { useContext } from "react";
import AuthContext from "./context";
import authStorage from './storage';



export default useAuth = () => {
    const {userData,setUserData} = useContext(AuthContext);


    const logout = () => {
        setUserData(null);
        authStorage.removeData();
    }

    const logIn = (user) => {
        // db.collection('AppUsers').doc(user.uid).get()
        // .then(snapshot => 
            
        //     setUserData(snapshot.data())           
        //     );

            authStorage.storeData(user);
    }

    return {userData,setUserData,logout,logIn};
  }
   
