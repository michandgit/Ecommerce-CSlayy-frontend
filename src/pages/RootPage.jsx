import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../store/AuthContextProvider";
import { useContext } from "react";
import Loading from "../components/Loading";
const RootPage = () => {
    const { isLoading } = useContext(AuthContext);
    if (isLoading) {
        return <Loading />;
    }

    return <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
}

export default RootPage;