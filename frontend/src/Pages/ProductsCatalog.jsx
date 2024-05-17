import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard'; // Import your ProductCard component
const ProductsCatalog = ( { handleProductClick }) => {

  const [products, setProducts] = useState([]);
  const categories = [ // List of your categories
    "All",
    "Drinking water",
    "Energy Water",
    "Alklaine Water",
    "Spring Water"
  ];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]); // Initially selected category

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/productsApi'); // Assuming a valid API endpoint
        const data = await response.json();

        // Ensure data is an array to prevent errors
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('API response is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = products.filter(
    (product) => product.product_category === selectedCategory || selectedCategory === "All"
  );

  return (
    <div className='Heading'>
     <div className='Prodct'><h1 >Products</h1> </div>
     <div className="filter-section"> {/* Wrapper div with classname for CSS editing */}
      <select value={selectedCategory} onChange={handleCategoryChange}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="product-list">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product}  handleClick={handleProductClick} />

          ))}
        </div>
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  );
};

export default ProductsCatalog;
