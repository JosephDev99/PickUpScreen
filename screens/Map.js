import React, { useState } from 'react';
import SearchDropdown from "../components/SearchDropdown";
import { StyleSheet, ImageBackground, TouchableOpacity, Text, Image } from "react-native";
import { View } from 'react-native-web';
const image = require('../assets/imgpsh_fullsize_anim.png');
const App = () => {
  const [pickup, setPickup] = useState("");
  const [pickupLatLong, setPickupLatLong] = useState({});
  const [dropoff, setDropoff] = useState("");
  const [dropoffLatLong, setDropoffLatLong] = useState({});
  const [alphabetLetter, setAlphabetLetter] = useState("A");
  const [tasks, setTasks] = useState([]);
  const getLatLong = (item, latLong) => {
    axios
      .request({
        method: "post",
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${item}&key=${GEOCODE_API_KEY}`,
      })
      .then((response) => {
        latLong(response.data.results[0].geometry.location);
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  const latLongPickup = (state) => {
    setPickupLatLong(state);
  };

  const latLongDropoff = (state) => {
    setDropoffLatLong(state);
  };
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        <View style={styles.inputBlock}>
          <SearchDropdown
            addDestination={(item) => {
              setPickup(item);
              getLatLong(item, latLongPickup);
            }}
            value={pickup}
            placeholder={"Enter pickup location"}
          />

          <SearchDropdown
            addDestination={(item) => {
              setDropoff(item);
              getLatLong(item, latLongDropoff);
            }}
            value={dropoff}
            placeholder={"Enter dropoff location"}
          />
        </View>
        <View style={{ marginTop: 450 }}>
          <TouchableOpacity style={{ backgroundColor: 'yellow', width: '100%' }} >
            <Text style={{ textAlign: 'center', paddingVertical: 10 }}>REQUEST A RIDE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    width: '100%',
    height: "100%"
  },
  inputBlock: {
    padding: 30
  },
  container: {
    alignItems: 'center',
  }
});

export default App;