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
    const [guiaData, setGuiaData] = useState({});

    useEffect(() => {
        async function fetchData() {
            const actividadRef = doc(db, "Activities", params.actividadId);

            try {
                const actividadSnap = await getDoc(actividadRef);

                if (!actividadSnap.exists()) {
                    console.log("Documento de actividad no existe!!!");
                    setLoading(false);
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

                const querySnapshot = await getDocs(collection(db, "Activities"));
                const activityData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setActivities(activityData);
                console.log("Activities:", activityData);

                const usersCollection = collection(db, "Users");
                const guidesQuery = query(
                    usersCollection,
                    where("tipoUsuario", "==", "guia")
                );
                const guidesSnapshot = await getDocs(guidesQuery);

                if (guidesSnapshot.empty) {
                    console.log("No guides found.");
                } else {
                    const names = guidesSnapshot.docs.map((doc) => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            name: `${data.firstName} ${data.lastName}`,
                        };
                    });
                    setGuideNames(names);
                }

                setActivityToEdit(activityData.find(activity => activity.id === params.actividadId))

                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
                console.error("Error fetching data:", err);
            }
        }

        fetchData();
    }, [params.actividadId]);

    // console.log("params:", params)

    const navigate = useNavigate();
    
        const goto1 = (event) => {  
            navigate(`/reserva/${params.actividadId}`)   //boton con navigate para que lleve a reserva/params.actividadId como en actividades para ir a actividad especifica
        }


    return(
        <>  <p className="tituloActividad">{dataAct.type} - {routeData.name}</p>
            <p className="tipoRuta">Ruta {routeData.type}</p>
            <p className="nombreGuia">Guia: {guiaData.firstName} {guiaData.lastName}</p>

            <button className='botonReservar' onClick={goto1}>Reservar</button>

        </>
    )

}
