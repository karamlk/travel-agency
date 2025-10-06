import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { LayoutDashboard, Plane, Map, Users,Globe2 } from "lucide-react";

function Sidebar({ variant = "default" }) {
  const { pathname } = useLocation();

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === "true"
  );

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    document.body.classList.toggle("sidebar-expanded", sidebarExpanded);
  }, [sidebarExpanded]);

  // 🔹 Sidebar config
  const sidebarItems = [
  {
    label: "Dashboard",
    condition: pathname === "/dashboard" || pathname.startsWith("/dashboard/analytics"),
    icon: (active) => (
      <LayoutDashboard
        size={18}
        className={active ? "text-violet-500" : "text-gray-400 dark:text-gray-500"}
      />
    ),
    links: [
      { to: "/dashboard", label: "Main" },
      { to: "/dashboard/analytics", label: "Analytics" },
    ],
  },
  {
    label: "Travels",
    condition: pathname.startsWith("/dashboard/travels"),
    icon: (active) => (
      <Plane
        size={18}
        className={active ? "text-violet-500" : "text-gray-400 dark:text-gray-500"}
      />
    ),
    links: [
      { to: "/dashboard/travels", label: "Display all the travels" },
      { to: "/dashboard/travels/add", label: "Add Travel" },
    ],
  },
  {
    label: "Tours",
    condition: pathname.startsWith("/dashboard/tours"),
    icon: (active) => (
      <Map
        size={18}
        className={active ? "text-violet-500" : "text-gray-400 dark:text-gray-500"}
      />
    ),
    links: [{ to: "/dashboard/tours", label: "Display all the tours" }],
  },
  {
    label: "Manage Customers",
    condition:
      pathname.startsWith("/dashboard/bookings") || pathname.startsWith("/dashboard/refunds"),
    icon: (active) => (
      <Users
        size={18}
        className={active ? "text-violet-500" : "text-gray-400 dark:text-gray-500"}
      />
    ),
    links: [
      { to: "/dashboard/bookings", label: "Bookings" },
      { to: "/dashboard/refunds", label: "Refunds" },
    ],
  },
];

  return (
    <div className="min-w-fit">
      <div
        id="sidebar"
        className={`flex flex-col h-[100dvh] overflow-y-auto no-scrollbar 
          w-64 bg-white dark:bg-gray-800 p-4 
          ${variant === "v2"
            ? "border-r border-gray-200 dark:border-gray-700/60"
            : "rounded-r-2xl shadow-xs"
          }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          <NavLink end to="/" className="block">
            <Globe2 size={32} className="text-violet-500" />
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              Pages
            </h3>
            <ul className="mt-3">
              {sidebarItems.map((item) => (
                <SidebarLinkGroup key={item.label} activecondition={item.condition}>
                  {(handleClick, open) => (
                    <>
                      <a
                        href="#0"
                        className="block text-gray-800 dark:text-gray-100"
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {item.icon(item.condition)}
                            <span className="text-sm font-medium ml-4">
                              {item.label}
                            </span>
                          </div>
                          <svg
                            className={`w-3 h-3 ml-1 fill-current text-gray-400 dark:text-gray-500 ${open && "rotate-180"
                              }`}
                            viewBox="0 0 12 12"
                          >
                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                          </svg>
                        </div>
                      </a>
                      {open && (
                        <ul className="pl-8 mt-1">
                          {item.links.map((link) => (
                            <li key={link.to}>
                              <NavLink
                                end
                                to={link.to}
                                className={({ isActive }) =>
                                  "block text-sm transition duration-150 truncate " +
                                  (isActive
                                    ? "text-violet-500"
                                    : "text-gray-500 hover:text-violet-500")
                                }
                              >
                                {link.label}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </SidebarLinkGroup>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
