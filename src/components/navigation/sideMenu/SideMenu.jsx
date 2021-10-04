import React from 'react';
import { Link } from 'react-router-dom';
import authService from '../../../shared/services/auth.service';
import './SideMenu.css';

function SideMenu() {
    return(
        <div className="SideMenuContainer bg-gray-200 shadow grid grid-cols-1 static  z-30">    

            <div className="LogoIcoSideMenu shadow-md absolute mx-7 my-7 z-50" />
            <div className="grid grid-rows-6 h-64 justify-items-start my-64 z-40">
                <div className="btnMenu">
                    <Link to="/dashboard" className="px-5 text-blue-400 hover:text-indigo-700 font-bold text-lg uppercase">Tableau de bord</Link> 
                </div>       
                <div className="btnMenu">
                    <Link to="/clientPage" className="px-5 text-blue-400 hover:text-indigo-700 font-bold text-lg uppercase">Clients</Link>  
                </div>      
                <div className="btnMenu">
                    <Link to="/propertyPage" className="px-5 text-blue-400 hover:text-indigo-700 font-bold text-lg uppercase">Propriétés</Link>
                </div>   
                <div className="btnMenu">
                    <Link to="/clientPage" className="px-5 text-blue-400 hover:text-indigo-700 font-bold text-lg uppercase">Employés</Link>
                </div>
                <div className="btnMenu">
                    <button className="px-5 text-blue-400 hover:text-indigo-700 font-bold text-lg uppercase" onClick={() => authService.logout()}>Déconnexion</button>
                </div>
            </div>
        </div>
    )
}

export default SideMenu;