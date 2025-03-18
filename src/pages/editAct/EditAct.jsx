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
  const [newType, setNewType] = useState("");
  const [newRoute, setNewRoute] = useState("");
  const [routeData, setRouteData] = useState({});

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

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleRouteChange = (e) => {
    setNewRoute(e.target.value);
  };

  const handleSubmit = async (e) => {

    if (!params.actividadId) {
      setUpdateStatus("Error: documentId is missing.");
      return;
    }
    setNewName(document.getElementsByClassName("aName")[0].value);
    setNewDesc(document.getElementsByClassName("large-textarea")[0].value);
    setNewGuide(document.getElementsByClassName("drop2")[0].value);
    setNewImage(document.getElementsByClassName("url")[0].value);
    setNewPrice(document.getElementsByClassName("aPrice")[0].value);
    setNewType(document.getElementsByClassName("drop1")[0].value);
    setNewRoute(document.getElementsByClassName("drop")[0].value);
    if(!newName || !newDesc || !newPrice || !newImage || !newType || !newGuide || !newRoute)return;
      try {
        const docRef = doc(db, "Activities", params.actividadId);
        const guideRefString = `/Users/${newGuide}`;
        const routeRefString = `/Routes/${newRoute}`;
        await updateDoc(docRef, {
          name: newName,
          info: newDesc,
          cost: newCost,
          image: newImage,
          type: newType,
          guia: guideRefString, // Save the reference string
          route: routeRefString, // Save the reference string
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
  if (error) return <p>Error: {error.message}</p>;

  if (!activityToEdit) return <p>Activity not found.</p>;

  const gotoAdmin = () => {
    navigate(`/admin`);
  };
  return (
    <div className="mainContainer3">
      <div className="LeftColumn">
        <button type="button" className="return2" onClick={gotoAdmin}>
          Regresar
          <h1>Tipo de Ruta</h1>
          <label>
            <select
              className="drop"
            >
              <option value="">Ruta</option>
              {RouteNames.map((route) => (
                <option key={route.id} value={route.id}>
                  {route.name}
                </option>
              ))}
            </select>
          </label>
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
            {activityToEdit.cost}
          </h1>
        </div>
      </div>
    </div>
  );
}
