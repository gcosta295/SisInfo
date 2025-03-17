import "./Reserva.css";
import Paypal from "../../components/ui/paypal/Paypal.jsx"
import { useState, useEffect} from "react";
import {app} from '../../firebase/firebase.js'
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useParams } from "react-router";
import CalendarComponent from "../../components/calendar/Calendar.jsx";


const db = getFirestore(app);

export default function Reserva() {
    //aqui params para obtener precio etc de la actividad del id en el url
    let params = useParams();
    const [data, setData] = useState({});
    const [routeData, setRouteData] = useState({});
    const [guiaData, setGuiaData] = useState({});

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

                if (actividadData.guia) {
                    const guiaRef = actividadData.guia; 
                    const guiaSnap = await getDoc(guiaRef);

                    if (guiaSnap.exists()) {
                        setGuiaData(guiaSnap.data());
                        console.log("datos de guia:", guiaSnap.data());
                    } else {
                        console.log("Guia no encontrado");
                    }
                }


            } catch (error) {
                console.error(error.message);
            }
        }

        getData();
    }, [params.actividadId]);
    function formatearFechaDDMMYYYY(fecha) {
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11
        const año = fecha.getFullYear();
        return `${dia}-${mes}-${año}`;
      }
    const fixedDate = new Date(data?.date?.seconds * 1000 + data?.date?.nanoseconds / 1000000); // Fecha fija (15 de marzo de 2025)

    const isoDate = formatearFechaDDMMYYYY(fixedDate)
    return(
        <>
        <p className="tituloActividad">{data.type} - {routeData.name}</p>
        <p className="tipoRuta">📍Ruta {routeData.type}</p>

        <div className="containerReserva">
            <div className="calendarioReserva">
                <CalendarComponent data={data.date}></CalendarComponent>
            </div>
            <div className="containerReservaDetalles1">
                <p className="tituloDetalles">Detalles de la actividad</p>
                <div className="containerReservaDetalles2">
                    <p className="costo">$ {data.cost}</p>
                    <p className="primero">DÍA <br></br>{isoDate}</p>
                    <p className="segundo">ACTIVIDAD <br></br>{data.type}</p>
                    <p className="tercero">RUTA <br></br>{routeData.type} - {routeData.name}</p>
                    <p className="cuarto">GUÍA <br></br>{guiaData.firstName} {guiaData.lastName}</p>
                </div>
                <br></br>
                <div className="botonPaypal">
                    <Paypal actividad={data}></Paypal>
                </div>
            </div>
        </div>

        {/* tambien se podia pasar del params actividadId={params.actividadId}  pero mejor actividad para probar id */}
        </>
    )

}