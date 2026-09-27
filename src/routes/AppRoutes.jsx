import { Routes, Route } from "react-router-dom";
import Appointment from "../pages/Appointment/Appointment";
import ArticlesPage from "../pages/Articles/ArticlesPage";
import ServicesPage from "../pages/Services/ServicesPage";
import GalleryPage from "../pages/Gallery/GalleryPage";
import App from "../App";

const AppRoutes = () => {

    return (

        <Routes>

            <Route path="/" element={<App />}/>

            <Route path="/appointment" element={<Appointment />}/>

            <Route path="/services"element={<ServicesPage />}/>

            <Route path="/articles" element={<ArticlesPage />}/>

            <Route path="/gallery" element={<GalleryPage />}/>
           

        </Routes>

    );

};

export default AppRoutes;