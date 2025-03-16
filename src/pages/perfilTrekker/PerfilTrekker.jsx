import "./PerfilTrekker.css";
import { use } from 'react'
import { UserContext } from '../../context/UserContext.jsx';


export default function PerfilTrekker() {

    const contextProfile = use(UserContext);
    const { profile} = contextProfile;
    // console.log(profile);

return(

    <h1>Prueba4 perfilllll trekker, estas loggeado!!</h1>
    )

}