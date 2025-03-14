import "./EditarPerfilTrekker.css";
import { use } from 'react'
import { UserContext } from '../../context/UserContext.jsx';


export default function EditarPerfilTrekker() {

    const contextProfile = use(UserContext);
    const { logged} = contextProfile;
    // console.log(contextProfi);

return(

<h1>edit perfil trekker</h1>
)

}