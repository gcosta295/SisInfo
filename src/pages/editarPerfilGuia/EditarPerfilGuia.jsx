import "./EditarPerfilGuia.css";
import { use, useState } from 'react'
import { UserContext } from '../../context/UserContext.jsx';
import { useNavigate } from "react-router";
import { getAuth, updatePassword } from "firebase/auth";
import { db } from "../../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import toast from 'react-hot-toast';
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import Swal from 'sweetalert2';


export default function EditarPerfilGuia() {

    const contextProfile = use(UserContext);
    const { profile, setProfile} = contextProfile;

    const auth = getAuth();
    // console.log(profile);
    
    // const [email, setEmail] = useState(profile.email|| "");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber);
    const [description, setDescription] = useState(profile.description || "No se ha añadido esta información aún");
    const [favActivity, setFavActivity] = useState(profile.favActivity || "No se ha añadido esta información aún");
    const [profilePicture, setProfilePicture] = useState(profile.profilePicture);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleUpdateProfile = async () => {
        try {
            setLoading(true);
            if (!profile.uid) {
                console.error("No se encontró UID del usuario.");
                return;
            }
            
            // Actualiza en Firestore
            const userRef = doc(db, "Users", profile.uid);  
            await setDoc(userRef, { description, favActivity, phoneNumber, profilePicture }, { merge: true });
            
            // Actualiza el perfil en el UserContext inmediatamente
            setProfile(prevProfile => ({
                ...prevProfile,
                description,
                favActivity,
                phoneNumber,
                profilePicture,
            }));
    
            // Si hay una contraseña nueva, cambia la contraseña
            const user = auth.currentUser;
            if (password && user) {
                const { value: currentPassword } = await Swal.fire({
                    title: "Verificación requerida",
                    input: "password",
                    inputLabel: "Ingresa tu contraseña actual para confirmar los cambios",
                    inputPlaceholder: "Tu contraseña actual",
                    inputAttributes: { autocapitalize: "off", autocorrect: "off" },
                    showCancelButton: true,
                    confirmButtonText: "Confirmar",
                    cancelButtonText: "Cancelar",
                    icon: "warning"
                });
    
                if (!currentPassword) {
                    toast.error("Es necesario ingresar la contraseña actual para actualizar la nueva.");
                    return;
                }
    
                const credential = EmailAuthProvider.credential(user.email, currentPassword);
                await reauthenticateWithCredential(user, credential);
                await updatePassword(user, password);
            }
    
            toast.success("Perfil actualizado correctamente");
            navigate("/mi-perfil-trekker");
    
        } catch (error) {
            console.error("Error actualizando los datos:", error);
            toast.error("Hubo un error al actualizar los datos. Es posible que necesites volver a iniciar sesión.");
        } finally {
            setLoading(false);  // Asegurarse de que loading se establezca en false al finalizar
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
                            <p className="tituloDescripcion">Descripción <br></br></p>
                            <div className="formModificarCorreoTrekker">
                                <textarea value={description} className="descripNueva" placeholder="Añade una descripción personal..." onChange={(e) => setDescription(e.target.value)} />
                            </div>
                        </div>
                        <div className="contenedorActFav">
                            <p className="actFavTrekker">Actividad favorita</p>
                            <div className="formModificarCorreoTrekker">
                                <select value={favActivity} className="favActNueva" onChange={(e) => setFavActivity(e.target.value)}>
                                    <option value="Elige una opción">Elige una opción</option>
                                    <option value="Excursión">Excursión</option>
                                    <option value="Paseo">Paseo</option>
                                    <option value="Rappel">Rappel</option>
                                </select>
                            </div>
                        </div>
                        <div className="formModificarTelefTrekker">
                            <p className="labelCorreoGuia">Foto de perfil</p>
                            <input value={profilePicture} className="nuevoTdeguia" placeholder="URL de imagen" onChange={(e) => setProfilePicture(e.target.value)} />
                        </div>
                        <div className="formModificarTelefTrekker">
                            <p className="labelCorreoGuia">Teléfono</p>
                            <input value={phoneNumber} className="nuevoTdeguia" placeholder="Nuevo número telefónico" onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="contenedorCabecera">
                <p className="tituloPerfil">Cambiar contraseña</p>
            </div>
            <div className="padreModificarDatosGuia">
                <div className="modificarDatosGuia">
                    <div className="formModificarContrasenaTrekker">
                        <label>Contraseña <br></br></label>
                        <input value={password} type="password" className="contrasenaNueva" placeholder="Nueva contraseña" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="contenedorBotonEditTrekker">
                <button className="botonGuardarCambiosTrekker" onClick={handleUpdateProfile}>Guardar cambios</button>
            </div>
        </>
        )

}