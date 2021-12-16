import * as React from "react";
import TheNavBar from "./navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

export default function ProjectsHome(){



    const [message, setMessage] = useState(null);
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    const columns = [
        {
            dataField: 'number', text: '#', headerStyle: {backgroundColor: 'green'}, title: true, 
            align: 'center', style: {backgroundColor: "rgb(40,40,40)"}, headerStyle: {width: '5%', textAlign: 'center'}
        },
            {dataField: 'name', text: 'Project name', headerStyle: {width: '20%'}, 
            style: {backgroundColor: "rgb(40,40,40)"}},
            {dataField: 'description', text: 'Description', style: {backgroundColor: "rgb(40,40,40)"}},
            {dataField: 'tasks', text: 'Tasks', style: {backgroundColor: "rgb(40,40,40)"}, headerStyle: {width: '7%'}, align: 'right'},
            {dataField: 'actions', style: {backgroundColor: "rgb(40,40,40)"}, text: 'Actions',},
    ];


    async function getProjects(){
        try{
            setMessage('Fetching projects...');
            let response = await axios.get(
                `http://localhost:5001/projects/get_all_projects`,
                {
                    headers: {
                    Authorization: `Bearer ${localStorage.getItem("admin-token")}`,
                    },
                }
            );
            let theProjects = response.data.projects;
            setProjects(theProjects.map((item, index)=>{
                return {
                    id: item.id,
                    name: item.name,
                    number: index + 1,
                    description: item.description,
                    tasks: item.tasks,
                    actions: 
                    <React.Fragment>
                        <button className="btn btn-primary btn-sm mr-3 mb-3" 
                            onClick={()=>viewTasks(item)}
                            >View tasks</button>
                        <button className="btn btn-primary btn-sm mr-3 mb-3" 
                            >Edit project</button>
                        <button className="btn btn-danger btn-sm mr-3 mb-3" >Delete</button>
                    </React.Fragment>
                };
                
            }));
            setMessage(null);
            
        } catch (error){
            setMessage('An error occurred.');
        }
    }

    useEffect(()=>{
        if (!localStorage.getItem("admin-token")) {
            navigate("/admin/login");
        }
        else{
            getProjects();
        }
    }, []);

    function addProject(){
        navigate("/admin/new_project");
    }

    function viewTasks(project){
        navigate("/admin/project_tasks", {
            state: {
                project
            }
        });
    }
    

    return (
        <React.Fragment>
        <TheNavBar active={2} />
        <div className="container-fluid">
            {
                message && 
                <div className="alert alert-success fade in alert-dismissible show" >
                    {message}
                </div>
            }
            <label>Projects {2}</label>
            <button 
            onClick={()=>addProject()}
            className="btn btn-primary mr-3 mb-3" style={{marginLeft: "5px"}} >Add project</button>
            <BootstrapTable  keyField="id" data={projects} columns={columns} 
                            
                            pagination={paginationFactory()} />
        </div>
        </React.Fragment>
    );
}