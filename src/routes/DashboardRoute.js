import { Navigate, Route, Routes } from "react-router-dom"
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Home from "../pages/Home"
import Newtopping from "../pages/Newtopping";

const DashboardRoute = () => {
    return (
        <>
        <Header/>
        <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/newToppings" element={<Newtopping/>} />
                <Route path="*" element={<Navigate to='/' />} />
            </Routes>

        </>
    )
}

export default DashboardRoute;
