import "./PerfilTrekker.css";
import { use } from 'react'
import { UserContext } from '../../context/UserContext.jsx';
import { useNavigate } from "react-router";


export default function PerfilTrekker() {

    const contextProfile = use(UserContext);
    const { profile} = contextProfile;
    // console.log(profile);
    
    const navigate = useNavigate();

    const goto1 = (event) => {  
        navigate("/reservas-trekker")  
    }

    const goto2 = (event) => {  
        navigate("/editar-trekker")  
    }

    return(
        <>
            <div className="contenedorCabecera">
                <p className="tituloPerfil">Mi perfil</p>
                <button className="botonVerReservaTrekker" onClick={goto1}>Ver reservas</button>
            </div>
            <div className="contenedorPerfilPadre">
                <div className="contenedorDatosPerfilTrekker">
                    <div className="izqContenedorPerfilTrekker">
                        <img className="imgPerfilTrekker" src={profile.profilePicture} width={200} height={200} />
                        <div className="contenedorNombrePerfilTrekker">
                            <img src="/fotos/user-icon.png" width={30} height={30}/>
                            <p className="nombrePerfilTrekker">{profile.firstName} {profile.lastName}</p>
                        </div>
                    </div>
                    <div className="derechaContenedorPerfilTrekker">
                        <div>
                            <p className="tituloDescripcion">Descripción</p>
                            <p className="descripcionTrekker">{profile.description || "No se ha añadido esta información aún"}</p>
                        </div>
                        <div className="contenedorActFav">
                            <p className="actFavTrekker">Actividad favorita</p>
                            <p className="actFavTrekkerTexto">{profile.favActivity || "No se ha añadido esta información"}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contenedorBotonEditTrekker">
                <button className="botonEditarTrekker" onClick={goto2}>Editar perfil</button>
            </div>
        </>
        )
}