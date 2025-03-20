import "./Admin";
import "./Admin.css";

import { useNavigate } from "react-router";
import { db } from "../../firebase/firebase";
import { collection, query, where, getDocs, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [routeN, setRouteN] = useState(""); // Add newDate state

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const gotocontact5 = (event) => {
    navigate('/newAc'); // Include name as a URL parameter
};
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
    <div className="mainContainer2">
      <div className="botondiv">
      <button className="guardar right-side" onClick={gotocontact5}>Nueva Actividad</button>

      </div>
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
            type={activity.type}
            price={activity.cost}
            num={i+1}
            id={activity.id}
            route={activity.route}
          />
        ))}
      </div>
    </div>
  );
}

function RenderA({ route, price, num, id, type}) {
  const [routeName, setRouteName] = useState("");
  const rowClass = num % 2 === 0 ? "light" : "dark";
  const navigate2 = useNavigate();

  useEffect(() => {
      const fetchRouteName = async () => {
          if (route) {
              try {
                  const routeDoc = await getDoc(route);
                  if (routeDoc.exists()) {
                      setRouteName(routeDoc.data().name);
                  } else {
                      setRouteName("Route not found");
                  }
              } catch (error) {
                  console.error("Error fetching route:", error);
                  setRouteName("Error fetching route");
              }
          } else {
              setRouteName("No route assigned");
          }
      };

      fetchRouteName();
  }, [route]);

  const gotocontact4 = (event) => {
    navigate2(`/editAct/${encodeURIComponent(id)}`);
};

  return (
    <div className={rowClass}>
      <div className="empt">{num}</div>
      <div className="Nombre">
        <h2 className="n">{type} - {routeName}</h2>
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
 
