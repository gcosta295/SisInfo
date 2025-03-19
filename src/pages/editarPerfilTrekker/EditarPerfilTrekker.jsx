import "./EditarPerfilTrekker.css";
import { use, useState } from 'react'
import { UserContext } from '../../context/UserContext.jsx';
import { useNavigate } from "react-router";
import { getAuth, updatePassword } from "firebase/auth";
import { db } from "../../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import toast from 'react-hot-toast';
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail } from "firebase/auth";
import Swal from 'sweetalert2';


export default function EditarPerfilTrekker() {

    const contextProfile = use(UserContext);
    const { profile, setProfile} = contextProfile;

    const auth = getAuth();
    // console.log(profile);
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [description, setDescription] = useState(profile.description||"");
    const [favActivity, setFavActivity] = useState(profile.favActivity||"");
    const [loading, setLoading] = useState(false);
    const [profilePicture, setProfilePicture] = useState(profile.profilePicture);

    const navigate = useNavigate();

    const handleUpdateProfile = async () => {
        try {
            setLoading(true);
            const user = auth.currentUser;
            if (!profile.uid || !user) {
                console.error("No se encontró UID del usuario.");
                return;
            }
    
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

            const userRef = doc(db, "Users", profile.uid);
            await setDoc(userRef, { description, favActivity, profilePicture }, { merge: true });
    
            setProfile(prevProfile => ({
                ...prevProfile,
                description,
                favActivity,
                profilePicture,
            }));
            toast.success("Datos actualizados correctamente");
            navigate("/mi-perfil-guia");
    
        } catch (error) {
            console.error("Error actualizando los datos:", error);
            toast.error("Hubo un error al actualizar los datos");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateEmail = async () => {
        try {
            setLoading(true);
            const user = auth.currentUser;
            if (!profile.uid || !user) {
                console.error("No se encontró UID del usuario.");
                return;
            }
    
            let newEmail = email;
    
            if (email !== user.email) {
                const { value: confirmedEmail } = await Swal.fire({
                    title: "Confirmar el correo electrónico",
                    input: "email",
                    inputPlaceholder: "Ingresa nuevamente el correo electrónico",
                    showCancelButton: true,
                    confirmButtonText: "Confirmar",
                    cancelButtonText: "Cancelar",
                    icon: "info"
                });
    
                if (!confirmedEmail) {
                    toast.error("Debes confirmar tu nuevo correo.");
                    return;
                }
    
                if (confirmedEmail !== email) {
                    toast.error("Los correos no coinciden. Inténtalo de nuevo.");
                    return;
                }
    
                newEmail = confirmedEmail;
            }
    
            const { value: password } = await Swal.fire({
                title: "Ingresa tu contraseña",
                input: "password",
                inputPlaceholder: "Ingresa tu contraseña actual",
                inputAttributes: { type: "password" },
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancelar",
                icon: "warning"
            });
    
            if (!password) {
                toast.error("Debes ingresar tu contraseña.");
                return;
            }
    
            const credential = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(user, credential);
    
            await updateEmail(user, newEmail);
    
            const userRef = doc(db, "Users", profile.uid);
            await setDoc(userRef, { email: newEmail }, { merge: true });
    
            toast.success("Correo actualizado correctamente");
        } catch (error) {
            console.error("Error actualizando los datos:", error);
            toast.error("Hubo un error al actualizar los datos.");
        } finally {
            setLoading(false);
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
                                <textarea value={description} type="text" className="descripNueva" placeholder="Añade una descripción personal..." onChange={(e) => setDescription(e.target.value)} />
                            </div>
                        </div>
                        <div className="contenedorActFav">
                            <p className="actFavTrekker">Actividad favorita</p>
                            <div className="formModificarCorreoTrekker">
                                <select value={favActivity} className="favActNueva" onChange={(e) => setFavActivity(e.target.value)}>
                                    <option value="Excursión">Excursión</option>
                                    <option value="Paseo">Paseo</option>
                                    <option value="Rappel">Rappel</option>
                                </select>
                            </div>
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
                        <label>Correo electrónico<br></br></label>
                        <input value={email} type="email" className="correoNuevo" placeholder="Nuevo correo electrónico" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="contenedorBotonEditTrekker">
                <button className="botonGuardarCambiosTrekker" onClick={handleUpdateEmail}>Cambiar correo</button>
            </div>
            <div className="padreModificarDatosTrekker">
                <div className="modificarDatosTrekker">
                    <div className="formModificarCorreoTrekker">
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