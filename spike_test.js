import { sleep } from 'k6';
import http from 'k6/http';

/*variation of a stress test, but it does not gradually 
increase the load, instead it spikes to extreme load over 
a very short window of time
*/

export let options={
    insecureSipTLSVerify:true,
    noConnectionreuse:false,
    stages:[
        {duration:'10s', target:100 },//below normal load
        {duration:'1m', target:100 },
        {duration:'10s', target:1400 },//spike to 1400 users
        {duration:'3m', target:1400 }, //stay at 1400 users for 3 minutes
        {duration:'10s', target:100 },//scale down, recovery stage
        {duration:'3m', target:100 },
        {duration:'10s', target:0 },
        
    ],
};

const API_BASE_URL='https://localhost:5354';

export default ()=>{
    http.batch ([
        ['GET', `${API_BASE_URL}/youtube`],
        ['GET', `${API_BASE_URL}/twitter`],
    ]);
    
    sleep(1);
}; 