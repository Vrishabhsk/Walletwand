import React, { FC, useState, useContext } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Checkbox } from "native-base";
//Exports
import { DataRowProps } from "../exports";
//Icons
import { FontAwesome } from "@expo/vector-icons";
//Component
import ExpenseViewModal from "./ExpenseViewModal";
//Context
import { GlobalContext } from "../store/index";

//Expenses Display
const DataRow: FC<DataRowProps> = ({ item }) => {
  //globalstate
  const { dispatch }: any = useContext(GlobalContext);
  //view each expense in modal
  const [viewExpense, setViewExpense] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setViewExpense(true)}
        style={styles.mainView}
      >
        <View style={{ flexDirection: "row", width: "100%" }}>
          <Checkbox
            size="md"
            style={{ paddingLeft: 8, position: "relative", top: 6 }}
            colorScheme="success"
            onChange={(event) => {
              if (event) {
                //selecting an expense
                dispatch({ type: "SELECT_EXPENSE", payload: item.ID });
              } else {
                //unselecting an expense
                dispatch({ type: "UNSELECT_EXPENSE", payload: item.ID });
              }
            }}
            value={item.ID}
            accessibilityLabel="Select Expense"
          />
          <Text style={[styles.colorWhite, styles.title]}>
            {item.expenseCategory.split(" ")[0]}
            {"  "}
            {item.expenseTitle}
          </Text>
          <Text
            style={[styles.colorWhite, { marginLeft: "auto", marginRight: 15 }]}
          >
            <FontAwesome name="rupee" size={18} color="#fff" />{" "}
            {item.expenseAmt}
          </Text>
        </View>
        <Text style={[styles.colorWhite, { marginLeft: 55, marginTop: 5 }]}>
          {item.expenseDesc ? (
            <>
              Desc:{" "}
              {item.expenseDesc.length > 20
                ? item.expenseDesc.substr(0, 20) + "..."
                : item.expenseDesc}
            </>
          ) : (
            <>No Description</>
          )}
        </Text>
      </TouchableOpacity>

      {viewExpense && (
        <ExpenseViewModal
          viewExpense={viewExpense}
          setViewExpense={setViewExpense}
          item={item}
        />
      )}
    </>
  );
};

export default DataRow;

const styles = StyleSheet.create({
  mainView: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    marginLeft: 15,
  },
  colorWhite: {
    color: "#fff",
    fontSize: 17,
  },
});
