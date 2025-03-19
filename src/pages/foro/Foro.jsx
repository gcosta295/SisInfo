import "./Foro.css";
import { UserContext } from '../../context/UserContext.jsx';
import { use } from 'react';
import {app} from '../../firebase/firebase.js'
import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, query, getFirestore, orderBy } from "firebase/firestore";
import toast from 'react-hot-toast';

const db = getFirestore(app);

export default function Foro() {

    const contextProfile = use(UserContext);
    const { profile} = contextProfile; 

    const [dataForo, setDataForo] = useState([]);
    const [newComment, setNewComment] = useState("");

    const getData = async () => {
        const foroRef = collection(db, 'Forum'); 
        const foroQuery = query(foroRef, orderBy("date", "desc")); //  ordenamiento 
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

        if(!newComment.trim()){
            toast.error("El comentario no puede estar vacío.")
            return;
        };
        

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
            <div className="contenedorForo">
                <div className="contenedorComentarios">
                    <div className="formComentarioForo">
                        <textarea className="publicarComentarioForo" value={newComment} type="text" placeholder="Añade un comentario..." onChange={(e) => setNewComment(e.target.value)}/>
                        <div className="contenedorBotonPublicarForo">    
                            <button className="botonPublicarForo" onClick={handleAddComment}>Publicar</button>
                        </div>
                    </div>    
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