import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import CustomInput from '../components/CustomInput'
import axios from "axios";
export default function App() {
  const signInValidationSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      .matches(/^($|[^0])(\d){9}\b/, 'Phone number should be 10 number and start since 1')
      .required('Phone number is required'),
    password: yup
      .string()
      .matches(/\w*[a-z]\w*/, "Password must have a small letter")
      .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
      .matches(/\d/, "Password must have a number")
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  })

  const handleSubmit = (data) => {
    console.log(data)
    axios.post('http://localhost:3000/auth/signin', data)
      .then(res => localStorage.setItem("authToken", res.data.accessToken))
      .catch((err) => {
        throw new Error(err.response.body.message);
      });

  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0.25, y: 1.1 }}
      locations={[0.2, 1]}
      colors={['white', 'white']}
      style={[{ flex: 1, paddingLeft: 20, paddingRight: 20 }]}>
      <View flex>
        <View style={{ paddingVertical: 50, alignItems: 'center' }}>
          <Image source={require('../assets/pic.png')} style={{
            width: 100,
            height: 120,
            resizeMode: 'stretch',
          }} />
        </View>
        <View flex>
          <Formik
            initialValues={{
              phoneNumber: '',
              password: '',
            }}
            onSubmit={values => handleSubmit(values)}
            validationSchema={signInValidationSchema}
          >
            {({ handleSubmit, isValid }) => (
              <View center>
                <View row width={300}>
                  <View flex={15}>
                    <Field
                      component={CustomInput}
                      name="phoneNumber"
                      placeholder="Phone Number"
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <View width={300}>
                  <View flex={15}>
                    <Field
                      component={CustomInput}
                      name="password"
                      placeholder="Password"
                      secureTextEntry
                    />
                  </View>
                </View>
                <View width={300} style={{ marginTop: 20 }}>
                  <TouchableOpacity style={{ backgroundColor: 'yellow' }} disabled={!isValid} onPress={handleSubmit}>
                    <Text style={{ textAlign: 'center', paddingVertical: 10 }}>SIGN IN</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View >
    </LinearGradient >
  );
}

