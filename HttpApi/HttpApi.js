const uid = '8888888888888888'
const baseUrl = 'https://m.api.juntian668.com'

var requestApi = function(url,body,callBack){
	let _body = clearBody(aesEncrypt(JSON.stringify(body),uid))
	let head = "?head={'uid':'"+uid+"'}&body="+_body
	var xhr = new XMLHttpRequest()
	let requestUrl = baseUrl + url
	xhr.open("get",requestUrl + head,true)
    xhr.send(null);
    xhr.onreadystatechange=function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            let res = JSON.parse(aesDecrypt(xhr.response,uid))
            console.log(res)
            callBack(res) 
        }
    }
}
function clearBody(body) {
    body = body.replace(/\%/g, "%25");
    body = body.replace(/\#/g, "%23");
    body = body.replace(/\&/g, "%26");
    body = body.replace(/\ /g, "%20");
    body = body.replace(/\+/g, "%2B");
    body = body.replace(/\//g, "%2F");
    body = body.replace(/\?/g, "%3F");
    body = body.replace(/\=/g, "%3D");
    return body;
}