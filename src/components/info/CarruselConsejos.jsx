import CardWithAdvice from "../ui/card/CardWithAdvice";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

export default function CarruselConsejos(){
    const noticias=[{titulo:"Calzado adecuado 👟",
        descripcion1:"➕ Usa botas de trekking con suela antideslizante para mejor agarre en terrenos irregulares.",
        descripcion2:"➕ Si la caminata es corta y el terreno no es muy técnico, unas zapatillas de senderismo pueden ser suficientes."
    },
    {titulo:"Hidratación y alimentación 🥤🍏",
        descripcion1:"➕ Lleva mínimo 1.5 a 2 litros de agua, más si la ruta es larga o hace calor.",
        descripcion2:"➕ Lleva snacks energéticos, como frutos secos, barras de granola, chocolate o frutas deshidratadas.Evita comidas pesadas antes y durante la caminata.",    
    },
    {titulo:"Investiga la ruta 🚶",
        descripcion1:"➕ Antes de salir, asegúrate de conocer bien la ruta que vas a seguir. Esto te ayudará a estar preparado para lo que te espera. ",
        descripcion2:"➕ Consulta mapas, guías y aplicaciones de senderismo para entender el terreno, la duración y el nivel de dificultad"
    },
    {titulo:"Verifica el clima 🌧️",
        descripcion1:"➕ Revisa las condiciones meteorológicas antes de la excursión. El clima en la montaña puede cambiar rápidamente",
        descripcion2:"➕ Asegúrate de llevar ropa adecuada y estar preparado para cualquier eventualidad"
    },
    {titulo:"Respeto por la naturaleza 🌳",
        descripcion1:"➕ No dejes basura en el camino; lleva contigo todo lo que traigas ¡cuidemos nuestros espacios!",
        descripcion2:"➕ Respeta la flora y fauna local, mantente en los senderos marcados y evita dañar el entorno."
    },
    {titulo:"Equipo de seguridad 🧗‍♂️",
        descripcion1:"➕ Siempre lleva un botiquín de primeros auxilios y asegúrate de que esté completo.",
        descripcion2:"➕ Considera llevar un casco y arneses si planeas hacer actividades de rappel o escalada."
    },
    {titulo:"Utiliza ropa adecuada 🧥",
        descripcion1:"➕ Usa ropa ligera y transpirable que te mantenga cómodo durante la actividad, te será más fácil disfrutar de la experiencia.",
        descripcion2:"➕ Lleva una chaqueta impermeable o cortaviento, especialmente si hay posibilidad de lluvia o viento."
    }
    ]
    return (
        <div className="md:p-20 p-8">
            <h2 className="text-[40px] text-gray-700 font-bold mb-9">Consejos para nuestros AvilaTrekkers</h2>     
            <div className="bg-gray-100 shadow rounded-lg md:p-16 p-6 m-auto w-full h-fit">
                <Swiper
                  spaceBetween={50}
                  slidesPerView={2}
                  breakpoints={{
                    320: {
                        slidesPerView: 1,
                      },
                    1024: {
                      slidesPerView: 2,
                    },
                    1440: {
                        slidesPerView: 3,
                      },
                }}
                  onSlideChange={() => console.log('slide change')}
                  onSwiper={(swiper) => console.log(swiper)}
                >
                    {noticias.map((noticia,i) => (
                        <SwiperSlide>
                            <CardWithAdvice item={noticia}/>

                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </div>
    )

}