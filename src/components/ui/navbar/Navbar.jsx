import { NavLink } from "react-router";
import { useState } from 'react';
import "./Navbar.css";  

export default function Navbar(){

    const [isOpen, setIsOpen] = useState(false);
    
    return<>
    <div className='papaflex'> 
        <div className='navbar'> 
            <div className="inicioNavbar">
                <div className='fotoTitulo'>
                    <img src="./AvilaTreklogo.png" alt="Logo Avila Trek" className="logo"/>
                </div>
                <NavLink className="inicio" to={"/"}>Inicio</NavLink>
            </div>
            <div className='botones'>
                <NavLink className="actividades" to={"actividades"}>Actividades</NavLink>
                <NavLink className="foro" to={"foro"}>Foro</NavLink>
                <NavLink className="informacion" to={"informacion"}>Información</NavLink>
                <NavLink className="contacto" to={"contacto"}>Contáctanos</NavLink>

                <div className="dropdownPerfil" 
                    onMouseEnter={() => {clearTimeout(window.dropdownTimeout); setIsOpen(true)}} 
                    onMouseLeave={() => {window.dropdownTimeout = setTimeout(() => setIsOpen(false), 500)}}>

                    <img className="imgMiPerfil" src="./perfilLogo.png" alt="Mi perfil" onClick={() =>setIsOpen((prevState)=>!prevState)} />
                    {isOpen &&(
                        <div className="dropdownMenu">
                            {/* <NavLink to={"/mi-perfil"} className="opcionVerPerfil">Ver perfil</NavLink> */}
                            <NavLink to={"/signup"} className="opcionLogout">Iniciar sesión</NavLink>
                        </div>
                    )}
                </div>
                {/* <NavLink className="miPerfil" to={"mi-perfil"}><img src="./perfilLogo.png" alt="Mi perfil" className="miperfil"/></NavLink> */}
                {/* <NavLink className="miPerfil" to={"signup"}><img src="./perfilLogo.png" alt="Mi perfil" className="miperfil"/></NavLink> */}

            </div>
        </div>
    </div>
    </>
    
}