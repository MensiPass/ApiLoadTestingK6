import { sleep } from 'k6';
import http from 'k6/http';

/*validate reliability of the system over a long time
*/

export let options={
    insecureSipTLSVerify:true,
    noConnectionreuse:false,
    stages:[
        {duration:'2m', target:400 },//simulate ramp-up traffic
        {duration:'3h56m', target:400 },//stay
        {duration:'2m', target:0 },//ramp-down   
        
    ],
    tresholds:{
        http_req_duration:['p(99)<150'], //99% of requests must complete below 150ms
    },
};

const API_BASE_URL='https://localhost:5354';

export default ()=>{
    http.batch ([
        ['GET', `${API_BASE_URL}/youtube`],
        ['GET', `${API_BASE_URL}/twitter`],
    ]);
    
    sleep(1);
}; 