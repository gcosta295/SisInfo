import "./PerfilGuia";
import { use } from 'react'
import { UserContext } from '../../context/UserContext.jsx';


export default function PerfilGuia() {

    const contextProfile = use(UserContext);
    const { logged} = contextProfile;
    // console.log(contextProfi);

return(

<h1>Prueba perfilllll guia, estas logg</h1>
)

}