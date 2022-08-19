import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../config/colors'
import * as Yup from "yup";
import useAuth from '../auth/useAuth'
import Constants  from 'expo-constants';
import ActivityIndicator from '../components/ActivityIndicator';
import { ErrorMessage, Form,FormField,SubmitButton,FormImagePicker } from '../components/Form';
import Screen from '../components/Screen';
import useApi from '../hooks/useApi';
import authApi from "../api/auth";


import axios from 'axios';

const validationSchema = Yup.object().shape({
  name:Yup.string().required().min(1).label("Name"),
  Phone_no:Yup.number().required().min(10).label("Phone no."),
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  images: Yup.array().min(1, "Please Select Atleast on Image"),
  password: Yup.string().required().min(4).label("Password")
})


export default function Register({navigation}) {
  const auth = useAuth();
  const [error, setError] = useState();

  const HandleSubmit = async (userInfo) => {
      console.log(Constants.manifest.extra.API_URL);
   
 try {
  const user = await axios.post(`${Constants.manifest.extra.API_URL}/user/auth/signup`,{
      name:userInfo["name"],
      password:userInfo["password"],
      email:userInfo["email"],
      Phone_no:userInfo["Phone_no"]
  });
  console.log(user.data);
  navigation.navigate('Login',{
    msg:user.data["msg"]
  });
 } catch (error) {
  console.log(error);
 }
  
}

  return (
   <>
    {/* <ActivityIndicator visible={registerApi.loading || loginApi.loading} /> */}
    <Screen style={styles.container}>
        <ScrollView>
        <Image
          style={styles.logo}
          source={require("../assets/logo.png")}
        />
        <Form 
        initialValues={{
          name:"",
          Phone_no:"",
          email:"",
          images:[],
          password:""
        }}
          onSubmit={HandleSubmit}
        validationSchema={validationSchema}
        >
            <FormImagePicker name="images" />
            
            <FormField maxLength={255} name="name" placeholder="Your name" />
            <FormField maxLength={255} name="email" placeholder="Your Email" />
            <FormField
            keyboardType="numeric"
            maxLength={10}
            name="Phone_no"
            placeholder="Your Phone no."
          />
     
             <FormField 
            name="password"
            placeholder="Your Password"
            secureTextEntry={true}
            />
            <SubmitButton title="Register" />
            <ErrorMessage error={error} />
            </Form>
        </ScrollView>
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
  logo: {
    height: 150,
    width: 150,
    alignSelf:"center"
  },
})