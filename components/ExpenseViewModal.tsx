import React, { FC, useState } from "react";
import { Modal, Text, View, StyleSheet } from "react-native";
import { Heading, Button } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
//Exports
import { ExpenseViewProps } from "../exports";
//Components
import DeleteDialog from "./DeleteDialog";
import UpdateDialog from "./UpdateDialog";

const ExpenseViewModal: FC<ExpenseViewProps> = ({
  viewExpense,
  setViewExpense,
  item,
}) => {
  //confirm deletion of expense alert
  const [isDelDialogOpen, setIsDelDialogOpen] = useState<boolean>(false);
  //updating expense dialog
  const [isUpdDialogOpen, setIsUpdDialogOpen] = useState<boolean>(false);

  return (
    <>
      <Modal visible={viewExpense} animationType="fade">
        <View style={styles.modalView}>
          <View style={styles.heading}>
            <Heading size="lg" color="#fff">
              Expense Details
            </Heading>
            <Button
              style={{ marginLeft: "auto" }}
              onPress={() => setViewExpense(false)}
              colorScheme="teal"
              _text={{ color: "#000" }}
            >
              Close
            </Button>
          </View>
          <View style={{ width: "80%", marginLeft: 20 }}>
            <Text style={styles.modalTxt}>Title: {item.expenseTitle}</Text>
            <Text style={styles.modalTxt}>
              Category: {item.expenseCategory}
            </Text>
            {item.expenseDate ? (
              <Text style={styles.modalTxt}>
                Created On: {item.expenseDate.substr(0, 15)}
              </Text>
            ) : null}
            <Text style={styles.modalTxt}>
              Expenditure: <FontAwesome name="rupee" size={18} color="#fff" />{" "}
              {item.expenseAmt}
            </Text>
            {item.expenseDesc ? (
              <Text style={styles.modalTxt}>Desc: {item.expenseDesc}</Text>
            ) : null}
          </View>
          <View style={{ flexDirection: "row", marginTop: 40 }}>
            <Button
              _text={{ color: "#000" }}
              style={{ marginRight: 20 }}
              colorScheme="success"
              onPress={() => setIsUpdDialogOpen(true)}
            >
              Update
            </Button>
            <Button
              onPress={() => {
                setIsDelDialogOpen(true);
              }}
              colorScheme="danger"
            >
              Delete
            </Button>
          </View>
        </View>
      </Modal>
      {isDelDialogOpen ? (
        <DeleteDialog
          setViewExpense={setViewExpense}
          isDelDialogOpen={isDelDialogOpen}
          setIsDelDialogOpen={setIsDelDialogOpen}
          ID={item.ID}
        />
      ) : null}
      {isUpdDialogOpen ? (
        <UpdateDialog
          isUpdDialogOpen={isUpdDialogOpen}
          setIsUpdDialogOpen={setIsUpdDialogOpen}
          item={item}
        />
      ) : null}
    </>
  );
};

export default ExpenseViewModal;

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#2C2E43",
  },
  modalTxt: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 6,
  },
  heading: {
    flexDirection: "row",
    width: "100%",
    paddingLeft: 50,
    paddingRight: 50,
    marginBottom: 40,
    alignItems: "center",
  },
});
