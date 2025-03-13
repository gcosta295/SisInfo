import { useNavigate } from "react-router";
import { use, useEffect } from 'react'
import { UserContext } from '../../../context/UserContext';
import { Outlet } from 'react-router';


export default function ProtectedLogged() {

    const navigate = useNavigate();

    const contextProfi = use(UserContext);
    const { logged, loading} = contextProfi;
    // console.log(contextProfi);

    useEffect(() => {
        if (!loading && !logged) {
            navigate('/signup')
        }
    }, [logged, loading, navigate])

return(
    <Outlet />
)

}