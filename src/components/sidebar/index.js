/* eslint-disable no-use-before-define */
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
    { title: "Sign Out", onClick: handleSignOut, icon: <FaSignOutAlt /> }, // Updated for onClick event
  ];

  const [image, setImage] = useState("https://w7.pngwing.com/pngs/627/97/png-transparent-avatar-web-development-computer-network-avatar-game-web-design-heroes.png");

  useEffect(() => {
    // Simulate fetching user data
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get("me");
        if (response.data.images && response.data.images.length > 0) {
          setImage(response.data.images[0].url);
        } else {
          setImage("https://w7.pngwing.com/pngs/627/97/png-transparent-avatar-web-development-computer-network-avatar-game-web-design-heroes.png");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = () => {
    // Clear token or perform sign-out logic here
    localStorage.removeItem('spotifyAuthToken'); // Remove the token from local storage
    // Redirect to login page (replace with your actual login page route)
    window.location.href = '/login'; // Redirect using JavaScript
  };

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
        onClick={buttons[buttons.length - 1].onClick} // Pass onClick handler
        icon={buttons[buttons.length - 1].icon} 
      />
    </div>
  );
}
