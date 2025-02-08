import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/ui/layout/Layout";
import Home from "./pages/home/Home";
// import Informacion from "./pages/informacion/Informacion";
// import Foro from "./pages/foro/Foro";
// import Actividades from "./pages/actividades/Actividades";
// import Contacto from "./pages/contacto/Contacto";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>     
        <Route element={<Layout/>}> 
          <Route index element={<Home/>} />  
          {/* <Route path="contactanos" element={<Contacto />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);