import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function TheNavBar(props){

    const navigate = useNavigate();

    function logout(evt){
        evt.preventDefault();
        localStorage.removeItem('admin-token');
        navigate('/admin/login');
    }

    function goToUsers(evt){
      evt.preventDefault();
      navigate('/admin/users');
    }

    function goToProjects(evt){
      evt.preventDefault();
      navigate('/admin')
    }

    useEffect(()=>{
        if (!localStorage.getItem('admin-token')){
            navigate('/admin/login');
        }
    });


    let usersClassName = "nav-item nav-link ";
    let projectsClassName = "nav-item nav-link ";
    if (props){
      if (props['active'] === 1){
        usersClassName += "active";
      }
      else if (props['active'] === 2){
        projectsClassName += "active";
      }
    }

    return (
    <nav id="navbar-0" className="navbar navbar-expand-sm navbar-dark bg-primary mb-3">
  <a className="navbar-brand" href="#">
    User system
  </a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-0" aria-controls="navbar-0" aria-expanded="false" aria-label="Toggle Navigation">
    <span className="navbar-toggler-icon">
    </span>
  </button>
  <div className="collapse navbar-collapse" id="navbar-0">
    <div className="navbar-nav">
      <a className={usersClassName} href="#" onClick={(evt)=>goToUsers(evt)} >
        Users
        <span className="sr-only">
          (current)
        </span>
      </a>
      <a className={projectsClassName} href="#" onClick={(evt)=>goToProjects(evt)} >
        Projects
      </a>
    </div>
    
    <div className="navbar-nav ml-auto">
      <a className="nav-item nav-link" href="#" onClick={(evt)=>logout(evt)}>
        Logout
      </a>
    </div>
  </div>
</nav>
);
}