import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar';
import Header from '../components/MainHeader';
import { Navigate, Outlet } from 'react-router-dom';
import useStateContext from '../contexts/useStateContext';

const MainLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, token, setUser, setToken } = useStateContext();

    if (!token) {
        return <Navigate to='/login' />
    }
    
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/* Header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                {/* Page content */}
                <main className="grow">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default MainLayout