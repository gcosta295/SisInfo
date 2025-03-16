import "./Informacion";
import { use } from 'react'
import { UserContext } from '../../context/UserContext.jsx';

export default function Informacion() {
    // const contextUser = use(UserContext);
    // const {user, setUser} = contextUser;
    // console.log(contextUser);

    const contextProf = use(UserContext);
    const {profile, logged} = contextProf;
    // console.log(profile);

    return(
        <h1>informacion pagina</h1>
    )

}