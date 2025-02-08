import "./Home.css";
import { useNavigate } from "react-router";


export default function Home() {
  
  const navigate = useNavigate(); // solo se importa 1 vez aqui

    const gotocontact1 = (event) => {
        navigate("/actividades")
    }

    const gotocontact2 = (event) => {
      navigate("/foro")
  }

  return (
    <div className='homeContainer'>
      <div className="avilaHome">
        <img src="src/assets/fotos/elAvilaHome.jpg" alt="Avila" className="imgAvilaHome"/>
          <p className="textoImgHome">Tu aventura empieza aquí</p>
          <button className='botonReservaYa' onClick={gotocontact1}>Reserva ya<img src="src/assets/fotos/flecha.png" className="imgFlecha"/></button>
      </div>
      <div className="fraseHome">
        <p className="fraseHome1">Excursiones, paseos y rappel en el parque nacional</p>
        <p className="fraseHome2">El Ávila con guías certificados</p>
      </div>
      <div className="containerDivisor"><div className="divisor"></div></div>
      <div className="containerMVO">
        <div className="mision">
          <img src="src/assets/fotos/mision.svg" className="imgMision"/>
          <p className="tituloMision">Misión</p>
          <p className="descripcionMision">Promover el bienestar y la conexión con la naturaleza entre los estudiantes de la Universidad Metropolitana a través de excursiones en nuestro parque nacional el Ávila</p>
        </div>
        <div className="vision">
          <img src="src/assets/fotos/vision.svg" className="imgVision"/>
          <p className="tituloVision">Visión</p>
          <p className="descripcionVision">Inspirar a los estudiantes a explorar y disfrutar de la naturaleza, convirtiendo cada excursión en una oportunidad para aprender, compartir y crecer</p>
        </div>
        <div className="objetivo">
          <img src="src/assets/fotos/objetivo.svg" className="imgObjetivo"/>
          <p className="tituloObjetivo">Objetivo</p>
          <p className="descripcionObjetivo">Fomentar el cuidado de la naturaleza a través de actividades de esparcimiento y recreación, incentivando la participación activa de los estudiantes de la Universidad Metropolitana</p>
        </div>
      </div>
      <div className="containerDivisor"><div className="divisor2"></div></div>
      <div className="actividadesOfrecemos">Actividades que ofrecemos</div>
      <div className="containerDescripcionActividades">
        <div className="fondoDescrip">
          <div className="excursiones">
            <img src="src/assets/fotos/excursionesHome.jpg" className="imgExcursionesHome"/>
            <div className="sombra"></div>
            <div className="tituloExcursiones">Excursiones 👟</div>
            <div className="excursionesDescrip1">Caminata de mayor duración y exigencia en senderos de montaña, con ascensos y posibles pernoctas</div>
            <div className="excursionesDescrip2">Ideal para exploradores que buscan aventura y contacto con la naturaleza</div>
          </div>
          <div className="paseos">
            <img src="src/assets/fotos/paseosHome.jpg" className="imgPaseosHome"/>
            <div className="sombra"></div>
            <div className="tituloPaseos">Paseos 🚶</div>
            <div className="paseosDescrip1">Caminata corta y relajada por senderos accesibles, sin gran esfuerzo físico</div>
            <div className="paseosDescrip2">Perfecto para disfrutar del paisaje sin gran preparación física</div>
          </div>
          <div className="rappel">
            <img src="src/assets/fotos/rappelHome.jpg" className="imgRappelHome"/>
            <div className="sombra"></div>
            <div className="tituloRappel">Rappel  🧗</div>
            <div className="rappelDescrip1">Descenso controlado por paredes rocosas con equipo especializado</div>
            <div className="rappelDescrip2">Es una actividad más técnica y requiere supervisión experta</div>
          </div>
        </div>
      </div>
      <div className="actividadesHome">
        <div className="rutas">
          <img src="src/assets/fotos/rutas.jpg" className="imgRutas"/>
        </div>
        <div className="textoActividades">
          <p className="textoActividades1">Únete a la aventura</p>
          <p className="textoActividades2">Conoce los tipos de actividades ofrecidas en las diferentes rutas y <b>reserva</b> para vivir una  experiencia única en la naturaleza</p>
          <button className='botonVerActividades' onClick={gotocontact1}>Ver actividades</button>
        </div>
      </div>
      <div className="foroHome">
        <div className="textoForo">
          <p className="textoForo1">Conoce las opiniones de otros AvilaTrekkers</p>
          <p className="textoForo2">Consulta el <b>feedback</b> de otros estudiantes que han participado en excursiones en el <b>foro</b> y motívate a explorar nuestro parque nacional</p>
          <button className='botonIrAlForo' onClick={gotocontact2}>Ir al foro</button>
        </div>
        <div className="foroHomeImg">
          <img src="src/assets/fotos/foroHome.jpg" className="imgForoHome"/>
        </div>
      </div>
    </div>
)
} 