import React, { createContext, useReducer } from "react";
//Context API
const GlobalContext = createContext({});
//Initial State
const INITIAL = {
  userData: [],
  selectedExpenses: [],
};

//Global State Provider
const StateProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(
    (prev: any, action: { type: string; payload: any }) => {
      switch (action.type) {
        //setting data as data stored locally
        case "LOAD_LOCAL_DATA":
          return { ...prev, userData: action.payload };
        //adding new expense
        case "ADD_EXPENSE":
          return { ...prev, userData: [...prev.userData, action.payload] };
        //deleting expense
        case "DELETE_EXPENSE":
          const newUserData = prev.userData.filter(
            (val: { ID: string }) => val.ID !== action.payload
          );
          return { ...prev, userData: newUserData };
        //update expense
        case "UPDATE_EXPENSE":
          prev.userData.map((exp: any) => {
            if (exp.ID === action.payload.ID) {
              exp.expenseTitle = action.payload.expenseTitle;
              exp.expenseDesc = action.payload.expenseDesc;
              exp.expenseAmt = action.payload.expenseAmt;
            }
          });
          return { ...prev, userData: [...prev.userData] };
        //reset selected expenses after deletion
        case "RESET_SELECTED_EXPENSES":
          return {
            ...prev,
            selectedExpenses: [],
          };
        //adding an expense ID
        case "SELECT_EXPENSE":
          return {
            ...prev,
            selectedExpenses: [...prev.selectedExpenses, action.payload],
          };
        //removing expense ID due to unchecking
        case "UNSELECT_EXPENSE":
          const newExpenseSelectionData = prev.selectedExpenses.filter(
            (val: string) => val !== action.payload
          );
          return {
            ...prev,
            selectedExpenses: newExpenseSelectionData,
          };
      }
    },
    INITIAL
  );

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, StateProvider };
