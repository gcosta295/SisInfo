import "./Actividades.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCalendarDays, faArrowPointer } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { db } from "../../firebase/firebase"; 
import { collection, getDocs } from "firebase/firestore"; 
import { useState, useEffect} from "react";


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
                    ...doc.data(),  //lo mismo que pasa en UserContext,
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
    const [dSerch, setDSerch] = useState("");
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
                    <button className="menu-button2" onClick={Serch(tSerch,activities)}><span>Buscar</span></button>
                </div> {/* fin de div */}

            </div>

            <label>
                <input className="box-text" type="text" placeholder="tipo / fecha (MM/DD/YY) / nombre"/>
            </label>
            
            <div className="container">
                <ul className="Acs">
                    {activities.map((activity) => (
            
                        <RenderA
                        key={activity.id}
                        id={activity.id}
                        tipo={activity.type}
                        name={activity.name}
                        info={activity.info}
                        images={activity.image}
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
    console.log(activities);
    if (tSerch != "normal"){
        if (tSerch == "Buscar excursión"){
            for(const x of activities.entries()) {
                if (x[1].type == document.getElementsByClassName("box-text")[0].value){     
                    list.push(x[1]);
                }
            }
        }
        if (tSerch == "Insertar fecha"){
            for(const x of activities.entries()) {
                var myDate = new Date( x[1].date.seconds *1000);
                const myArray = myDate.toLocaleString().split(",");
                try {
                    const Array1 = document.getElementsByClassName("box-text")[0].value.split("/");
                    console.log(Array1);
                    const Array2 = myArray[0].split("/");
                    console.log(Array2);
                    if (parseInt(Array1[0])-parseInt(Array2[0])==0 && parseInt(Array1[1])-parseInt(Array2[1])==0){
                        if ((parseInt(Array1[2])-parseInt(Array2[2]))%10==0 && (parseInt(Array1[2])-parseInt(Array2[2]))>=0){
                            console.log(3);
                            list.push(x[1]);
                        }                 
                        
                }
                  }
                  catch(err) {
                    document.getElementById("demo").innerHTML = err.message;
                  }
                
            }
        }
        if (tSerch == "Elegir Actividad"){
            for(const x of activities.entries()) {
                if (x[1].name.includes(document.getElementsByClassName("box-text")[0].value)){      
                    list.push(x[1]);
                }
            }
        }
    }
    console.log(list)
}

function RenderA({activityId,name, info, tipo, images, rating, id}){   
    const mountainImages = [1, 2, 3, 4, 5];
    const navigate1 = useNavigate();
    const gotocontact3 = () => {  
        navigate1(`/actividad/${id}`)
    }

    return( 

    <li className="ac">
        <div className="imgs">
        <img src={images} className="ImageA" alt="" />

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