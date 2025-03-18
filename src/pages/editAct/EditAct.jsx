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

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newName, setNewName] = useState("");
    const [newDesc, setNewDesc] = useState("");
    const [newGuide, setNewGuide] = useState("");
    const params = useParams();
    const [dataAct, setDataAct] = useState(null);
    const [routeData, setRouteData] = useState(null);
    const [newPrice, setNewPrice] = useState("");
    const [newImage, setNewImage] = useState("");
    const [newType, setNewType] = useState("");
    const [updateStatus, setUpdateStatus] = useState(null);
    const [guideNames, setGuideNames] = useState([]); // Combined guide names state
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
              }

              // Fetch all guides for the dropdown
              const guidesCollection = collection(db, "Users  ");
              const guidesSnap = await getDocs(guidesCollection);

              const names = guidesSnap.docs.map((doc) => {
                  const data = doc.data();
                  return {
                      id: doc.id,
                      name: `${data.firstName} ${data.lastName}`,
                  };
              });
              setGuideNames(names);

              setActivityToEdit(activityData);

              setNewName(activityData.name);
              setNewDesc(activityData.info);
              setNewPrice(activityData.price);
              setNewImage(activityData.image);
              setNewType(activityData.type);
              setNewGuide(activityData.guia);
              
              setLoading(false);
          } catch (err) {
              setError(err);
              setLoading(false);
              console.error("Error fetching data:", err);
          }
      };

      fetchData();
  }, [params?.actividadId]);
    const handleNameChange = (e) => {
      setNewName(e.target.value);
    };

    const handleDescChange = (e) => {
      setNewDesc(e.target.value);
    };

    const handlePriceChange = (e) => {
      setNewPrice(e.target.value);
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

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!params.actividadId) {
        setUpdateStatus("Error: documentId is missing.");
        return;
      }
      try {
        const docRef = doc(db, "Activities", params.actividadId);
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
          </button>
          <form onSubmit={handleSubmit}>
            <h1>Tipo de Ruta</h1>
            <label>
              <select
                className="drop"
                value={newName}
                onChange={handleNameChange}
              >
                <option value="">Selecciona</option>
                {guideNames.map((guide) => (
                  <option key={guide.id} value={guide.id}>
                    {guide.name}
                  </option>
                ))}
              </select>
            </label>
            <h1>Precio</h1>
            <label>
              <FontAwesomeIcon icon={faDollarSign} />
              <input type="text" value={newPrice} onChange={handlePriceChange} />
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
              <input type="text" value={newImage} onChange={handleImageChange} />
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
