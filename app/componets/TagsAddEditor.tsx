import React from "react";
import Chip from "@mui/material/Chip";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import axios from "axios";
import { useUserContext } from "../store/editorContext";
const filter = createFilterOptions();
export default function TagsAddEditor() {
  const { handleTags, tags, allTags, setAllTags } = useUserContext();

  console.log("currently selected tags", tags);
  const handleAdd = async (newTag: any) => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>", newTag);
    await axios
      .post(`/api/blogs/tags`, {
        newTag: newTag,
      })
      .then((data) => {
        setAllTags(data.data.data);
        handleTags(data.data.data);
      });
  };
  console.log("all tags", allTags);
  console.log("selected tags", tags);
  return (
    <Autocomplete
      multiple
      id="creatable-tags"
      options={allTags || []}
      getOptionLabel={(option) => option.name}
      value={tags}
      onChange={async (event, newValue) => {
        console.log(">>>>>>>>>>>>>>>.", newValue);
        // const nameCount = newValue?.filter((item) => item.inputValue);
        const foundObject = newValue.find((obj) =>
          obj.hasOwnProperty("inputValue")
        );
        const uniqueArray = newValue.filter((obj, index, array) => {
          // Check if the index of the current object is the first occurrence in the array
          return array.findIndex((item) => item?.name === obj?.name) === index;
        });
        if (foundObject) {
          return await handleAdd(foundObject.inputValue);
        } else {
          handleTags(uniqueArray);
        }

        // if (typeof newValue === "string") {
        //   await handleAdd(newValue);
        // } else if (newValue && newValue.name) {
        //   // Create a new value from the user input
        //   handleTags(newValue);
        // }
        // console.log("values i want>>>>>>>>..", event, newValue);
        // // if (newValue.length === 0) return;
        // if (newValue.length >= 1) {
        //   const lastValue = newValue[newValue.length - 1];
        //   console.log("last value", lastValue);
        //   const nameCount = allTags?.filter(
        //     (item) => item.name === lastValue.name
        //   ).length;
        //   console.log("is it already exist");
        //   if (nameCount === 0) {
        //     console.log("running>>>>>.add tag");

        //     await handleAdd(lastValue.name);
        //   } else {
        //     handleTags(newValue);
        //   }
        // } else {
        //   handleTags(newValue);
        // }
      }}
      // onInputChange={(event, newValue) => {
      //   console.log("new values", newValue);
      //   handleAdd(newValue);
      // }}
      filterOptions={(options, params) => {
        // cant do async work
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
          // label="Creatable Tags"
          // placeholder="Tags"
          size="small"
        />
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => {
          console.log({ ...option });
          return (
            <Chip
              key={index} // Ensure that the key is passed directly to the JSX element
              variant="outlined"
              label={option.name}
              {...getTagProps({ index })}
            />
          );
        })
      }
    />
  );
}
