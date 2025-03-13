import "./Admin";
import "./Admin.css";

import { useNavigate } from "react-router";
import { db } from "../../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function Home() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  const [tSerch, setTSearch] = useState("normal");

  return (
    <div className="mainContainer">
      <div className="firstRow">
        <div className="empt"></div>
        <div className="Nombre">Nombre de Actividad</div>
        <div className="Precio">Precio</div>
        <div className="empt2"></div>
      </div>
      <div className="activities">
        {activities.map((activity) => (
          <RenderA
            key={activity.id}
            tipo={activity.type}
            name={activity.name}
            info={activity.info}
            images={activity.images}
            rating={activity.rating}
          />
        ))}
      </div>
    </div>
  );
}
