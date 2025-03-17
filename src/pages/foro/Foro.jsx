import "./Foro.css";
import { UserContext } from '../../context/UserContext.jsx';
import { use } from 'react';
import {app} from '../../firebase/firebase.js'
import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, query, getFirestore, orderBy } from "firebase/firestore";

const db = getFirestore(app);

export default function Foro() {

    const contextProfile = use(UserContext);
    const { profile} = contextProfile; 

    const [dataForo, setDataForo] = useState([]);
    const [newComment, setNewComment] = useState("");

    const getData = async () => {
        const foroRef = collection(db, 'Forum'); 
        const foroQuery = query(foroRef, orderBy("date", "desc")); //  ordenación 
        try {
            const foroSnap = await getDocs(foroQuery);
            const foroData = foroSnap.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setDataForo(foroData);
            // console.log("Comment:", foroData);
        } catch (error) {
            console.error(error.message);
        }
    };


    useEffect(() => {
        getData();
    }, [])

    const handleAddComment = async(event) => {
        event.preventDefault();
        try{
            await addDoc(collection(db, "Forum"), {  
                comment: newComment,
                userFirstName: profile.firstName,
                userLastName: profile.lastName,
                userProfilePic: profile.profilePicture,
                date: new Date()
              });
              
        getData();  //asi se rerenderiza cuando anado nuevo comentario, sino antes habia que refrescar la pag
        } catch(e){
            console.log(e)
        }
    };

    return(
        <>
            <p className="tituloForo">Foro de AvilaTrekkers</p>

            <form className="formComentarioForo">
                <input className="publicarComentarioForo" value={newComment} type="text" placeholder="Añade un comentario..." onChange={(e) => setNewComment(e.target.value)}/>
                <button className="botonPublicarForo" onClick={handleAddComment}>Publicar</button>
            </form>    

            <div className="contenedorForo">
                <div className="contenedorComentarios">
                    {dataForo.map((comment) => (  //por cada elemento de dataforo leo un comentario y por cada comentario retorno lo de dentro de la arrow function
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