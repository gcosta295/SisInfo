import "./EditarPerfilGuia.css";
import { use, useState } from 'react'
import { UserContext } from '../../context/UserContext.jsx';
import { useNavigate } from "react-router";
import { getAuth, updatePassword, sendEmailVerification } from "firebase/auth";
import { db } from "../../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import toast from 'react-hot-toast';
import { EmailAuthProvider, reauthenticateWithCredential,updateEmail } from "firebase/auth";
import Swal from 'sweetalert2';


export default function EditarPerfilGuia() {

    const contextProfile = use(UserContext);
    const { profile, setProfile} = contextProfile;

    const auth = getAuth();
    // console.log(profile);
    
    // const [email, setEmail] = useState(profile.email|| "");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber || "");
    const [description, setDescription] = useState(profile.description||"" );
    const [favActivity, setFavActivity] = useState(profile.favActivity||"" );
    const [profilePicture, setProfilePicture] = useState(profile.profilePicture);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleUpdateProfile = async () => {
        try {
            setLoading(true);
            const user = auth.currentUser;
            if (!profile.uid || !user) {
                console.error("No se encontró UID del usuario.");
                return;
            }
    
            // let requiresReauth = false;
            // // let newEmail = email; // Guardamos el email ingresado previamente
    
            // // // Si el email ha cambiado, pedimos confirmación con un popup
            // // if (email !== user.email) {
            // //     const { value: confirmedEmail } = await Swal.fire({
            // //         title: "Confirmar el correo electrónico",
            // //         input: "email",
            // //         // inputLabel: "Ingresa nuevamente tu correo electrónico",
            // //         inputPlaceholder: "Ingresa nuevamente el correo electrónico",
            // //         inputAttributes: { autocapitalize: "off", autocorrect: "off" },
            // //         showCancelButton: true,
            // //         confirmButtonText: "Confirmar",
            // //         cancelButtonText: "Cancelar",
            // //         icon: "info"
            // //     });
    
            // //     if (!confirmedEmail) {
            // //         toast.error("Debes confirmar tu nuevo correo.");
            // //         return;
            // //     }
    
            // //     if (confirmedEmail !== email) {
            // //         toast.error("Los correos no coinciden. Inténtalo de nuevo.");
            // //         return;
            // //     }
    
            // //     newEmail = confirmedEmail;
            // //     requiresReauth = true;
            // // }
    
            // // Si hay una nueva contraseña, también pedimos autenticación
            // if (password) {
            //     requiresReauth = true;
            // }
    
            // // Pedimos la contraseña actual si es necesario
            // if (requiresReauth) {
            //     const { value: currentPassword } = await Swal.fire({
            //         title: "Verificación requerida",
            //         input: "password",
            //         inputLabel: "Ingresa tu contraseña actual",
            //         inputPlaceholder: "Tu contraseña actual",
            //         inputAttributes: { autocapitalize: "off", autocorrect: "off" },
            //         showCancelButton: true,
            //         confirmButtonText: "Confirmar",
            //         cancelButtonText: "Cancelar",
            //         icon: "warning"
            //     });
    
            //     if (!currentPassword) {
            //         toast.error("Es necesario ingresar la contraseña actual para realizar estos cambios.");
            //         return;
            //     }
    
                // // Reautenticación
                // const credential = EmailAuthProvider.credential(user.email, currentPassword);
                // await reauthenticateWithCredential(user, credential)
                //     .then(() => {
                //         return updateEmail(user, newEmail);
                //     })
                //     .then(async () => {
                //         const userRef = doc(db, "Users", profile.uid);
                //         await setDoc(userRef, { email: newEmail }, { merge: true });

                //         toast.success("Datos actualizados correctamente.");
                //     })
                //     .catch((error) => {
                //         toast.error("Error al actualizar datos:", error);
                //     });
                // return
            
    
            // Si el usuario confirmó su nuevo email, lo almacenamos en Firestore y enviamos el correo de verificación
            // if (newEmail !== user.email) {
            //     const userRef = doc(db, "Users", profile.uid);
            //     await setDoc(userRef, { pendingEmail: newEmail }, { merge: true }); // Almacenamos el nuevo correo en Firestore
    
            //     await sendEmailVerification(user); // Envía email de verificación
    
            //     toast.success("Se ha enviado un correo de verificación. Confirma el cambio en tu bandeja de entrada.");
    
            //     return;
            // }
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
            await setDoc(userRef, { description, favActivity, phoneNumber, profilePicture }, { merge: true });
    
            setProfile(prevProfile => ({
                ...prevProfile,
                description,
                favActivity,
                phoneNumber,
                profilePicture,
            }));
            toast.success("Datos actualizados correctamente");
            navigate("/mi-perfil-trekker");
    
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
                <p className="tituloPerfil">Cambiar correo electrónico</p>
            </div>
            <div className="padreModificarDatosGuia">
                <div className="modificarDatosGuia">
                    <div className="formModificarContrasenaTrekker">
                        <label>Correo electrónico<br></br></label>
                        <input value={email} type="email" className="contrasenaNueva" placeholder="Nuevo correo" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="contenedorBotonEditTrekker">
                <button className="botonGuardarCambiosTrekker" onClick={handleUpdateEmail}>Cambiar correo</button>
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