import http from 'k6/http';
import { check } from 'k6';
import Utils from '../utils/utils'; 

export default class listCustomers {
    // Enviar a requisição GET para listar os clientes
    list(token) {
        const response = http.get(`${Utils.getBaseUrl()}/api/customers`, {
        headers: {
            "Authorization": `Bearer ${token}`, 
            "Accept": "application/json",
        }
    });

    // Verificar a resposta da API
    check(response, {
        'status é 200': (r) => r.status === 200, 
        'resposta contém clientes': (r) => r.body.length > 0, 
    });

    return response;
    }
}
