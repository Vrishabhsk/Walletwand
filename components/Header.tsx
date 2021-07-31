import React, { FC, useState } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { MaterialIcons, Entypo, AntDesign } from "@expo/vector-icons";
//Export
import { HeaderProps } from "../exports";
//Components
import AddExpenseModal from "./AddExpenseModal";
import DeleteDialog from "./DeleteDialog";

const Header: FC<HeaderProps> = ({
  navigation,
  selectedExpenseIds,
  isAnalysis,
}) => {
  //showing the modal to add new expense
  const [showAddExpenseModal, setShowAddExpenseModal] =
    useState<boolean>(false);
  //confirm deletion of expense alert
  const [isDelDialogOpen, setIsDelDialogOpen] = useState<boolean>(false);

  return (
    <>
      {/* statusbar should not be overlapped with content */}
      <StatusBar backgroundColor="#334257" />
      {isAnalysis ? (
        <View style={styles.headView}>
          <AntDesign
            name="back"
            onPress={() => navigation.goBack()}
            style={[styles.headText, { fontSize: 30 }]}
            color="#fff"
          />
          <Text style={[styles.headText, { fontSize: 20 }]}>Analytics</Text>
        </View>
      ) : (
        <View style={styles.headView}>
          <Text style={[styles.headText, { fontSize: 20 }]}>Dashboard</Text>
          {selectedExpenseIds?.length === 0 ? (
            <View style={{ flexDirection: "row", marginLeft: "auto" }}>
              <Entypo
                name="circular-graph"
                color="#fff"
                style={styles.headText}
                onPress={() => navigation.navigate("Analysis")}
              />
              <MaterialIcons
                style={[styles.headText, { marginLeft: "auto" }]}
                name="add"
                color="white"
                onPress={() => setShowAddExpenseModal(true)}
              />
            </View>
          ) : (
            <MaterialIcons
              style={[styles.headText, { marginLeft: "auto" }]}
              name="delete-outline"
              size={30}
              color="white"
              onPress={() => {
                setIsDelDialogOpen(true);
              }}
            />
          )}
          <AddExpenseModal
            showAddExpenseModal={showAddExpenseModal}
            setShowAddExpenseModal={setShowAddExpenseModal}
          />
          {isDelDialogOpen ? (
            <DeleteDialog
              isDelDialogOpen={isDelDialogOpen}
              setIsDelDialogOpen={setIsDelDialogOpen}
              selectedExpenseIds={selectedExpenseIds}
            />
          ) : null}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  headView: {
    width: "100%",
    backgroundColor: "#4C4C6D",
    flexDirection: "row",
  },
  headText: {
    padding: 10,
    color: "#fff",
    fontSize: 30,
  },
});

export default Header;
