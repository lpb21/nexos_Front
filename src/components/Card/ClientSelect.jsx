import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientSelect = ({ onClientSelect }) => {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState('');

    // // JSON quemado de clientes
    // const clientsData = [
    //     { id: '1', name: 'Juan Perez' },
    //     { id: '2', name: 'Maria Gomez' },
    //     { id: '3', name: 'Carlos Sanchez' },
    //     { id: '4', name: 'Ana Martinez' },
    //     { id: '5', name: 'Jorge Casas' }
    // ];
    useEffect(() => {
        // Hacer la petición para obtener los clientes
        axios.get('http://localhost:3000/v1/getclientes')
            .then(response => {
                // Verificar que response.data.data sea un array
                if (response.data && Array.isArray(response.data.data)) {
                    setClients(response.data.data);
                } else {
                    console.error('Expected an array but got:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching clients:', error);
            });
    }, []);


    const handleClientChange = (e) => {
        const clientId = e.target.value;
        setSelectedClient(clientId);
        onClientSelect(clientId);
    };

    return (
        <div>
            <label>Seleccionar Cliente</label>
            <select value={selectedClient} onChange={handleClientChange} required>
                <option value="">Seleccione un cliente</option>
                {clients.map((client, index) => (
                    <option key={index} value={client}>
                        {client}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ClientSelect;
