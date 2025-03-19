import "./ReservasTrekker.css";
import { useNavigate } from "react-router";
import { db } from "../../firebase/firebase"; 
import { query, getDocs, getDoc, doc, collection, where } from "firebase/firestore";
import { use, useState, useEffect} from "react";
import { UserContext } from '../../context/UserContext.jsx';


export default function ReservasTrekker() {

    const contextProfile = use(UserContext);
    const { profile} = contextProfile; 
    // console.log(profile.uid)

    const [data, setData] = useState([]);
    const [oldData, setOldData] = useState([])
    // const [actividad, setActividad]=useState({})

    useEffect(() => {
        async function getData() {
            try {
                setData([])
                setOldData([])
                const userRef = doc(db, "Users", profile.uid); 
            
                const reservationRef = query(
                    collection(db, "Reservations"),
                    where("user", "==", userRef)
                );
            
                const querySnapshot = await getDocs(reservationRef);
                console.log(querySnapshot);
            
                const reservas = await Promise.all(querySnapshot.docs.map(async (reserva) => {
                    const reservaData = reserva.data();
                    // console.log(reservaData);
            
                    if (reservaData.activity) {
                        const actRef = reservaData.activity; 
                        const actSnap = await getDoc(actRef);
                        const actividadData = actSnap.data();
                        // console.log(actividadData);
            
                        if (actividadData.route) {
                            const routeRef = actividadData.route; 
                            const routeSnap = await getDoc(routeRef);
                            const routeData = routeSnap.data();
                            // console.log(routeData);
            
                            if (routeSnap.exists()) {
                                return { id: reserva.id, route:routeData, ...reserva.data(), activity:actividadData };
                            } else {
                                // console.log("Ruta no encontrada");
                            }
                        }
                    }
                }));
                reservas.map((reserva)=>{

                  const today = Date.now();
                  const fixedDate = new Date(reserva?.activity?.date?.seconds * 1000 + reserva?.activity?.date?.nanoseconds / 1000000); 
                  if (fixedDate >= today){
                    
                console.log("Reservas nuevas:", reserva);
                    setData((prev)=>[...prev, reserva]);
                  }else{
                    console.log("Reservas viejas:", reserva);
                    setOldData((prev)=>[...prev, reserva])
                  }
                })
            
            } catch (error) {
                console.error("Error obteniendo reservas:", error.message);
            }
        }
        getData();
        }, [profile.uid]);


        return (
            <>
              <p className="tituloMisReservasTrekker">Reservas activas</p>
          
              <ul>
                {data.length > 0 ? (
                  data.map((reserva) => {
                    
                    // conversion de timestamp a fecha
                    function formatearFechaDDMMYYYY(fecha) {
                        const dia = fecha.getDate().toString().padStart(2, '0');
                        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); 
                        const año = fecha.getFullYear();
                        return `${dia}-${mes}-${año}`;
                        }
                
                    const fixedDate = new Date(reserva?.activity?.date?.seconds * 1000 + reserva?.activity?.date?.nanoseconds / 1000000); 
                
                    const isoDate = formatearFechaDDMMYYYY(fixedDate)
                          
                    
                    const imagenReserva = reserva.activity?.image || "Sin imagen";
                    const tipo = reserva.activity?.type || "Tipo no disponible";
                    const name = reserva.route?.name || "Nombre no disponible";
                    const info = reserva.activity?.info || "Sin información";
          
                    return (
                      <li key={reserva.id} className="ac">
                        <div className="imgs">
                          <img src={imagenReserva} alt="Imagen de reserva" width={250} height={180} />
                        </div>
                        <div className="acl">
                          <h1 className="titleTipo titles">{tipo}</h1>
                          <h2 className="titleName titles">{name}</h2>
                          <p className="p titles">{info}</p>
                          <p className="fechaActR">Fecha de la actividad: {isoDate}</p>
                        </div>
                          {/* <button className="verInfo" onClick={gotocontact3}>Ver detalles</button> */}
                      </li>
                    );
                  })
                ) : (
                  <p className="palabraNoActs">No tienes reservas aún.</p>
                )}
              </ul>
              <p className="tituloMisReservasTrekker">Historial de reservas</p>
              <ul>
                {oldData.length > 0 ? (
                  oldData.map((reserva) => {
                    
                    // conversion de timestamp a fecha
                    function formatearFechaDDMMYYYY(fecha) {
                        const dia = fecha.getDate().toString().padStart(2, '0');
                        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); 
                        const año = fecha.getFullYear();
                        return `${dia}-${mes}-${año}`;
                        }
                
                    const fixedDate = new Date(reserva?.activity?.date?.seconds * 1000 + reserva?.activity?.date?.nanoseconds / 1000000); 
                
                    const isoDate = formatearFechaDDMMYYYY(fixedDate)
                          
                    
                    const imagenReserva = reserva.activity?.image || "Sin imagen";
                    const tipo = reserva.activity?.type || "Tipo no disponible";
                    const name = reserva.route?.name || "Nombre no disponible";
                    const info = reserva.activity?.info || "Sin información";
          
                    return (
                      <li key={reserva.id} className="ac">
                        <div className="imgs">
                          <img src={imagenReserva} alt="Imagen de reserva" width={250} height={180} />
                        </div>
                        <div className="acl">
                          <h1 className="titleTipo titles">{tipo}</h1>
                          <h2 className="titleName titles">{name}</h2>
                          <p className="p titles">{info}</p>
                          <p className="fechaActR">Fecha de la actividad: {isoDate}</p>
                        </div>
                          {/* <button className="verInfo" onClick={gotocontact3}>Ver detalles</button> */}
                      </li>
                    );
                  })
                ) : (
                  <p className="palabraNoActs">No tienes reservas aún.</p>
                )}
              </ul>
            </>
          );
        }
        
        
            //  <ul>
            //     {data.length > 0 ? (
            //         data.map((reserva) => {
            //             // conversion de timestamp a fecha
            //             function formatearFechaDDMMYYYY(fecha) {
            //                 const dia = fecha.getDate().toString().padStart(2, '0');
            //                 const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); 
            //                 const año = fecha.getFullYear();
            //                 return `${dia}-${mes}-${año}`;
            //               }
                    
            //             const fixedDate = new Date(reserva?.reservationDate?.seconds * 1000 + reserva?.reservationDate?.nanoseconds / 1000000); 
                    
            //             const isoDate = formatearFechaDDMMYYYY(fixedDate)

            //             return(
            //             <>
                    
                        
            //             <li key={reserva.id}>
            //                 numero de reserva: {isoDate}
            //                 ruta: {reserva.route.name}
            //             </li>
            //             </>
            //         )})
            //     ) : (
            //         <p>No tienes reservas</p>
            //     )}
            // </ul> 
