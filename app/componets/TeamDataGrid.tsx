"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { DasboarCardStyle } from "./style-components/DashboarCard";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// import { DasboarCardStyle } from "./style-components/DashboarCard";
import AddIcon from "@mui/icons-material/Add";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import TagsCurdModel from "./TagsCurdModel";
import axios from "axios";
export default function TeamDataGrid() {
  // console.log("rows>>>>>>>>>>>>>>>>>>>>", rows);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [rows, setRows] = useState([]);
  console.log("rows>>>>>>>>>> from teamdatagrid", rows);
  console.log("rows>>>>>>>>>> from teamdatagrid", rows[0]);
  const columns: GridColDef[] = [
    { field: "name", headerName: "Member Name", minWidth: 70, flex: 0.1 },
    { field: "email", headerName: "Email", minWidth: 70, flex: 0.2},
    {
      field: "createdAt",
      headerName: "Created At",
      minWidth: 130,
      flex: 0.1,
    },
    {
      field: "edit",
      headerName: "Actions",
      align: "center",
      flex: 0,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={1} style={{ margin: "0px 8px" }}>
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                // handleEditClick(params.row);
                //   setSelectedData(params.row);
                //   console.log(params.row);
                //   seteditNewTag(params.row.name);
                //   setIsUpdateeOpen(true);
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
            {/* <IconButton
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
              </IconButton> */}
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
        name: name,
        role: "team_member",
      })
      .then((data: any) => {
        
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
        {rows.length > 0 && (
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
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            fullWidth
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Stack>
      </TagsCurdModel>
      <TagsCurdModel
        open={isAddOpen}
        title="Edit a team user"
        action={handleAdd}
        setOpen={setIsAddOpen}
        btnTile="Add"
      >
        <Stack gap={2}>
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
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            fullWidth
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Stack>
      </TagsCurdModel>
    </>
  );
}
