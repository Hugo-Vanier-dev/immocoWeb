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
            <Link to={path} className="buttonForMenuConfig col-span-1 p-3 m-1 border-2  border-opacity-50 border-white bg-gradient-to-t from-transparent to-blue-200 hover:bg-gradient-to-t hover:to-blue-200 hover:border-blue-400 rounded-xl shadow-md hover:shadow-xl">
                <img className="MenuIcons" src={src} />
            </Link>
        </div>
    )
}

function SideMenu() {
    return(
        <div>
        <div className="SideMenuContainer border-r-4 border-b-4 border-white border-opacity-75 bg-gradient-to-t from-blue-100 to-blue-200 shadow-md ">    

            <div className="LogoIcoSideMenu shadow-md" />
            <div className="flex flex-wrap justify-start ml-2">
                <ButtonForMenu src={dashboard} path='/home' />
                <ButtonForMenu src={calendar} path='/planning' />
                <ButtonForMenu src={clientList} path='/listeClient' />
                <ButtonForMenu src={addClient} path='/createClient' />
                <ButtonForMenu src={homeList} path='/listeProperty' />
                <ButtonForMenu src={addHome} path='createProperty' />
            </div>
        </div>
            <div className="stickHomeMenu">
                <div className="diagonalStickMenu bg-white"></div>
                <div className="verticalStickMenu bg-gradient-to-t from-transparent to-white"></div>
            </div>
        </div>
    )
}

export default SideMenu;