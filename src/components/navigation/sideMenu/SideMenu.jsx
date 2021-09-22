import React from 'react';
import { Link } from 'react-router-dom';
import authService from '../../../shared/services/auth.service';
import './SideMenu.css';

function SideMenu() {
    return(
        <div className="SideMenuContainer bg-gray-200 shadow">    

            <div className="LogoIcoSideMenu shadow-md" />
            <div className="mt-20">
                <div className="mt-10">
                    <Link to="/dashboard" className="m-auto mt-5 text-blue-400 hover:text-green-500 font-bold text-lg uppercase">Tableau de bord</Link> 
                </div>       
                <div className="mt-10">
                    <Link to="/clientPage" className="m-auto mt-5 text-blue-400 hover:text-green-500 font-bold text-lg uppercase">Clients</Link>  
                </div>      
                <div className="mt-10">
                    <Link to="/propertyPage" className="m-auto mt-5 text-blue-400 hover:text-green-500 font-bold text-lg uppercase">Propriétés</Link>
                </div>   
                <div className="mt-10">
                    <Link to="/clientPage" className="m-auto mt-5 text-blue-400 hover:text-green-500 font-bold text-lg uppercase">Employés</Link>
                </div>
                <div className="mt-10">
                    <p className="m-auto mt-5 text-blue-400 hover:text-green-500 font-bold text-lg uppercase" onClick={() => authService.logout()}>Déconnexion</p>
                </div>
            </div>
        </div>
    )
}

export default SideMenu;