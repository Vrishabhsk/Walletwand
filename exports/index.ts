/*
This file contains Props interfaces for each component
It also contains some similar code found in some files
Also contains Constants
They are imported from here
*/

//------------------------------------------ Constants ----------------------------------------------
//color constants for piechart
export const hexColorCodes: string[] = [
  "#FF8356",
  "#4EE15F",
  "#F4FF61",
  "#F47C7C",
  "#F688BB",
  "#48C9B0",
  "#7098DA",
];

//config for pieChart
export const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 0) => `rgba(26, 255, 146, ${opacity})`,
  barPercentage: 0.5,
};
//------------------------------------------ Similar Code -------------------------------------------
//inteface for each expense
export interface ExpenseInterface {
  ID: string;
  expenseCategory: string;
  expenseTitle: string;
  expenseDesc?: string;
  expenseAmt: string;
  expenseDate?: string;
}

//State while adding a new expense
export const AddState = (uuid: string) => {
  return {
    ID: uuid,
    expenseCategory: "",
    expenseTitle: "",
    expenseDesc: "",
    expenseAmt: "",
    expenseDate: "",
  };
};

//-------------------------------------- Props Interface --------------------------------------------
export interface AddExpenseProps {
  showAddExpenseModal: boolean;
  setShowAddExpenseModal: any;
}

export interface AlertBadgeProps {
  status: string;
  alertDes: string;
}

export interface DataRowProps {
  item: ExpenseInterface;
}

export interface DatePickerProps {
  handleChange: (event: string, value: string) => void;
  setDisplayAlert: any;
}

export interface DeleteDialogProps {
  setViewExpense?: any;
  isDelDialogOpen: boolean;
  setIsDelDialogOpen: any;
  ID?: string;
  selectedExpenseIds?: string[];
}

export interface ExpenseViewProps {
  viewExpense: boolean;
  setViewExpense: any;
  item: ExpenseInterface;
}

export interface HeaderProps {
  navigation: any;
  selectedExpenseIds?: string[];
  isAnalysis?: boolean;
}

export interface CategoryProps {
  selectedCategory: string;
  setSelectedCategory: any;
  handleChange: (event: string, value: string) => void;
}

export interface TextInputProps {
  onChange: (event: string, value: string) => void;
  label: string;
  value: string;
  name: string;
}

export interface UpdateDialogProps {
  isUpdDialogOpen: boolean;
  setIsUpdDialogOpen: any;
  item: ExpenseInterface;
}
