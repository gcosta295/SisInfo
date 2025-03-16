import "./Paypal.css";
import { PayPalButtons } from "@paypal/react-paypal-js";
import toast from 'react-hot-toast';
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.js";
import { UserContext } from '../../../context/UserContext.jsx';
import { use } from 'react'
import { useNavigate } from "react-router";

export default function Paypal({actividad}) {
  const actividadId = actividad.id;
  // console.log("de actividad: ",actividad.id)
  // console.log("de actividadId: ",actividadId) //sirven igual!!!

  const contextProfile = use(UserContext);

  const navigate = useNavigate();

  const {profile} = contextProfile; 

    return (
        <PayPalButtons className="botonPaypal" style={{ layout: "horizontal" }} 
        createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: actividad.cost,
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then(async(details) => {
                

            try{
            const userRef = doc(db, "Users", profile.uid);
            const activityRef = doc(db, "Activities", actividadId);
            const reservationRef = doc(db, "Reservations", data.orderID);

            await setDoc(reservationRef, {
              user: userRef, //se guarda como reference
              activity: activityRef, //se guarda como reference
              transactionId: data.orderID,
              reservationDate: new Date(),
            });
              toast.success('Reserva exitosa')
              navigate(`/actividad/${actividadId}`)
                setTimeout(1000);
                } catch (e){
                  toast.error("Error al crear la reserva");
                  console.error(e);
                }
            //   alert('Transacción completada por ' + details.payer.name.given_name);
            });
          }}
        />

        
    );
}