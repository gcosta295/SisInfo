import "./Actividades";
import "./Actividades.css";

import { useNavigate } from "react-router";

export default function Home() {

return(

<div className="container">

<div className= "ActividadHome">
    <img src="src\assets\fotos\caminoBosque.jpg" alt="Bosque" className="imgActividadHome"/>
    </div> {/* cierro div ActividadHome */}

<div className="fraseMain">
    <p className="fraseM">Elige una de las actividades para una excursión</p>
    <p className="fraseM">guiada según las 4 rutas que ofrecemos</p>
    </div>  {/* cierro div fraseMain */}

<div className="containerDivisor">
        <div className="divisor"></div>
        </div>  {/* fin de div containerDivisor */}

<div className='multi-button'>
    <button className="menu-button"></button>
    <button className="menu-button"></button>
    <button className="menu-button"></button>
    <button className="menu-button2"></button>
    </div> {/* fin de div */}


</div>
// cierro div container
)
}   