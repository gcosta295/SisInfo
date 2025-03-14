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
        <div className="empt2">Editar</div>
      </div>
      <div className="activities">
        {activities.map((activity, i) => (
          <RenderA
            key={activity.id}
            name={activity.name}
            price={activity.cost}
            num={i+1}
          />
        ))}
      </div>
    </div>
  );
}

function RenderA({ name, price, num}) {
    
    const rowClass = num % 2 === 0 ? "light" : "dark";
    const navigate2 = useNavigate();
    const gotocontact4 = (event) => {
        navigate2(`/actividad/:name/${encodeURIComponent(num-1)}`); // Include name as a URL parameter
    };
  return (
    <div className={rowClass}>
      <div className="empt">{num}</div>
      <div className="Nombre">
        <h2 className="n">{name}</h2>
      </div>
      <div className="Precio">
        <h2 className="n">{price}</h2>
      </div>
      <div className="empt2">
        <button className="edit" onClick={gotocontact4}>Edit</button>
      </div>
      
    </div>
  );
}
 
