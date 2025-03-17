import "./EditarPerfilTrekker.css";
import { use, useState } from 'react'
import { UserContext } from '../../context/UserContext.jsx';
import { useNavigate } from "react-router";
import { getAuth, updatePassword } from "firebase/auth";
import { db } from "../../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import toast from 'react-hot-toast';
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";


export default function EditarPerfilTrekker() {

    const contextProfile = use(UserContext);
    const { profile} = contextProfile;

    const auth = getAuth();
    // console.log(profile);
    
    const [email, setEmail] = useState(profile.email || "");
    const [newTrekkerPassword, setNewTrekkerPassword] = useState("");

    const navigate = useNavigate();

    const handleUpdateProfile = async () => {
        try {
            if (!profile.uid) {
                console.error("No se encontró UID del usuario.");
                return;
            }

            const userRef = doc(db, "Users", profile.uid);  //se actualiza correo en firestore del usestate de email
            await setDoc(userRef, { email }, { merge: true });
    
            const user = auth.currentUser;
            if (newTrekkerPassword && user) {
                const currentPassword = prompt("Ingresa tu contraseña actual para confirmar los cambios:");
    
                if (!currentPassword) {
                    toast.error("Es necesario ingresar la contraseña actual para actualizar la nueva.");
                    return;
                }

                const credential = EmailAuthProvider.credential(user.email, currentPassword);
                await reauthenticateWithCredential(user, credential);
                await updatePassword(user, newTrekkerPassword);
            }
    
            toast.success("Perfil actualizado correctamente");
            navigate("/mi-perfil-trekker");
        } catch (error) {
            console.error("Error actualizando los datos:", error);
            toast.error("Hubo un error al actualizar los datos. Es posible que necesites volver a iniciar sesión.");
        }
    };

    return(
        <>
            <div className="contenedorCabecera">
                <p className="tituloPerfil">Mi perfil</p>
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
                            <p className="descripcionTrekker">{profile.description}</p>
                        </div>
                        <div className="contenedorActFav">
                            <p className="actFavTrekker">Actividad favorita</p>
                            <p className="actFavTrekkerTexto">{profile.favActivity}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contenedorCabecera">
                <p className="tituloPerfil">Datos personales</p>
            </div>
            <div className="padreModificarDatosTrekker">
                <div className="modificarDatosTrekker">
                    <div className="formModificarCorreoTrekker">
                        <label>Correo electrónico</label>
                        <input value={email} type="email" className="correoNuevo" placeholder="Nuevo correo electrónico" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="formModificarContrasenaTrekker">
                        <label>Contraseña</label>
                        <input value={newTrekkerPassword} type="password" className="contraseñaNueva" placeholder="Nueva contraseña" onChange={(e) => setNewTrekkerPassword(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="contenedorBotonEditTrekker">
                <button className="botonGuardarCambiosTrekker" onClick={handleUpdateProfile}>Guardar cambios</button>
            </div>
        </>
        )

}