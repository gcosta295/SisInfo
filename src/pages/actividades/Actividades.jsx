import "./Actividades.css";
import { useNavigate } from "react-router";
import { db } from "../../firebase/firebase";
import { collection, getDocs, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function Actividades() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [RouteNames, setRouteNames] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Activities"));
        const activityData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setActivities(activityData);
        setFilteredActivities(activityData); // Inicializa con todas las actividades
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching activities:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchRouteNames = async () => {
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
    };
    fetchRouteNames();
  }, []);

  const Serch = async () => {
    const list = [];
    const data = searchText; // Usa el estado searchText
    if (
      data.toLowerCase() === "Rappel".toLowerCase() ||
      data.toLowerCase() === "Excursion".toLowerCase() ||
      data.toLowerCase() === "Paseo".toLowerCase() ||
      data.includes("/")
    ) {
      if (data.toLowerCase() === "Rappel".toLowerCase() || data.toLowerCase() === "Excursion".toLowerCase() || data.toLowerCase() === "Paseo".toLowerCase()) {
        activities.forEach((activity) => {
          if (activity.type?.toLowerCase() === data.toLowerCase()) {
            list.push(activity);
          }
        });
      }
      if (data.includes("/")) {
        activities.forEach((activity) => {
          const myDate = new Date(activity.date.seconds * 1000);
          const myArray = myDate.toLocaleString().split(",");
          console.log(myArray);
          try {
            const Array1 = searchText.split("/");
            const Array2 = myArray[0].split("/");
            if (
              parseInt(Array1[0]) - parseInt(Array2[0]) === 0 &&
              parseInt(Array1[1]) - parseInt(Array2[1]) === 0
            ) {
              if (
                (parseInt(Array1[2]) - parseInt(Array2[2])) % 10 === 0 &&
                parseInt(Array1[2]) - parseInt(Array2[2]) >= 0
              ) {
                list.push(activity);
              }
            }
          } catch (err) {
            console.error("Error parsing date:", err);
          }
        });
      }
    } else {
      RouteNames.forEach((routeName) => {
        if (routeName.name.toLowerCase().includes(data.toLowerCase())) {
          activities.forEach((activity) => {
            if (activity.route.id == routeName.id) {
              list.push(activity);
            }
          });
        }
      });
    }
    setFilteredActivities(list); // Actualiza el estado con los resultados
  };

  return (
    <div className="container">
      <div className="ActividadHome">
        <img
          src="\fotos\caminio.jpg"
          alt="Bosque"
          className="imgActividadHome"
        />
      </div>
      <div className="container">
        <div className="fraseMain">
          <p className="fraseM">
            Elige una de las actividades para una excursión
          </p>
          <p className="fraseM">guiada según las rutas que ofrecemos</p>
        </div>
        <div className="containerDivisor">
          <div className="divisor"></div>
        </div>
        <div className="multi-button">
          <label>
            <input
              className="box-text"
              
              placeholder="     Tipo Ruta / Fecha (MM/DD/YY) / Nombre"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </label>
          <button className="menu-button2" onClick={Serch}>
            <span style={{color: "white"}}>Buscar</span>
          </button>
        </div>
      </div>

      <div className="container">
        <ul className="Acs">
          {filteredActivities.map((activity) => (
            <RenderA
              key={activity.id}
              id={activity.id}
              tipo={activity.type}
              name={activity.name}
              info={activity.info}
              images={activity.image}
              rating={activity.rating}
              list={activities}
              route={activity.route}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function RenderA({ activityId, name, info, tipo, images, rating, id, route }) {
  const mountainImages = [1, 2, 3, 4, 5];
  const navigate1 = useNavigate();
  const gotocontact3 = () => {
    navigate1(`/actividad/${id}`);
  };

  const [routeName, setRouteName] = useState("");

  useEffect(() => {
    const fetchRouteName = async () => {
      const routeDoc = await getDoc(route);
      if (route) {
        try {
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

  return (
    <li className="ac">
      <div className="imgs">
        <img src={images} className="ImageA" alt="" />
      </div>
      <div className="acl">
        <h1 className="titleTipo titles">{tipo}</h1>
        <h2 className="titleName titles">{routeName}</h2>
        <p className="p titles">{info}</p>
        <div className="simbolos">
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
        <button className="verInfo" onClick={gotocontact3}>
          Ver detalles
        </button>
      </div>
    </li>
  );
}
