import { sleep } from 'k6';
import http from 'k6/http';

/*test to see if system is meeting th performance goals in terms
 of concurent users or requests per second
*/

export let options={
    insecureSipTLSVerify:true,
    noConnectionreuse:false,
    stages:[
        {duration:'5m', target:100 },//simulate ramp-up traffic
        {duration:'10m', target:100 },
        {duration:'5m', target:0 },//ramp-down   
        
    ],
    tresholds:{
        http_req_duration:['p(99)<150'], //99% of requests must complete below 150ms
    },
};

export default ()=>{
    let response= http.get ("https://localhost:5354/youtube")
    
    sleep(1);
}; 