import "./Signup.css";
import { useNavigate } from "react-router";

export default function Signup() {

    const navigate = useNavigate();

    const gotocontact1 = (event) => {
        navigate("/")
    }

    return(
        <>
        <div className="contenedor1">
            <div className="datos">
                <p className="titulosignup">Comienza la aventura</p>
                <hr className="dividerPunteado"></hr>
                <div className="forms">
                    <form className="formNombre">
                        <input type="text" className="name" placeholder=" Nombre(s)" /><br />
                    </form>
                    <form className="formApellido">
                        <input type="text" className="lastname" placeholder=" Apellido(s)" /><br />
                    </form>
                    <form className="formCorreo">
                        <input type="text" className="correo" placeholder=" Correo electrónico" /><br />
                    </form>
                    <form className="formContrasena">
                        <input type="text" className="contrasena" placeholder=" Contraseña" /><br />
                    </form>
                    <div className="telefono">
                        <form>
                            <input type="text" className="numTelefono" placeholder=" Número de teléfono" /><br />
                        </form>
                    </div>
                    <select className="tipoUser">
                        <option value="" disabled selected>Tipo de usuario</option>
                        <option value="trekker">Trekker</option>
                        <option value="guia">Guía</option>
                    </select>
                </div>
                <button className='botonIrHome' onClick={gotocontact1}>Registrarme</button>
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