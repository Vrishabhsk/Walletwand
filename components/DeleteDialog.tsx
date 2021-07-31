import React, { FC, useRef, useContext } from "react";
import { Button, Center, AlertDialog } from "native-base";
//Exports
import { DeleteDialogProps } from "../exports";
//Context
import { GlobalContext } from "../store/index";

//this alert is to confirm deletion of expense
const DeleteDialog: FC<DeleteDialogProps> = ({
  setViewExpense,
  isDelDialogOpen,
  setIsDelDialogOpen,
  ID,
  selectedExpenseIds,
}) => {
  const { dispatch }: any = useContext(GlobalContext);
  const cancelRef = useRef();

  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isDelDialogOpen}
        onClose={() => setIsDelDialogOpen(false)}
      >
        <AlertDialog.Content>
          <AlertDialog.Header>Delete Expense</AlertDialog.Header>
          <AlertDialog.Body>
            Confirm Deletion. Data can't be retrieved after this!
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button onPress={() => setIsDelDialogOpen(false)}>Cancel</Button>
            <Button
              colorScheme="red"
              onPress={() => {
                if (ID) dispatch({ type: "DELETE_EXPENSE", payload: ID });
                else if (selectedExpenseIds) {
                  selectedExpenseIds?.map((val) => {
                    dispatch({ type: "DELETE_EXPENSE", payload: val });
                  });
                  dispatch({ type: "RESET_SELECTED_EXPENSES" });
                }
                setViewExpense ? setViewExpense(false) : null;
                setIsDelDialogOpen(false);
              }}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

export default DeleteDialog;
