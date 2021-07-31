import React, { FC } from "react";
import { Select } from "native-base";
//Exports
import { CategoryProps } from "../exports";

const SelectCategory: FC<CategoryProps> = ({
  selectedCategory,
  setSelectedCategory,
  handleChange,
}) => {
  return (
    <Select
      selectedValue={selectedCategory}
      minWidth={155}
      placeholder="Category *"
      color="#fff"
      onValueChange={(itemValue) => {
        setSelectedCategory(itemValue);
        handleChange("expenseCategory", itemValue);
      }}
    >
      <Select.Item label="🏤 Housing" value="🏤 Housing" />
      <Select.Item label="⛽ Transport" value="⛽ Transport" />
      <Select.Item label="🍕 Food" value="🍕 Food" />
      <Select.Item label="🔨 Utilities" value="🔨 Utilities" />
      <Select.Item label="📚 Education" value="📚 Education" />
      <Select.Item label="💊 Health" value="💊 Health" />
      <Select.Item label="💴 Other" value="💴 Other" />
    </Select>
  );
};

export default SelectCategory;
