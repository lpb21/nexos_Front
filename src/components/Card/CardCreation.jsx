import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addYears, isBefore } from 'date-fns';
import axios from 'axios';
import '../../cardCreate.css';

const CardCreation = ({ addCard }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [cedula, setCedula] = useState('');
    const [expirationDate, setExpirationDate] = useState(null);
    const [cardType, setCardType] = useState('CREDITO');

    const handleInputChange = (setter, regex, maxLength) => (e) => {
        const value = e.target.value;
        if (regex.test(value) && value.length <= maxLength) {
            setter(value);
        }
    };

    const handleCreateCard = async (e) => {
        e.preventDefault();

        if (cardNumber.length !== 16) {
            alert('El número de tarjeta debe tener exactamente 16 dígitos.');
            return;
        }

        if (cedula.length < 4 || cedula.length > 10) {
            alert('La cédula debe tener entre 4 y 10 dígitos.');
            return;
        }

        const minExpirationDate = addYears(new Date(), 3);
        if (isBefore(expirationDate, minExpirationDate)) {
            alert('La fecha de expiración debe ser al menos 3 años posterior a la fecha actual.');
            return;
        }

        const newCardData = {
            cardNumber,
            firstName,
            secondName,
            cedula,
            expirationDate: expirationDate ? expirationDate.toISOString().split('T')[0] : '',
            cardType
        };

        const confirmMessage = `
            Estos son los datos a enviar, ¿está seguro?
            Número de Tarjeta: ${newCardData.cardNumber}
            Primer Nombre: ${newCardData.firstName}
            Segundo Nombre: ${newCardData.secondName}
            Cédula: ${newCardData.cedula}
            Fecha de Expiración: ${newCardData.expirationDate}
            Tipo de Tarjeta: ${newCardData.cardType}
        `;

        if (window.confirm(confirmMessage)) {
            try {
                const response = await axios.post('http://localhost:3000/v1/crearTarjeta', newCardData);
                const data = response.data;
                alert(data.message);
                addCard(newCardData);
                resetForm();
            } catch (error) {
                console.error('Error creando la tarjeta:', error);
                alert('Error creando la tarjeta: ' + error.message);
            }
        }
    };

    const resetForm = () => {
        setCardNumber('');
        setFirstName('');
        setSecondName('');
        setCedula('');
        setExpirationDate(null);
        setCardType('CREDITO');
    };

    return (
        <div className="card-creation">
            <h2>Creación de Tarjeta</h2>
            <form onSubmit={handleCreateCard} className="card-creation-form">
                <div className="form-group">
                    <label>Número de Tarjeta</label>
                    <input
                        type="text"
                        value={cardNumber}
                        onChange={handleInputChange(setCardNumber, /^\d*$/, 16)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Primer Nombre</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={handleInputChange(setFirstName, /^[a-zA-Z]*$/, 50)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Segundo Nombre</label>
                    <input
                        type="text"
                        value={secondName}
                        onChange={handleInputChange(setSecondName, /^[a-zA-Z]*$/, 50)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Cédula</label>
                    <input
                        type="text"
                        value={cedula}
                        onChange={handleInputChange(setCedula, /^\d*$/, 10)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Fecha de Expiración</label>
                    <DatePicker
                        selected={expirationDate}
                        onChange={setExpirationDate}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="AAAA-MM-DD"
                        showYearDropdown
                        scrollableYearDropdown
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Tipo de Tarjeta</label>
                    <select value={cardType} onChange={(e) => setCardType(e.target.value)}>
                        <option value="CREDITO">CREDITO</option>
                        <option value="DEBITO">DEBITO</option>
                    </select>
                </div>
                <div className="form-group full-width">
                    <button type="submit">Crear Tarjeta</button>
                </div>
            </form>
        </div>
    );
};

export default CardCreation;
