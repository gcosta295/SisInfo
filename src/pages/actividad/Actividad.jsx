import { useNavigate, useParams } from "react-router";
import { UserContext } from "../../context/UserContext.jsx";
import { useState, useEffect, useContext } from "react"; // Correct import here
import "./Actividad.css";
import { app } from "../../firebase/firebase.js";
import {
  doc,
  getDoc,
  getFirestore,
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp, // Import Timestamp
} from "firebase/firestore";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

const db = getFirestore(app);

export default function Actividad() {
  const contextProfile = useContext(UserContext); // Use useContext here
  const { profile } = contextProfile;

  const params = useParams();
  const [dataAct, setDataAct] = useState({});
  const [routeData, setRouteData] = useState({});
  const [guiaData, setGuiaData] = useState({});
  const [newComment, setNewComment] = useState("");
  const [reviewsData, setReviewsData] = useState([]);

  async function getData() {
    const actividadRef = doc(db, "Activities", params.actividadId);
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

      const reviewsRef = collection(
        db,
        "Activities",
        params.actividadId,
        "Reviews"
      );
      const reviewsQuery = query(reviewsRef, orderBy("date", "desc"));
      try {
        const reviewSnap = await getDocs(reviewsQuery);
        const reviewData = reviewSnap?.docs?.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviewsData(reviewData);
        console.log("datos de review:", reviewData);
      } catch (e) {
        console.log(e);
      }

      console.log(actividadData);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    if (params.actividadId) {
      getData();
    }
  }, [params.actividadId]);

  const navigate = useNavigate();

  const goto1 = (event) => {
    navigate(`/reserva/${params.actividadId}`);
  };

  const handleAddComment = async (event) => {
    event.preventDefault();

    const goto2 = (event) => {  
      navigate(`/perfil-trekker-guia/${params.actividadId}`)   //boton con navigate para que lleve a reserva/params.actividadId como en actividades para ir a actividad especifica
  }

    if (!newComment.trim()) {
      toast.error("El comentario no puede estar vacío.");
      return;
    }

    try {
      await addDoc(
        collection(db, "Activities", params.actividadId, "Reviews"),
        {
          comment: newComment,
          userFirstName: profile.firstName,
          userLastName: profile.lastName,
          userProfilePic: profile.profilePicture,
          date: Timestamp.fromDate(new Date()), // Use Timestamp here
        }
      );
      setNewComment(""); // Clear the input after adding comment
      getData(); // Refresh reviews
      toast.success("Comentario agregado con éxito");
    } catch (e) {
      console.error(e);
      toast.error("Error al agregar el comentario.");
    }
  };

  const mountainImages = [1, 2, 3, 4, 5];
  return (
    <>
      <p className="tituloActividad">
        {dataAct.type} - {routeData.name}
      </p>
      <p className="tipoRuta">📍Ruta {routeData.type}</p>
      <div className="columnas">
        <div className="LeftColumn2">
          <img src={dataAct.image} className="rutapic" alt="" />
          <p>{dataAct.info}</p>

          <div className="fecha">
            <h3>Fecha</h3>
            {/* <h1>{dataAct.date}</h1> */}
          </div>
          <div className="fecha">
            <h3>Dificultad</h3>
            <RenderA key={dataAct.id} rating={dataAct.rating} />
          </div>
        </div>

        <div className="RightColumn2">
          <div className="rutapin">
            <div className="precio2">
              <h3>Precio</h3>
              <div className="precio4">
                <div className="ac2">
                  <FontAwesomeIcon icon={faDollarSign} />
                  <h1 className="price3">{dataAct.cost}</h1>
                </div>
                <button className="verInfo2" onClick={goto1}>
                  Reserva Ya
                </button>
              </div>
            </div>
          </div>
          <div className="ac3">
            <img src={dataAct.image} alt="" />
            <p>{dataAct.info}</p>
          </div>
          <div className="ac3">
    <h3>Guia Asignado</h3>
    <div  className="comentario2">
              <img
                className="imgPerfilForo"
                src={guiaData.userProfilePic}
                width={70}
                height={70}
                alt=""
              />
              <div className="nombreYComentario">
                <p className="nombreForo">
                {guiaData.firstName} {guiaData.lastName}
                </p>
               
              </div>
            </div>
          </div>
        </div>
      </div>
   

      <div className="contenedorForo">
        <div className="contenedorComentarios">
          <div className="formComentarioForo">
            <textarea
              className="publicarComentarioForo"
              value={newComment}
              type="text"
              placeholder="Añade un comentario..."
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="contenedorBotonPublicarForo">
              <button className="botonPublicarForo" onClick={handleAddComment}>
                Publicar
              </button>
            </div>
          </div>
          {reviewsData.map((comment) => (
            <div key={comment.id} className="comentario">
              <img
                className="imgPerfilForo"
                src={comment.userProfilePic}
                width={70}
                height={70}
                alt=""
              />
              <div className="nombreYComentario">
                <p className="nombreForo">
                  {comment.userFirstName} {comment.userLastName}
                </p>
                <p className="contenido">{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function RenderA({ rating }) {
  const mountainImages = [1, 2, 3, 4, 5];

  return (
    <div className="simbolos2">
      {mountainImages.map((index) => (
        <img
          key={index}
          src="\fotos\mountaini.png"
          className="mountain"
          alt=""
          style={{ opacity: index <= rating ? 0.8 : 0.3 }}
        />
      ))}
    </div>
  );
}
