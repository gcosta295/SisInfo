import { NavLink } from "react-router";
import "./Footer.css";  

export default function Navbar(){
    
    return<>
        <div className='footer'> 
            <NavLink className="contactfoot" to={"contacto"}>nosotros</NavLink>
            <p className="copyright">©Copyright 2025 </p>
            <p className="avtr">AvilaTrek</p>
        </div>
    </>
    
}