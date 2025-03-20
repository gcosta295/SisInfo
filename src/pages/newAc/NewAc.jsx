import "./NewAc";
import "./NewAc.css";
import toast from 'react-hot-toast';

import { db } from "../../firebase/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc, Timestamp
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

export default function CreateActivity() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newGuide, setNewGuide] = useState("");
  const [newCost, setNewCost] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newType, setNewType] = useState("");
  const [newRoute, setNewRoute] = useState("");
  const [newDate, setNewDate] = useState(""); // Add newDate state
  const [newDif, setNewDif] = useState("");

  const [updateStatus, setUpdateStatus] = useState(null);
  const [guideNames, setGuideNames] = useState([]);
  const [RouteNames, setRouteNames] = useState([]);

  const typeOptions = ["Paseo", "Rappel", "Excursion"];

  useEffect(() => {
    const fetchData = async () => {
      try {
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

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

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

    if (newDif < 1 || newDif > 5) {
          toast.error("Error: La dificultad debe estar entre 1 y 5.");
          return;
        }

    if (!newRoute || !newDesc || !newCost || !newImage || !newType || !newGuide)
      return;
    try {
      const activitiesCollection = collection(db, "Activities");
      const guideRef = doc(db, "Users", newGuide);
      const routeRef = doc(db, "Routes", newRoute);
      const dateTimestamp = Timestamp.fromDate(new Date(newDate));

      await addDoc(activitiesCollection, {
        name: newName,
        info: newDesc,
        cost: newCost,
        image: newImage,
        type: newType,
        guia: guideRef,
        route: routeRef,
        date: dateTimestamp, // Save Timestamp
        rating: newDif,
      });
      toast.success("Actividad creada con éxito");
    } catch (error) {
      console.error("Error creating document:", error);
      // setUpdateStatus("Error creating activity: " + error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const gotoAdmin = () => {
    navigate(`/admin`);
  };
  return (
    <>
    
    <button type="button" className="returnNewAct" onClick={gotoAdmin}>
    Regresar
  </button>
    <div className="mainContainerNewAct">
      
       
        <form className="formNuevaAct" onSubmit={handleSubmit}>
    
          <h1>Tipo de Ruta</h1>
          <label>
            <select
              className="drop"
              value={newRoute}
              onChange={handleRouteChange}
            >
              <option value="">Ruta</option>
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
            <input
              type="text"
              className="textinput"
              value={newCost}
              onChange={handleCostChange}
              
            />
          </label>
          <h1>Dificultad</h1>
          <label>
            <input type="text" className="textinput" value={newDif} onChange={handleDifChange} min="1"
    maxLength={1}/>
          </label>
          <h1>Descripción</h1>
          <label>
            <textarea
              className="descripNueva"
              value={newDesc}
              onChange={handleDescChange}
            ></textarea>
          </label>
          <h1>URL de Imagen</h1>
          <label className="L">
            <input
              type="text"
              className="textinput"
              value={newImage}
              onChange={handleImageChange}
            />
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
          <h1>Fecha y Hora</h1>
          <label>
            <input
            className="drop"
              type="datetime-local"
              value={newDate}
              onChange={handleDateChange}
            />
          </label>
          <div className="botoncitos">
            <button type="submit" className="guardar">
              Guardar
            </button>
          </div>
        </form>
        {updateStatus && <p>{updateStatus}</p>}
      </div>
  </>
  );
}
