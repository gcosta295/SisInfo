import "./PerfilTrekker.css";
import { use } from 'react'
import { UserContext } from '../../context/UserContext.jsx';


export default function PerfilTrekker() {

    const contextProfi = use(UserContext);
    const { logged} = contextProfi;
    // console.log(contextProfi);

return(

<h1>Prueba4 perfilllll trekker, estas loggeado!!</h1>
)

}