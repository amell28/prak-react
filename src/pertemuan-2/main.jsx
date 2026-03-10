import { createRoot } from "react-dom/client";
import HelloWorld from "./HelloWorld";
import Container from "./Container";
import "./custom.css"

createRoot(document.getElementById("root"))
    .render(
        <div className ="app">
             <Container>
                <HelloWorld/>
            </Container>
        </div>
    )