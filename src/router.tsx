import { createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import GalleryPage from "./Pages/GalleryPage";
import NotFoundPage from "./Pages/NotFoundPage";

const router = createBrowserRouter([
    {
        path:"/",
        element: <HomePage />
    },
    {
        path:"/happy-birthday",
        element: <GalleryPage />
    },
    {
        path : "*",
        element : <NotFoundPage />
    }
], {basename : "/ours"})

export default router