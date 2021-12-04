import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    //check if token is set in storage
    if (!localStorage.getItem("token")) {
      //redirect to home page
      navigate("/login");
    }
  });

  document.title = 'User System | Home';

  return <label>Hello world</label>;
}
