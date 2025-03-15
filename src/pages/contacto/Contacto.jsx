import ContactoInfo from "../../components/contacto/ContactoInfo";
import "./Contacto";
import { useNavigate } from "react-router";

export default function Contacto() {

return (
    <div className="w-screen lg:h-screen md:p-24 p-10 flex md:flex-row flex-col-reverse justify-center items-center relative gap-4">
        <ContactoInfo />
        <div className="w-full h-fit shadow rounded-2xl overflow-clip">
            <div className="flex md:flex-row flex-col items-center h-fit">
                <img src="./fotologin.jpg" className="md:w-1/2 w-full md:h-full h-80 object-cover" align-middle alt="hiker" />
                <div className="flex flex-col gap-4 md:gap-8 p-8 md:p-12 lg:p-16 md:w-1/2 w-full">
                    <h1 className="text-2xl font-semibold">Contáctanos</h1>
                    <div className="flex flex-col gap-4 text-sm">
                        <p>
                            <b>¡AvilaTrekker!</b> ¡Nos encantaría saber de ti! Si tienes preguntas, comentarios o 
                            necesitas más información sobre nuestras excursiones en el Parque Nacional El Ávila, no dudes en ponerte 
                            en contacto con nosotros.
                        </p>
                        <p>
                            Estamos aquí para ayudarte a planificar una experiencia inolvidable en la naturaleza.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}