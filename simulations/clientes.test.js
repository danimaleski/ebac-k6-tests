import { group } from 'k6';
import Login from '../request/login.request';
import data from '../data/usuarios.json';

// export const options = {
//   stages: [
//     { duration: '10s', target: 10 },
//     { duration: '5s', target: 50 },
//     { duration: '10s', target: 10 },
//     { duration: '5s', target: 0 }
//   ],
//   thresholds: {
//     http_req_duration: ['p(99) < 1000']
//   }
// }

export default function () {
    const login = new Login();

    login.access(data.usuarioOk.user, data.usuarioOk.pass);

    login.addCustomer();  
}