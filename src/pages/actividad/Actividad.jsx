import { useNavigate } from "react-router";

import "./Actividad";

export default function Actividad() {
  const fullUrl = window.location.href; // Get the full URL
  const pathname = window.location.pathname; // Get the pathname

  const targetString = pathname.replace("/actividad/", "");
  

  return <h1>Activity Details: {targetString}</h1>;
}
