import { NavigationContainer } from '@react-navigation/native';
import authStorage from "./app/auth/storage";
import AppLoading from 'expo-app-loading';
import AuthContext from './app/auth/context';
import MainRoutes from './app/Routes/MainRoutes';
import AuthRoutes from './app/Routes/AuthRoutes';
import { useState } from 'react';

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setReady] = useState(false);

  // const restoreUser = async () => {
  //   const user = await authStorage.getUser();
  //   if (user) setUser(user);
  // };

  // if (!isReady)
  // return (
  //   <AppLoading onError={console.warn} startAsync={restoreUser} onFinish={() => setReady(true)} />
  // );
  return (
   <AuthContext.Provider value={{user,setUser}}>
     <NavigationContainer>
     {user ? <MainRoutes /> : <AuthRoutes />}
     </NavigationContainer>
   </AuthContext.Provider>
  );
}


