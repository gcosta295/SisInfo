import { createContext, useState } from "react";
import PropTypes from 'prop-types';

const UserContext = createContext(null);

const UserProvider = ({children}) => {
    
    const [user, setUser] = useState('Felipe');

    return (<UserContext value={{ user, setUser }}>{children}</UserContext>)

}

export {UserContext, UserProvider} 

