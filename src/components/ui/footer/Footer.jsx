import { NavLink } from "react-router";
import "./Footer.css";  

export default function Navbar(){
    
    return<>
        <div className='footer'> 
            <NavLink className="contactfoot" to={"contacto"}>nosotros</NavLink>
            <p className="copyrightFooter">© Copyright 2025 AvilaTrek</p>

        </div>
    </>
    
}