import { NavLink } from "react-router";
import { useState } from 'react';
import "./Navbar.css";  
import { UserContext } from '../../../context/UserContext.jsx';
import { use } from 'react'
import {app} from '../../../firebase/firebase.js';
import { getAuth, signOut } from "firebase/auth";
import { useEffect } from "react";

const auth = getAuth(app);

export default function Navbar(){

    const [isOpen, setIsOpen] = useState(false);

    const contextProfile = use(UserContext);

    const {logged, profile} = contextProfile; 
    
    useEffect(() => {
        // console.log("Estado del perfil:", profile);
        // console.log("Estado de logged:", logged);
    }, [profile, logged]); 

    const handleLogout = async () => {
        await signOut(auth)
    };

    
    return<>
    <div className='papaflex'> 
        <div className='navbar'> 
            <div className="inicioNavbar">
                <div className='fotoTitulo'>
                    <img src="/fotos/AvilaTreklogo.png" alt="Logo Avila Trek" className="logo"/>
                </div>
                {profile.tipoUsuario !=="administrador" ? <NavLink className="inicio" to={"/"}>Inicio</NavLink>
                    :
                <div className="tituloAdmin">Dashboard Administrador</div>}
            </div>
            <div className='botones'>
                {profile.tipoUsuario !=="guia" && profile.tipoUsuario !=="administrador" && <NavLink className="actividades" to={"actividades"}>Actividades</NavLink>}
                {profile.tipoUsuario !=="administrador" && <NavLink className="foro" to={"foro"}>Foro</NavLink>}
                {profile.tipoUsuario !=="administrador" && <NavLink className="informacion" to={"informacion"}>Información</NavLink>}
                {profile.tipoUsuario !=="administrador" && <NavLink className="contacto" to={"contacto"}>Contáctanos</NavLink>}

                <div className="dropdownPerfil" 
                    onMouseEnter={() => {clearTimeout(window.dropdownTimeout); setIsOpen(true)}} 
                    onMouseLeave={() => {window.dropdownTimeout = setTimeout(() => setIsOpen(false), 500)}}>

                    <img className="imgMiPerfil" src="/fotos/perfilLogo.png" alt="Mi perfil" onClick={() =>setIsOpen((prevState)=>!prevState)} />
                    {isOpen &&(
                        logged ?
                        <div className="dropdownMenu">
                            {profile.tipoUsuario !=="administrador" && <NavLink to={profile.tipoUsuario === "trekker" ? "/mi-perfil-trekker" : "/mi-perfil-guia"} className="opcionVerPerfil">Ver perfil</NavLink>}
                            <NavLink className="opcionLogout"  onClick={handleLogout}>Cerrar sesión</NavLink>
                        </div>
                        :
                        <div className="dropdownMenu">
                            <NavLink to={"/signup"} className="opcionInicioSes">Iniciar sesión</NavLink>
                            <NavLink to={"/admin"} className="opcionInicioSes">Prueba admin</NavLink>

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