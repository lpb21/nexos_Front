import React from 'react';

const SideMenu = ({ setView }) => {
    return (
        <div className="side-menu">
            <button onClick={() => setView('cart')}>ShoppingCart</button>
            <button onClick={() => setView('recharge')}>CardRecharge</button>
            <button onClick={() => setView('create-card')}>CardCreation</button>
        </div>
    );
};

export default SideMenu;
