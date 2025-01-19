import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';  // Only showing delete icon

const ViewSubscribers = () => {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [subscribersPerPage] = useState(8);

    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                const response = await axios.get('/get-subscribers');
                if (response.data.success) {
                    setSubscribers(response.data.data);
                } else {
                    setError('Failed to fetch subscribers');
                }
            } catch (error) {
                setError('Error fetching subscribers');
            } finally {
                setLoading(false);
            }
        };

        fetchSubscribers();
    }, []);

    // Calculate current subscribers
    const indexOfLastSubscriber = currentPage * subscribersPerPage;
    const indexOfFirstSubscriber = indexOfLastSubscriber - subscribersPerPage;
    const currentSubscribers = subscribers.slice(indexOfFirstSubscriber, indexOfLastSubscriber);

    // Total pages
    const totalPages = Math.ceil(subscribers.length / subscribersPerPage);

    // Page Change Handler
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // Handle delete subscriber
    const handleDelete = async (email) => {
        try {
            const response = await axios.delete(`/delete-subscriber/${email}`);
            if (response.data.success) {
                // Remove the deleted subscriber from the list
                setSubscribers(subscribers.filter(subscriber => subscriber.email !== email));
                alert('Subscriber deleted successfully');
            } else {
                alert('Error deleting subscriber');
            }
        } catch (error) {
            alert('Error deleting subscriber');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>View Subscribers</h2>
            {loading ? <p>Loading subscribers...</p> : null}
            {error ? <p style={{ color: 'red' }}>{error}</p> : null}

            <table style={styles.table} className='table table-striped'>
                <thead>
                    <tr style={{ verticalAlign: 'middle' }}>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentSubscribers.map((subscriber) => (
                        <tr key={subscriber.email} style={{ verticalAlign: 'middle' }}>
                            <td>{subscriber.email}</td>
                            <td>
                                <div>
                                    <button
                                        style={styles.button}
                                        onClick={() => handleDelete(subscriber.email)} // Call delete function
                                    >
                                        <MdDelete style={{ color: 'red' }} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination controls */}
            <div style={styles.pagination}>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={styles.paginationButton}
                >
                    Previous
                </button>
                <span>{currentPage} of {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={styles.paginationButton}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left',
    },
    button: {
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '20px',
        margin: '0 5px',
        cursor: 'pointer',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
    },
    paginationButton: {
        padding: '10px 15px',
        border: 'none',
        backgroundColor: 'transparent',
        color: 'rgb(0,123,0)',
        cursor: 'pointer',
        margin: '0 5px',
    },
};

export default ViewSubscribers;
