import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {app} from '../firebase/firebase.js'
import { doc, getDoc, getFirestore } from "firebase/firestore";

const UserContext = createContext(null);

const auth = getAuth(app);

const db = getFirestore(app);

// eslint-disable-next-line react/prop-types
const UserProvider = ({children}) => {

    const [user, setUser] = useState('');
    const [profile, setProfile] = useState({});
    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(true);  //###estado de carga

    useEffect(()=>{   
        const unsubscribe = onAuthStateChanged(auth, async(userConnected)=>{  //devuelve el userConnected (el loggeado), si no hay un usuario loggeado devuelve null
            if(userConnected){
                const userDocRef = doc(db, 'Users', userConnected.uid)
                try{
                    const docSnap = await getDoc(userDocRef);
                    if(!docSnap.exists()){
                        console.log("Documento no existe!!!")
                        setProfile({});
                    }
    
                    setProfile({uid: userConnected.uid, ...docSnap.data()}); //se desestructura el objeto que trae docSnap, y para agregar uid se debe destructurar con esos ...
                    setLogged(true);
                    // console.log(await docSnap.data()) //sirve!!!
    
                }catch(error){
                    console.log(error)
                    setProfile({});
                    setLogged(false); //VER ERRORES AQUI
                }
            }else{
                setProfile({});
                setLogged(false);
            } 

            setLoading(false); // #### firebase ya  termino de verificar, entonces ya no esta cargando firebase buscando al user
        
        })

        return () => unsubscribe()

    },[])
    

    return (<UserContext value={{ user, setUser, profile, setProfile, logged, loading }}>{children}</UserContext>)

}

export {UserContext, UserProvider} 

