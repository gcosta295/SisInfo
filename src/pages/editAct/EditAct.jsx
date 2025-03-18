import "./EditAct";
import "./EditAct.css";

import { db } from "../../firebase/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

export default function EditActivity() {
  const fullUrl = window.location.href; // Get the full URL
  const pathname = window.location.pathname; // Get the pathname
  const targetString = pathname.replace("/editAct/", "");
  const [activities, setActivities] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newGuide, setNewGuide] = useState("");

  const [newPrice, setNewPrice] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newType, setNewType] = useState("");
  const [updateStatus, setUpdateStatus] = useState(null);
  const [guideNames, setGuideNames] = useState([]); // Combined guide names state

  const typeOptions = ["Paseo", "Rappel", "Excursion"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Activities"));
        const activityData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setActivities(activityData);

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
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching activities:", err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {

    if (!targetString) {
      setUpdateStatus("Error: documentId is missing.");
      return;
    }
    setNewName(document.getElementsByClassName("aName")[0].value);
    setNewDesc(document.getElementsByClassName("large-textarea")[0].value);
    setNewGuide(document.getElementsByClassName("drop2")[0].value);
    setNewImage(document.getElementsByClassName("url")[0].value);
    setNewPrice(document.getElementsByClassName("aPrice")[0].value);
    setNewType(document.getElementsByClassName("drop1")[0].value);
    if(!newName || !newDesc || !newPrice || !newImage || !newType || !newGuide)return;
    console.log("si");
      try {
        const docRef = doc(db, "Activities", targetString);
        await updateDoc(docRef, {
          name: newName,
          info: newDesc,
          price: newPrice,
          image: newImage,
          type: newType,
          guia: newGuide,
        });
        setUpdateStatus("Actividad Actualizada!");
      } catch (error) {
        console.error("Error updating document:", error);
        setUpdateStatus("Error updating name: " + error.message); // Mensaje de error
      }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this activity?"
    ); // Confirmacion por si de verdad deseas borrarlo
    if (!confirmDelete) return;

    if (!targetString) {
      setUpdateStatus("Error: documentId is missing.");
      return;
    }
    try {
      const docRef = doc(db, "Activities", targetString);
      await deleteDoc(docRef);
      setUpdateStatus("Activity deleted successfully!");
      navigate("/admin"); // Te devuelve a la pagina anterior al borrar
    } catch (error) {
      console.error("Error deleting document:", error);
      setUpdateStatus("Error deleting activity: " + error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const activityToEdit = activities.find(
    (activity) => activity.id === targetString
  );

  if (!activityToEdit) return <p>Activity not found.</p>;

  const gotoAdmin = () => {
    navigate(`/admin`);
  };
  return (
    <div className="mainContainer3">
      <div className="LeftColumn">
        <button type="button" className="return2" onClick={gotoAdmin}>
          Regresar
        </button>
        <h1>Nombre Actividad</h1>
        <label>
          <input type="text" className="aName"/>
        </label>
        <h1>Precio</h1>
        <label>
          <FontAwesomeIcon icon={faDollarSign} />
          <input type="text" className="aPrice"/>
        </label>
        <h1>Descripcion</h1>
        <label>
          <textarea
            className="large-textarea"
          ></textarea>
        </label>
        <h1>URL de Imagen</h1>
        <label className="L">
          <input type="text" className="url"/>
        </label>
        <h1>Tipo de Actividad</h1>
        <label>
          <select
            className="drop1"
          >
            <option value="">Selecciona</option>
            {typeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <h1>Asignar Guia</h1>
        <label>
          <select
            className="drop2"
          >
            <option value="">Selecciona</option>
            {guideNames.map((guide) => (
              <option key={guide.id} value={guide.id}>
                {guide.name}
              </option>
            ))}
          </select>
        </label>
        <div className="botoncitos">
          <button type="button" className="guardar3" onClick={handleDelete}>
            Eliminar
          </button>
          <button type="button" className="guardar" onClick={handleSubmit}>
            Guardar
          </button>
        </div>
        {updateStatus && <p>{updateStatus}</p>}
      </div>
      <div className="RightColumn">
        <img src={activityToEdit.image} className="ImageA" alt="" />

        <div className="Old">
          <h1>{activityToEdit.name}</h1>
          <h1>
            <FontAwesomeIcon icon={faDollarSign} />
            {activityToEdit.price}
          </h1>
        </div>
      </div>
    </div>
  );
}
