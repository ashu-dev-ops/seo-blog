"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { DasboarCardStyle } from "./style-components/DashboarCard";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// import { DasboarCardStyle } from "./style-components/DashboarCard";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Box,
} from "@mui/material";
import TagsCurdModel from "./TagsCurdModel";
import axios from "axios";
import { dateToString } from "../utils/utility";
export default function TeamDataGrid() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  // console.log("rows>>>>>>>>>>>>>>>>>>>>", rows);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // const [name, setName] = useState("");
  const [selectedData, setSelectedData] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [rows, setRows] = useState([]);
  console.log("rows>>>>>>>>>> from teamdatagrid", rows);
  console.log("rows>>>>>>>>>> from teamdatagrid", rows[0]);
  const columns: GridColDef[] = [
    { field: "name", headerName: "Member Name", minWidth: 70, flex: 0.1 },
    { field: "email", headerName: "Email", minWidth: 70, flex: 0.2 },
    {
      field: "createdAt",
      headerName: "Created At",
      minWidth: 130,
      flex: 0.1,
      valueGetter: (rowData) => {
        // console.log("row data", rowData);
        const date = dateToString(`${rowData.row.createdAt}`);
        return date;
      },
    },
    {
      field: "edit",
      headerName: "Actions",
      align: "center",
      flex: 0,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={1} style={{ margin: "0px 8px" }}>
            {/* <IconButton
              onClick={(event) => {
                event.stopPropagation();
                // handleEditClick(params.row);
                setSelectedData(params.row);
                console.log("edit button click", params.row);
                // seteditNewTag(params.row.name);
                setLastName(params.row?.lastName);
                setFirstName(params.row?.firstName);
                setEmail(params.row?.email);
                setPassword(params.row?.password);
                setIsEditOpen(true);
              }}
            >
              <EditIcon />
            </IconButton> */}
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
  const getRows = async () => {
    const data = await axios.get("/api/team");
    console.log("rows>>>>>>>>>>>>>>>>>.", data);
    setRows(data.data.data);
  };
  const handleAdd = async () => {
    console.log("handle add");
    await axios
      .post(`/api/team/`, {
        email: email,
        password: password,
        name: `${firstName} ${lastName}`,
        firstName: firstName,
        lastName: lastName,
        role: "team_member",
      })
      .then((data: any) => {
        console.log("data i get >>>>>>>>>>", data);
        // const newRows = [...rows, data.data.data];
        // console.log("new rows", newRows);
        // console.log("latest", data.data);
        // setRows(newRows);
      });
  };
  const handleUpdate = async () => {
    axios
      .patch("/api/user", {
        firstName,
        lastName,
        email,
      })
      .then((data) => {
        rows.forEach((i: any) => {
          if (i._id === selectedData._id) {
            i = selectedData;
          }
        });
      });
  };
  const handleDelete = async () => {
    axios.delete(`/api/user?userId=${selectedData._id}`).then((data) => {
      const newRows = rows.filter((i: any) => i._id !== selectedData._id);
      setRows(newRows);
    });
  };
  useEffect(() => {
    getRows();
  }, []);
  return (
    <>
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
            //   onClick={() => setIsAddOpen(true)}
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
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => {
              console.log("what is row", row);
              return row._id;
            }}
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
      <TagsCurdModel
        open={isAddOpen}
        title="Add a team member"
        action={handleAdd}
        setOpen={setIsAddOpen}
        btnTile="Add"
      >
        <Stack gap={2}>
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            fullWidth
            size="small"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            fullWidth
            size="small"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            fullWidth
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Stack>
      </TagsCurdModel>
      <TagsCurdModel
        open={isEditOpen}
        title="Edit a team user"
        action={handleUpdate}
        setOpen={setIsEditOpen}
        btnTile="Add"
      >
        <Stack gap={2}>
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            fullWidth
            size="small"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            fullWidth
            size="small"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            fullWidth
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          /> */}
        </Stack>
      </TagsCurdModel>
      <TagsCurdModel
        open={isDeleteOpen}
        title="Delete a Team user"
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
