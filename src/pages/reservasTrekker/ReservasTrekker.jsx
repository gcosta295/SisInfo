import "./ReservasTrekker";
import { useNavigate } from "react-router";
import { db } from "../../firebase/firebase"; 
import { query, getDocs, getFirestore, collection, where } from "firebase/firestore";
import { use, useState, useEffect} from "react";
import { UserContext } from '../../context/UserContext.jsx';


export default function ReservasTrekker() {

    const contextProfile = use(UserContext);
    const { profile} = contextProfile; 
    // console.log(profile.uid)

    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const userRef = `/Users/${profile.uid}`;
                console.log("bduscando reservas para:", userRef);

                const q = query(
                    collection(db, "Reservations"),
                    where("user", "==", userRef) 
                );

                const querySnapshot = await getDocs(q);
                const reservas = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setData(reservas);
                console.log("Reservas encontradas:", reservas);
            } catch (error) {
                console.error("Error obteniendo reservas:", error.message);
            }
        }

        getData();
        }, [profile.uid]);



    return(
        <>
        <h2>Mis Reservas</h2>
            <ul>
                {data.length > 0 ? (
                    data.map((reserva) => (
                        <li key={reserva.id}>
                            Actividad: {reserva.activity} - Fecha: {reserva.reservationDate}
                        </li>
                    ))
                ) : (
                    <p>No tienes reservas</p>
                )}
            </ul>
        </>
)

}