import CardWithImage from "../ui/card/CardWithImage";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';


export default function CarruselNoticias(){
    const noticias=[{titulo:"Ahora ofrecemos clases de Rappel",
        fecha:"22 de Febrero, 2025",
        descripcion:"Aventúrate con nosotros",
        imagen: "./fotos/informacion/news_rappel.png"
    },
    {titulo:"Incluimos una nueva ruta",
        fecha:"29 de Enero, 2025",
        descripcion:"Prepárate para Los Venados",
        imagen: "./fotos/informacion/news_rutas.png"
    },
    {titulo:"Contamos con 5 guías nuevos",
        fecha:"16 de Enero, 2025",
        descripcion:"Aventúrate con nosotros",
        imagen: "./fotos/informacion/news_guias.png"
    },
    {titulo:"Premios para nuestros Trekkers",
        fecha:"16 de Febrero, 2025",
        descripcion:"Vive una experiencia genial",
        imagen: "./fotos/informacion/news_premio.png"
    },
    {titulo:"Taller de fotografía de naturaleza",
        fecha:"20 de Marzo, 2025",
        descripcion:"Captura la belleza de nuestros paisajes",
        imagen: "./fotos/informacion/news_taller_fotografia.png"
    },
    {titulo:"Nueva experiencia de rappel nocturno",
        fecha:"10 de Marzo, 2025",
        descripcion:"Descubre la adrenalina bajo las estrellas",
        imagen: "./fotos/informacion/news_rappel_nocturno.png"
    },
    {titulo:"Nuevas rutas de senderismo",
        fecha:"15 de Marzo, 2025",
        descripcion:"Descubre vistas espectaculares.",
        imagen: "./fotos/informacion/news_nuevas_rutas_senderismo.png"
    },
    {titulo:"Taller de técnicas de escalada",
        fecha:"22 de Marzo, 2025",
        descripcion:"Únete a nuestro taller para aprender técnicas avanzadas de escalada y rappel.",
        imagen: "./fotos/informacion/news_taller_escalada.png"
    }

    ]
    return (
        <div className="md:px-20 md:py-16 p-8">
            <h2 className="text-[40px] text-gray-700 font-bold mb-9">Entérate de nuestras últimas noticias</h2>     
            <div className="bg-white shadow rounded-lg md:p-16 p-6 m-auto w-full h-fit">
                <Swiper
                  spaceBetween={50}
                  slidesPerView={3}
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
                            <CardWithImage item={noticia}/>

                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </div>
    )

}