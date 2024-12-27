import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClientSelect from './ClientSelect'; // Asegúrate de importar el componente ClientSelect

const CardRecharge = ({ rechargeCard }) => {
    const [selectedClient, setSelectedClient] = useState('');
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        const fetchCards = async () => {
            if (selectedClient) {
                try {
                    const response = await axios.get('http://localhost:3000/v1/getTarjetas', {
                        params: { "HolderName": selectedClient }
                    });
                    if (response.data && Array.isArray(response.data.data)) {
                        const formattedCards = response.data.data.map(card => ({
                            cardId: card.CardNumber,
                            displayValue: `${card.CardNumber} - ${card.HolderName}`
                        }));
                        setCards(formattedCards);
                    } else {
                        console.error('Expected an array but got:', response.data);
                    }
                } catch (error) {
                    console.error('Error fetching cards:', error);
                }
            }
        };

        fetchCards();
    }, [selectedClient]);

    const handleRecharge = async (e) => {
        e.preventDefault();

        if (!selectedCard) {
            alert('Por favor, seleccione una tarjeta.');
            return;
        }

        if (!amount) {
            alert('Por favor, ingrese un monto.');
            return;
        }

        const rechargeData = {
            CardId: selectedCard,
            Amount: parseFloat(amount)
        };

        try {
            const response = await axios.post('http://localhost:3000/v1/recargaTarjeta', rechargeData);
            const data = response.data;
            const producto = data.producto[0]; // Asumiendo que siempre hay al menos un producto

            const alertMessage = `
                ${data.message}
                Status: ${producto.Status}
                CardNumber: ${producto.CardNumber}
                RechargeAmount: ${producto.RechargeAmount}
                OldBalance: ${producto.OldBalance}
                NewBalance: ${producto.NewBalance}
            `;

            alert(alertMessage);
            setAmount('');
        } catch (error) {
            console.error('Error en la recarga:', error);
            alert('Error en la recarga');
        }
    };

    return (
        <div className="card-recharge">
            <h2>Recarga de Tarjeta</h2>
            <form onSubmit={handleRecharge}>
                <ClientSelect onClientSelect={setSelectedClient} />
                
                {cards.length > 0 && (
                    <div>
                        <label>Seleccionar Tarjeta</label>
                        <select 
                            value={selectedCard}
                            onChange={(e) => setSelectedCard(e.target.value)}
                            required
                        >
                            <option value="">Seleccione una tarjeta</option>
                            {cards.map((card, index) => (
                                <option key={index} value={card.cardId}>
                                    {card.displayValue}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div>
                    <label>Monto</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Monto a recargar"
                        required
                    />
                </div>

                <button type="submit">Recargar</button>
            </form>
        </div>
    );
};

export default CardRecharge;
