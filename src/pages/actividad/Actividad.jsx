import { useNavigate } from "react-router";
import "./Actividad";
import { db } from "../../firebase/firebase"; 
import { collection, query, where, getDocs } from "firebase/firestore"; 
import { useState, useEffect} from "react";

export default function Actividad() {
    const fullUrl = window.location.href; // Get the full URL
    const pathname = window.location.pathname; // Get the pathname
    const targetString = pathname.replace("/actividad/", "");
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
    GetData(targetString,activities);
    return <h1>Activity Details: {targetString}</h1>;
}

function GetData(targetString,activities){
  for(const x of activities.entries()) {
    if (x[1].id == targetString){               
        console.log(x[1]);
    }
}
}
