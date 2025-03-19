import { useNavigate, useParams } from "react-router";
import { UserContext } from '../../context/UserContext.jsx';
import { useState, useEffect } from 'react';
import { use } from 'react';
import "./Actividad";
import {app} from '../../firebase/firebase.js'
import { doc, getDoc, getFirestore, addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import toast from 'react-hot-toast';


const db = getFirestore(app);

export default function Actividad() {

    const contextProfile = use(UserContext);
    const { profile} = contextProfile; 

    let params = useParams();
    const [dataAct, setDataAct] = useState({});
    const [routeData, setRouteData] = useState({});
    const [guiaData, setGuiaData] = useState({});
    const [newComment, setNewComment] = useState("");
    const [reviewsData, setReviewsData] = useState([])

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

    const navigate = useNavigate();
    
    const goto1 = (event) => {  
        navigate(`/reserva/${params.actividadId}`)   //boton con navigate para que lleve a reserva/params.actividadId como en actividades para ir a actividad especifica
    }

    const goto2 = (event) => {  
        navigate(`/perfil-trekker-guia/${params.actividadId}`)   //boton con navigate para que lleve a reserva/params.actividadId como en actividades para ir a actividad especifica
    }

    const handleAddComment = async(event) => {
        event.preventDefault();

        if(!newComment.trim()){
            toast.error("El comentario no puede estar vacío.")
            return;
        };
    
        try{
            console.log( params.actividadId);
            
            await addDoc(collection(db, "Activities", params.actividadId, "Reviews"), {  
                comment: newComment,
                userFirstName: profile.firstName,
                userLastName: profile.lastName,
                userProfilePic: profile.profilePicture,
                date: new Date()
                });
                getData()
        } catch(e){
            console.log(e)
        }
    };


    return(
        <>  <p className="tituloActividad">{dataAct.type} - {routeData.name}</p>
            <p className="tipoRuta">📍 Ruta {routeData.type}</p>
            <p className="nombreGuia">Guia: {guiaData.firstName} {guiaData.lastName}</p>
            
            <button className='botonReservar' onClick={goto1}>Reservar</button>
            <button className='botonVerPerfilGuiaDesdeTrekker' onClick={goto2}>Ver perfil del guia</button>


            <div className="contenedorForo">
                <div className="contenedorComentarios">
                    <div className="formComentarioForo">
                        <textarea className="publicarComentarioForo" value={newComment} type="text" placeholder="Añade un comentario..." onChange={(e) => setNewComment(e.target.value)}/>
                        <div className="contenedorBotonPublicarForo">    
                            <button className="botonPublicarForo" onClick={handleAddComment}>Publicar</button>
                        </div>
                    </div>    
                    {reviewsData.map((comment) => (  //por cada elemento de dataforo leo un comentario y por cada comentario retorno lo de dentro de la arrow function
                        <div key={comment.id} className="comentario">
                            <img className="imgPerfilForo" src={comment.userProfilePic} width={70} height={70} />
                            <div className="nombreYComentario">
                                <p className="nombreForo">{comment.userFirstName} {comment.userLastName}</p>
                                <p className="contenido">{comment.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>



        </>
    )

}
