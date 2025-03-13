import "./EditarPerfilGuia.css";
import { use } from 'react'
import { UserContext } from '../../context/UserContext.jsx';


export default function EditarPerfilGuia() {

    const contextProfile = use(UserContext);
    const { logged} = contextProfile;
    // console.log(contextProfi);

return(

<h1>edit perfil guia</h1>
)

}