import { Calendar } from "@mantine/dates";
import { Indicator } from '@mantine/core';
import { useState} from "react";

export default function CalendarComponent({data}) {
    const fixedDate = new Date(); // Fecha fija (15 de marzo de 2025)
    const [fixedDay, setFixedDate] = useState(fixedDate.getDate())
    const [fixedMonth, setFixedMonth] = useState(fixedDate.getMonth())
    const [fixedYear, setFixedYear] = useState(fixedDate.getFullYear())

    console.log(fixedYear)


return(
<div style={{ display: "flex", margin: "20px 0" }}>
<Calendar
static
value={fixedDate}
onChange={() => {}} // No permite cambios
excludeDate={(date) => date.getTime() !== fixedDate.getTime()} // Bloquea otras fechas
renderDay={(date) => {
const day = date.getDate();
return (
<Indicator size={6} color="red" offset={-2} disabled={day !== 16}>
<div>{day}</div>
</Indicator>
)
}}
size="md"
styles={{
day: (date) =>
date.getTime() === fixedDate.getTime()
? {
    backgroundColor: "#1971c2",
    color: "white",
    fontWeight: "bold",
    borderRadius: "50%",
  }
: { pointerEvents: "none", color: "#ccc" }, // Deshabilita otras fechas
}}
/>
        {/* <Calendar
        static
        renderDay={(date) => {
          const day = date.getDate();
          return (
            <Indicator size={6} color="red" offset={-2} disabled={day !== 16}>
              <div>{day}</div>
            </Indicator>
          );
        }}
            // value={fixedDate}
            // onChange={() => {}} // no permite cambios
            // excludeDate={(date) => date.getTime() !== fixedDate.getTime()} // bloquea todas las fechas excepto la fija
            // // fullWidth
            // size="md"
            // styles={{
            //     day: (date) =>
            //         date.getTime() === fixedDate.getTime()
            //             ? { backgroundColor: "#1971c2", color: "white", fontWeight: "bold", borderRadius: "50%" }
            //             : { pointerEvents: "none", color: "#ccc" }, // deshabilita otras fechas
            // }}
        /> */}
        {/* <Demo/> */}
</div>
)}