// import "./PerfilGuia.css";
import { use } from 'react'
import { UserContext } from '../../context/UserContext.jsx';
import { useParams } from "react-router";
import { useState, useEffect } from 'react';
import {app} from '../../firebase/firebase.js'
import { doc, getDoc, getFirestore, collection, getDocs, orderBy, query } from "firebase/firestore";

const db = getFirestore(app);

export default function VerPerfilGuiaDesdeTrekker() {

    const contextProfile = use(UserContext);
    const { profile} = contextProfile; 

    let params = useParams();
    const [dataAct, setDataAct] = useState({});
    const [routeData, setRouteData] = useState({});
    const [guiaData, setGuiaData] = useState({});

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
            const reviewsRef = collection(db, 'Activities', params.actividadId, "Reviews");
            const reviewsQuery = query(reviewsRef, orderBy("date", "desc")); //  ordenamiento 
            try{

                const reviewSnap = await getDocs(reviewsQuery);
                const reviewData = reviewSnap?.docs?.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setReviewsData(reviewData);
                console.log("datos de review:", reviewData);
                
                
            }catch(e){
                console.log(e)
            }

            console.log(actividadData)


        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        if(params.actividadId){
            getData();
        }
    }, [params.actividadId]);
    // console.log("params:", params)
    return(
        <>
         {/* <p className="tituloActividad">{dataAct.type} - {routeData.name}</p>
            <p className="tipoRuta">📍 Ruta {routeData.type}</p>
            <p className="nombreGuia">Guia: {guiaData.firstName} {guiaData.lastName}</p> */}
         <div className="contenedorCabecera">
                <p className="tituloPerfil">Perfil del guía asignado</p>
            </div>
            <div className="contenedorPerfilPadre">
                <div className="contenedorDatosPerfilGuia">
                    <div className="izqContenedorPerfilGuia">
                        <img className="imgPerfilGuia" src={guiaData.profilePicture} width={200} height={200} />
                        <div className="contenedorNombrePerfilGuia">
                            <img src="/fotos/user-icon.png" width={30} height={30}/>
                            <p className="nombrePerfilGuia">{guiaData.firstName} {guiaData.lastName}</p>
                        </div>
                        <div className="contenedorTelefGuia">
                            <p className="tituloTelefonoPerfilGuia">Teléfono</p>
                            <p className="telefonoPerfilGuia">{guiaData.phoneNumber}</p>
                        </div>
                    </div>
                    <div className="derechaContenedorPerfilGuia">
                        <div>
                            <p className="tituloDescripcion">Descripción</p>
                            <p className="descripcionGuia">{guiaData.description}</p>
                            {guiaData.description || "No se ha añadido esta información aún"}
                        </div>
                        <div className="contenedorActFav">
                            <p className="actFavGuia">Actividad favorita</p>
                            <p className="actFavGuiaTexto">{guiaData.favActivity}</p>
                            {guiaData.favActivity || "No se ha añadido esta información"}
                        </div>
                        <div className="contenedorActFav">
                            <p className="actFavTrekker">Correo electrónico</p>
                            <p className="actFavTrekkerTexto">{guiaData.email}</p>
                        </div>
                        <div className="contenedorActFav">
                            <p className="actFavTrekker">Teléfono</p>
                            <p className="actFavTrekkerTexto">{guiaData.phoneNumber}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )}