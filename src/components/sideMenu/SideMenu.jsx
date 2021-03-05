
import React from 'react';
import logo from '../../assets/img/IcoLogo.png';
import avatar from '../../assets/img/IconicCharacter.png'; 
import './SideMenu.css';



function SideMenu() {

    
    return(
        <div className="SideMenuContainer border-r-4 border-white bg-gray-200 shadow-xl">
            <div className="SideMenuBoard pt-5 pl-1">
                <div className="ProfileIconicCharacter shadow-md">
                        <img src={avatar} alt="Avatar" className="ProfileIconicCharacterPicture" />
                    <div className="LogoIco shadow-md" >
                        <img src={logo} alt="logo_ImmoCo" className="LogoIcoPicture" />
                    </div>
                </div>

                
            </div>
        </div>
    )
}

export default SideMenu;