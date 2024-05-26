import React, { useEffect, useState } from 'react';
import './sidebar.css';
import SidebarButton from './sidebarButton';
import { MdFavorite } from "react-icons/md";
import { FaGripfire, FaPlay } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import apiClient from '../../spotify';

export default function Sidebar() {
  const buttons = [
    { title: "Feed", to: "/feed", icon: <MdSpaceDashboard /> },
    { title: "Trending", to: "/trending", icon: <FaGripfire /> },
    { title: "Player", to: "/player", icon: <FaPlay /> },
    { title: "Favourites", to: "/favourites", icon: <MdFavorite /> },
    { title: "Library", to: "/", icon: <IoLibrary /> },
    { title: "Sign Out", to: "", icon: <FaSignOutAlt /> },
  ];

  const [image, setImage] = useState("https://w7.pngwing.com/pngs/627/97/png-transparent-avatar-web-development-computer-network-avatar-game-web-design-heroes.png");

  useEffect(() => {
    apiClient.get("me").then(response => {
      if (response.data.images && response.data.images.length > 0) {
        setImage(response.data.images[0].url);
      } else {
        setImage("https://w7.pngwing.com/pngs/627/97/png-transparent-avatar-web-development-computer-network-avatar-game-web-design-heroes.png");
      }
    }).catch(error => {
      console.error("Error fetching user data: ", error);
    });
  }, []);

  return (
    <div className='sidebar-container'>
      <img 
        src={image} 
        alt='profile' 
        className='profile-img' 
      />
      <div>
        {buttons.slice(0, -1).map((button, index) => (
          <SidebarButton 
            key={index} 
            title={button.title} 
            to={button.to} 
            icon={button.icon} 
          />
        ))}
      </div>
      <SidebarButton 
        title={buttons[buttons.length - 1].title} 
        to={buttons[buttons.length - 1].to} 
        icon={buttons[buttons.length - 1].icon} 
      />
    </div>
  );
}
