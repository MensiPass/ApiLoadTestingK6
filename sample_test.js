import { sleep } from 'k6';
import http from 'k6/http';


//test using k6

export let options={
 insecureSkipTLSVerify: true,
 noConnectionreuse: false,
 vus:1,  //virtual users
 duration:'10s'
};

export default () => {
    http.get('https://localhost:5354/youtube');
    sleep(1);
};