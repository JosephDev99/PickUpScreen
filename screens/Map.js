import React, { useState } from 'react';
import SearchDropdown from "../components/SearchDropdown";
import { StyleSheet, ImageBackground, TouchableOpacity, Text, Image } from "react-native";
import { View } from 'react-native-web';
const image = require('../assets/imgpsh_fullsize_anim.png');
const App = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
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