/**
 * ajax请求函数模块
 */

 import axios from 'axios'
export default function ajax(url,data = {},type = 'GET'){

    return new Promis(function (resolve,reject){
        // 执行异步ajax请求
        let promis
        if(type === 'GET'){
            let dataStr = ''
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + "&"
            })
            if(dataStr !== ''){
                dataStr = dataStr.substring(0,lastIndexOf('&'))
                url = url + '?' + dataStr
            }

            // 发送请求
            pormis = axios.get(url)
        }else{
            promis = axios.post(url,data)
        }
        
        promis.then(function (response){
            // 成功调用resolve
            resolve(response.data)
        }).catch( function(error){
            // 失败调用reject 
            reject(error)
        })
        

    })
    
    return promis
}