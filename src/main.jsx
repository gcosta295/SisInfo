import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/ui/layout/Layout";
import Home from "./pages/home/Home";
import PerfilTrekker from "./pages/perfilTrekker/PerfilTrekker.jsx";
import PerfilGuia from "./pages/perfilGuia/PerfilGuia.jsx";
import ProtectedLogged from "./components/ui/protectedRoutes/ProtectedLogged.jsx"
import Contacto from "./pages/contacto/Contacto";
import Actividades from "./pages/actividades/Actividades";
import Actividad from "./pages/actividad/Actividad";
import Reserva from "./pages/reserva/Reserva";
import ReservasTrekker from "./pages/reservasTrekker/ReservasTrekker";
import ReservasGuia from "./pages/reservasGuia/ReservasGuia";
import Signup from "./pages/signup/Signup";
import Informacion from "./pages/informacion/Informacion";
import Foro from "./pages/foro/Foro";
import Admin from "./pages/admin/Admin";
import { UserProvider } from './context/UserContext.jsx';
import ProtectedUserType from "./components/ui/protectedRoutes/ProtectedUserType.jsx";
import EditarPerfilTrekker from "./pages/editarPerfilTrekker/EditarPerfilTrekker.jsx";
import EditarPerfilGuia from "./pages/editarPerfilGuia/EditarPerfilGuia.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Toaster } from 'react-hot-toast';
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import EditAct from "./pages/editAct/EditAct.jsx";
import NewAc from "./pages/newAc/NewAc.jsx";


export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
    <UserProvider>
      <PayPalScriptProvider options={{ clientId: "AcSpzb5TqZYoNKDCXzrtCbJ8-KAGQW-HhAyDS9WUBCeNdjoSZq_AP1G0ypieXWM0181spQjyf-yjIefu" }}>
      <Toaster></Toaster>
      <BrowserRouter>
        <Routes>     
          <Route path= "signup" element={<Signup/>} />  {/* si no esta protegido, entra cualquiera. Todos permitidos */}
          <Route element={<Layout/>}> 

            <Route element={<ProtectedLogged/>}>
              <Route element={<ProtectedUserType roles={["guia", "administrador"]}/>}>   {/* usuarios permitidos: trekker (solo users loggeados) */}
                <Route path="mi-perfil-trekker" element={<PerfilTrekker/>} /> 
                <Route path="editar-trekker" element={<EditarPerfilTrekker/>} />
                <Route path="actividad" element={<Actividad/>} />
                <Route path="reserva" element={<Reserva/>} />
                <Route path="reserva/:actividadId" element={<Reserva/>} />
                <Route path="reservas-trekker" element={<ReservasTrekker/>} />
              </Route>
            </Route>

            <Route element={<ProtectedLogged/>}>
              <Route element={<ProtectedUserType roles={["trekker", "administrador"]}/>}> {/* usuarios permitidos: guia (solo users loggeados)*/}
                <Route path="mi-perfil-guia" element={<PerfilGuia/>} />
                <Route path="editar-guia" element={<EditarPerfilGuia/>} />
                <Route path="reservas-guia" element={<ReservasGuia/>} />
              </Route>
            </Route>

            <Route element={<ProtectedUserType roles={["guia", "administrador"]}/>}> {/* usuarios permitidos: trekker y cualquiera sin estar loggeado */}
              <Route path="actividades" element={<Actividades/>} />
              <Route path="actividad/:actividadId" element={<Actividad/>} />
            </Route>


            <Route element={<ProtectedUserType roles={["administrador"]}/>}>   {/* usuarios permitidos: trekker y guia, y cualquiera sin estar loggeado */}
              <Route index element={<Home/>} />  
              <Route path="foro" element={<Foro/>} />
              <Route path="informacion" element={<Informacion/>} />
              <Route path="contacto" element={<Contacto />} />
              <Route path="admin" element={<Admin />} />
              <Route path="editAct/:actividadId" element={<EditAct />} />
              <Route path="actividad/:name" element={<Actividad />} />
              <Route path="newAc" element={<NewAc />} />

            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      </PayPalScriptProvider>
    </UserProvider>
    </MantineProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);