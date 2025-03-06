import "./Signup.css";
// import { useNavigate } from "react-router";
import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [tipoUser, setTipoUser] = useState("");
    const [isSignUpActive, setIsSignUpActive ] = useState(true); //sign up (registro) es el default, sale de primero

    
    const handleMethodChange = () => {
        setIsSignUpActive(!isSignUpActive);
    }

    const handleSignUp = () => {
        if (!email || !password) return; //validacion breve de que si campos vacios, no guarde nada vacio en la base de datos (firebase)
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);  //que se impriman las credenciales (datos) del user que se registro cuando se registre
            setEmail("");
            setPassword("");
            setName("");
            setLastname("");
            setPhoneNumber("");
            setTipoUser("");
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
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        });
    };


    // const navigate = useNavigate();
    // const gotocontact1 = (event) => {
    //     navigate("/")
    // }

    return(
        <>
        <div className="contenedor1">
            <div className="datos">
                {isSignUpActive && <p className="titulosignup">Comienza la aventura</p>}
                {!isSignUpActive && <p className="titulosignup">Bienvenido de vuelta</p>}
                <hr className="dividerPunteado"></hr>
                <form className="forms">
                    <div className="formNombre">
                        {isSignUpActive && <input value={name} type="text" className="name" placeholder="Nombre(s)" onChange={(e) => setName(e.target.value)} />}<br />
                    </div>
                    <div className="formApellido">
                        {isSignUpActive && <input value={lastname} type="text" className="lastname" placeholder="Apellido(s)"  onChange={(e) => setLastname(e.target.value)}/>}<br />
                    </div>
                    <div className="formCorreo">
                        <input value={email} type="email" className="correo" placeholder="Correo electrónico" onChange={(e) => setEmail(e.target.value)} /><br />
                    </div>
                    <div className="formContrasena">
                        <input value={password} type="password" className="contrasena" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} /><br />
                    </div>
                    <div className="telefono">
                        <form>
                            {isSignUpActive && <input value={phoneNumber} type="text" className="numTelefono" placeholder="Número de teléfono" onChange={(e) => setPhoneNumber(e.target.value)}/>}<br />
                        </form>
                    </div>
                    {isSignUpActive &&<select className="tipoUser" onChange={(e) => setTipoUser(e.target.value)}>
                        <option value="" disabled selected>Tipo de usuario</option>
                        <option value="trekker">Trekker</option>
                        <option value="guia">Guía</option>
                    </select>}
                </form>
                {isSignUpActive && <button className='botonIrHome' onClick={handleSignUp}>Registrarme</button>}
                {!isSignUpActive && <button className='botonIrHome' onClick={handleSignIn}>Iniciar sesión</button>}

                {isSignUpActive && <a className="opcion" onClick={handleMethodChange}>Inicia sesión</a>}
                {!isSignUpActive && <a className="opcion" onClick={handleMethodChange}>Regístrate</a>}
            </div>
            <div className="foto">
                <img src="src/assets/fotos/fotologin.jpg" className="imglogin"/>
            </div>

        </div>
        <div className="copyright">
            <p>© Copyright 2025</p>
            <p>AvilaTrek</p>
        </div>
        </>
    )
}