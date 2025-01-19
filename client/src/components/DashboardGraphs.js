// DashboardGraphs.js
import React, { useState, useEffect } from "react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const DashboardGraphs = () => {
    const [error, setError] = useState(null);
    const [productCount, setProductCount] = useState(0);
    const [productCountByCategory, setProductCountByCategory] = useState([]);
    const [subscriberCount, setSubscriberCount] = useState(0);
    const [usersCount, setUsersCount] = useState(0);
    useEffect(() => {


        // Fetch total product count
        fetch('http://localhost:3308/get-products-count')
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setProductCount(data.count || 0);
                } else {
                    setError(data.message || "Failed to fetch product count");
                }
            })
            .catch((err) => setError(err.message || "An error occurred"));

        // Fetch product counts by category
        fetch('http://localhost:3308/get-products-count-by-category')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const formattedData = data.data.map(item => ({
                        name: item.category, // Access category
                        count: item.productCount, // Access productCount
                    }));
                    setProductCountByCategory(formattedData);
                } else {
                    setError(data.message || "Failed to fetch product counts by category");
                }
            })
            .catch((err) => setError(err.message || "An error occurred"));

        // Fetch total subscriber count
        fetch('http://localhost:3308/get-subscriber-count')
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    console.log(data)
                    setSubscriberCount(data.data.totalSubscribers || 0);  // Set the count directly
                } else {
                    setError(data.message || "Failed to fetch subscriber count");
                }
            })
            .catch((err) => setError(err.message || "An error occurred"));

        // Fetch total subscriber count
        fetch('http://localhost:3308/get-normal-users-count')
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    console.log(data)
                    setUsersCount(data.count || 0);  // Set the count directly
                } else {
                    setError(data.message || "Failed to fetch users count");
                }
            })
            .catch((err) => setError(err.message || "An error occurred"));
    }, []);
    const productData = [
        ...productCountByCategory, // Add category-specific data
        { name: 'Total', count: productCount || 0 }, // Include the total count
    ];

    const subscriberData = [
        { name: 'Email Subscribers', value: subscriberCount },
        { name: 'Registered Users', value: usersCount },  // Adjust based on your actual user count
    ];

    return (
        <div style={styles.graphContainer}>
            <div style={styles.graphBox}>
                <h3>Total Products by Category</h3>
                <BarChart width={400} height={500} data={productData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="rgb(0,84,0)" />
                </BarChart>
            </div>
            <div style={styles.graphBox}>
                <h3>Users Summary</h3>
                {/* <PieChart width={500} height={300}>
                    <Pie
                        data={subscriberData}
                        cx={200}
                        cy={150}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label
                    >
                        {subscriberData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={index === 0 ? '#82ca9d' : '#ff7300'}
                            />
                        ))}
                    </Pie>
                    <Legend />
                </PieChart> */}
                <PieChart width={500} height={300}>
                    <Pie
                        data={subscriberData}
                        cx={200}
                        cy={150}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label
                    >
                        {subscriberData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={index === 0 ? '#82ca9d' : '#ff7300'}
                            />
                        ))}
                    </Pie>
                    <Legend />
                </PieChart>
            </div>
        </div>
    );
};

const styles = {
    graphContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '20px',
    },
    graphBox: {
        width: '40%',
        textAlign: 'center',
    },
};

export default DashboardGraphs;
