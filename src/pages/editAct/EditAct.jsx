import "./EditAct";
import "./EditAct.css";

import { db } from "../../firebase/firebase";
import {
  collection,
  query,
  where,
  getDoc,
  doc,
  updateDoc,
  getDocs,
  Timestamp, deleteDoc,
} from "firebase/firestore";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router";

export default function EditActivity() {
  const [activities, setActivities] = useState([]);
  const [activityToEdit, setActivityToEdit] = useState(null);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newGuide, setNewGuide] = useState("");
  const params = useParams();
  const [dataAct, setDataAct] = useState(null);
  const [newCost, setNewCost] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newDif, setNewDif] = useState("");

  const [newType, setNewType] = useState("");
  const [newRoute, setNewRoute] = useState("");
  const [routeData, setRouteData] = useState({});
  const [newDate, setNewDate] = useState(""); // Add newDate state
  const [routeN, setRouteN] = useState(""); // Add newDate state

  const [updateStatus, setUpdateStatus] = useState(null);
  const [guideNames, setGuideNames] = useState([]); // Combined guide names state
  const [RouteNames, setRouteNames] = useState([]); // Combined guide names state

  const typeOptions = ["Paseo", "Rappel", "Excursion"];
  const [guiaData, setGuiaData] = useState(null); // Add useState for guiaData

  useEffect(() => {
    const fetchData = async () => {
      if (!params?.actividadId) {
        console.error("actividadId is undefined");
        setLoading(false);
        return;
      }

      const actividadRef = doc(db, "Activities", params.actividadId);

      try {
        const actividadSnap = await getDoc(actividadRef);

        if (!actividadSnap.exists()) {
          console.log("Documento de actividad no existe!!!");
          setError("Activity not found.");
          setLoading(false);
          return;
        }

        const activityData = actividadSnap.data();

        if (activityData.guia) {
          const guiaRef = activityData.guia;
          const guiaSnap = await getDoc(guiaRef);

          if (guiaSnap.exists()) {
            setGuiaData(guiaSnap.data());
            console.log("datos de guia:", guiaSnap.data());
          }
          setNewGuide(activityData.guia.id); // Extract document ID from reference
          } else {
          setNewGuide("");
          }

        if (activityData.route) {
          const routeRef = activityData.route;
          const routeSnap = await getDoc(routeRef);

          if (routeSnap.exists()) {
            setRouteData(routeSnap.data());
            console.log("datos de ruta:", routeSnap.data());
            setRouteN(routeSnap.data().name);
          }
          setNewRoute(activityData.route.id); // Extract document ID from reference
        } else {
          setNewRoute("");
        }

        // Fetch all guides for the dropdown
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

        const routesCollection = collection(db, "Routes");
        const routesSnapshot = await getDocs(routesCollection);

        if (routesSnapshot.empty) {
          console.log("No routes found.");
        } else {
          const Rnames = routesSnapshot.docs.map((doc) => {
            const data2 = doc.data();
            return {
              id: doc.id,
              name: `${data2.name} ${data2.type}`,
            };
          });
          setRouteNames(Rnames);
        }

        setActivityToEdit(activityData);

        setNewName(activityData.name);
        setNewDesc(activityData.info);
        setNewCost(activityData.cost);
        setNewImage(activityData.image);
        setNewType(activityData.type);
        setNewDif(activityData.rating);
        setNewDate(activityData.date);


        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [params?.actividadId]);

  const handleDescChange = (e) => {
    setNewDesc(e.target.value);
  };

  const handleCostChange = (e) => {
    setNewCost(e.target.value);
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.value);
  };
  const handleTypeChange = (e) => {
    setNewType(e.target.value);
  };

  const handleGuideChange = (e) => {
    setNewGuide(e.target.value);
  };

  const handleRouteChange = (e) => {
    setNewRoute(e.target.value);
  };

  const handleDateChange = (e) => {
    setNewDate(e.target.value);
  };

  const handleDifChange = (e) => {
    setNewDif(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!params.actividadId) {
      setUpdateStatus("Error: documentId is missing.");
      return;
    }

    if (newDif < 1 || newDif > 5) {
      setUpdateStatus("Error: La dificultad debe estar entre 1 y 5.");
      return;
    }
    try {
      console.log(newRoute)
      const docRef = doc(db, "Activities", params.actividadId);
      const guideRef = doc(db, "Users", newGuide);
      const routeRef = doc(db, "Routes", newRoute);
      const dateTimestamp = Timestamp.fromDate(new Date(newDate));

      await updateDoc(docRef, {
        info: newDesc,
        cost: newCost,
        image: newImage,
        type: newType,
        guia: guideRef, // Save the DocumentReference
        route: routeRef, // Save the DocumentReference
        date: dateTimestamp, // Save Timestamp
        rating: newDif,
      });
      setUpdateStatus("Actividad Actualizada!");
    } catch (error) {
      console.error("Error updating document:", error);
      setUpdateStatus("Error " + error.message); // Mensaje de error
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this activity?"
    ); // Confirmacion por si de verdad deseas borrarlo
    if (!confirmDelete) return;

    if (!params.actividadId) {
      setUpdateStatus("Error: documentId is missing.");
      return;
    }
    try {
      const docRef = doc(db, "Activities", params.actividadId);
      await deleteDoc(docRef);
      setUpdateStatus("Activity deleted successfully!");
      navigate("/admin"); // Te devuelve a la pagina anterior al borrar
    } catch (error) {
      console.error("Error deleting document:", error);
      setUpdateStatus("Error deleting activity: " + error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  
if (error) {
    window.alert(error.message);
    return null; // Or some other JSX to render
}

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
        <form onSubmit={handleSubmit}>
          <h1>Tipo de Ruta</h1>
          <label>
            <select
              className="drop"
              value={newRoute}
              onChange={handleRouteChange}
            >
              {RouteNames.map((route) => (
                <option key={route.id} value={route.id}>
                  {route.name}
                </option>
              ))}
            </select>
          </label>
          <h1>Precio</h1>
          <label>
            <FontAwesomeIcon icon={faDollarSign} />
            <input className="textinput" type="text" value={newCost} onChange={handleCostChange} />
          </label>
          <h1>Dificultad</h1>
          <label>
            <input className="textinput" type="text" value={newDif} onChange={handleDifChange} />
          </label>
          <h1>Descripcion</h1>
          <label>
            <textarea
              className="large-textarea"
              value={newDesc}
              onChange={handleDescChange}
            ></textarea>
          </label>
          <h1>URL de Imagen</h1>
          <label className="L">
            <input className="textinput" type="text" value={newImage} onChange={handleImageChange} />
          </label>
          <h1>Tipo de Actividad</h1>
          <label>
            <select
              className="drop"
              value={newType}
              onChange={handleTypeChange}
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
              className="drop"
              value={newGuide}
              onChange={handleGuideChange}
            >
              <option value="">{newGuide}</option>
              {guideNames.map((guide) => (
                <option key={guide.id} value={guide.id}>
                  {guide.name}
                </option>
              ))}
            </select>
          </label>
          time
          <h1>Fecha y Hora</h1>
          <label>
            <input className="textinput"
              type="datetime-local"
              value={newDate}
              onChange={handleDateChange}
            />
          </label>
          <div className="botoncitos">
            <button type="button" className="guardar3" onClick={handleDelete}>
              Eliminar
            </button>
            <button type="submit" className="guardar">
              Guardar
            </button>
          </div>
        </form>
        {updateStatus && <p>{updateStatus}</p>}
      </div>
      <div className="RightColumn">
        <img src={activityToEdit.image} className="ImageA" alt="" />

        <div className="Old">
          <h1>{routeN}</h1>
          <h1>
            <FontAwesomeIcon icon={faDollarSign} />
            {activityToEdit.cost}
          </h1>
        </div>
      </div>
    </div>
  );
}
