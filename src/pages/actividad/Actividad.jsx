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