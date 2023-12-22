"use client";
import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import {
  Stack,
  IconButton,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DasboarCardStyle } from "./style-components/DashboarCard";
import AddIcon from "@mui/icons-material/Add";
import TagsCurdModel from "./TagsCurdModel";
// import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { dateToString } from "../utils/utility";
// import { getAllTags } from "../redux/slices/user";
export default function TagsDatagrid() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateeOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [newTag, setNewTag] = useState("");
  const [editNewTag, seteditNewTag] = useState("");
  const [rows, setRows] = useState([]);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Tag Name", minWidth: 70, flex: 0.1 },
    {
      field: "by",
      headerName: "Created By",
      minWidth: 130,
      flex: 0.1,
      valueGetter: (rowData) => {
        // const date = dateToString(`${rowData.row.by.name}`);
        // return date;
        return rowData?.row?.by?.name;
      },
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      minWidth: 130,
      flex: 0.1,
      valueGetter: (rowData) => {
        const date = dateToString(`${rowData.row.updatedAt}`);
        return date;
      },
    },
    {
      field: "edit",
      headerName: "Actions",
      align: "center",
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={1} style={{ margin: "0px 8px" }}>
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                // handleEditClick(params.row);
                setSelectedData(params.row);
                console.log(params.row);
                seteditNewTag(params.row.name);
                setIsUpdateeOpen(true);
              }}
              sx={
                {
                  // border: `1px solid ${green["A700"]}`,
                  // color: green["A700"],
                  // backgroundColor: green[50],
                }
              }
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                setSelectedData(params.row);
                setIsDeleteOpen(true);
              }}
              sx={
                {
                  // border: `1px solid ${green["A700"]}`,
                  // color: green["A700"],
                  // backgroundColor: green[50],
                }
              }
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];
  const handleDelete = async () => {
    console.log("data to delete ", selectedData);

    const data = await axios
      .delete(`/api/blogs/tags?tagID=${selectedData._id}`)
      .then(() => {
        const newRows = rows.filter((i) => i._id !== selectedData._id);
        setRows(newRows);
      });
  };
  const handleUpdate = async () => {
    console.log(editNewTag);
    console.log(selectedData);
    selectedData.name = editNewTag;
    selectedData.slug = editNewTag
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/\s+/g, "-");
    const data = await axios
      .patch(`/api/blogs/tags`, {
        newTag: selectedData,
      })
      .then((data) => {
        console.log("check data",data);
        rows.forEach((i: any) => {
          if (i._id === selectedData._id) {
            i = selectedData;
          }
        });
      });
    console.log(selectedData);
  };
  const handleAdd = async () => {
    await axios
      .post(`/api/blogs/tags`, {
        newTag: newTag,
        slug: editNewTag
          .toLowerCase()
          .replace(/\s+/g, " ")
          .replace(/\s+/g, "-"),
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
  const handleDeleteMultiple = async () => {};
  const getAllTags = async () => {
    const data = await axios.get(`/api/blogs/tags`);
    console.log("remove on dev checking>>>>>>>>>>>>>>", data);
    setRows(data.data.data);
  };
  useEffect(() => {
    getAllTags();
    // dispatch(getAllTags());
  }, []);

  return (
    <>
      <div style={{ height: 400, width: "700px" }}>
        <DasboarCardStyle>
          <Stack direction="row" justifyContent="flex-end" width="100%" gap={2}>
            <Button
              onClick={() => {
                setIsAddOpen(true);
              }}
              size="small"
              variant="contained"
              endIcon={<AddIcon />}
            >
              Add
            </Button>
            <Button
              onClick={() => setIsAddOpen(true)}
              size="small"
              variant="contained"
              color="error"
              endIcon={<DeleteIcon />}
              disabled
            >
              Delete
            </Button>
          </Stack>
          {rows.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",

                justifyContent: "center",
                minHeight: "400px",
                // backgroundColor: "#E2E8F0",
                // paddingTop: "20vh",
              }}
            >
              <Typography variant="h2" textAlign="center" mb={3}>
                No Tags Found
              </Typography>
            </Box>
          ) : (
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row._id}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{
                "&, [class^=MuiDataGrid]": { border: "none" },
                minHeight: "400px",
                overflow: "hidden",
              }}
            />
          )}
        </DasboarCardStyle>
      </div>
      {/* ADD */}
      <TagsCurdModel
        open={isAddOpen}
        title="Add a Tag"
        action={handleAdd}
        setOpen={setIsAddOpen}
        btnTile="Add"
      >
        <Stack></Stack>
        <TextField
          id="outlined-basic"
          label="Category Name"
          variant="outlined"
          fullWidth
          size="small"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
      </TagsCurdModel>
      {/* UPDATE */}
      <TagsCurdModel
        open={isUpdateOpen}
        title="Edit a Tag"
        action={handleUpdate}
        setOpen={setIsUpdateeOpen}
        btnTile="Edit"
      >
        <TextField
          id="outlined-basic"
          // label="Category Name"
          variant="outlined"
          fullWidth
          size="small"
          value={editNewTag}
          onChange={(e) => seteditNewTag(e.target.value)}
        />
      </TagsCurdModel>
      {/* DELETE */}
      <TagsCurdModel
        open={isDeleteOpen}
        title="Delete a Tag"
        action={handleDelete}
        setOpen={setIsDeleteOpen}
        btnTile="Confirm"
        btnColor="error"
      >
        <h4>Are you sure? You can't undo this action afterwards.</h4>
      </TagsCurdModel>
    </>
  );
}
