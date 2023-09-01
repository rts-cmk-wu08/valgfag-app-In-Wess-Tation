import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./App";
import Search from "./Pages/Search";
import Main from "./Pages/Main";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<Main />}/>
            <Route path="/search" element={<Search />}/>            
        </Route>
    )
)


