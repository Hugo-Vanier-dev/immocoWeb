import React from 'react';
import addClient from '../../../assets/img/icons/AddClientIcon.png';
import clientList from '../../../assets/img/icons/ClientListIcon.png';
import dashboard from '../../../assets/img/icons/DashboardIcon.png';
import calendar from '../../../assets/img/icons/CalendarIcon.png';
import homeList from '../../../assets/img/icons/HomeListIcon.png';
import addHome from '../../../assets/img/icons/AddHomeIcon.png';
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
        <div className="SideMenuContainer bg-gray-300 shadow">    

            <div className="LogoIcoSideMenu shadow-md" />
            <div className="flex flex-wrap justify-start ml-2">
                <ButtonForMenu src={dashboard} path='/dashboard' />
                <ButtonForMenu src={clientList} path='/listeClient' />
                <ButtonForMenu src={addClient} path='/createClient' />
                <ButtonForMenu src={homeList} path='/listeProperty' />
                <ButtonForMenu src={addHome} path='createProperty' />
            </div>
        </div>
    )
}

export default SideMenu;