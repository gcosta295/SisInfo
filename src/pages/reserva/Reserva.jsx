import "./Reserva";
import Paypal from "../../components/ui/paypal/Paypal.jsx"
import { useState, useEffect} from "react";
import {app} from '../../firebase/firebase.js'
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useParams } from "react-router";

const db = getFirestore(app);

export default function Reserva() {
    //aqui params para obtener precio etc de la actividad del id en el url
    let params = useParams();
    const [data, setData] = useState({});
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

                const actividadData = {id: actividadSnap.id,...actividadSnap.data()};
                // console.log("actividad snap: ",actividadSnap)
                setData(actividadData);
                // console.log("Actividad:", actividadData);

                if (actividadData.route) {
                    const routeRef = actividadData.route; 
                    const routeSnap = await getDoc(routeRef);

                    if (routeSnap.exists()) {
                        setRouteData(routeSnap.data());
                        // console.log("datos de la ruta:", routeSnap.data());
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


    return(
        <>
        <p className="tituloActividad">{data.type} - {routeData.name}</p>
        <p className="tipoRuta">Ruta {routeData.type}</p>

        
        <Paypal actividad={data}></Paypal>
        {/* tambien se podia pasar del params actividadId={params.actividadId}  pero mejor actividad para probar id */}
        </>
    )

}