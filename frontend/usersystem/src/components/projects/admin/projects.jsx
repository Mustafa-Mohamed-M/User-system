import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Button, Divider, Grid, Paper, TextField } from "@mui/material";

export default function Projects() {
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "name", headerName: "Project name", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "assigned", headerName: "User assigned", width: 150 },
  ];
  const [rows, setRows] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("admin-token")) {
      const token = localStorage.getItem("admin-token");
      async function getProjects() {
        try {
          let response = await axios.get(
            `http://localhost:5001/projects/get_all_projects`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
              },
            }
          );
          const projects = response.data.projects;
          console.log(projects);
          // console.log(users);
          setRows(projects);
          setLoading(false);
          setMessage(null);
          setErrorMessage(null);
        } catch (error) {
          console.log({ error });
          if (error.response) {
            setErrorMessage(error.response.data);
          }
          setMessage(null);
          setLoading(false);
        }
      }
      getProjects();
    }
  }, []);

  return (
    <div style={{ height: 500, width: "100%" }}>
        <TextField 
        label="Project name" />
        <TextField 
        label="Project description" />
        <Button></Button>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}
