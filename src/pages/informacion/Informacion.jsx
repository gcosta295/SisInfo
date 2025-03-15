import "./Informacion";
import { use } from 'react'
import { UserContext } from '../../context/UserContext.jsx';
import { useState } from "react";
import "./Informacion.css"; // Importamos los estilos

const rappel = "/fotos/Fotorapel.png";
const ruta = "/fotos/FotoRutas.png";
const guias = "/fotos/AvilaImg.png";

export default function Informacion() {
    // const contextUser = use(UserContext);
    // const {user, setUser} = contextUser;
    // console.log(contextUser);

    const contextProf = use(UserContext);
    const {profile, logged} = contextProf;
    console.log(contextProf);

    return (
    <div>
      <ParqueSection />
      <section className="news">
        <h2>Entérate de nuestras últimas noticias</h2>
        <Carousel />
      </section>
      <section className="tips">
      <h2>Consejos para nuestros AvilaTrekkers</h2>
      <TipsCarousel />
      </section>
    </div>
  );
}

function ParqueSection() {
    return (
      <section className="parque">
        <div className="parque-info">
          <img src="/fotos/inparques 1.png" />
          <div>
            <h2>Parque Nacional El Ávila</h2>
            <p>
              El Parque Nacional El Ávila, conocido como Waraira Repano, es un
              importante parque montañoso ubicado en Caracas, Venezuela.
              <br /><br />
              Se extiende a lo largo de la cordillera de la Costa, que se encuentra al norte de la ciudad de Caracas.
              Su acceso principal es a través de la carretera que conecta Caracas con la costa caribeña. Abarca aproximadamente 86,000 hectáreas
              y se eleva desde el nivel del mar hasta los 2,765 metros en su punto más alto, el Pico El Ávila.
            </p>
          </div>
        </div>
        <div className="parque-info reverse">
          <div>
            <h2> Naturaleza </h2>
            <p>
              Desde un punto de vista ecológico, el Ávila alberga una gran diversidad de flora y fauna. Su vegetación varía desde bosques secos en
              las zonas más bajas hasta bosques montanos en las áreas más altas. También cuenta con una fauna variada, que incluye aves como el quetzal y el tucán,
              así como mamíferos como zorros y venados.
              <br /><br />
              El Parque Nacional El Ávila, que abarca gran parte de la montaña, es un espacio protegido donde se promueve la conservación de estos ecosistemas. Además de su valor ecológico,
              el Ávila es también un atractivo turístico, con rutas de senderismo, el teleférico de Caracas, y miradores que ofrecen vistas espectaculares de la ciudad y la costa caribeña.
              <br /><br />
              La montaña tiene un clima variable, que puede ir desde cálido en las zonas bajas hasta fresco y más templado en las alturas, lo que contribuye a la diversidad de su flora y fauna.
            </p>
          </div>
          <img src="/fotos/FotoNaturaleza.png" />
        </div>
      </section>
    );
  }

function Carousel() {
    const news = [
      {
        date: "22 de febrero, 2025",
        title: "Ahora ofrecemos clases de Rappel",
        description: "Aventúrate con nosotros en nuevas experiencias.",
        image: rappel,
      },
      {
        date: "20 de febrero, 2025",
        title: "Incluimos una nueva ruta",
        description: "Prepárate para un nuevo desafío en la montaña.",
        image: ruta,
      },
      {
        date: "18 de febrero, 2025",
        title: "Contamos con 5 guías nuevos",
        description: "Guías expertos listos para ayudarte en tu aventura.",
        image: guias,
      },
      {
        date: "15 de febrero, 2025",
        title: "Nuevo horario de visitas",
        description: "Consulta nuestro nuevo horario para planificar tu visita.",
        image: rappel,
      },
      {
        date: "12 de febrero, 2025",
        title: "Evento especial: Noche de estrellas",
        description: "Disfruta de una noche mágica bajo las estrellas.",
        image: ruta,
      },
      {
        date: "10 de febrero, 2025",
        title: "Taller de fotografía en la montaña",
        description: "Aprende a capturar la belleza del Ávila.",
        image: guias,
      },
    ];
  
    const [index, setIndex] = useState(0);
  
    const nextSlide = () => {
      setIndex((prevIndex) => (prevIndex + 3) % news.length);
    };
  
    const prevSlide = () => {
      setIndex((prevIndex) => (prevIndex - 3 + news.length) % news.length);
    };
  
    // Obtener las 3 noticias actuales
    const currentNews = [
      news[index],
      news[(index + 1) % news.length],
      news[(index + 2) % news.length],
    ];
  
    return (
      <div className="carousel">
        <button className="prev" onClick={prevSlide}>‹</button>
        <div className="carousel-content">
          {currentNews.map((item, i) => (
            <div key={i} className="carousel-item">
              <div
                className="carousel-item-background"
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
              <div className="carousel-item-text">
                <h3>{item.date}</h3>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="next" onClick={nextSlide}>›</button>
      </div>
    );
  }

//  Sección de Consejos
function TipsCarousel() {
  const tips = [
    {
      title: "Calzado adecuado 🥾",
      description: "Usa botas de trekking cómodas para evitar lesiones y mejorar tu rendimiento en los senderos.",
    },
    {
      title: "Hidratación y alimentación 💧🍏",
      description: "Lleva mínimo 1.5L de agua y snacks energéticos para mantenerte en óptimas condiciones.",
    },
    {
      title: "Protección solar ☀️",
      description: "Usa bloqueador solar y gafas para protegerte de los rayos UV durante tu caminata.",
    },
    {
      title: "Ropa adecuada 🧥",
      description: "Viste en capas para adaptarte a los cambios de temperatura en la montaña.",
    },
    {
      title: "Planificación 🗺️",
      description: "Estudia la ruta antes de salir y lleva un mapa o GPS.",
    },
    {
      title: "Respeto por la naturaleza 🌿",
      description: "No dejes basura y respeta la flora y fauna del parque.",
    },
  ];

  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 3) % tips.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 3 + tips.length) % tips.length);
  };

  // Obtener los 3 tips actuales
  const currentTips = [
    tips[index],
    tips[(index + 1) % tips.length],
    tips[(index + 2) % tips.length],
  ];

  return (
    <div className="tips-carousel">
      <button className="prev" onClick={prevSlide}>‹</button>
      <div className="tips-carousel-content">
        {currentTips.map((tip, i) => (
          <div key={i} className="tip-card">
            <h3>{tip.title}</h3>
            <p>{tip.description}</p>
          </div>
        ))}
      </div>
      <button className="next" onClick={nextSlide}>›</button>
    </div>
);
}