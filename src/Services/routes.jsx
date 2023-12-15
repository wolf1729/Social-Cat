import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginScreen from "../Screens/LoginScreen";
import RegistrationScreen from "../Screens/RegistrationScreen";
import MainScreen from "../Screens/MainScreen";
import SearchedUserPage from "../Screens/SearchedUserPage";

const Router = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <LoginScreen />
        },
        {
            path: "/registration",
            element: <RegistrationScreen />
        },
        {
            path: "/userMainPage",
            element: <MainScreen />
        },
        {
            path: "/searchedUser/:userId",
            element: <SearchedUserPage />
        }
    ]);

    return <RouterProvider router={router} />
}

export default Router;