const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');


const fs = require("fs");

const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
    // host: 'localhost',
    // user: 'root',
    // password: '',
    // database: 'proj',
    host: 'junction.proxy.rlwy.net',  // Extracted host from the URL
    user: 'root',                     // Username from the URL
    password: 'ZIdWRKAHOagfqNWPjwTwptqOGmUKAhbr',  // Password from the URL
    database: 'railway',              // Database name from the URL
    port: 20934, 
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
    console.log('Connected successfully to the database');
});
// Configure multer for image uploads
const uploadDir = path.join(__dirname, "/public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir); // Save files in `public/uploads`
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  });

const upload = multer({ storage });
app.post('/add-product', upload.single('p_image'), (req, res) => {
    const { p_name, p_description, p_price, p_category } = req.body;
    const p_image = req.file ? `uploads/${req.file.filename}` : null;

    console.log('Body:', req.body);
    console.log('File:', req.file);
    // Validation
    if (!p_name || !p_description || !p_price || !p_category || !p_image) {
        return res.status(400).send({ error: 'All fields are required' });
    }

    // Validate category
    const categoryCheckQuery = 'SELECT COUNT(*) AS count FROM categories WHERE c_id = ?';
    db.execute(categoryCheckQuery, [p_category], (err, results) => {
        if (err) {
            console.error('Error checking category:', err);
            return res.status(500).send({ error: 'Internal server error' });
        }

        if (results[0].count === 0) {
            return res.status(400).send({ error: 'Invalid category' });
        }

        // Insert product into database
        const insertQuery = `
            INSERT INTO products (p_name, p_description, p_price, p_category, p_image)
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [p_name, p_description, p_price, p_category, p_image];

        db.execute(insertQuery, values, (err, result) => {
            if (err) {
                console.error('Error inserting product:', err);
                return res.status(500).send({ error: 'Failed to create product' });
            }

            res.status(201).send({
                success: true,
                message: 'Product created successfully',
                productId: result.insertId,
            });
        });
    });
});

// Serve static files (images)
app.use( express.static('public'));

//Rough for getting product
app.get('/get-products', (req, res) => {
    const query = `
        SELECT 
            p.p_id, 
            p.p_name, 
            p.p_description, 
            p.p_price, 
            p.p_category, 
            c.c_name AS c_name, 
            p.p_image
        FROM 
            products p
        JOIN 
            categories c 
        ON 
            p.p_category = c.c_id;
    `;

    db.execute(query, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).send({
                success: false,
                message: 'Error fetching products',
                error: err.message,
            });
        }

        res.status(200).send({
            success: true,
            message: 'Products fetched successfully',
            data: results,
        });
    });
});

//New arrivals
app.get('/new-arrivals', (req, res) => { 
    const query = `
        SELECT 
            p.p_id, 
            p.p_name, 
            p.p_description, 
            p.p_price, 
            p.p_category, 
            c.c_name AS c_name, 
            p.p_image
        FROM 
            products p
        JOIN 
            categories c 
        ON 
            p.p_category = c.c_id
        ORDER BY 
             p.p_id DESC
        LIMIT 12;
    `;

    db.execute(query, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).send({
                success: false,
                message: 'Error fetching products',
                error: err.message,
            });
        }

        res.status(200).send({
            success: true,
            message: 'Products fetched successfully',
            data: results,
        });
    });
});

app.get('/get-products-count', (req, res) => {
    const query = `
        SELECT COUNT(*) AS product_count
        FROM products;
    `;

    db.execute(query, (err, results) => {
        if (err) {
            console.error('Error counting products:', err);
            return res.status(500).send({
                success: false,
                message: 'Error counting products',
                error: err.message,
            });
        }

        const productCount = results[0].product_count;
        res.status(200).send({
            success: true,
            message: 'Product count fetched successfully',
            count: productCount,
        });
    });
});

// Update Products with the help of p_Id--------->
// app.put('/update-product/:p_id', (req, res) => {
//     const { p_name, p_description, p_price, p_category, p_image } = req.body;
//     const { p_id } = req.params;

//     // Validation
//     if (!p_id) {
//         return res.status(400).send({ success: false, message: 'Product ID is required' });
//     }

//     // Update query
//     const query = `
//         UPDATE products
//         SET 
//             p_name = ?, 
//             p_description = ?, 
//             p_price = ?, 
//             p_category = ?, 
//             p_image = ?
//         WHERE 
//             p_id = ?;
//     `;

//     const values = [p_name, p_description, p_price, p_category, p_image, p_id];

//     db.execute(query, values, (err, result) => {
//         if (err) {
//             console.error('Error updating product:', err);
//             return res.status(500).send({
//                 success: false,
//                 message: 'Error updating product',
//                 error: err.message,
//             });
//         }

//         if (result.affectedRows === 0) {
//             return res.status(404).send({
//                 success: false,
//                 message: 'Product not found',
//             });
//         }

//         res.status(200).send({
//             success: true,
//             message: 'Product updated successfully',
//         });
//     });
// });
app.put('/update-product/:p_id', (req, res) => {
    const { p_name, p_description, p_price, p_category } = req.body; // removed p_image from req.body
    const { p_id } = req.params;

    // Validation
    if (!p_id) {
        return res.status(400).send({ success: false, message: 'Product ID is required' });
    }

    // Query to fetch the current image (if not updated)
    const fetchImageQuery = `SELECT p_image FROM products WHERE p_id = ?`;
    db.execute(fetchImageQuery, [p_id], (err, result) => {
        if (err) {
            console.error('Error fetching product:', err);
            return res.status(500).send({
                success: false,
                message: 'Error fetching product',
                error: err.message,
            });
        }

        if (result.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'Product not found',
            });
        }

        // Use the existing image if not provided in the request
        const existingImage = result[0].p_image;

        // Update query
        const query = `
            UPDATE products
            SET 
                p_name = ?, 
                p_description = ?, 
                p_price = ?, 
                p_category = ?, 
                p_image = ?
            WHERE 
                p_id = ?;
        `;

        const values = [p_name, p_description, p_price, p_category, existingImage, p_id];

        // Execute the update query
        db.execute(query, values, (err, result) => {
            if (err) {
                console.error('Error updating product:', err);
                return res.status(500).send({
                    success: false,
                    message: 'Error updating product',
                    error: err.message,
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).send({
                    success: false,
                    message: 'Product not found',
                });
            }

            res.status(200).send({
                success: true,
                message: 'Product updated successfully',
            });
        });
    });
});

//Deleting product with the help of p_id------------->

app.delete('/delete-product/:p_id', (req, res) => {
    const { p_id } = req.params;

    // Validation: Check if product ID is provided
    if (!p_id) {
        return res.status(400).send({ success: false, message: 'Product ID is required' });
    }

    // Delete query
    const query = `
        DELETE FROM products
        WHERE p_id = ?;
    `;

    // Execute the query
    db.execute(query, [p_id], (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            return res.status(500).send({
                success: false,
                message: 'Error deleting product',
                error: err.message,
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: 'Product not found',
            });
        }

        res.status(200).send({
            success: true,
            message: 'Product deleted successfully',
        });
    });
});

//User Register------------>
app.post('/user-register', (req, res) => {
    const { u_name, u_email, u_password, u_address, u_answer } = req.body;

    // Input validation
    if (!u_name) {
        return res.send({ message: 'Name is Required' });
    }
    if (!u_email) {
        return res.send({ message: 'Email is Required' });
    }
    if (!u_password) {
        return res.send({ message: 'Password is Required' });
    }
    if (!u_address) {
        return res.send({ message: 'Address is Required' });
    }
    if (!u_answer) {
        return res.send({ message: 'Answer is Required' });
    }

    // Check if user already exists
    db.query('SELECT * FROM users WHERE u_email = ?', [u_email], (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ success: false, message: 'Database error', error: err });
        }
        if (rows.length > 0) {
            return res.status(200).send({
                success: false,
                message: 'Already Registered, please Login',
            });
        }

        // Insert the new user
        db.query(
            `INSERT INTO users (u_name, u_email, u_password, u_address,u_ques, u_answer, u_role) 
             VALUES (?, ?, ?, ?, ?, ?,?)`,
            [u_name, u_email, u_password, u_address,1, u_answer, 'user'],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send({ success: false, message: 'Database error', error: err });
                }

                // Respond with success
                res.status(201).send({
                    success: true,
                    message: 'User Registered Successfully',
                    user: {
                        u_id: result.insertId,
                        u_name,
                        u_email,
                        u_address,
                        u_ques:1,
                        u_answer,
                        u_role: 'user',
                    },
                });
            }
        );
    });
});

