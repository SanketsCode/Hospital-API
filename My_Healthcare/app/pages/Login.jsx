import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../config/colors'
import * as Yup from "yup";
import useAuth from '../auth/useAuth'
import ActivityIndicator from '../components/ActivityIndicator';
import { ErrorMessage, Form,FormField,SubmitButton } from '../components/Form';
import Screen from '../components/Screen';
import { Card } from 'react-native-paper';
import AppText from '../components/AppText';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants  from 'expo-constants';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  password: Yup.string().max(255).required('Password is required')
})

export default function Login({navigation,route}) {
  const [loginFailed, setLoginFailed] = useState(false);
  const [loading,setLoading] = useState(false);
  const [errorMsg,setErrorMsg] = useState(false);

  const auth = useAuth();
  const handleSubmit = async ({email,password}) => {
    console.log(Constants.manifest.extra.API_URL);
    try {
      const user = await axios.post(`${Constants.manifest.extra.API_URL}/user/auth/signin`,{
          email,
          password
      });
      console.log(user.data);
      auth.logIn(user.data);
     } catch (error) {
      setErrorMsg(true);
      console.log(error);
     }
  }


  return (
    <>
    <ActivityIndicator visible={loading}/>
    <Screen style={styles.container}>
    { errorMsg && <View style={styles.msg}>

      <AppText>Email Not Verified / Wrong Email</AppText>
      <TouchableOpacity onPress={() => setErrorMsg(false)}>
      <MaterialCommunityIcons name='close' size={20} />
      </TouchableOpacity>
    </View>}
   <Image 
     style={styles.logo}
     source={require("../assets/logo.png")}
     />
     <Form
     initialValues={{
       email:'',
       password:''
     }}
 
     onSubmit={handleSubmit}
     validationSchema={validationSchema}
    
     > 

 
     <ErrorMessage error="Invalid Email/password" visible={loginFailed} />
     <FormField
        icon="mail"
       maxLength={255}
       name="email"
       placeholder="Your Email"
     />
     <FormField
       icon="onepassword"
       name="password"
       placeholder="Your Password"
       secureTextEntry={true}
     />
     <SubmitButton title="Login" />
     <TouchableOpacity style={styles.redirect} onPress={() => navigation.navigate('Register')} >
       <Text>Not an Account?</Text>
     </TouchableOpacity>
     </Form>

    </Screen>
    </>
   )
 }
 
 const styles = StyleSheet.create({
     container: {
         flex: 1,
         backgroundColor: colors.grey,
         alignItems: 'center',
         padding:10,
         justifyContent: 'center',
         borderWidth:4,
         borderColor:colors.grey
       },
       logo:{
         height:150,
         width:150,
         alignSelf:'center'
       },
       text:{
         textAlign:"center"
       },
       redirect:{
         marginTop:10,
         marginBottom:10
       },
       msg:{
        width:"95%",
        height:"8%",
        backgroundColor: "#FF6263",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-evenly",
        borderRadius:10,
        marginBottom:10,
       }
 })