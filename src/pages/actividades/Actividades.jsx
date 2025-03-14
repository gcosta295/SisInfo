import "./Actividades";
import "./Actividades.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCalendarDays, faArrowPointer } from "@fortawesome/free-solid-svg-icons";
import { Navigate, useNavigate } from "react-router";
import { db } from "../../firebase/firebase"; 
import { collection, query, where, getDocs } from "firebase/firestore"; 
import { useState, useEffect} from "react";
import Navbar from "../../components/ui/navbar/Navbar";
import prueba1234 from "../actividad/Actividad";


const querySnapshot = await getDocs(collection(db, "Activities")); 
querySnapshot.forEach((doc) => {
// doc.data() is never undefined for query doc snapshots
// console.log(doc.id, " => ", doc.data());
// console.log(doc.data().name)
});


export default function Actividades() {

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
            <img src="\fotos\caminio.jpg" alt="Bosque" className="imgActividadHome"/>
        </div> {/* cierro div ActividadHome */}
    

    <div className="container">

        <div className="fraseMain">
            <p className="fraseM">Elige una de las actividades para una excursión</p>
            <p className="fraseM">guiada según las rutas que ofrecemos</p>
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
            <button className="menu-button2" onClick={Serch(tSerch , activities)}><span>Buscar</span></button>
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
                images={activity.images}
                rating={activity.rating}
                list={activities}
                />
          
            ))}
           
        </ul>
    </div>
</div>
// cierro div container2
)
}   

function Serch(tSerch,activities){
    const list = [];
    //console.log(activities);
    if (tSerch != "normal"){
        if (tSerch == "Buscar excursión"){
            for(const x of activities.entries()) {
                if (x[1].type == "Rappel"){                 //modificar por tipo input
                    list.push(x[1]);
                }
            }
        }
        if (tSerch == "Insertar fecha"){
            for(const x of activities.entries()) {
                if (x[1].date.seconds == 1742529600 || x[1].date.nanoseconds == 365000000){                 //modificar por date input
                    list.push(x[1]);
                }
            }
        }
        if (tSerch == "Elegir Actividad"){
            for(const x of activities.entries()) {
                if (x[1].name.includes("e")){                 //modificar por name input
                    list.push(x[1]);
                }
            }
        }
    }
    console.log(list)
}

function RenderA({name, info, tipo, images, rating}){   
    const mountainImages = [1, 2, 3, 4, 5];
    const navigate1 = useNavigate();
    const gotocontact3 = (event) => {  
        navigate1("/actividad");
        prueba1234(name);
    }

    return(

    <li className="ac">
        <div className="imgs">
        <img src={images[0]} className="ImageA" alt="" />

        </div>
    <div className="acl"> 
    <h1 className="titleTipo titles">{tipo}</h1>
    <h2 className='titleName titles'>{name}</h2>
    <p className= "p titles">{info}</p>
    <div className="simbolos">
    
    {mountainImages.map((index) => (
            <img
              key={index}
              src="\fotos\mountaini.png"
              className="mountain"
              alt=""
              style={{ opacity: index <= rating ? 0.8 : 0.3 }}
            />
          ))}
    </div>
    <button className="verInfo" onClick={gotocontact3}>Ver detalles</button>
    
    </div>

    </li>
  )
}