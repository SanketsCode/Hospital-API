import { NavigationContainer } from '@react-navigation/native';
import authStorage from "./app/auth/storage";
import AppLoading from 'expo-app-loading';
import AuthContext from './app/auth/context';
import MainRoutes from './app/Routes/MainRoutes';
import AuthRoutes from './app/Routes/AuthRoutes';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [user, setUser] = useState();
  const [isReady, setReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getData();
    if (user) setUser(user);
  };

  useEffect(() => {
    async function prepare() {
      try {
       

        await restoreUser();
      
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

 

  return (
   <AuthContext.Provider value={{user,setUser}}>
     <NavigationContainer>
     {user ? <MainRoutes /> : <AuthRoutes />}
     </NavigationContainer>
   </AuthContext.Provider>
  );
}


