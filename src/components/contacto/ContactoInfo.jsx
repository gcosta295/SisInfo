import LocationPinIcon from "../ui/icons/LocationPinIcon"
import MailIcon from "../ui/icons/MailIcon"
import PhoneIcon from "../ui/icons/PhoneIcon"
import ItemContacto from "./ItemContacto"

export default function ContactoInfo(){
    const items = [
        {
            icono: <LocationPinIcon className="size-8" />,
            titulo: "Ubicación",
            descripcion: "Avenida Universitaria, Universidad Metropolitana, Caracas, Venezuela",
        },
        {
            icono: <MailIcon className="size-8" />,
            titulo: "Correo",
            descripcion: "avila.trek@gmail.com",
        },
        {
            icono: <PhoneIcon className="size-8" />,
            titulo: "Teléfono",
            descripcion: "+58 123 456 7890",
        },
    ]
    return (
        <div className="bg-white rounded-2xl shadow border border-gray-300 md:absolute md:w-3xs w-full left-8" >
            {
                items.map((item) => (
                    <ItemContacto item={item} />
                ))
            }
        </div>
    )
}