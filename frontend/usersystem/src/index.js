import React from 'react';
import ReactDOM from 'react-dom';
import './bootstraptheme.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from './components/projects/admin/login';
import reportWebVitals from './reportWebVitals';
import ProjectsHome from './components/projects/admin/newprojects';
import AddProject from './components/projects/admin/addProject';
import TheUsers from './components/projects/admin/newusers';
import AssignUserProject from './components/projects/admin/assignUserProject';
import AssignUserTask from './components/projects/admin/assignTask';
import ProjectTasks from './components/projects/admin/projectTasks';
import Login from './components/projects/user/login';
import Signup from './components/projects/user/signup';
import UserHome from './components/projects/user/home';



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserHome />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin/login"element={<AdminLogin />}></Route>
        <Route path="/admin/" element={<ProjectsHome />} ></Route>
        <Route path="/admin/new_project" element={<AddProject />}></Route>
        <Route path="/admin/users" element={<TheUsers />}></Route>
        <Route path="/admin/assign_user_project" element={<AssignUserProject />}></Route>
        <Route path="/admin/assign_user_task" element={<AssignUserTask />}></Route>
        <Route path="/admin/project_tasks" element={<ProjectTasks />}></Route>
      </Routes>
    {/* <App /> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
