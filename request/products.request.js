import { check } from "k6"
import http from "k6/http"
import Utils from "../utils/utils"

export default class Login {
    #token

    access(user, pass) {
        let response = http.post(`${Utils.getBaseUrl()}/login`, JSON.stringify(
            {
                "username": user,
                "password": pass
            }
        ), {
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }
        })
        this.#token = response.json('accessToken')
        check(response, {
            "status deve ser 201": (r) => r.status === 201
        });
    }

    getToken(){
        return this.#token
    }

    addProduct() {
        // Verifica se o token existe
        if (!this.#token) {
            console.log("Token não encontrado. Execute a autenticação primeiro.");
            return;
        }

        const payload = JSON.stringify({
            description: 'A mochila é preta, possui uma parte maior e outra menor.',
            itemPrice: 100,
            name: 'Mochila Dark',
        });

        // Requisição POST
        const response = http.post(
            `${Utils.getBaseUrl()}/api/products`, 
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
            'resposta contém produto': (r) => r.body.includes('Mochila Dark'),
        });

    }

    

}
