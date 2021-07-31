import React, { FC, useState, useContext } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { Button } from "native-base";
//Exports
import { ExpenseInterface, AddState, AddExpenseProps } from "../exports";
//To produce UUID for expense
import "react-native-get-random-values";
import short from "short-uuid";
//Components
import StyledText from "./StyledText";
import AlertBadge from "./AlertBadge";
import SelectCategory from "./SelectCategory";
import DatePicker from "./DatePicker";
//Context
import { GlobalContext } from "../store/index";

//Modal for adding a new expense
const AddExpenseModal: FC<AddExpenseProps> = ({
  showAddExpenseModal,
  setShowAddExpenseModal,
}) => {
  //globalstate
  const { dispatch }: any = useContext(GlobalContext);
  //warning alert bottom of the screen
  const [warningAlert, setWarningAlert] = useState<boolean>(false);
  //success alert bottom of the screen
  const [successAlert, setSuccessAlert] = useState<boolean>(false);
  //alert description
  const [alertDesc, setAlertDesc] = useState<string>("");
  //select category
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  //check for date
  const [displayDateAlert, setDisplayDateAlert] = useState<boolean>(false);
  //new expense value
  const [userInput, setUserInput] = useState<ExpenseInterface>(AddState(short.generate()));

  //to remove multiple textinputs
  const TextInputs = [
    {
      name: "expenseTitle",
      label: "Expense Title *",
      value: userInput.expenseTitle,
    },
    {
      name: "expenseAmt",
      label: "Amount (Rs) *",
      value: userInput.expenseAmt,
    },
    {
      name: "expenseDesc",
      label: "Description (option)",
      value: userInput.expenseDesc,
    },
  ];

  //updating state based on textInput
  const handleChange = (event: string, value: string) => {
    setUserInput((prevVal) => {
      return {
        ...prevVal,
        [event]: value,
      };
    });
  };

  //reseting text fields to empty values
  const resetUserInput = () => {
    setSelectedCategory("");
    setUserInput(AddState(short.generate()));
  };

  //checking input field and adding new expense
  const handleSubmit = () => {
    const expenseAmtToNum = Number(userInput.expenseAmt);
    if (
      userInput.expenseTitle === "" ||
      isNaN(expenseAmtToNum) ||
      userInput.expenseCategory === ""
    ) {
      if (isNaN(expenseAmtToNum)) setAlertDesc("Please provide valid expense!");
      else setAlertDesc("Name, Category and Expense Fields are mandatory!");
      setWarningAlert(true);
      setTimeout(() => setWarningAlert(false), 2500);
    } else {
      dispatch({
        type: "ADD_EXPENSE",
        payload: userInput,
      });
      setAlertDesc("New Expense Added!");
      setSuccessAlert(true);
      resetUserInput();
      setTimeout(() => setSuccessAlert(false), 2500);
    }
  };

  return (
    <Modal animationType="slide" visible={showAddExpenseModal}>
      <View style={styles.viewStyle}>
        <Text style={styles.modalTxt}>Add New Expense</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <SelectCategory
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            handleChange={handleChange}
          />
          <DatePicker
            handleChange={handleChange}
            setDisplayAlert={setDisplayDateAlert}
          />
        </View>
        {TextInputs.map((input: any, idx: number) => {
          return (
            <StyledText
              key={idx}
              name={input.name}
              label={input.label}
              value={input.value}
              onChange={handleChange}
            />
          );
        })}
        <View style={{ flexDirection: "row", marginTop: 30 }}>
          <Button
            onPress={() => handleSubmit()}
            style={{ marginRight: 10 }}
            colorScheme="teal"
            _text={{ color: "#000" }}
          >
            Add
          </Button>
          <Button
            onPress={() => {
              resetUserInput();
              setShowAddExpenseModal(false);
            }}
            colorScheme="danger"
          >
            Close
          </Button>
        </View>
      </View>
      {warningAlert && <AlertBadge status="warning" alertDes={alertDesc} />}
      {successAlert && <AlertBadge status="success" alertDes={alertDesc} />}
      {displayDateAlert && (
        <AlertBadge
          status="warning"
          alertDes="Please enter a valid Time-stamp"
        />
      )}
    </Modal>
  );
};

export default AddExpenseModal;

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#2C2E43",
  },
  modalTxt: {
    fontSize: 23,
    marginBottom: 20,
    color: "#fff",
  },
  touch: {
    marginRight: 10,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
  },
});
