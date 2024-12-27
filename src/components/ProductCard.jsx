import React from 'react';

const ProductCard = ({ product, addToCart }) => {
    return (
        <div className="product-item">
            <img src={product.images[0]} alt={product.title} className="product-image"/>
            <h3>{product.title}</h3>
            <p>Precio: ${product.price}</p>
            <button onClick={() => addToCart(product)}>Agregar al carrito</button>
        </div>
    );
};

export default ProductCard;
