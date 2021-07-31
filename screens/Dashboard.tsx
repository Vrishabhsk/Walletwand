import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, BackHandler } from "react-native";
import { Spinner, Center } from "native-base";
//Icons
import { FontAwesome } from "@expo/vector-icons";
//Storage
import AsyncStorage from "@react-native-async-storage/async-storage";
//Component
import Header from "../components/Header";
import DataRow from "../components/DataRow";
import Instruct from "../components/Instruct";
//Context
import { GlobalContext } from "../store/index";

//Main Screen
const Dashboard = ({ navigation }: any) => {
  //globalstate
  const { state, dispatch }: any = useContext(GlobalContext);
  //displaying spinner
  const [loadSpinner, setLoadSpinner] = useState<boolean>(true);
  //total Expense
  const [totalExpense, setTotalExpense] = useState<number>(0);

  //getting locally stored expenses
  const getlocalStorage = async () => {
    try {
      const value: any = await AsyncStorage.getItem("localExpense");
      if (value !== null && value !== [])
        dispatch({ type: "LOAD_LOCAL_DATA", payload: JSON.parse(value) });
      setLoadSpinner(false);
    } catch (err) {
      console.error(err);
    }
  };

  //setting state in local storage for re-use
  const setLocalStorage = async (value: []) => {
    try {
      if (value !== null)
        await AsyncStorage.setItem("localExpense", JSON.stringify(value));
    } catch (err) {
      console.error(err);
    }
  };

  //update total expense
  const updateExpense = () => {
    setTotalExpense(0);
    state.userData.map((item: any) => {
      setTotalExpense((prev) => prev + Number(item.expenseAmt));
    });
  };

  useEffect(() => {
    //get local data on first render
    getlocalStorage();
    //on backpress exit the app (default action goes back to loading screen)
    const onBackPress = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        BackHandler.exitApp();
        return true;
      }
    );
    return () => onBackPress.remove();
  }, []);

  useEffect(() => {
    //trigger on every add and delete and update operation on expenses state
    setLocalStorage(state.userData);
    //finding out the total expense amount
    updateExpense();
  }, [state.userData]);

  return (
    <>
      <Header
        navigation={navigation}
        selectedExpenseIds={state.selectedExpenses}
      />
      {loadSpinner ? (
        <Center flex={1} style={styles.dashView}>
          <Spinner />
        </Center>
      ) : (
        <>
          <ScrollView style={styles.dashView}>
            {state.userData.length !== 0 ? (
              state.userData.map((elm: any, idx: number) => {
                return <DataRow key={idx} item={elm} />;
              })
            ) : (
              <Instruct />
            )}
          </ScrollView>
          <View style={styles.totalExp}>
            <Text style={{ fontSize: 17, color: "#fff" }}>Total Expense</Text>
            <Text style={{ fontSize: 17, color: "#fff" }}>
              <FontAwesome name="rupee" size={18} color="#fff" />{" "}
              {totalExpense.toFixed(2)}
            </Text>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  dashView: {
    backgroundColor: "#2C2E43",
  },
  totalExp: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    backgroundColor: "#4C4C6D",
  },
});

export default Dashboard;