// // User login endpoint
// app.post('/user-login', (req, res) => {
//     const { u_email, u_password } = req.body;

//     try {
//         // Input validation
//         if (!u_email) {
//             return res.status(400).send({ message: 'Email is Required' });
//         }
//         if (!u_password) {
//             return res.status(400).send({ message: 'Password is Required' });
//         }

//         // Check if user exists
//         db.query('SELECT * FROM users WHERE u_email = ?', [u_email], (err, rows) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).send({ message: 'Error during login', error: err });
//             }

//             if (rows.length === 0) {
//                 return res.status(404).send({
//                     success: false,
//                     message: 'User not found, please register first',
//                 });
//             }

//             const user = rows[0];

//             // Compare the plain password
//             if (u_password !== user.u_password) {
//                 return res.status(401).send({
//                     success: false,
//                     message: 'Invalid password',
//                 });
//             }

//             // Respond with success
//             res.status(200).send({
//                 success: true,
//                 message: 'Login successful',
//                 user: {
//                     u_id: user.u_id,
//                     u_name: user.u_name,
//                     u_email: user.u_email,
//                     u_role: user.u_role
//                 },
//             });
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({
//             success: false,
//             message: 'Error during login',
//             error,
//         });
//     }
// });
app.post('/user-login', (req, res) => {
    const { u_email, u_password } = req.body;

    try {
        // Input validation
        if (!u_email) {
            return res.status(400).send({ message: 'Email is required' });
        }
        if (!u_password) {
            return res.status(400).send({ message: 'Password is required' });
        }

        // Check if user exists
        db.query('SELECT * FROM users WHERE u_email = ?', [u_email], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ message: 'Error during login', error: err });
            }

            if (rows.length === 0) {
                return res.status(404).send({
                    success: false,
                    message: 'User not found, please register first',
                });
            }

            const user = rows[0];

            // Compare the plain password
            if (u_password !== user.u_password) {
                return res.status(401).send({
                    success: false,
                    message: 'Invalid password',
                });
            }

            // Respond with success
            res.status(200).send({
                success: true,
                message: 'Login successful',
                user: {
                    u_id: user.u_id,
                    u_name: user.u_name,
                    u_email: user.u_email,
                    u_role: user.u_role,
                },
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error during login',
            error,
        });
    }
});


