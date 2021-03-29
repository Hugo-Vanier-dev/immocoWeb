import React from 'react';
import addClient from '../../../assets/img/icons/AddClientIcon.png';
import clientList from '../../../assets/img/icons/ClientListIcon.png';
import dashboard from '../../../assets/img/icons/DashboardIcon.png';
import calendar from '../../../assets/img/icons/CalendarIcon.png';
import homeList from '../../../assets/img/icons/HomeListIcon.png';
import addHome from '../../../assets/img/icons/AddHomeIcon.png';
import LogoIco from '../../logoIco/LogoIco';
import './SideMenu.css';
import { Link } from 'react-router-dom';

function ButtonForMenu({src, path}){
    return(
        <div className="float-left grid grid-cols-1 gap-4">
            <Link to={path} className="col-span-1 p-2 m-4 border-2 border-pink-200 border-opacity-70 bg-gray-50 hover:border-pink-500 rounded-xl shadow">
                <img className="MenuIcons" src={src} />
            </Link>
        </div>
    )
}


function SideMenu() {
    return(
        <div className=" grid grid-cols-6">
            <div className="SideMenuContainer border-r-4 border-white bg-indigo-50 shadow-xl">
                <div className="SideMenuBoard">
                  <LogoIco />
                   <nav className="flex flex-wrap">
                        <ButtonForMenu src={dashboard} path='/home' />
                        <ButtonForMenu src={calendar} path='/planning' />
                        <ButtonForMenu src={clientList} path='/listeClient' />
                        <ButtonForMenu src={addClient} path='/createClient' />
                        <ButtonForMenu src={homeList} path='/listeProperty' />
                        <ButtonForMenu src={addHome} path='createProperty' />
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default SideMenu;