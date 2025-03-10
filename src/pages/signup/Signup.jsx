import "./Signup.css";
import { useNavigate } from "react-router";
import { useState } from "react";
import { auth, provider, db } from "../../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-tabs/style/react-tabs.css';
import toast, { Toaster } from 'react-hot-toast';
import { setDoc, doc } from "firebase/firestore";


export default function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [tipoUser, setTipoUser] = useState("");

    const handleSignUp = () => {
        if (!email || !password) return; //validacion breve de que si campos vacios, no guarde nada vacio en la base de datos (firebase)
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);  //que se impriman las credenciales (datos) del user que se registro cuando se registre
            if (user) {
                setDoc(doc(db, "Users", user.uid), {  //se crea tabla users la primera vez que alguien se registre y se guarde, de resto solo se guardan los demas
                  email: user.email,
                  firstName: name,
                  lastName: lastname,
                  phoneNumber: phoneNumber,
                  tipoUsuario: tipoUser
                });
              }
            setEmail("");
            setPassword("");
            setName("");
            setLastname("");
            setPhoneNumber("");
            setTipoUser("");
            toast.success('Registro exitoso')
            navigate("/");
          })
          .catch((error) => {
            const errorCode = error.code; //motivo
            const errorMessage = error.message;  //explicacion
            console.log(errorCode, errorMessage); //si hay error, aparece mensaje automatico con el motivo y explicacion
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
};

    const [tabIndex, setTabIndex] = useState(0);

    const navigate = useNavigate();

    // const [value,setValue] = useState('')
    const handleClick =()=>{
        signInWithPopup(auth,provider).then((data)=>{
            // setValue(data.user.email)
            navigate("/");
            console.log(data.user);
        })
    };


    return(
        <>
        <div><Toaster/></div>
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
                            <button className="google1" onClick={handleClick}><img src="src/assets/fotos/logoGoogle.png" className="imgGoogle"/>Iniciar sesión con Google</button>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="tabsPanel2">
                            <form className="forms">
                                <div className="formNombre">
                                    <label>Nombre</label>
                                    <input value={name} type="text" className="name" placeholder="Nombre(s)" onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="formApellido">
                                    <label>Apellido</label>
                                    <input value={lastname} type="text" className="lastname" placeholder="Apellido(s)"  onChange={(e) => setLastname(e.target.value)}/>
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
                                <div className="formTelefono">
                                    <label>Número telefónico</label>
                                    <input value={phoneNumber} type="text" className="numTelefono" placeholder="Número de teléfono" onChange={(e) => setPhoneNumber(e.target.value)}/>
                                </div>
                                <div className="tipoUsuario">
                                    <label>Tipo de usuario</label>
                                    <select className="tipoUser" onChange={(e) => setTipoUser(e.target.value)}>
                                        <option value="" disabled selected>Tipo de usuario</option>
                                        <option value="trekker">Trekker</option>
                                        <option value="guia">Guía</option>
                                    </select>
                                </div>
                            </form>
                            <button className='botonIrHome' onClick={handleSignUp}>Registrarme</button>
                            <button className="google2" onClick={handleClick}><img src="src/assets/fotos/logoGoogle.png" className="imgGoogle"/>Iniciar sesión con Google</button>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
            <div className="foto">
                <img src="src/assets/fotos/fotologin.jpg" className="imglogin"/>
            </div>
        </div>
        <div className="copyright">
            <p>© Copyright 2025 AvilaTrek</p>
        </div>
        </>
    )
}