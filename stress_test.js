import { sleep } from 'k6';
import http from 'k6/http';

//testing the limits of the system
export let options={
    insecureSipTLSVerify:true,
    noConnectionreuse:false,
    stages:[
        {duration:'2m', target:100 },//below normal load
        {duration:'5m', target:100 },
        {duration:'2m', target:200 },//normal load
        {duration:'5m', target:200 },
        {duration:'2m', target:300 },//around the breaking point
        {duration:'5m', target:300 },
        {duration:'2m', target:400 },//beyond the breaking point
        {duration:'5m', target:400 },
        {duration:'10m', target:0 }, //scale down
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