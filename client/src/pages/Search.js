import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/Cart';


const Search = () => {
  const { keyword } = useParams();

  const [products, setProducts] = useState([]); // State to store fetched products
  const [loading, setLoading] = useState(true); // State to show loading indicator
  const { cart, setCart } = useCart();

  // Add to Cart functionality from context

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`${apiUrl}/search-products/${keyword}`);
        const data = await response.json();
        if (data.success) {
          console.log(products);
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [keyword]);

  return (
    <>
      <div className="container mt-4">
        <h2 className="text-center">Search Results</h2>
        {loading ? (
          <div className="text-center mt-5">
            <p>Loading...</p>
          </div>
        ) : products.length > 0 ? (
          <table className="table table-striped mt-5 text-center">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {

                return (
                  <tr keyword={product.p_id} style={{ verticalAlign: 'middle' }}>
                    <td>
                      <img src={`${apiUrl}/${product.p_image}`} width={50} alt={product.p_name} />
                    </td>
                    <td>{product.p_name}</td>
                    <td style={{ color: '#555' }}>
                      {product.p_description.length > 100
                        ? product.p_description.substring(0, 75) + '...'
                        : product.p_description}
                    </td>
                    <td>{product.p_price}</td>
                    <td>
                      <button
                        className="add-to-cart-button"
                        onClick={() => {
                          const updatedCart = [...cart, product];
                          alert('Item Added to Cart')

                          setCart(updatedCart);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify(updatedCart)
                          );
                        }}
                      >
                        Add To Cart
                      </button>
                    </td>
                  </tr>


                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-5">
            <p>No products found for "{keyword}"</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
