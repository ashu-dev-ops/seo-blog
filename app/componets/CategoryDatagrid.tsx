"use client";
import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Stack, IconButton, TextField, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DasboarCardStyle } from "./style-components/DashboarCard";
import AddIcon from "@mui/icons-material/Add";
import TagsCurdModel from "./TagsCurdModel";
import axios from "axios";
import { dateToString } from "../utils/utility";

export default function CategoryDatagrid() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateeOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [newTag, setNewTag] = useState("");
  const [editNewTag, seteditNewTag] = useState("");
  const [rows, setRows] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const columns: GridColDef[] = [
    // { field: "_id", headerName: "ID", minWidth: 20, flex: 0.1 },
    { field: "name", headerName: "Category", minWidth: 70, flex: 0.2 },
    {
      field: "by",
      headerName: "Created By",
      minWidth: 130,
      flex: 0.2,
      valueGetter: (rowData) => {
        return rowData?.row?.by?.firstName;
      },
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      minWidth: 130,
      flex: 0.2,
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
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                setSelectedData(params.row);
                setIsDeleteOpen(true);
              }}
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
      .delete(`/api/blogs/category?tagID=${selectedData._id}`)
      .then(() => {
        const newRows = rows.filter((i: any) => i._id !== selectedData._id);
        setRows(newRows);
      });
  };
  const handleUpdate = async () => {
    selectedData.name = editNewTag;
    selectedData.slug = editNewTag
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/\s+/g, "-");
    const data = await axios
      .patch(`/api/blogs/category`, {
        newTag: selectedData,
      })
      .then((data) => {
        console.log("check data");
        rows.forEach((i: any) => {
          if (i._id === selectedData._id) {
            i = selectedData;
          }
        });
      });
    console.log(selectedData);
    console.log(data);
  };
  const handleAdd = async () => {
    await axios
      .post(`/api/blogs/category`, {
        newTag: newTag,
        slug: newTag.toLowerCase().replace(/\s+/g, " ").replace(/\s+/g, "-"),
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
    const data = await axios.get(`/api/blogs/category`);
    console.log("remove on dev checking>>>>>>>>>>>>>>", data);
    setRows(data.data.data);
    setIsloading(false);
  };
  useEffect(() => {
    getAllTags();
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
          <div style={{ flexGrow: 1, width: "100%", overflow: "hidden" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row._id}
              loading={isLoading}
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
              }}
            />
          </div>
        </DasboarCardStyle>
      </div>
      <TagsCurdModel
        open={isAddOpen}
        title="Add a Category"
        action={handleAdd}
        setOpen={setIsAddOpen}
        btnTile="Add"
      >
        <TextField
          id="outlined-basic"
          // label="Enter tag name"
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
        title="Edit a Category"
        action={handleUpdate}
        setOpen={setIsUpdateeOpen}
        btnTile="Edit"
      >
        <TextField
          id="outlined-basic"
          // label="Enter Category name"
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
        title="Delete a Category"
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
