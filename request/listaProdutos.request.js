import http from 'k6/http';
import { check } from 'k6';
import Utils from '../utils/utils'; 

export default class listProducts {
    // Enviar a requisição GET para listar os produtos
    list(token) {
        const response = http.get(`${Utils.getBaseUrl()}/api/products`, {
        headers: {
            "Authorization": `Bearer ${token}`, 
            "Accept": "application/json",
        }
    });

    // Verificar a resposta da API
    check(response, {
        'status é 200': (r) => r.status === 200, 
        'resposta contém produtos': (r) => r.body.length > 0, 
    });

    return response;
    }
}
