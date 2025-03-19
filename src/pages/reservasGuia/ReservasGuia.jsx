import "./ReservasGuia.css";
import { db } from "../../firebase/firebase"; 
import { query, getDocs, getDoc, doc, collection, where } from "firebase/firestore";
import { use, useState, useEffect} from "react";
import { UserContext } from '../../context/UserContext.jsx';

export default function ReservasGuia() {
    const contextProfile = use(UserContext);
    const { profile} = contextProfile; 
    // console.log(profile.uid)

    const [data, setData] = useState([]);
    const [oldData, setOldData] = useState([])

    useEffect(() => {
        async function getData() {
            try {
                setData([])
                setOldData([])
                if(profile.uid){

                    const userRef = doc(db, "Users", profile.uid); 
                
                    const activityRef = query(
                        collection(db, "Activities"),
                        where("guia", "==", userRef)
                    );
                
                    const querySnapshot = await getDocs(activityRef);
                    console.log(querySnapshot);
                
                    const actividades = await Promise.all(querySnapshot.docs.map(async (actividad) => {
                        const actividadData = actividad.data();
                        // console.log(actividadData); //HASTA AQUI BIEN!!
                
                        if (actividadData.route) {
                            const routeRef = actividadData.route; 
                            const routeSnap = await getDoc(routeRef);
                            const routeData = routeSnap.data();
                            // console.log("ruta dataaaa",routeData);
            
                            if (routeSnap.exists()) {
                                return { id: actividad.id, ...actividad.data(),  route:routeData};
                            } else {
                                console.log("Ruta no encontrada");
                            }
                        }
                        
                    }));

                    actividades.map((actividad)=>{

                      const today = Date.now();
                      const fixedDate = new Date(actividad?.date?.seconds * 1000 + actividad?.date?.nanoseconds / 1000000);  
                      if (fixedDate >= today){
                        
                    console.log("Actividades nuevas:", actividad);
                        setData((prev)=>[...prev, actividad]);
                      }else{
                        console.log("Actividades viejas:", actividad);
                        setOldData((prev)=>[...prev, actividad])
                      }
                    })
                
                    // setData(actividades.filter(actividad => actividad !== undefined));
                    // console.log("Actividades encontradas asignadas para este guia/user:", actividades);
                }
            
            } catch (error) {
                console.error("Error obteniendo actividades:", error.message);
            }
        }
        getData();
        }, [profile.uid]);

    return(
        <>
        <p className="tituloAsignadasGuia">Actividades asignadas activas</p>
    
        <ul>
          {data.length > 0 ? (
            
            data.map((actividad) => {

            // conversion de timestamp a fecha
            function formatearFechaDDMMYYYY(fecha) {
                const dia = fecha.getDate().toString().padStart(2, '0');
                const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); 
                const año = fecha.getFullYear();
                return `${dia}-${mes}-${año}`;
            }
        
            const fixedDate = new Date(actividad?.date?.seconds * 1000 + actividad?.date?.nanoseconds / 1000000); 
        
            const isoDate = formatearFechaDDMMYYYY(fixedDate)

              const imagenReserva = actividad.image || "Sin imagen";
              const tipo = actividad.type || "Tipo no disponible";
              const name = actividad.route.name || "Nombre no disponible";
              const info = actividad.info || "Sin información";
    
              return (
                <li key={actividad.id} className="ac">
                  <div className="imgs">
                    <img src={imagenReserva} alt="Imagen de reserva" width={250} height={180} />
                  </div>
                  <div className="acl">
                    <h1 className="titleTipo titles">{tipo}</h1>
                    <h2 className="titleName titles">{name}</h2>
                    <p className="p titles">{info}</p>
                    <p className="fechaActA">Fecha de la actividad: {isoDate}</p>
                  </div>
                    {/* <button className="verInfo" onClick={gotocontact3}>Ver detalles</button> */}
                </li>
              );
            })
          ) : (
            <p className="palabraNoActs">No tienes actividades asignadas.</p>
          )}
        </ul>
        <p className="tituloMisReservasTrekker">Historial de actividades asignadas</p>
        <ul>
          {oldData.length > 0 ? (
            
            oldData.map((actividad) => {

            // conversion de timestamp a fecha
            function formatearFechaDDMMYYYY(fecha) {
                const dia = fecha.getDate().toString().padStart(2, '0');
                const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); 
                const año = fecha.getFullYear();
                return `${dia}-${mes}-${año}`;
            }
        
            const fixedDate = new Date(actividad?.date?.seconds * 1000 + actividad?.date?.nanoseconds / 1000000); 
        
            const isoDate = formatearFechaDDMMYYYY(fixedDate)

              const imagenReserva = actividad.image || "Sin imagen";
              const tipo = actividad.type || "Tipo no disponible";
              const name = actividad.route.name || "Nombre no disponible";
              const info = actividad.info || "Sin información";
    
              return (
                <li key={actividad.id} className="ac">
                  <div className="imgs">
                    <img src={imagenReserva} alt="Imagen de reserva" width={250} height={180} />
                  </div>
                  <div className="acl">
                    <h1 className="titleTipo titles">{tipo}</h1>
                    <h2 className="titleName titles">{name}</h2>
                    <p className="p titles">{info}</p>
                    <p className="fechaActA">Fecha de la actividad: {isoDate}</p>
                  </div>
                    {/* <button className="verInfo" onClick={gotocontact3}>Ver detalles</button> */}
                </li>
              );
            })
          ) : (
            <p className="palabraNoActs">No tienes actividades asignadas.</p>
          )}
        </ul>
      </>
    );
}