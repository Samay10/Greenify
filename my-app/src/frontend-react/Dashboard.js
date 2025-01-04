import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApexCharts from 'react-apexcharts';
import './Dashboard.css';

function Dashboard() {
    // State to store supplier data fetched from the backend API
    const [supplierData, setSupplierData] = useState(null);
    // State to store data for the order status pie chart (Completed vs Pending Orders)
    const [orderStatusSeries, setOrderStatusSeries] = useState([]);
    // State to store data for the carbon emissions pie chart (Daily, Weekly, Monthly)
    const [carbonEmissionsSeries, setCarbonEmissionsSeries] = useState([]);
    // State to track if data is still being loaded
    const [loading, setLoading] = useState(true);

    // Configuration for the order status pie chart
    const orderStatusChartOptions = {
        options: {
            chart: { type: 'pie' }, // Pie chart type
            labels: ['Completed Orders', 'Pending Orders'], // Labels for the pie chart sections
            colors: ['#00E396', '#FF4560'], // Colors for each section
            title: { text: 'Order Status Distribution' }, // Title of the chart
            responsive: [{ // Responsive design for smaller screens
                breakpoint: 480,
                options: {
                    chart: { width: 200 } // Set chart width on small screens
                }
            }]
        }
    };

    // Configuration for the carbon emissions pie chart
    const carbonEmissionsPieOptions = {
        options: {
            chart: { type: 'pie' }, // Pie chart type
            labels: ['Daily', 'Weekly', 'Monthly'], // Labels for the pie chart sections
            colors: ['#0077BE', '#00E396', '#FEB019'], // Colors for each section
            title: { text: 'Carbon Emissions Breakdown' }, // Title of the chart
            responsive: [{ // Responsive design for smaller screens
                breakpoint: 480,
                options: {
                    chart: { width: 200 } // Set chart width on small screens
                }
            }]
        }
    };

    // useEffect hook to fetch supplier data from the API when the component mounts
    useEffect(() => {
        const fetchSupplierData = async () => {
            try {
                // Fetch data from the backend API (assuming the endpoint returns an array of suppliers)
                const response = await axios.get('http://localhost:5000/api/suppliers');
                const data = response.data[0]; // Get the first supplier from the response
                setSupplierData(data); // Set the supplier data in the state

                // Update the order status and carbon emissions chart data
                setOrderStatusSeries([data.completedOrders, data.pendingOrders]);
                setCarbonEmissionsSeries([
                    data.carbonEmissions.daily,
                    data.carbonEmissions.weekly,
                    data.carbonEmissions.monthly
                ]);

                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error("Error fetching supplier data", error); // Log error if fetching fails
                setLoading(false); // Set loading to false in case of error
            }
        };

        // Call the function to fetch supplier data
        fetchSupplierData();
    }, []); // Empty dependency array means this effect runs only once when the component mounts

    // If data is still loading, show a loading message
    if (loading) return <div className="modern-loader">Loading...</div>;

    return (
        <div className="modern-dashboard">
            <header className="dashboard-header">
                <h1>{supplierData.name} Dashboard</h1> {/* Display supplier name */}
            </header>
            
            <section className="stats-overview">
                {/* Display key supplier statistics in cards */}
                {[ 
                    { label: 'Total Orders', value: supplierData.totalOrders },
                    { label: 'Completed Orders', value: supplierData.completedOrders },
                    { label: 'Pending Orders', value: supplierData.pendingOrders },
                    { label: 'Current Balance', value: `$${supplierData.balance.toLocaleString()}` }
                ].map((stat, index) => (
                    <div key={index} className="modern-stat-card">
                        <div className="stat-icon">📊</div> {/* Icon for stats */}
                        <div className="stat-content">
                            <h3>{stat.label}</h3> {/* Label for the stat */}
                            <p>{stat.value}</p> {/* Value of the stat */}
                        </div>
                    </div>
                ))}
            </section>

            <section className="charts-grid">
                {/* Display the order status pie chart */}
                <div className="chart-card">
                    <ApexCharts 
                        options={orderStatusChartOptions.options}
                        series={orderStatusSeries}
                        type="pie"
                        height={350} // Set chart height
                    />
                </div>
                {/* Display the carbon emissions pie chart */}
                <div className="chart-card">
                    <ApexCharts 
                        options={carbonEmissionsPieOptions.options}
                        series={carbonEmissionsSeries}
                        type="pie"
                        height={350} // Set chart height
                    />
                </div>
            </section>
        </div>
    );
}

export default Dashboard;
