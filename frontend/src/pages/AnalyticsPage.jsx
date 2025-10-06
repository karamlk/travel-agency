import { useEffect, useState } from 'react'
import Spinner from '../components/Spinner';
import DashboardCard from '../components/DashboardCard';
import DashboardCardRow from '../components/DashboardCardRow';
import TableCard from '../components/TableCard';
import axiosClient from '../axiosClient'

const Analytics = () => {
    const [topCountries, setTopCountries] = useState([]);
    const [topCustomers, setTopCustomers] = useState([]);
    const [refundReasons, setRefundReasons] = useState([]);
    const [salesOverview, setSalesOverview] = useState({});

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [countriesRes, customersRes, refundsRes, salesRes] = await Promise.all([
                    axiosClient.get("/admin/analytics/top-countries"),
                    axiosClient.get("/admin/analytics/top-customers"),
                    axiosClient.get("/admin/analytics/refund-reasons"),
                    axiosClient.get("/admin/analytics/sales-summary"),
                ]);

                setTopCountries(countriesRes.data);
                setTopCustomers(customersRes.data);
                setRefundReasons(refundsRes.data);
                setSalesOverview(salesRes.data);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
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
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <main className="grow">
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        <div className="sm:flex sm:justify-between sm:items-center mb-8">
                            {/* Left: Title */}
                            <div className="mb-4 sm:mb-0">
                                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Analytics</h1>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 gap-6">

                            <DashboardCard title="Sales Overview">
                                <DashboardCardRow label="Today" value={`${salesOverview.today} $`} />
                                <DashboardCardRow label="This Week" value={`${salesOverview.week} $`} />
                                <DashboardCardRow label="This Month" value={`${salesOverview.month} $`} />
                                <DashboardCardRow label="Last 6 Months" value={`${salesOverview.six_months} $`} />
                                <DashboardCardRow label="This Year" value={`${salesOverview.year} $`} />
                            </DashboardCard>

                            <TableCard
                                title="Top Countries"
                                columns={[
                                    { label: "Country", align: "text-left" },
                                    { label: "Revenue", align: "text-center" },
                                    { label: "Visitors", align: "text-center" },
                                    { label: "Avg Tour Price", align: "text-center" },
                                    { label: "Total Tours", align: "text-center" }
                                ]}
                                data={topCountries}
                                renderRow={(item) => (
                                    <>
                                        <td className="p-2">{item.country}</td>
                                        <td className="p-2 text-center" >{item.revenue} $</td>
                                        <td className="p-2 text-center">{item.number_of_visitors}</td>
                                        <td className="p-2 text-center">{item.average_tour_price} $</td>
                                        <td className="p-2 text-center">{item.total_tours}</td>
                                    </>
                                )}
                            />

                            <TableCard
                                title="Top Customers"
                                columns={[
                                    { label: "Customer", align: "text-left" },
                                    { label: "Email", align: "text-center" },
                                    { label: "Spend", align: "text-center" },
                                ]}
                                data={topCustomers}
                                renderRow={(item) => (
                                    <>
                                        <td className= "p-2" >{item.user.name}</td>
                                        <td className= "p-2 text-center" >{item.user.email}</td>
                                        <td className= "p-2 text-center">{item.spend} $</td>
                                    </>
                                )}
                            />

                            <TableCard
                                title="Refund Reasons"
                                columns={[
                                    { label: "Reason", align: "text-left" },
                                    { label: "Count", align: "text-center" },
                                    { label: "Percentage", align: "text-center" },
                                ]}
                                data={refundReasons}
                                renderRow={(item) => (
                                    <>
                                        <td className="p-2">{item.reason}</td>
                                        <td className="p-2 text-center">{item.count}</td>
                                        <td className="p-2 text-center">{item.percentage}%</td>
                                    </>
                                )}
                            />

                        </div>
                    </div>
                </main>

            </div>
        </div>
    )
}

export default Analytics