import "./Actividades";
import "./Actividades.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCalendarDays, faArrowPointer } from "@fortawesome/free-solid-svg-icons";
import { db } from "../../firebase/firebase"; 
import { collection, query, where, getDocs } from "firebase/firestore"; 
import { useState, useEffect } from "react";




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
<div className="container">
    <ul>
        <li>
        <h1>Activities</h1>
      {activities.map((activity) => (
        <h1 key={activity.id}>{activity.name}</h1>
      ))}
        </li>
    </ul>
    </div>
</div>
// cierro div container
)
}   


  