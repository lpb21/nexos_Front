import React from 'react';
import ProductCard from './ProductCard';

const ProductCarousel = ({ products, addToCart }) => {
    return (
        <div className="product-carousel">
            {products.map((product) => (
                <ProductCard 
                key={product.id} 
                product={product} 
                addToCart={addToCart} 
                />
            ))}
        </div>
    );
};

export default ProductCarousel;
