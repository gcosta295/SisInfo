import "./Actividades";
import "./Actividades.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCalendarDays, faArrowPointer } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { db } from "../../firebase/firebase"; 
import { collection, query, where, getDocs } from "firebase/firestore"; 
import { useState, useEffect} from "react";


const querySnapshot = await getDocs(collection(db, "Activities")); 
querySnapshot.forEach((doc) => {
// doc.data() is never undefined for query doc snapshots
console.log(doc.id, " => ", doc.data());
console.log(doc.data().name)
});

export default function Home() {

    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Activities"));
                const activityData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setActivities(activityData);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
                console.error("Error fetching activities:", err);
            }
        };
        fetchData();
    }, []);
    const [tSerch, setTSearch] = useState("normal");
    return(

    <div className="container">

        <div className= "ActividadHome">
            <img src="src\assets\fotos\caminoBosque.jpg" alt="Bosque" className="imgActividadHome"/>
        </div> {/* cierro div ActividadHome */}
    

    <div className="container">

        <div className="fraseMain">
            <p className="fraseM">Elige una de las actividades para una excursión</p>
            <p className="fraseM">guiada según las 4 rutas que ofrecemos</p>
        </div>  {/* cierro div fraseMain */}

        <div className="containerDivisor">
            <div className="divisor"></div>
        </div>  {/* fin de div containerDivisor */}

        <div className='multi-button'>
            <button className="menu-button" onClick={() => setTSearch("Buscar excursión")}><FontAwesomeIcon icon={faMagnifyingGlass} />
            <span> Buscar excursión</span></button>
            <button className="menu-button" onClick={() => setTSearch("Insertar fecha")}><FontAwesomeIcon icon={faCalendarDays} />
            <span> Insertar fecha</span></button>
            <button className="menu-button" onClick={() => setTSearch("Elegir Actividad")}><FontAwesomeIcon icon={faArrowPointer} />
            <span> Elegir Actividad </span></button>
            <button className="menu-button2" onClick={Serch(tSerch,activities)}><span>Buscar</span></button>
        </div> {/* fin de div */}

    </div>

    <div className="container">
        <ul className="Acs">
            
            {activities.map((activity) => (
      
                <RenderA
                key={activity.id}
                tipo={activity.type}
                name={activity.name}
                info={activity.info}
                />
          
            ))}
           
        </ul>
    </div>
</div>
// cierro div container2
)
}   

function Serch(tSerch, activities){
    const list = new Array();
    if (tSerch != "normal"){
        if (tSerch == "Buscar excursión"){
            for(const x of activities.entries()) {
                if (x[1].type == "Rappel"){                 //modificar por tipo input
                    list.push(x[1]);
                }
            }
        }
        if (tSerch == "Insertar fecha"){
            console.log("Insertar fecha");
        }
        if (tSerch == "Elegir Actividad"){
            console.log("Elegir Actividad");
        }
    }
}

function RenderA({name, info, tipo}){
  return(
    <li className="ac">
      <img src="src\assets\fotos\excursionesHome.jpg" className="ImageA" alt="" />
    <div className="acl"> 
    <h1>{tipo}</h1>
    <h3>{name}</h3>
    <p>{info}</p>
    </div>
    
    </li>
  )
}