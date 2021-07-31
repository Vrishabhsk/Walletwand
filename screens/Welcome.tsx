import React, { FC, useRef, useEffect, useState } from "react";
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Spinner } from "native-base";
//Storage
import AsyncStorage from "@react-native-async-storage/async-storage";

//component only shows on the first visit
const Welcome: FC<{ navigation: any }> = ({ navigation }) => {
  //loading spinner
  const [loadSpinner, setLoadSpinner] = useState<boolean>(true);
  //for animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  //setting the status of user as visited
  const setHasUserVisited = async (value: string) => {
    try {
      await AsyncStorage.setItem("hasUserVisited", value);
      navigation.navigate("Dashboard");
    } catch (err) {
      console.error(err);
    }
  };
  //checking if user has used the app before
  const hasUserVisited = async () => {
    try {
      const value = await AsyncStorage.getItem("hasUserVisited");
      if (value === "visited") {
        setTimeout(() => {
          navigation.navigate("Dashboard");
        }, 1000);
      } else {
        setLoadSpinner(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    hasUserVisited();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.view}>
      {loadSpinner ? (
        <Spinner />
      ) : (
        <>
          <Animated.Text style={[{ opacity: fadeAnim }, styles.text]}>
            Hey Welcome 👋.{"\n\n"}Thank you for choosing walletwand.{"\n"}
            Handle your money with High standards.
          </Animated.Text>
          <Image
            style={styles.img}
            source={require("../assets/images/hand.png")}
          />
          <TouchableOpacity
            onPress={() => setHasUserVisited("visited")}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Get Started</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2C2E43",
  },
  text: {
    color: "#fff",
    fontSize: 23,
    textAlign: "center",
    marginLeft: 7,
    marginRight: 7,
    lineHeight: 35,
  },
  btn: {
    borderRadius: 5,
    backgroundColor: "#7C83FD",
    padding: 10,
    marginTop: 55,
  },
  btnText: {
    fontSize: 20,
    color: "#000",
  },
  img: {
    width: 80,
    height: 80,
    marginTop: 50,
  },
});
