import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Outlet } from 'react-router';
import "./Layout.css";

export default function Layout(){
    return<div className='fondoLayout'>
         <Navbar/>
        <div className='contenido'> 
            <Outlet/> 
        </div>
        <Footer/>
    </div>
}