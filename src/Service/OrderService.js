import * as firebase from 'firebase';
import '@firebase/firestore';
import {AsyncStorage} from 'react-native';
import 'firebase/functions';
import axios from 'axios';

const APIURL = 'https://us-central1-moveout-ab6e5.cloudfunctions.net';

export const createorder = async(order) => {
    return new Promise((resolve,reject)=>{
        try{
            axios.post(APIURL + "/createorder",order).then(res=>{resolve(res.data); console.log(res.data)}).catch(err=>reject(err))
        }catch(e)
        {
            reject(e);
        }
    })
}

export const getorder = async(userid) => {
    return new Promise((resolve,reject)=>{
        try{
            axios.get(APIURL + "/getorder",{params:{userid:userid}}).then(res=>resolve(res.data)).catch(err=>reject(err))
        }catch(e)
        {
            reject(e);
        }
    })
}

export const enableorder = async(orderid) => {
    return new Promise((resolve,reject)=>{
        console.log(orderid);
        try{
            axios.get(APIURL + "/setenable",{params:{orderid:orderid}}).then(res=>resolve(res.data)).catch(err=>reject(err))
        }
        catch(e)
        {
            reject(e);
        }
    })
}