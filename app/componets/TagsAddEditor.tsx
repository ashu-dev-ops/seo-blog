import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useUserContext } from "../store/editorContext";
const filter = createFilterOptions();
export default function TagsAddEditor() {
  const { handleTags, tags } = useUserContext();
  const [rows, setRows] = useState([]);
  const [value, setValue] = React.useState(tags);
  const getAllTags = async () => {
    const data = await axios.get(`/api/blogs/tags`);
    console.log("remove on dev checking>>>>>>>>>>>>>>", data);
    setRows(data.data.data);
  };
  const handleAdd = async (newTag) => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>", newTag);
    await axios
      .post(`/api/blogs/tags`, {
        newTag: newTag,
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
    getAllTags();
  }, []);
  return (
    <Autocomplete
      multiple
      id="creatable-tags"
      options={rows}
      getOptionLabel={(option) => option.name}
      value={value}
      onChange={async (event, newValue) => {
        setValue(newValue);
        console.log("checking new valie one", newValue);
        handleTags(newValue);
        if (newValue.length === 1) {
          if (newValue[0].inputValue) {
            await handleAdd(newValue[0].inputValue);
          }
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        const isExisting = options.some(
          (option) => inputValue === option.names
        );

        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            name: `${inputValue}`,
          });
          console.log(
            "running>>>>>>>>>>>>>>>>>>>>>>input value two",
            inputValue
          );
          // await handleAdd(`${inputValue}`);
        }

        return filtered.slice(0, 3);
      }}
      renderOption={(props, option) => (
        <li {...props}>
          {option.inputValue ? `Add "${option.inputValue}"` : option.name}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Creatable Tags"
          placeholder="Favorites"
          size="small"
        />
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            key={index} // Ensure that the key is passed directly to the JSX element
            variant="outlined"
            label={option.name}
            {...getTagProps({ index })}
          />
        ))
      }
    />
  );
}
