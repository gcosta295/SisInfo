import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from 'react';
import "./Actividad";
import {app} from '../../firebase/firebase.js'
import { doc, getDoc, getFirestore } from "firebase/firestore";


const db = getFirestore(app);

export default function Actividad() {
    let params = useParams();
    const [dataAct, setDataAct] = useState({});
    const [routeData, setRouteData] = useState({});

    useEffect(() => {
        async function getData() {
            const actividadRef = doc(db, 'Activities', params.actividadId);
            try {
                const actividadSnap = await getDoc(actividadRef);
                if (!actividadSnap.exists()) {
                    console.log("Documento de actividad no existe!!!");
                    return;
                }

                const actividadData = actividadSnap.data();
                setDataAct(actividadData);
                console.log("Actividad:", actividadData);

                if (actividadData.route) {
                    const routeRef = actividadData.route; 
                    const routeSnap = await getDoc(routeRef);

                    if (routeSnap.exists()) {
                        setRouteData(routeSnap.data());
                        console.log("Datos de la ruta:", routeSnap.data());
                    } else {
                        console.log("Ruta no encontrada");
                    }
                }
            } catch (error) {
                console.error(error.message);
            }
        }

        getData();
    }, [params.actividadId]);
    // console.log("params:", params)

    const navigate = useNavigate();
    
        const goto1 = (event) => {  
            navigate(`/reserva/${params.actividadId}`)   //boton con navigate para que lleve a reserva/params.actividadId como en actividades para ir a actividad especifica
        }

    return(
        <>  <p className="tituloActividad">{dataAct.type} - {routeData.name}</p>
            <p className="tipoRuta">Ruta {routeData.type}</p>
            


            <button className='botonReservar' onClick={goto1}>Reservar</button>

        </>
    )

}
// import { db } from "../../firebase/firebase"; 
// import { collection, query, where, getDocs } from "firebase/firestore"; 
// import { useState, useEffect} from "react";

// export default function Actividad() {
//     const fullUrl = window.location.href; // Get the full URL
//     const pathname = window.location.pathname; // Get the pathname
//     const targetString = pathname.replace("/actividad/", "");
//     const [activities, setActivities] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const querySnapshot = await getDocs(collection(db, "Activities"));
//                 const activityData = querySnapshot.docs.map((doc) => ({
//                     id: doc.id,
//                     ...doc.data(),
//                 }));
//                 setActivities(activityData);
//                 setLoading(false);
//             } catch (err) {
//                 setError(err);
//                 setLoading(false);
//                 console.error("Error fetching activities:", err);
//             }
//         };
//         fetchData();
//     }, []);
//     GetData(targetString,activities);
//     return <h1>Activity Details: {targetString}</h1>;
// }

// function GetData(targetString,activities){
//   for(const x of activities.entries()) {
//     if (x[1].id == targetString){               
//         console.log(x[1]);
//     }
// }
// }
