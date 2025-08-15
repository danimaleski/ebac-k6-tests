import { check } from 'k6';
import http from 'k6/http';
import Utils from '../utils/utils'; 

export default class Login {
    #token;

    access(user, pass) {
        let response = http.post(
            `${Utils.getBaseUrl()}/login`, 
            JSON.stringify({
                "username": user,
                "password": pass
            }), 
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }
        );
        
        this.#token = response.json('accessToken');

        check(response, {
            "status deve ser 201": (r) => r.status === 201
        });
    }

    getToken() {
        return this.#token;
    }

    addCustomer() {
        // Verifica se o token existe
        if (!this.#token) {
            console.log("Token não encontrado. Execute a autenticação primeiro.");
            return;
        }

        const payload = JSON.stringify({
            address: {
                id: '123' 
            },
            email: 'cliente@teste.com',
            firstName: 'Jane',
            lastName: 'Doe',
            phone: '1234567890'
        });

        // Requisição POST
        const response = http.post(
            `${Utils.getBaseUrl()}/api/customers`, 
            payload, 
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.#token}`, 
                }
            }
        );

        // Resposta
        check(response, {
            'status é 201': (r) => r.status === 201,  
            'resposta contém cliente': (r) => r.body.includes('Jane Doe'),  
        });
    }
}
