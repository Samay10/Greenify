import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApexCharts from 'react-apexcharts';
import './Dashboard.css';

function Dashboard() {
    const [supplierData, setSupplierData] = useState(null);
    const [orderStatusSeries, setOrderStatusSeries] = useState([]);
    const [carbonEmissionsSeries, setCarbonEmissionsSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPeriod, setSelectedPeriod] = useState('daily');

    const orderStatusChartOptions = {
        options: {
            chart: { type: 'pie' },
            labels: ['Completed Orders', 'Pending Orders'],
            colors: ['#00E396', '#FF4560'],
            title: { text: 'Order Status Distribution' }
        }
    };

    const carbonEmissionsPieOptions = {
        options: {
            chart: { type: 'pie' },
            labels: ['Daily', 'Weekly', 'Monthly'],
            colors: ['#0077BE', '#00E396', '#FEB019'],
            title: { text: 'Carbon Emissions Breakdown' }
        }
    };

    const carbonEmissionsBarOptions = {
        options: {
            chart: {
                type: 'bar',
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800
                }
            },
            plotOptions: {
                bar: {
                    borderRadius: 8,
                    columnWidth: '45%',
                    distributed: true
                }
            },
            colors: [
                // Daily colors
                '#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a',
                // Weekly colors
                '#008FFB', '#00E396', '#FEB019', '#FF4560',
                // Monthly colors
                '#775DD0', '#546E7A', '#26a69a', '#D10CE8', '#FF4560', '#FEB019', '#00E396', '#008FFB'
            ],
            xaxis: {
                categories: selectedPeriod === 'daily'
                    ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
                    : selectedPeriod === 'weekly'
                    ? ['Week 1', 'Week 2', 'Week 3', 'Week 4']
                    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                labels: {
                    rotate: -45,
                    style: {
                        fontSize: '12px'
                    }
                }
            },
            
            yaxis: {
                title: {
                    text: 'CO₂ Emissions (metric tons)'
                }
            }
        }
    };
    
    // Add state for selected time period
    //const [selectedPeriod, setSelectedPeriod] = useState('daily');
    
    // Get current emissions based on selected period
    const getCurrentEmissions = () => {
        if (!supplierData?.carbonEmissions) return [];
        const periodData = supplierData.carbonEmissions[selectedPeriod];
        return Object.values(periodData);
    };

    useEffect(() => {
        const fetchSupplierData = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/suppliers');
                const data = response.data[0];
                
                if (data) {
                    setSupplierData(data);
                    setOrderStatusSeries([data.completedOrders, data.pendingOrders]);
                    setCarbonEmissionsSeries([
                        data.carbonEmissions.daily,
                        data.carbonEmissions.weekly,
                        data.carbonEmissions.monthly
                    ]);
                }
            } catch (error) {
                console.error("Error fetching supplier data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSupplierData();
    }, []);

    if (loading) return <div className="modern-loader">Loading...</div>;
    if (!supplierData) return <div className="modern-loader">No data available</div>;

    return (
        <div className="modern-dashboard">
            <header className="dashboard-header">
                <h1>{supplierData.name} Dashboard</h1>
            </header>
            
            <section className="stats-overview">
    {[
        { 
            label: 'Total Orders', 
            value: supplierData.totalOrders,
            icon: '📦' 
        },
        { 
            label: 'Completed Orders', 
            value: supplierData.completedOrders,
            icon: '✅'
        },
        { 
            label: 'Pending Orders', 
            value: supplierData.pendingOrders,
            icon: '⏳'
        },
        { 
            label: 'Current Balance', 
            value: `$${supplierData.balance.toLocaleString()}`,
            icon: '💰'
        }
    ].map((stat, index) => (
        <div key={index} className="modern-stat-card">
            <div className="stat-icon">
                <span role="img" aria-label={stat.label}>{stat.icon}</span>
            </div>
            <div className="stat-content">
                <h3>{stat.label}</h3>
                <p>{stat.value}</p>
            </div>
        </div>
    ))}
</section>


            <section className="charts-grid">
                <div className="chart-card">
                    <ApexCharts 
                        options={orderStatusChartOptions.options}
                        series={orderStatusSeries}
                        type="pie"
                        height={350}
                    />
                </div>
                <div className="chart-card">
    <div className="period-selector">
        <button 
            className={`period-btn ${selectedPeriod === 'daily' ? 'active' : ''}`}
            onClick={() => setSelectedPeriod('daily')}
        >
            Daily
        </button>
        <button 
            className={`period-btn ${selectedPeriod === 'weekly' ? 'active' : ''}`}
            onClick={() => setSelectedPeriod('weekly')}
        >
            Weekly
        </button>
        <button 
            className={`period-btn ${selectedPeriod === 'monthly' ? 'active' : ''}`}
            onClick={() => setSelectedPeriod('monthly')}
        >
            Monthly
        </button>
    </div>
    <ApexCharts 
        options={carbonEmissionsBarOptions.options}
        series={[{
            name: 'Carbon Emissions',
            data: getCurrentEmissions()
        }]}
        type="bar"
        height={350}
    />
</div>
            </section>
        </div>
    );
}

export default Dashboard;
