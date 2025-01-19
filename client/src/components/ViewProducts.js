import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdEdit, MdDelete } from 'react-icons/md';  // Importing the pencil (edit) and cross (delete) icons

const ViewProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8);
    const [showModal, setShowModal] = useState(false);
    const [productToUpdate, setProductToUpdate] = useState(null);
    const [updateForm, setUpdateForm] = useState({ p_name: '', p_description: '', p_price: '', p_category: '' });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/get-products');
                if (response.data.success) {
                    setProducts(response.data.data);
                } else {
                    setError('Failed to fetch products');
                }
            } catch (error) {
                setError('Error fetching products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Calculate current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Total pages
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Page Change Handler
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // Handle edit button click
    const handleEdit = (product) => {
        setProductToUpdate(product);
        setUpdateForm({
            p_name: product.p_name,
            p_description: product.p_description,
            p_price: product.p_price,
            p_category: product.p_category,
        });
        setShowModal(true);  // Show modal
    };

    // Handle modal form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateForm({
            ...updateForm,
            [name]: value,
        });
    };

    // Handle update product submit
    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/update-product/${productToUpdate.p_id}`, updateForm);
            if (response.data.success) {
                setProducts(products.map(product => product.p_id === productToUpdate.p_id ? { ...productToUpdate, ...updateForm } : product)); // Update product in state
                alert('Product updated successfully');
                setShowModal(false);  // Close modal
            } else {
                alert('Error updating product');
            }
        } catch (error) {
            alert('Error updating product');
        }
    };

    // Handle delete product
    const handleDelete = async (productId) => {
        try {
            const response = await axios.delete(`/delete-product/${productId}`);
            if (response.data.success) {
                // Remove the deleted product from the list
                setProducts(products.filter(product => product.p_id !== productId));
                alert('Product deleted successfully');
            } else {
                alert('Error deleting product');
            }
        } catch (error) {
            alert('Error deleting product');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>View Products</h2>
            {loading ? <p>Loading products...</p> : null}
            {error ? <p style={{ color: 'red' }}>{error}</p> : null}

            <table style={styles.table} className='table table-striped'>
                <thead>
                    <tr style={{ verticalAlign: 'middle' }}>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map((product) => (
                        <tr key={product.p_id} style={{ verticalAlign: 'middle' }}>
                            <td>
                                <img src={`http://localhost:3308/${product.p_image}`} width={50} alt={product.p_name} />
                            </td>
                            <td>{product.p_name}</td>
                            <td>{product.p_description}</td>
                            <td>{product.c_name}</td>
                            <td>{product.p_price}</td>
                            <td>
                                <div>
                                    <button
                                        style={styles.button}
                                        onClick={() => handleEdit(product)} // Show modal for editing
                                    >
                                        <MdEdit style={{ color: 'rgb(0,120,0)' }} />
                                    </button>
                                    <button
                                        style={styles.button}
                                        onClick={() => handleDelete(product.p_id)} // Call delete function
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

            {/* Modal for Update */}
            {showModal && (
                <div style={styles.modal} className='mx-auto'>
                    <div style={styles.modalContent}>
                        <h3 className='my-4'>Update Product</h3>
                        <form onSubmit={handleUpdateProduct}>
                            <div className='my-3'>
                                <label>Name:</label>
                                <input className='form-control w-100 mx-auto' type="text" name="p_name" value={updateForm.p_name} onChange={handleInputChange} required />
                            </div>
                            <div className='my-3'>
                                <label>Description:</label>
                                <textarea className='form-control' name="p_description" value={updateForm.p_description} onChange={handleInputChange} required />
                            </div>
                            <div className='my-3'>
                                <label>Price:</label>
                                <input className='form-control  w-100 mx-auto ' type="number" name="p_price" value={updateForm.p_price} onChange={handleInputChange} required />
                            </div>
                            <div className='my-3'>
                                <label>Category:</label>
                                <input className='form-control w-100  mx-auto' type="text" name="p_category" value={updateForm.p_category} onChange={handleInputChange} required />
                            </div>
                            <div className='text-center w-100'>
                                <button style={{ backgroundColor: 'rgb(0,120,0)', padding: '10px 14px', border: 'none', color: 'white', marginRight: '10px' }} type="submit">Update</button>
                                <button style={{ backgroundColor: 'rgb(0,120,0)', padding: '10px 14px', border: 'none', color: 'white' }} type="button" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
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
    image: {
        width: '50px',
        height: '50px',
        borderRadius: '5px',
    },
    button: {
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '20px',
        margin: '0 5px',
        cursor: 'pointer',
    },
    modal: {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '5px',
        width: '30%',
        height: '80%',
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

export default ViewProducts;
