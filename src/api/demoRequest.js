import $api from './api';



export const demoRequest = (data) => $api.post('http://localhost:8000/someEndPoint', data)
.then((res)=>{
    console.log("AXIOS: " +  res.data);
})
.catch((err)=>{
    console.log(data);
    console.log("AXIOS: " +  err);
  });