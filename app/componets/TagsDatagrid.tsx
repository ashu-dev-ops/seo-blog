"use client";
import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Stack, IconButton, TextField, Button } from "@mui/material";
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
  // const { tags } = useSelector((store: any) => store.user);
  // const dispatch = useDispatch();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateeOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [newTag, setNewTag] = useState("");
  const [editNewTag, seteditNewTag] = useState("");
  const [rows, setRows] = useState([]);
  // const [newTag, setNewTag] = useState("");
  const columns: GridColDef[] = [
    // { field: "_id", headerName: "ID", minWidth: 20, flex: 0.1 },
    { field: "name", headerName: "Tag Name", minWidth: 70, flex: 0.1 },
    {
      field: "createdAt",
      headerName: "Created At",
      minWidth: 130,
      flex: 0.1,
      valueGetter: (rowData) => {
        const date = dateToString(`${rowData.row.createdAt}`);
        return date;
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

  // const rows = [
  //   { id: 1, title: "Snow", createdAt: "Jon", updatedAt: 35 },
  //   { id: 2, title: "Lannister", createdAt: "Cersei", updatedAt: 42 },
  //   { id: 3, title: "Lannister", createdAt: "Jaime", updatedAt: 45 },
  //   { id: 4, title: "Stark", createdAt: "Arya", updatedAt: 16 },
  //   { id: 5, title: "Targaryen", createdAt: "Daenerys", updatedAt: null },
  //   { id: 6, title: "Melisandre", createdAt: null, updatedAt: 150 },
  //   { id: 7, title: "Clifford", createdAt: "Ferrara", updatedAt: 44 },
  //   { id: 8, title: "Frances", createdAt: "Rossini", updatedAt: 36 },
  //   { id: 9, title: "Roxie", createdAt: "Harvey", updatedAt: 65 },
  // ];
  const handleDelete = async () => {
    console.log("data to delete ", selectedData);

    const data = await axios
      .delete(`http://localhost:3000/api/blogs/tags?tagID=${selectedData._id}`)
      .then(() => {
        const newRows = rows.filter((i) => i._id !== selectedData._id);
        setRows(newRows);
      });
  };
  const handleUpdate = async () => {
    selectedData.name = editNewTag;
    const data = await axios
      .patch("http://localhost:3000/api/blogs/tags", {
        newTag: selectedData,
      })
      .then((data) => {
        console.log("check data");
        rows.forEach((i) => {
          if (i._id === selectedData._id) {
            i = selectedData;
          }
        });
      });
    console.log(selectedData);
  };
  const handleAdd = async () => {
    await axios
      .post("http://localhost:3000/api/blogs/tags", {
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
  const handleDeleteMultiple = async () => {};
  const getAllTags = async () => {
    const data = await axios.get("http://localhost:3000/api/blogs/tags");
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
            }}
          />
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
        <TextField
          id="outlined-basic"
          label="Outlined"
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
          label="Outlined"
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
      {/* <TagsCurdModel
        open={isDeleteOpen}
        title="Delete a Tag"
        action={handleDelete}
        setOpen={setIsDeleteOpen}
      >
        <h1>Delete muliple</h1>
      </TagsCurdModel> */}
    </>
  );
}
