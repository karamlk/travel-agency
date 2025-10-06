import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Travels from "./pages/TravelsPage";
import Travel from "./pages/TravelPage";
import AddTravelPage from "./pages/AddTravelPage";
import Tours from "./pages/ToursPage";
import AddTourPage from "./pages/AddTourPage";
import Tour from "./pages/TourPage";
import Bookings from "./pages/BookingsPage";
import DropdownProfile from "./components/DropdownProfile";
import Refunds from "./pages/RefundsPage";
import Refund from "./pages/RefundPage";
import MainLayout from "./layouts/MainLayout";
import Analytics from "./pages/AnalyticsPage";

const router = createBrowserRouter([
    {
    path: '/',
    element: <Navigate to="/login" replace /> 
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'travels', element: <Travels /> },
      { path: 'travels/:id', element: <Travel /> },
      { path: 'travels/add', element: <AddTravelPage /> },
      { path: 'tours', element: <Tours /> },
      { path: 'tours/:id', element: <Tour /> },
      { path: 'tours/add', element: <AddTourPage /> },
      { path: 'bookings', element: <Bookings /> },
      { path: 'refunds', element: <Refunds /> },
      { path: 'refunds/:id', element: <Refund /> },
      { path: 'analytics', element: <Analytics /> }
    ]
  }
])

export default router;