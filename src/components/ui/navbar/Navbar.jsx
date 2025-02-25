import { NavLink } from "react-router";
import "./Navbar.css";  

export default function Navbar(){
    
    return<>
    <div className='papaflex'> 
        <div className='navbar'> 
            <div className="inicioNavbar">
                <div className='fotoTitulo'>
                    <img src="src/assets/fotos/AvilaTreklogo.png" alt="Logo Avila Trek" className="logo"/>
                </div>
                <NavLink className="inicio" to={"inicio"}>Inicio</NavLink>
            </div>
            <div className='botones'>
                <NavLink className="actividades" to={"actividades"}>Actividades</NavLink>
                <NavLink className="foro" to={"foro"}>Foro</NavLink>
                <NavLink className="informacion" to={"informacion"}>Información</NavLink>
                <NavLink className="contacto" to={"contacto"}>Contáctanos</NavLink>
                {/* <NavLink className="miPerfil" to={"mi-perfil"}><img src="src/assets/fotos/perfilLogo.png" alt="Mi perfil" className="miperfil"/></NavLink> */}

                <NavLink className="miPerfil" to={"signup"}><img src="src/assets/fotos/perfilLogo.png" alt="Mi perfil" className="miperfil"/></NavLink>
            </div>
        </div>
    </div>
    </>
    
}