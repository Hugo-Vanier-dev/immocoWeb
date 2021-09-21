import React from 'react';
import './SideMenu.css';

function SideMenu() {
    return(
        <div className="SideMenuContainer bg-gray-200 shadow">    

            <div className="LogoIcoSideMenu shadow-md" />
            <div className="mt-20">
                <div className="mt-10">
                    <a href="/dashboard" className="m-auto mt-5 text-blue-400 hover:text-green-500 font-bold text-lg uppercase">Tableau de bord</a> 
                </div>       
                <div className="mt-10">
                    <a href="/clientPage" className="m-auto mt-5 text-blue-400 hover:text-green-500 font-bold text-lg uppercase">Clients</a>  
                </div>      
                <div className="mt-10">
                    <a href="/propertyPage" className="m-auto mt-5 text-blue-400 hover:text-green-500 font-bold text-lg uppercase">Propriétés</a>
                </div>   
                <div className="mt-10">
                    <a href="/listUser" className="m-auto mt-5 text-blue-400 hover:text-green-500 font-bold text-lg uppercase">Employés</a>
                </div>
            </div>
        </div>
    )
}

export default SideMenu;