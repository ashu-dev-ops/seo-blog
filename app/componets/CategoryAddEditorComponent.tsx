import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import axios from "axios";
import { useUserContext } from "../store/editorContext";
const filter = createFilterOptions<any>();
export default function CategoryAddEditor() {
  const [rows, setRows] = useState<any[]>([]);

  const { handleCategory, category } = useUserContext();
  console.log("category from>>>>>>>>editor add", category);
  const [value, setValue] = React.useState<any>(
    category?.length === 0 ? null : category
  );
  // const [selectedData, setSelectedData] = useState({});
  const getAllTags = async () => {
    const data = await axios.get(`/api/blogs/category`);
    console.log("remove on dev checking>>>>>>>>>>>>>>", data);
    setRows(data.data.data);
  };
  const handleAdd = async (selectedData: any) => {
    await axios
      .post(`/api/blogs/category`, {
        newTag: selectedData,
      })
      .then((data) => {
        console.log(data.data);

        // const newRows = rows.push(data.data);
        const newRows = [...rows, data.data.data];
        console.log("new rows", newRows);
        console.log("latest", data.data);
        setRows(newRows);
        // setRows(newRows);
      });
  };
  useEffect(() => {
    setValue(category);
  }, [category]);
  useEffect(() => {
    getAllTags();
  }, []);
  return (
    <Autocomplete
      value={value}
      onChange={async (event, newValue) => {
        if (typeof newValue === "string") {
          console.log("running one");
          setValue({
            name: newValue,
          });
          handleCategory(newValue);
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          console.log("running two");
          setValue({
            name: newValue.inputValue,
          });
          handleCategory(newValue?.inputValue);
          await handleAdd(newValue.inputValue);
        } else {
          console.log("running three");
          setValue(newValue);
          handleCategory(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            name: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={rows}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      //   sx={{ width: 100 }}
      freeSolo
      size="small"
      renderInput={(params) => <TextField {...params} label="Enter category" />}
    />
  );
}
