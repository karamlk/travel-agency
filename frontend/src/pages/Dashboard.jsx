import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useStateContext from '../contexts/useStateContext';
import Spinner from '../components/Spinner';
import axiosClient from '../axiosClient';
import DashboardCard from '../components/DashboardCard';
import DashboardCardRow from '../components/DashboardCardRow';
import TableCard from '../components/TableCard';

function Dashboard() {
  const { token } = useStateContext();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!token) {
    return <Navigate to='/login' />
  }

  useEffect(() => {
    axiosClient.
      get('/admin/dashboard/overview')
      .then(data => {
        setData(data.data)
      })
      .catch(error => {
        console.error('Error fetching refunds:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex">

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">


        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Dashboard</h1>
              </div>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              <DashboardCard title="Sales and Refunds">
                <DashboardCardRow label="Sales" value={`${data.sales_vs_refunds.sales} $`} color="green" />
                <DashboardCardRow label="Refunds" value={`${data.sales_vs_refunds.refunds} $`} color="red" />
                <DashboardCardRow label="Net" value={`${data.sales_vs_refunds.net} $`}
                  color={data.sales_vs_refunds.net >= 0 ? "green" : "red"} />
              </DashboardCard>

              <DashboardCard title="Booking Metrics">
                <DashboardCardRow label="Total Bookings (Confirmed)" value={data.booking_metrics.total_bookings} />
                <DashboardCardRow label="Total Ratings" value={data.booking_metrics.total_ratings} />
                <DashboardCardRow label="Total Reviews" value={data.booking_metrics.total_reviews} />
              </DashboardCard>

              <DashboardCard title="Booking Status">
                <DashboardCardRow label="Confirmed" value={data.booking_status.confirmed} />
                <DashboardCardRow label="Pending" value={data.booking_status.pending} />
                <DashboardCardRow label="Canceled" value={data.booking_status.canceled} />
              </DashboardCard>


              <TableCard
                title="Top Rated Tours"
                columns={[
                  { label: "Tour", align: "text-left" },
                  { label: "Date Range", align: "text-center" },
                  { label: "Avg Rate", align: "text-center" },
                  { label: "Price", align: "text-center" },
                ]}
                data={data.top_rated_tours}
                renderRow={(item) => (
                  <>
                    <td className="p-2">{item.tour.name}</td>
                    <td className="p-2 text-center">{item.date_range}</td>
                    <td className="p-2 text-center">{item.tour.avgRate}</td>
                    <td className="p-2 text-center">{item.tour.price} $</td>
                  </>
                )}
              />

              <TableCard
                title="Upcoming Tours"
                columns={[
                  { label: "Tour", align: "text-left" },
                  { label: "Start", align: "text-center" },
                  { label: "End", align: "text-center" },
                  { label: "Price", align: "text-center" },
                ]}
                data={data.upcoming_tours}
                renderRow={(item) => (
                  <>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2 text-center">{item.starting_date}</td>
                    <td className="p-2 text-center">{item.ending_date}</td>
                    <td className="p-2 text-center">{item.price} $</td>
                  </>
                )}
              />

              <TableCard
                title="Recent Activity"
                columns={[
                  { label: "type", align: "text-left" },
                  { label: "message", align: "text-center" },
                  { label: "timestamp", align: "text-center" },
                ]}
                data={data.recent_activity}
                renderRow={(item) => (
                  <>
                    <td className="p-2">{item.type}</td>
                    <td className="p-2 text-center">{item.message}</td>
                    <td className="p-2 text-center">{item.timestamp}</td>
                  </>
                )}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;