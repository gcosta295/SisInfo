import "./Contacto.css";
import { use } from 'react'
import { UserContext } from '../../context/UserContext.jsx';

export default function Contacto() {
    // const contextUser = use(UserContext);
    // const {user, setUser} = contextUser;
    // console.log(contextUser);

    const contextProf = use(UserContext);
    const {profile, logged} = contextProf;
    console.log(contextProf);

  return (
    <div className="contactoContainer">
      <div className="contactoContent">
        <div className="contactoImage">
          <img src="\fotos\fotologin.jpg" alt="Paisaje de senderismo" />
          <div className="contactoInfo">
            <div className="infoItem">
              <img src="\fotos\Ubicacion.svg" alt="Ubicación" />
              <div>
                <h3>Ubicación</h3>
                <p>Avenida Universitaria, Universidad Metropolitana, Caracas, Venezuela</p>
              </div>
            </div>
            <div className="infoItem">
              <img src="\fotos\Correo.svg" alt="Correo" />
              <div>
                <h3>Correo</h3>
                <p>avila.trek@gmail.com</p>
              </div>
            </div>
            <div className="infoItem">
              <img src="\fotos\Telefono.svg" alt="Teléfono" />
              <div>
                <h3>Teléfono</h3>
                <p>+58 123 456 7890</p>
              </div>
            </div>
          </div>
        </div>
        <div className="contactoTexto">
          <h2>Contáctanos</h2>
          <p>
            AvilaTrekker, nos encantaría saber de ti. <br></br><br></br>Si tienes preguntas, comentarios o necesitas más información sobre nuestras excursiones en el Parque Nacional El Ávila, no dudes en ponerte en contacto con nosotros.
          </p>
          <p></p>
          <p>Estamos aquí para ayudarte a planificar una experiencia inolvidable en la naturaleza.</p>
        </div>
      </div>
    </div>
  );
}