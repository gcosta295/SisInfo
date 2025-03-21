import "./Signup.css";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { auth, provider, db } from "../../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-tabs/style/react-tabs.css';
import toast from 'react-hot-toast';
import { setDoc, doc } from "firebase/firestore";



export default function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [tipoUser, setTipoUser] = useState("");
    const [nacionality, setNacionality] = useState("");
    const [favAct, setFavAct] = useState("");
    const [descrip, setDescrip] = useState("");

    const handleSignUp = async () => {
        
        if (!email || !name || !lastname || !password || !tipoUser) {
          toast.error('Por favor, completa todos los campos'); 
          return;
        }
      

        const phoneNumberRegex = /^\d{11}$/; 
        if (!phoneNumberRegex.test(phoneNumber)) {
        toast.error('Número de teléfono inválido. Debe tener exactamente 11 dígitos y solo contener números');
        return;
        }

        // if (tipoUser === "guia" && !phoneNumber) {
        //   const list1 = phoneNumber.split("-");
        //   if (list1[0].length !== 4 || list1[1].length !== 7 || isNaN(parseInt(list1[0])) || isNaN(parseInt(list1[1]))) {
        //     toast.error('Formato de teléfono inválido. Usa xxxx-xxxxxxx'); 
        //     return;
        //   }
        // }
      
        
        if (!email.includes('@correo.unimet.edu.ve') && !email.includes('@unimet.edu.ve')) {
          toast.error('El correo debe ser @correo.unimet.edu.ve o @unimet.edu.ve'); 
          return;
        }
      
       
        const initials = `${name.charAt(0)}${lastname.charAt(0)}`.toUpperCase();
        const profilePicUrl = `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&size=128`;
      
        createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            const user = userCredential.user;
            if (user) {
              await setDoc(doc(db, "Users", user.uid), {
                email: user.email,
                firstName: name,
                lastName: lastname,
                profilePicture: profilePicUrl,
                phoneNumber: phoneNumber,
                tipoUsuario: tipoUser,
                description: descrip,
                favActivity: favAct,
                nacionality: nacionality,
              });
            }
            setEmail("");
            setPassword("");
            setName("");
            setLastname("");
            setPhoneNumber("");
            setTipoUser("");
            toast.success('Registro exitoso'); 
            navigate("/");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            toast.error('Error durante el registro'); 
          });
      };

    const handleSignIn = () => {
    if (!email || !password) return;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setEmail("");
        setPassword("");
        toast.success('Sesión iniciada')
        setTimeout(() => {navigate("/");}, 2000);
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setEmail("");
        setPassword("");
        toast.error('Error iniciando sesión')
    });
    }

    const [tabIndex, setTabIndex] = useState(0);

    const navigate = useNavigate();

    const handleClick = () => {
        signInWithPopup(auth, provider)
          .then((data) => {
            const user = data.user;
            const email = user.email;
            const initials = `${name.charAt(0)}${lastname.charAt(0)}`.toUpperCase();
      
            
            if (email && (email.endsWith('@correo.unimet.edu.ve') || email.endsWith('@unimet.edu.ve'))) {
             
              setDoc(doc(db, "Users", user.uid), {
                email: user.email,
                firstName: user.displayName.split(" ")[0], 
                lastName: user.displayName.split(" ")[1], 
                profilePicture: user.photoURL || `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&size=128`,
                tipoUsuario: "trekker", // se asigna un valor por defecto, si es guia se debe cambiar por admin
              })
                .then(() => {
                  console.log("Usuario registrado en Firestore");
                })
                .catch((error) => {
                  console.error("Error guardando usuario en Firestore:", error);
                });
      
             
              toast.success('Sesión iniciada con Google');
              navigate("/");
            } else {
              toast.error('Correo no válido. Debe ser @correo.unimet.edu.ve o @unimet.edu.ve');
            }
          })
          .catch((error) => {
            console.error("Error durante el inicio de sesión con Google:", error);
            toast.error('Error iniciando sesión con Google');
          });
      };

      const handleClick1 = () => {
        signInWithPopup(auth, provider)
          .then((data) => {
            const user = data.user;
            const email = user.email;
            const initials = `${name.charAt(0)}${lastname.charAt(0)}`.toUpperCase();
      
          
            if (email && (email.endsWith('@correo.unimet.edu.ve') || email.endsWith('@unimet.edu.ve'))) {

              setDoc(doc(db, "Users", user.uid), {
                email: user.email,
                firstName: user.displayName.split(" ")[0], 
                lastName: user.displayName.split(" ")[1], 
                profilePicture: user.photoURL || `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&size=128`,
                tipoUsuario: "trekker", // se asigna un valor por defecto, si es guia se debe cambiar por admin
              })
                .then(() => {
                  console.log("Usuario registrado en Firestore");
                })
                .catch((error) => {
                  console.error("Error guardando usuario en Firestore:", error);
                });
      
             
              toast.success('Sesión iniciada con Google');
              navigate("/");
            } else {
              toast.error('Correo no válido. Debe ser @correo.unimet.edu.ve o @unimet.edu.ve');
            }
          })
          .catch((error) => {
            console.error("Error durante el inicio de sesión con Google:", error);
            toast.error('Error iniciando sesión con Google');
          });
      };

    const [isGuide, setIsGuide] = useState(false); 

    
    useEffect(() => {
        setIsGuide(tipoUser === "guia");
    }, [tipoUser]);

    return(
        <>
        <div className="contenedor1">
            <div className="datos">
                <p className="titulosignup">{tabIndex===0 ? "Bienvenido de vuelta" : "Comienza la aventura"}</p>

                <Tabs className="tabsContenedor" selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        <Tab className="tab1">Iniciar sesión</Tab>
                        <Tab className="tab2">Registrarse</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="tabsPanel1">
                            <form className="forms">
                                <div className="formCorreo">
                                    <label>Correo electrónico</label>
                                    <input value={email} type="email" className="correo" placeholder="Correo electrónico" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="formContrasena">
                                    <label>Contraseña</label>
                                    <input value={password} type="password" className="contrasena" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </form>
                            <button className='botonIrHome' onClick={handleSignIn}>Iniciar sesión</button>
                            <div className="divisorGoogle">
                                <span className="linea"></span>
                                <p className="letraDivider"> o </p>
                                <span className="linea"></span>
                            </div>
                            <button className="google1" onClick={handleClick1}><img src="\fotos\logoGoogle.png" className="imgGoogle"/>Iniciar sesión con Google</button>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="tabsPanel2">
                            <form className="forms">
                                <div className="formNombre">
                                    <label>Nombre</label>
                                    <input value={name}  className="nameS" placeholder="Nombre(s)" onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="formApellido">
                                    <label>Apellido</label>
                                    <input value={lastname}  className="lastnameS" placeholder="Apellido(s)"  onChange={(e) => setLastname(e.target.value)}/>
                                </div>
                                <div className="formCorreo">
                                    <label>Correo electrónico</label>
                                    <input value={email} type="email" className="correo" placeholder="Correo electrónico" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="formContrasena">
                                    <label>Contraseña</label>
                                    <input value={password} type="password" className="contrasena" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)}  />
                                    <p className="instrucContrasena">*La contraseña debe tener mínimo 6 caracteres.</p>
                                </div>
                                <div className="tipoUsuario">
                                    <label>Tipo de usuario</label>
                                    <select className="tipoUser" onChange={(e) => setTipoUser(e.target.value)}>
                                        <option value="" disabled selected>Tipo de usuario</option>
                                        <option value="trekker">Trekker</option>
                                        <option value="guia">Guía</option>
                                    </select>
                                </div>
                                <div className="formTelefono">
                                        <label>Número telefónico</label>
                                        <input
                                            value={phoneNumber}
                                            className="numTelefonoS"
                                            placeholder="Número de teléfono"
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value)) {
                                                setPhoneNumber(value);
                                                }
                                            }}
                                            maxLength={11}
                                            />                                    
                            </div>
                            </form>
                            <button className='botonIrHome' onClick={handleSignUp}>Registrarme</button>
                            <button className="google2" onClick={handleClick}><img src="\fotos\logoGoogle.png" className="imgGoogle"/>Iniciar sesión con Google</button>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
            <div className="foto">
                <img src="\fotos\fotologin.jpg" className="imglogin"/>
            </div>
        </div>
        <div className="copyright">
            <p>© Copyright 2025 AvilaTrek</p>
        </div>
        </>
    )
}