import React, { useState, useRef, useEffect } from 'react';
import { data, Link, useNavigate } from 'react-router-dom';
import Transition from '../utils/Transition';
import { ChevronDown, User } from "lucide-react";
import UserAvatar from '../images/user-avatar-32.png';
import useStateContext from '../contexts/useStateContext';
import axiosClient from '../axiosClient';

function DropdownProfile({
  align
}) {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, token, setUser, setToken } = useStateContext();
  const trigger = useRef(null);
  const dropdown = useRef(null);

  const onLogout = (e) => {
    e.preventDefault();

    axiosClient.post('/logout')
      .then(({ }) => {
        setUser(null)
        setToken(null)
      })
  };

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  },[]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  },[]);

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <User
          size={32} 
          strokeWidth={2}
          className="rounded-full text-violet-500"
        />

        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium text-gray-600 dark:text-gray-100 group-hover:text-gray-800 dark:group-hover:text-white">Administrator</span>
          <ChevronDown
            size={12}
            className="w-3 h-3 shrink-0 ml-1 text-gray-400 dark:text-gray-500"
          />
        </div>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200 dark:border-gray-700/60">
            <div className="font-medium text-gray-800 dark:text-gray-100">{user.name}</div>
          </div>
          <ul>
            <li>
              <button
                className="font-medium text-sm text-violet-500 hover:text-violet-600  dark:hover:text-violet-400 flex items-center py-1 px-3 cursor-pointer"
                onClick={(e) => {
                  setDropdownOpen(false);
                  onLogout(e);
                }}

              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  )
}

export default DropdownProfile;