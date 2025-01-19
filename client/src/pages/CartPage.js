import React from 'react'
import { MdClose } from 'react-icons/md';
import { useCart } from '../context/Cart';
const CartPage = () => {
    const { cart, setCart } = useCart();

    const removeCartItems = (p_id) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex((item) => item._id === p_id)
            myCart.splice(index, 1)
            localStorage.setItem("cart", JSON.stringify(myCart)); //
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='container pb-5'>
                <div className='text-center pt-5'>
                    <h3>Your Cart</h3>
                </div>
                <table className='table table-striped mt-5 text-center'>
                    <thead>

                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            {/* <th>Category</th> */}
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {cart?.map((p) => {

                            return (
                                <tr style={{ verticalAlign: 'middle' }}>
                                    <td>
                                        <img src={`http://localhost:3308/${p.p_image}`} width={50} alt={p.p_name} />
                                    </td>

                                    <td>{p.p_name}</td>
                                    <td style={{ color: '#555' }}>{p.p_description.length > 100 ? p.p_description.substring(0, 75) + '...' : p.p_description}</td>
                                    <td>{p.p_price}</td>
                                    {/* <td>{p.c_name}</td> */}
                                    <td>1</td>
                                    {/* <td><button style={{ backgroundColor: 'red', border: 'none', color: 'white' }}>Remove</button></td> */}
                                    <td>
                                        <div><button style={{ fontSize: '20px', backgroundColor: 'transparent', border: 'none', color: 'red' }} onClick={() => removeCartItems(p.p_id)}><MdClose /></button></div>
                                    </td>

                                </tr>

                            );

                        })}
                        <tr>
                            <td colSpan={7} style={{ textAlign: 'right', paddingRight: '25px' }}>
                                <b>Total Amount: </b>{cart?.reduce((total, item) => total + item.p_price, 0)}
                            </td>

                        </tr>
                    </tbody>

                </table>
                <div className='w-100' style={{ textAlign: 'Right' }}><button style={{ fontSize: '14px', backgroundColor: 'rgb(0,120,0)', border: 'none', color: 'white', padding: '10px 14px' }} > Proceed </button></div>

            </div>
            {/* 
            <div className="shop-body">
                <div className="product-list">
                    {cart?.map((p) => (
                        <div className="product-card">
                            <div className="product-image" style={{ backgroundImage: `url('../public/images/${p.p_img}')` }}></div>
                            <div className="product-info">
                                <h4>{p.p_name}</h4>
                                <p>{p.p_description}</p>
                                <p>{p.p_price}</p>
                            </div>
                            <div><button onClick={() => removeCartItems(p.p_id)}>Remove Cart</button></div>
                        </div>
                    ))}
                </div>


            </div> */}
        </>
    )
}

export default CartPage