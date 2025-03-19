import "./PerfilGuia.css";
import { use } from 'react'
import { UserContext } from '../../context/UserContext.jsx';
import { useNavigate } from "react-router";


export default function PerfilGuia() {

    const contextProfile = use(UserContext);
    const { profile} = contextProfile;
    // console.log(profile);
    
    const navigate = useNavigate();

    const goto1 = (event) => {  
        navigate("/reservas-guia")  
    }

    const goto2 = (event) => {  
        navigate("/editar-guia")  
    }

    return(
        <>
            <div className="contenedorCabecera">
                <p className="tituloPerfil">Mi perfil</p>
                <button className="botonVerReservaGuia" onClick={goto1}>Reservas asignadas</button>
            </div>
            <div className="contenedorPerfilPadre">
                <div className="contenedorDatosPerfilGuia">
                    <div className="izqContenedorPerfilGuia">
                        <img className="imgPerfilGuia" src={profile.profilePicture} width={200} height={200} />
                        <div className="contenedorNombrePerfilGuia">
                            <img src="/fotos/user-icon.png" width={30} height={30}/>
                            <p className="nombrePerfilGuia">{profile.firstName} {profile.lastName}</p>
                        </div>
                        <div className="contenedorTelefGuia">
                            <p className="tituloTelefonoPerfilGuia">Teléfono</p>
                            <p className="telefonoPerfilGuia">{profile.phoneNumber}</p>
                        </div>
                    </div>
                    <div className="derechaContenedorPerfilGuia">
                        <div>
                            <p className="tituloDescripcion">Descripción</p>
                            <p className="descripcionGuia">{profile.description}</p>
                            {profile.description || "No se ha añadido esta información aún"}
                        </div>
                        <div className="contenedorActFav">
                            <p className="actFavGuia">Actividad favorita</p>
                            <p className="actFavGuiaTexto">{profile.favActivity}</p>
                            {profile.favActivity || "No se ha añadido esta información"}
                        </div>
                        <div className="contenedorActFav">
                            <p className="actFavTrekker">Correo electrónico</p>
                            <p className="actFavTrekkerTexto">{profile.email}</p>
                        </div>
                        <div className="contenedorActFav">
                            <p className="actFavTrekker">Teléfono</p>
                            <p className="actFavTrekkerTexto">{profile.phoneNumber}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contenedorBotonEditGuia">
                <button className="botonEditarGuia" onClick={goto2}>Editar perfil</button>
            </div>
        </>
        )

}