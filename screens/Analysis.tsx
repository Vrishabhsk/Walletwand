import React, { FC, useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  BackHandler,
  Dimensions,
  Image,
} from "react-native";
import { Spinner } from "native-base";
import { PieChart } from "react-native-chart-kit";
//Exports
import { hexColorCodes, chartConfig } from "../exports";
//Component
import Header from "../components/Header";
//Context
import { GlobalContext } from "../store/index";

//View pie chart based on Expenses
const Analysis: FC = ({ navigation }: any) => {
  const { state }: any = useContext(GlobalContext);
  //screen width
  const width = Dimensions.get("window").width;
  //total expenses
  let mergeCategoryWise: any = [];
  const [pieChartData, setPieChartData] = useState([]);
  //loading until totalAmt is calculated
  const [loadSpinner, setLoadSpinner] = useState(true);

  const calculateData = () => {
    state.userData.map((item: any, index: number) => {
      let flag: boolean = true;
      mergeCategoryWise.forEach((idx: any) => {
        if (idx.name === item.expenseCategory) {
          idx.expenseAmt += Number(item.expenseAmt);
          flag = false;
        }
      });
      if (flag) {
        mergeCategoryWise.push({
          name: item.expenseCategory,
          expenseAmt: Number(item.expenseAmt),
          color: hexColorCodes[index],
          legendFontColor: "#fff",
          legendFontSize: 14,
        });
      }
    });
    return mergeCategoryWise;
  };

  useEffect(() => {
    setPieChartData(calculateData());
    setLoadSpinner(false);
    const goBack = BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.navigate("Dashboard");
      return true;
    });
    return () => goBack.remove();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header isAnalysis={true} navigation={navigation} />

      <View style={styles.viewStyle}>
        {loadSpinner ? (
          <Spinner />
        ) : state.userData.length > 0 ? (
          <PieChart
            data={pieChartData}
            width={width}
            height={200}
            chartConfig={chartConfig}
            accessor="expenseAmt"
            backgroundColor={"transparent"}
            paddingLeft={"0"}
            center={[20, 0]}
          />
        ) : (
          <>
            <Text style={styles.showTxt}>
              Analytics will be available once an expenditure has been added
            </Text>
            <Image
              style={{ width: 100, height: 100 }}
              source={require("../assets/images/expenses.png")}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default Analysis;

const styles = StyleSheet.create({
  viewStyle: {
    height: 1000,
    backgroundColor: "#2C2E43",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  showTxt: {
    fontSize: 18,
    color: "#fff",
    paddingBottom: 50,
    width: "70%",
    textAlign: "center",
    lineHeight: 30,
  },
});
