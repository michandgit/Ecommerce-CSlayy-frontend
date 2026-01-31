import Latestfits from "./components/LatestFits";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import RootPage from "./pages/RootPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import AuthRootpage from "./pages/AuthRootpage";
import Login from './pages/Login'
import Signup from './pages/Signup'
import Men from "./pages/Men";
import Women from "./pages/Women";
import ProtectedRoute from "./pages/ProtectedRoute";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'product/:id', element: <ProtectedRoute><ProductPage /></ProtectedRoute> },
            { path: 'men', element: <ProtectedRoute><Men /></ProtectedRoute> },
            { path: 'women', element: <ProtectedRoute><Women /></ProtectedRoute> },
            { path: 'cart', element: <ProtectedRoute><CartPage /></ProtectedRoute> },
            {path: 'checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
            {path: 'order-success/:orderId', element: <ProtectedRoute><OrderSuccess /></ProtectedRoute> },
            {path:'orders', element:<ProtectedRoute><Orders /></ProtectedRoute>}
        ]
    },
    {
        path: '/auth',
        element: <AuthRootpage />,
        children: [
            { path: 'login', element: <Login /> },
            { path: 'signup', element: <Signup /> }
            
        ]
    }
]);
const App = () => {
    return <RouterProvider router={router} />;
}

export default App;