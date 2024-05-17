const { Sequelize, INTEGER } = require("sequelize");
const dbConnection = require("../config/dbConnection");
const { param } = require("../routes/userRoutes");

// **********************************************************************************************************************************************************************************************************
//route handler for fetching products
const fetchProducts = async (req, res) => {
  try {
    const products = await dbConnection.query("SELECT * FROM products", []);
    // Pass an empty array as the second argument since there are no query parameters

    // only need rows from the query executions
    const rows = products.rows;

    // Beautify the JSON response with indentation
    const beautifiedProducts = JSON.stringify(rows, null, 2);

    res.header("Content-Type", "application/json");
    res.send(beautifiedProducts);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// **********************************************************************************************************************************************************************************************************
//route handler for fetching product by Id
const getProductById = async (req, res) => {
  try {
    // Extract the ID from the query parameters
    const productId = parseInt(req.params.id);

    // Validate if the id parameter exists
    if (!productId) {
      return res
        .status(400)
        .json({ message: "Product ID is required in the URL" });
    }

    const currentProduct = await dbConnection.query(
      "SELECT * FROM products where id = $1",
      [productId]
    );

    // console.log(
    //   "*****************************************************************************************************",
    //   currentProduct.rows.length,
    //   "*****************************************************************************************************"
    // );

    if (currentProduct.rows.length == 0) {
      return res
        .status(400)
        .json({ message: "No product with this id exists in the db" });
    }

    // similar to the above route handler, we will only need the record of the product we want
    const record = currentProduct.rows;

    // Beautify the JSON response with indentation
    const beautifiedProducts = JSON.stringify(record, null, 2);

    res.header("Content-Type", "application/json");
    res.send(beautifiedProducts);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error });
  }
};
// **********************************************************************************************************************************************************************************************************
// Route handler for adding a product
const addProduct = async (req, res) => {
  try {
    // Extract product information from the request body
    const {
      product_title,
      product_description,
      available_stock,
      product_rating,
      sold_by,
      brand,
      product_category,
      age_group,
      product_price,
      image_url,
    } = req.body;

    const now = new Date().toISOString();

    // console.log("PRODCUT VACETOGORY: ", product_category);
    // console.log("MY REQUEST BODY CHECK:", req.body);

    // Check if all required fields are present
    if (
      !product_title ||
      !product_description ||
      !available_stock ||
      !product_rating ||
      !sold_by ||
      !brand ||
      !product_category ||
      !age_group ||
      !product_price ||
      !image_url
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const presentCategory = await dbConnection.query(
      "SELECT * FROM categories where category_name = $1",
      [product_category]
    );

    if (presentCategory.rows.length === 0) {
      // insert this new category into categroies table
      const now = new Date().toISOString();
      await dbConnection.query(
        `INSERT INTO categories (category_name,created_at,updated_at) VALUES ($1,$2,$3)`,
        [product_category, now, now]
      );
    } else {
      // Update the updated_at column for the existing category
      const now = new Date().toISOString();
      await dbConnection.query(
        "UPDATE categories SET updated_at = $1 WHERE category_name = $2",
        [now, product_category]
      );
    }

    // Execute the SQL query to insert the product into the database
    const result = await dbConnection.query(
      `INSERT INTO products (product_title, product_description, available_stock, product_rating, sold_by, brand, product_category, age_group, product_price, image_url, created_at, updated_at)  
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [
        product_title,
        product_description,
        available_stock,
        product_rating,
        sold_by,
        brand,
        product_category,
        age_group,
        product_price,
        image_url,
        now,
        now,
      ]
    );

    // Extract the inserted product from the result - because we used RETURNING
    const insertedProduct = result.rows[0];

    // Send the inserted product as the response
    res.status(201).json(insertedProduct);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// **********************************************************************************************************************************************************************************************************
// Route handler for deleting a product by Id
const deleteProductById = async (req, res) => {
  try {
    // Extract the ID from the query parameters
    const productId = parseInt(req.params.id);

    // Validate if the id parameter exists
    if (!productId) {
      return res
        .status(400)
        .json({ message: "Product ID is required in query parameters" });
    }

    const currentProduct = await dbConnection.query(
      "SELECT * FROM products where id = $1",
      [productId]
    );

    if (currentProduct.rows.length == 0) {
      return res
        .status(400)
        .json({ message: "No product with this id exists in the db" });
    }

    await dbConnection.query("DELETE from products where id = $1", [productId]);

    // Send a success response
    res.status(201).json({ message: "This product has been deleted" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error });
  }
};

// **********************************************************************************************************************************************************************************************************
const updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const {
      product_title,
      product_description,
      available_stock,
      product_rating,
      sold_by,
      brand,
      product_category,
      age_group,
      product_price,
      image_url,
    } = req.body;

    // Initialize arrays to store SET clauses and corresponding values
    const setClauses = [];
    const values = [];
    let paramcount = 1;
    // Add SET clauses and values for each provided field
    if (product_title !== undefined) {
      setClauses.push(`product_title = $${paramcount}`);
      values.push(product_title);
      paramcount += 1;
    }
    if (product_description !== undefined) {
      setClauses.push(`product_description = $${paramcount}`);
      values.push(product_description);
      paramcount += 1;
    }
    if (available_stock !== undefined) {
      setClauses.push(`available_stock = $${paramcount}`);
      values.push(available_stock);
      paramcount += 1;
    }

    // Add SET clauses and values for each provided field
    if (product_rating !== undefined) {
      setClauses.push(`product_rating = $${paramcount}`);
      values.push(product_rating);
      paramcount += 1;
    }
    if (sold_by !== undefined) {
      setClauses.push(`sold_by = $${paramcount}`);
      values.push(sold_by);
      paramcount += 1;
    }
    if (brand !== undefined) {
      setClauses.push(`brand = $${paramcount}`);
      values.push(brand);
      paramcount += 1;
    }

    // Add SET clauses and values for each provided field
    if (product_category !== undefined) {
      setClauses.push(`product_category = $${paramcount}`);
      values.push(product_category);
      paramcount += 1;
    }
    if (product_description !== undefined) {
      setClauses.push(`product_description = $${paramcount}`);
      values.push(product_description);
      paramcount += 1;
    }
    if (age_group !== undefined) {
      setClauses.push(`age_group = $${paramcount}`);
      values.push(age_group);
      paramcount += 1;
    }
    if (product_price !== undefined) {
      setClauses.push(`product_price = $${paramcount}`);
      values.push(product_price);
      paramcount += 1;
    }
    if (image_url !== undefined) {
      setClauses.push(`image_url = $${paramcount}`);
      values.push(image_url);
    }

    // Combine SET clauses into a single string
    const setClause = setClauses.join(", ");
    // console.log(req.body);

    // const updateQuery = `UPDATE products
    //    SET ${setClause}
    //    WHERE id = ${productId}
    //    RETURNING *`;

    // console.log("DETAILS: ", updateQuery, values, productId);

    // Execute the SQL query to update the product in the database
    const result = await dbConnection.query(
      `UPDATE products 
       SET ${setClause}
       WHERE id = $${values.length + 1}
       RETURNING *`,
      [...values, productId] // Concatenate values array with productId
    );

    // Check if the product was updated successfully
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Extract the updated product from the result
    const updatedProduct = result.rows[0];

    // Send the updated product as the response
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    // Extract the category from the URL's params
    const category = req.params.category;

    // Validate if the category parameter exists
    if (!category) {
      return res
        .status(400)
        .json({ message: "category is required in the URL" });
    }

    const currentProduct = await dbConnection.query(
      "SELECT * FROM products where product_category = $1",
      [category]
    );

    // console.log(
    //   "*****************************************************************************************************",
    //   currentProduct.rows.length,
    //   "*****************************************************************************************************"
    // );

    if (currentProduct.rows.length == 0) {
      return res
        .status(400)
        .json({ message: "No product with this category exists in the db" });
    }

    // similar to the above route handler, we will only need the record of the product we want
    const record = currentProduct.rows;

    // Beautify the JSON response with indentation
    const beautifiedProducts = JSON.stringify(record, null, 2);

    res.header("Content-Type", "application/json");
    res.send(beautifiedProducts);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error });
  }
};
// **********************************************************************************************************************************************************************************************************

// **********************************************************************************************************************************************************************************************************
module.exports = {
  fetchProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
  getProductsByCategory,
};
// **********************************************************************************************************************************************************************************************************
