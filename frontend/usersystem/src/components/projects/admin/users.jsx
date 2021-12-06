import { useEffect, useState } from "react";
import {DataGrid} from '@mui/x-data-grid';
import axios from "axios";


export default function Users(){
    const numRows = 10;
    const [rows, setRows] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const columns = [
        {field: 'id', headerName: 'ID', width: '50' },
        {field: 'username', headerName: 'Username', width: 200},
        {field: 'email', headerName: 'Email', width: 200},
        {field: 'phone_number', headerName: 'Phone number',},
        // {field: 'project', headerName: 'Project name', },
    ];

    useEffect(()=>{
        //get the users

        //user must be logged in as admin
        if (localStorage.getItem('admin-token')){
            async function getUsers(){
                setMessage('Fetching users...');
                setLoading(true);
                try {
                    let response = await axios.get(`http://localhost:5000/admin/get_all_users`, 
                    {
                        headers:{
                            'Authorization': `Bearer ${localStorage.getItem('admin-token')}`,
                        },
                    });
                    const users = response.data.users;
                    // console.log(users);
                    setRows(users);
                    setLoading(false);
                    setMessage(null);
                    setErrorMessage(null);
                } catch (error) {
                    console.log({error});
                    if (error.response){
                        setErrorMessage(error.response.data);
                    }
                    setMessage(null);
                    setLoading(false);
                }
            };
            getUsers();
        }
    }, []);
    return (
        <div style={{ height: 500, width: '100%' }} >
        <DataGrid 
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
        />
        </div>
        
    );
    
};