import React, { FC } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

//show when using the app for first time or show when user has no expenses
const Instruct: FC = () => {
  return (
    <View>
      <Text style={styles.viewTxt}>
        Start by adding a new expense by clicking the{"  "}
        <Text style={{ fontSize: 30 }}>+</Text>
        {"  "}icon
      </Text>
      <Image
        style={styles.img}
        source={require("../assets/images/dollar.png")}
      />
    </View>
  );
};

export default Instruct;

const styles = StyleSheet.create({
  viewTxt: {
    textAlign: "center",
    marginTop: 250,
    color: "#fff",
    fontSize: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  img: {
    width: 100,
    height: 100,
    marginTop: 40,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