//forget Password
app.post('/forgot-password', (req, res) => {
    const { u_email, u_answer, new_password } = req.body;

    // Validate inputs
    if (!u_email || !u_answer || !new_password) {
        return res.status(400).send({ message: 'Email, answer, and new password are required' });
    }

    // Check if user exists and if the answer is correct
    db.query('SELECT * FROM users WHERE u_email = ?', [u_email], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send({
                success: false,
                message: 'Error during query',
                error: err,
            });
        }

        if (rows.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'User not found, please check the email or register',
            });
        }

        const user = rows[0];

        // Check if the answer is correct
        if (u_answer !== user.u_answer) {
            return res.status(401).send({
                success: false,
                message: 'Incorrect answer to the security question',
            });
        }

        // If answer is correct, update the password (without hashing)
        db.query('UPDATE users SET u_password = ? WHERE u_email = ?', [new_password, u_email], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send({
                    success: false,
                    message: 'Error during password update',
                    error: err,
                });
            }

            res.status(200).send({
                success: true,
                message: 'Password has been updated successfully',
                user: {
                    u_id: user.u_id,
                    u_email: user.u_email,
                    new_password: user.u_password,
                    u_answer:user.u_answer
                },
            });
        });
    });
});


// get products by category
app.get('/get-products-by-category/:categoryName', (req, res) => {
    const categoryName = req.params.categoryName; // Assuming the category name is passed as a parameter

try {
    // Fetch the category by name
    db.query('SELECT * FROM categories WHERE c_name = ?', [categoryName], (err, categoryResult) => {
        if (err) {
            console.error(err);
            return res.status(500).send({
                success: false,
                message: 'Error while fetching category',
                error: err,
            });
        }

        // Check if category exists
        if (categoryResult.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'Category not found',
            });
        }

        const category = categoryResult[0];

        // Fetch products associated with the category
        db.query('SELECT * FROM products WHERE p_category = ?', [category.c_id], (err, productResult) => {
            if (err) {
                console.error(err);
                return res.status(500).send({
                    success: false,
                    message: 'Error while fetching products',
                    error: err,
                });
            }

            // Respond with category and products
            res.status(200).send({
                success: true,
                category,
                products: productResult,
            });
        });
    });
} catch (error) {
    console.error(error);
    res.status(500).send({
        success: false,
        message: 'Unexpected error',
        error,
    });
}
})
app.get('/get-products-count-by-category', (req, res) => {
    try {
        // Query to fetch product counts grouped by category
        const query = `
            SELECT categories.c_name AS category, COUNT(products.p_id) AS productCount
            FROM categories
            LEFT JOIN products ON categories.c_id = products.p_category
            GROUP BY categories.c_name
        `;

        db.query(query, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send({
                    success: false,
                    message: 'Error while fetching product counts',
                    error: err,
                });
            }

            res.status(200).send({
                success: true,
                data: results,
            });
            console.log(results)
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Unexpected error',
            error,
        });
    }
});


