import { useNavigate } from "react-router";
import { use, useEffect } from 'react'
import { UserContext } from '../../../context/UserContext';
import { Outlet } from 'react-router';


export default function ProtectedUserType({roles}) { //logica aplidada: excluir los tipos que no entran, para asi siempre incluir a usuarios no loggeados en algunas rutas. Si queremos que esten loggeados, aplicamos el otro tipo de ruyta protegida.

    const navigate = useNavigate();

    const contextProfi = use(UserContext);
    const {profile} = contextProfi;
    console.log(profile.tipoUsuario);
    console.log(roles);

    useEffect(() => {
        if (roles.includes(profile.tipoUsuario)) {
            navigate('/')
        }
    }, [roles, profile, navigate])

return(
    <Outlet />
)

}