import React, { useState } from "react";
import { SelectMenu, Button, Pane, Text } from "evergreen-ui";

const MultiSelectField = ({
  label,
  options,
  value,
  isRequired,
  handleSelect,
  handleDeselect
}) => {
  const [selectedNames, setSelectedNames] = useState([]);

  const handleChange = (item, action) => {
    switch (action) {
      case 1:
        const names = [...selectedNames];
        names.push(item.label);
        setSelectedNames(names);
        break;
      case 2:
        const namesSelected = [...selectedNames];
        namesSelected.splice(namesSelected.indexOf(item.label), 1);
        setSelectedNames(namesSelected);
        break;
    }
  };

  return (
    <SelectMenu
      isMultiSelect
      title={label}
      emptyView={
        <Pane
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text size={100}>No options found</Text>
        </Pane>
      }
      options={options}
      selected={value}
      onSelect={item => {
        handleSelect(item.value);
        handleChange(item, 1);
      }}
      onDeselect={item => {
        handleDeselect(item.value);
        handleChange(item, 2);
      }}
      isRequired={isRequired && isRequired}
    >
      <Button>
        {selectedNames.length > 0
          ? selectedNames.length === 1
            ? selectedNames[0]
            : selectedNames.length.toString() + " selected..."
          : "Select multiple..."}
      </Button>
    </SelectMenu>
  );
};

export default MultiSelectField;
