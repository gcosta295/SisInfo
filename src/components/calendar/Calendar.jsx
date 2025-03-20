import { Calendar } from "@mantine/dates";
import { useState} from "react";

export default function CalendarComponent({data}) {
  console.log(data)
    const fixedDate = new Date(data?.seconds * 1000 + data?.nanoseconds / 1000000); // Fecha fija (15 de marzo de 2025)
    console.log(fixedDate)

    const [fixedDay, setFixedDay] = useState(fixedDate.getDate())
    const [fixedMonth, setFixedMonth] = useState(fixedDate.getMonth())
    const [fixedYear, setFixedYear] = useState(fixedDate.getFullYear())

    console.log( fixedDate.getDate(), fixedDate.getMonth(), fixedDate.getFullYear())

return(
  <div style={{ display: "flex", margin: "20px 0" }}>
    <Calendar
      static
      value={fixedDate}
      onChange={() => {}} 
      // excludeDate={(date) => date.getTime() !== fixedDay.getTime()}
      minDate={fixedDate}
        maxDate={fixedDate} 
        disableOutsideEvents 
      renderDay={(date) => {
        const day = date;
        const sameDay = day.getDate() === fixedDate.getDate() && day.getMonth() === fixedDate.getMonth() && day.getFullYear() === fixedDate.getFullYear()
        console.log(day.getDate(), fixedDay, day.getMonth(), fixedMonth, day.getFullYear(), fixedYear)
        return (
          // <Indicator size={6} color="red" offset={-2} disabled={day !== 16}>
            <div className="" style={{backgroundColor: !sameDay ? "#FFFFFF":"green", borderRadius: "40px", color: !sameDay ? "#000000":"#FFFFFF", width: "38px", display: "flex", justifyContent: "center", padding: "5px"}}>{day.getDate()}</div>
          // </Indicator>
        )
      }}
      size="md"
      styles={{
      day: (date) =>{
        const day = date;
        const sameDay = day.getDate() === fixedDate.getDate() && day.getMonth() === fixedDate.getMonth() && day.getFullYear() === fixedDate.getFullYear()

        return sameDay
        ? {
            backgroundColor: "#1971c2",
            color: "white",
            fontWeight: "bold",
            borderRadius: "50%",
          }
        : { pointerEvents: "none", color: "#ccc" }
      },
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
              // excludeDate={(date) => date.getTime() !== fixedDate.getTime()} 
              // // fullWidth
              // size="md"
              // styles={{
              //     day: (date) =>
              //         date.getTime() === fixedDate.getTime()
              //             ? { backgroundColor: "#1971c2", color: "white", fontWeight: "bold", borderRadius: "50%" }
              //             : { pointerEvents: "none", color: "#ccc" }, 
              // }}
          /> */}
          {/* <Demo/> */}
  </div>
)}