//get categories only
// app.get('/get-categories', (req, res) => {
//     try {
//         // Fetch all categories from the database
//         db.query('SELECT c_name FROM categories', (err, categoryResult) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).send({
//                     success: false,
//                     message: 'Error while fetching categories',
//                     error: err,
//                 });
//             }

//             // Respond with the list of category names
//             res.status(200).send({
//                 success: true,
//                 categories: categoryResult,
//             });
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({
//             success: false,
//             message: 'Unexpected error',
//             error,
//         });
//     }
// });
app.get('/get-categories', (req, res) => {
    try {
        const query = `
            SELECT 
                c.c_id,
                c.c_name, 
                COUNT(p.p_id) AS product_count
            FROM 
                categories c
            LEFT JOIN 
                products p 
            ON 
                c.c_id = p.p_category
            GROUP BY 
                c.c_id, c.c_name;
        `;

        db.query(query, (err, categoryResult) => {
            if (err) {
                console.error('Error fetching categories:', err);
                return res.status(500).send({
                    success: false,
                    message: 'Error while fetching categories',
                    error: err.message,
                });
            }

            res.status(200).send({
                success: true,
                categories: categoryResult,
            });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).send({
            success: false,
            message: 'Unexpected error',
            error,
        });
    }
});


//Search product by name
app.get('/search-products/:keyword', (req, res) => {
    const keyword  = req.params.keyword; // Get the search keyword from the request parameters

    try {
        // Search for products by name or description using LIKE for partial matching
        const query = `
            SELECT * 
            FROM products 
            WHERE p_name LIKE ? OR p_description LIKE ?
        `;

        // `%${keyword}%` for pattern matching in SQL
        db.query(query, [`%${keyword}%`, `%${keyword}%`], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send({
                    success: false,
                    message: 'Error while searching for products',
                    error: err,
                });
            }
            if (results.length === 0) {
                return res.status(404).send({
                    success: false,
                    message: 'Product not found',
                });
            }
    

            // Respond with the search results
            res.status(200).send({
                success: true,
                products: results,
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Unexpected error',
            error,
        });
    }
});

//create contact
app.post('/create-contact', (req, res) => {
    const { c_name, c_email, c_message, c_subject} = req.body;

    // Validation
    if (!c_name) return res.status(400).send({ error: 'Name is required' });
    if (!c_name) return res.status(400).send({ error: 'Description is required' });
    if (!c_message) return res.status(400).send({ error: 'Price is required' });
    if (!c_subject) return res.status(400).send({ error: 'Subject is required' });
    
    console.log(req.body);
        // Insert product
        const query = `
            INSERT INTO contact (c_name, c_email, c_subject, c_message)
            VALUES (?, ?, ?,?)
        `;
        const values = [c_name, c_email, c_message, c_subject];

        db.execute(query, values, (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).send({
                    success: false,
                    message: 'Error creating product',
                    error: err.message,
                });
            }

            res.status(201).send({
                success: true,
                message: 'Contact Created Successfully',
                data: {
                    productId: result.insertId, // Get the auto-generated ID
                    result
                },
            });
        });
    });



const port = 3308;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


//Rough for getting faqs
app.get('/get-faqs', (req, res) => {
    const query = `
        SELECT 
        id,
        question,
        answer

        FROM 
            faqs
    `;

    db.execute(query, (err, results) => {
        if (err) {
            console.error('Error fetching faqs:', err);
            return res.status(500).send({
                success: false,
                message: 'Error fetching faqs',
                error: err.message,
            });
        }

        res.status(200).send({
            success: true,
            message: 'FAQs fetched successfully',
            data: results,
        });
    });
});


app.get('/get-subscribers', (req, res) => {
    const query = `
        SELECT 
        id,
        email
        
        FROM 
            subscribers
    `;

    db.execute(query, (err, results) => {
        if (err) {
            console.error('Error fetching Subscribers:', err);
            return res.status(500).send({
                success: false,
                message: 'Error fetching Subscribers',
                error: err.message,
            });
        }

        res.status(200).send({
            success: true,
            message: 'Subscribers fetched successfully',
            data: results,
        });
    });
});

//POST method for get in touch
app.post('/add-subscriber', (req, res) => {
    const { email } = req.body; // Assuming the email is sent in the body of the request

    // Validate the email address
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).send({
            success: false,
            message: 'Invalid email address',
        });
    }

    const query = `INSERT INTO subscribers (email) VALUES (?)`;

    db.execute(query, [email], (err, results) => {
        if (err) {
            console.error('Error inserting subscriber:', err);
            return res.status(500).send({
                success: false,
                message: 'Error inserting subscriber',
                error: err.message,
            });
        }

        res.status(201).send({
            success: true,
            message: 'Subscriber added successfully',
            data: {
                id: results.insertId, // Return the auto-incremented id
                email,
            },
        });
    });
});


