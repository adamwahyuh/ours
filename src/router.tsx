import { createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import GalleryPage from "./Pages/GalleryPage";

const router = createBrowserRouter([
    {
        path:"/",
        element: <HomePage />
    },
    {
        path:"/happy-birthday",
        element: <GalleryPage />
    }
])

export default router