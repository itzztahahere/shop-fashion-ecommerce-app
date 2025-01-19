

// export default AddProduct;
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../AddProduct.css'; // Ensure you import your custom styles

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [imagep,setImagep] = useState()
  
  // 'success' or 'danger'

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || !category || !imagep) {
      setMessageType('danger');
      setMessage('All fields are required!');
      return;
    }

    const formData = new FormData();
    formData.append('p_name', name);
    formData.append('p_description', description);
    formData.append('p_price', price);
    formData.append('p_category', category);
    formData.append('p_image', imagep);

    try {
      const response = await fetch('${apiUrl}/add-product', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log(result)
      if (response.ok && result.success) {
        setMessageType('success');
        setMessage(result.message);
        // Reset form
        setName('');
        setDescription('');
        setPrice('');
        setCategory('');
        setImage(null);
      } else {
        setMessageType('danger');
        setMessage(result.message || 'Something went wrong!');
      }
    } catch (error) {
      setMessageType('danger');
      setMessage('Failed to connect to the server.');
    }
  };
  const handlefile = (e) => {
  setImagep(e.target.files[0])
  }
//   const handleUpload = () => {
//     const fromdata = new FormData();
//     fromdata.append('p_image', file);
    
// }
  return (
    <section className="add-product-container">
      <div className="add-product-form">
        <h2 className="add-product-heading">Add a New Product</h2>
        {message && (
          <div className={`alert alert-${messageType}`} role="alert">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter the product name"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a brief description of the product"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="price">Price (PKR)</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter the product price"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter the product category"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="image">Upload Product Image</label>
            <input
              type="file"
              id="image"
              onChange={handlefile}
              accept="image/*"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
