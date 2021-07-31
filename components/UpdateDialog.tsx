import React, { FC, useRef, useContext, useState } from "react";
import { AlertDialog, Center, Button } from "native-base";
import { Text } from "react-native";
//Exports
import { ExpenseInterface, UpdateDialogProps } from "../exports/index";
//Component
import AlertBadge from "./AlertBadge";
import StyledText from "./StyledText";
//Context
import { GlobalContext } from "../store/index";

const UpdateDialog: FC<UpdateDialogProps> = ({
  isUpdDialogOpen,
  setIsUpdDialogOpen,
  item,
}) => {
  const { dispatch }: any = useContext(GlobalContext);
  //updated values
  const [initialValue, setInitialValue] = useState(item);
  //show error badge
  const [showError, setShowError] = useState<boolean>(false);
  //to remove multiple TextInputs
  const TextInputs = [
    {
      name: "expenseTitle",
      label: "Expense Title *",
      value: initialValue.expenseTitle,
    },
    {
      name: "expenseAmt",
      label: "Amount (Rs) *",
      value: initialValue.expenseAmt,
    },
    {
      name: "expenseDesc",
      label: "Description (option)",
      value: initialValue.expenseDesc,
    },
  ];

  const cancelRef = useRef();

  const handleChange = (event: string, value: string) => {
    setInitialValue((prevVal) => {
      return {
        ...prevVal,
        [event]: value,
      };
    });
  };

  const handleSubmit = () => {
    const expenseAmtToNum = Number(initialValue.expenseAmt);
    if (initialValue.expenseTitle === "" || isNaN(expenseAmtToNum)) {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    } else {
      dispatch({ type: "UPDATE_EXPENSE", payload: initialValue });
      setIsUpdDialogOpen(false);
    }
  };

  return (
    <Center flex={1}>
      <AlertDialog
        isOpen={isUpdDialogOpen}
        onClose={() => setIsUpdDialogOpen(false)}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialog.Content backgroundColor="#2C2E43">
          <AlertDialog.Header>
            <Text style={{ color: "#fff", fontSize: 20 }}>Update Expense</Text>
          </AlertDialog.Header>
          <AlertDialog.Body>
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
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button
              colorScheme="danger"
              onPress={() => setIsUpdDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onPress={() => handleSubmit()}
              colorScheme="success"
              style={{ marginLeft: 10 }}
            >
              Update
            </Button>
            {showError && (
              <AlertBadge
                status="warning"
                alertDes="Please provide valid values!"
              />
            )}
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

export default UpdateDialog;
