import React, { FC, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
//Exports
import { DatePickerProps } from "../exports";
//Date Picker (Calendar View)
import DateTimePicker from "@react-native-community/datetimepicker";


//picking the timestamp of expenditure
const DatePicker: FC<DatePickerProps> = ({ handleChange, setDisplayAlert }) => {
  //date selected
  const [dateSelected, setDateSeleted] = useState<string>("");
  //showing the date picker
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  //on selecting a date
  const onChange = (event: any) => {
    if (!event.nativeEvent.timestamp) {
      handleChange("expenseDate", "");
      setShowDatePicker(false);
      setDateSeleted("");
    } else if (event.nativeEvent.timestamp > new Date()) {
      setDisplayAlert(true);
      setShowDatePicker(false);
      setTimeout(() => setDisplayAlert(false), 2000);
    } else {
      const value = event.nativeEvent.timestamp.toString();
      handleChange("expenseDate", value);
      setShowDatePicker(false);
      setDateSeleted(value.substr(0, 10));
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.touch}
      >
        <Text style={{ fontSize: 18, color: "#B2B1B9" }}>
          {dateSelected ? dateSelected : "Date"}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode="date"
          display="calendar"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  touch: {
    width: 150,
    height: 55,
    marginLeft: 10,
    borderWidth: 2,
    borderColor: "#B2B1B9",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
  },
});
