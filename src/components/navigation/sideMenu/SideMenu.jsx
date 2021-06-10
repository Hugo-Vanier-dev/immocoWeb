import React from 'react';
import './SideMenu.css';
import { Link } from 'react-router-dom';

function ButtonForMenu({src, path}){
    return(
        <div className="float-left grid grid-cols-1 gap-4">
            <Link to={path} className="buttonForMenuConfig col-span-1 p-3 m-1 bg-gray-100 rounded-xl hover:shadow-sm">
                <img className="MenuIcons" src={src} />
            </Link>
        </div>
    )
}

function SideMenu() {
    return(
        <div className="SideMenuContainer fixed bg-gray-200 shadow">    

            <div className="LogoIcoSideMenu shadow-md" />
            <div className="mt-5">
                <div className="mt-5">
                    <a href="/dashboard" className="m-auto mt-5 text-blue-400 hover:text-green-500 font-bold text-lg uppercase">Tableau de bord</a> 
                </div>       
                <div className="mt-5">
                    <a href="/listeClient" className="m-auto mt-5 text-blue-400 hover:text-green-500 font-bold text-lg uppercase">Clients</a>  
                </div>      
                <div className="mt-5">
                    <a href="../listProperty" className="m-auto mt-5 text-blue-400 hover:text-green-500 font-bold text-lg uppercase">Propriétés</a>
                </div>   
                <div className="mt-5">
                    <a href="../listUser" className="m-auto mt-5 text-blue-400 hover:text-green-500 font-bold text-lg uppercase">Employés</a>
                </div>
            </div>
        </div>
    )
}

export default SideMenu;