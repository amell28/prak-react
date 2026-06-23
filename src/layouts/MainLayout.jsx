import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function MainLayout({ profile }){
    return(
         <div id="app-container" className="bg-gray-100 min-h-screen flex">
      <div id="layout-wrapper" className="flex flex-row flex-1">
        <Sidebar profile={profile} />
        <div id="main-content" className="flex-1 p-4">
          <Header profile={profile} />
          <Outlet/>
        </div>
      </div>
    </div>

)
}
