import "./Actividades";
import "./Actividades.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCalendarDays, faArrowPointer } from "@fortawesome/free-solid-svg-icons";


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
    <button className="menu-button"><FontAwesomeIcon icon={faMagnifyingGlass} />
    <span> Buscar excursión</span></button>
    <button className="menu-button"><FontAwesomeIcon icon={faCalendarDays} />
    <span> Insertar fecha</span></button>
    <button className="menu-button"><FontAwesomeIcon icon={faArrowPointer} />
    <span> Elegir Actividad </span></button>
    <button className="menu-button2"><span>Buscar</span></button>
        
    </div> {/* fin de div */}

</div>
// cierro div container
)
}   


  