app.delete('/delete-subscriber/:email', (req, res) => {
    const { email } = req.params;

    const query = `
        DELETE FROM subscribers 
        WHERE email = ?
    `;

    db.execute(query, [email], (err, results) => {
        if (err) {
            console.error('Error deleting subscriber:', err);
            return res.status(500).send({
                success: false,
                message: 'Error deleting subscriber',
                error: err.message,
            });
        }

        if (results.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: 'Subscriber not found',
            });
        }

        res.status(200).send({
            success: true,
            message: 'Subscriber deleted successfully',
        });
    });
});

app.get('/get-subscriber-count', (req, res) => {
    const query = `
        SELECT COUNT(*) AS totalSubscribers
        FROM subscribers
    `;

    db.execute(query, (err, results) => {
        if (err) {
            console.error('Error counting subscribers:', err);
            return res.status(500).send({
                success: false,
                message: 'Error counting subscribers',
                error: err.message,
            });
        }

        res.status(200).send({
            success: true,
            message: 'Subscriber count fetched successfully',
            data: { totalSubscribers: results[0].totalSubscribers },
        });
    });
});

app.get('/get-normal-users-count', (req, res) => {
    const query = `
        SELECT COUNT(*) AS normalUsersCount
        FROM users
        WHERE u_role != 0
    `;

    db.execute(query, (err, results) => {
        if (err) {
            console.error('Error fetching normal users count:', err);
            return res.status(500).send({
                success: false,
                message: 'Error fetching normal users count',
                error: err.message,
            });
        }

        const count = results[0].normalUsersCount;
        res.status(200).send({
            success: true,
            message: 'Normal users count fetched successfully',
            count,
        });
    });
});
