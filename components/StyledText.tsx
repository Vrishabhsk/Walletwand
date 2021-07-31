import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
//Export
import { TextInputProps } from "../exports";

const StyledText: FC<TextInputProps> = (props) => {
  return (
    <TextInput
      style={styles.textIn}
      onChange={(text) => props.onChange(props.name, text.nativeEvent.text)}
      value={props.value}
      label={props.label}
      outlineColor="#fff"
      underlineColor="#fff"
      theme={{ colors: { text: "#fff", placeholder: "grey", primary: "#fff" } }}
      mode="outlined"
    />
  );
};

export default StyledText;

const styles = StyleSheet.create({
  textIn: {
    width: "80%",
    fontSize: 18,
    backgroundColor: "#2C2E43",
    color: "#fff",
    marginTop: 10,
  },
});
