import React,{ useState } from 'react';
import PaymentModal from './ModalPay';

const ShoppingCart = ({ cart, removeFromCart }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Calcular el total del carrito
    const total = cart.reduce((sum, product) => sum + product.price, 0);

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert('El carrito está vacío');
        } else {
            setIsModalOpen(true);
        }
    };

    const handlePaymentSubmit = (paymentInfo) => {
        alert('Transacción enviada');
        setIsModalOpen(false);
    };

    return (
        <div className="shopping-cart">
            <h2>Carrito de Compras</h2>
            {cart.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                cart.map((product, index) => (
                    <div key={index} className="cart-item">
                        <h4>{product.title}</h4>
                        <p>Precio: ${product.price}</p>
                        <button onClick={() => removeFromCart(product)}>Eliminar</button>
                    </div>
                ))
            )}
            <div className="cart-total">
                <h3>Total: ${total.toFixed(2)}</h3>
            </div>
            <button onClick={handleCheckout}>Pagar</button>
            <PaymentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handlePaymentSubmit}
                total={total}
            />
        </div>
    );
};

export default ShoppingCart;
