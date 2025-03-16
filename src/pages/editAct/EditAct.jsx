import "./EditAct";

import { db } from "../../firebase/firebase";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function EditActivity() {
  const fullUrl = window.location.href; // Get the full URL
  const pathname = window.location.pathname; // Get the pathname
  const targetString = pathname.replace("/editAct/", "");
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newName, setNewName] = useState("");
  const [updateStatus, setUpdateStatus] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Activities"));
        const activityData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setActivities(activityData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching activities:", err);
      }
    };
    fetchData();
  }, []);
  const handleInputChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!targetString) {
      setUpdateStatus("Error: documentId is missing.");
      return;
    }
    try {
      const docRef = doc(db, "Activities", targetString);
      await updateDoc(docRef, {
        name: newName,
      });
      setUpdateStatus("Name updated successfully!");
    } catch (error) {
        console.error("Error updating document:", error);
        setUpdateStatus("Error updating name: " + error.message); // Display error message
      }
  };

  if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const activityToEdit = activities.find(activity => activity.id === targetString);

    if (!activityToEdit) return <p>Activity not found.</p>;

  return (
    <div className="mainContainer">
      {/* <div className="leftColumn">
        <button className="botonR">Regresar</button>
        <div className="nombre">
          <h1> Nombre de la Actividad</h1>

        </div>
      </div> */}
      <h1>Edit Activity</h1>
      <form onSubmit={handleSubmit}>
        <label>
          New Name:
          <input type="text" value={newName} onChange={handleInputChange} />
        </label>
        <button type="submit">Update Name</button>
      </form>
      {updateStatus && <p>{updateStatus}</p>}
    </div>
  );
}

// function RenderA({ name, price, num, id }) {
//   return (
//     <div>
//       <div className="nombre">
//         <h1> Nombre de la Actividad</h1>
//       </div>
//       <div className="Nombre">
//         <h2 className="n">{name}</h2>
//       </div>
//       <div className="Precio">
//         <h2 className="n">{price}</h2>
//       </div>
//       <div className="empt2">
//         <button className="edit" onClick={gotocontact4}>
//           Edit
//         </button>
//       </div>
//     </div>
//   );
// }
