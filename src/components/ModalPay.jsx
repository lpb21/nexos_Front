import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "../modalPay.css";

const PaymentModal = ({ isOpen, onClose, onSubmit, total }) => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 16) {
      setCardNumber(value);
    }
  };

  

   const handleSubmit = async (e) => {
     e.preventDefault();

     const formattedDate = expiryDate ? expiryDate.toISOString().split('T')[0] : '';
  const transactionData = { name, cardNumber, expiryDate: formattedDate, total };

    try {
      const response = await axios.post(
        "http://localhost:3000/v1/transaccion",
        transactionData
      );
      onSubmit(transactionData);

      const data = response.data;
      const message = data.message;
      alert(message);
    } catch (error) {
      console.error("Error en la transacción:", error);
      alert("Error en la transacción");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Información de Pago</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Número de Tarjeta</label>
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              required
            />
          </div>
          <div>
            <label>Fecha de Vencimiento</label>
            <DatePicker
              selected={expiryDate}
              onChange={setExpiryDate}
              dateFormat="yyyy-MM-dd"
              placeholderText="AAAA-MM-DD"
              showYearDropdown
              scrollableYearDropdown
              showMonthDropdown
              required
              className="custom-datepicker"
            />
          </div>
          <div>
            <label>Total a Pagar: ${total.toFixed(2)}</label>
          </div>
          <button type="submit">Pagar</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
