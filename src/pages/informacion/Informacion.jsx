import "./Informacion";
import { use } from 'react'
import { UserContext } from '../../context/UserContext.jsx';

export default function Informacion() {
    // const contextUser = use(UserContext);
    // const {user, setUser} = contextUser;
    // console.log(contextUser);

    const contextProf = use(UserContext);
    const {profile, logged} = contextProf;
    console.log(contextProf);

return(
    <div>


    <div className = "w-screen lg:h-screen md:h-fit md:p-24 p-10 flex flex-col-reverse justify-center items-center relative gap-4">
            <div className="bg-gray-100 w-fit md:w-2xl lg:w-fit h-fit shadow rounded-2xl overflow-clip">
            <div className="flex md:flex-row flex-col items-center h-fit">
                <img src="./cortafuegos.png" className="md:w-64 w-fit h-fit object-cover align-middle px-2 justify-end" alt="cortafuegos"/>
                <div className="flex flex-col gap-4 md:gap-8 p-8 md:p-6 lg:p-2 md:w-1/2 w-full">
                    <h1 className="semibold text-2xl">Naturaleza</h1>
                    <div className="flex flex-col gap-4 text-sm lg:px-1 lg:w-lg">
                        <p> 
                        Desde un punto de vista ecológico, el Ávila alberga una gran diversidad de flora y fauna. Su vegetación varía 
                        desde bosques secos en las zonas más bajas hasta bosques montanos en las áreas más altas. También cuenta con una 
                        fauna variada, que incluye aves como el quetzal y el tucán, así como mamíferos como zorros y venados.
                        </p>
                        <p>
                        El Parque Nacional El Ávila, que abarca gran parte de la montaña, es un espacio protegido donde se promueve la 
                        conservación de estos ecosistemas. Además de su valor ecológico, el Ávila es también un atractivo turístico, con 
                        rutas de senderismo, el teleférico de Caracas, y miradores que ofrecen vistas espectaculares de la ciudad y la costa 
                        caribeña.
                        </p>
                        <p>
                        La montaña tiene un clima variable, que puede ir desde cálido en las zonas bajas hasta fresco y más templado en las 
                        alturas, lo que contribuye a la diversidad de su flora y fauna.
                        </p>
                    </div>
                </div>
            </div>
            </div>        
            <div className="bg-gray-100 w-fit md:w-2xl lg:w-fit h-fit shadow rounded-2xl overflow-clip">
            <div className="flex md:flex-row flex-col items-center h-fit">
                <img src="./inparques.png" className="md:w-64 w-fit md:h-fit h-fit object-cover align-middle px-2" alt="inparques"/>
                <div className="flex flex-col gap-4 md:gap-8 p-8 md:p-6 lg:p-2 md:w-1/2 w-full">
                    <h1 className="semibold text-2xl">Parque Nacional El Ávila</h1>
                    <div className="flex flex-col gap-4 text-sm lg:px-1 lg:w-lg">
                        <p> 
                        El Parque Nacional El Ávila, conocido originalmente como Waraira Repano, es un importante parque nacional 
                        ubicado en Caracas, Venezuela.
                        </p>
                        <p>
                        Se extiende a lo largo de la cordillera de la Costa, que se encuentra al norte de la ciudad de Caracas. 
                        Su acceso principal es a través de la carretera que conecta Caracas con la costa caribeña. Abarca 
                        aproximadamente 86,000 hectáreas y se eleva desde el nivel del mar hasta los 2,765 metros en su punto 
                        más alto, el Pico El Ávila.
                        </p>
                    </div>
                </div>
            </div>
            </div>
    </div>
        <div className="flex flex-col justify-center items-center">
            <div className="bg-gray-400 w-9/12 md:w-2xl lg:w-196 h-0.5 mt-1.5 mb-2"></div>
        </div>      
    
    </div>

)
}