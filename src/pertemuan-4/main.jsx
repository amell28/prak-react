import { createRoot } from "react-dom/client";
import TailwindCSS from "./TailwindCSS";
import "./tailwind.css"
import FrameworkList from "./FrameworkList";


createRoot(document.getElementById("root"))
    .render(
        <div >
    <FrameworkList/>
        </div>
    )