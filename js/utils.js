/*
@params - parâmetros (method, url, async, callback, postData) para fazer a requisição (XMLHttpRequest)
Realiza uma requisição XMLHttpRequest
 */
function makeXMLHttpRequest(params) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            params.callback(this);
        }
    }
    xhr.open(params.method, params.url, params.async);
    if (params.method === 'post') {
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(params.postData);
    } else {
        xhr.send();
    }
}
/*
@params - parãmetros (elementId, eventType, callbackParam, callback)
Adiciona um eventListener no elemento de id=elementID
 */
function eventListener(params) {
    let element = document.getElementById(params.elementId);
    element.addEventListener(params.eventType, (eve)=> {
        if(params.callbackParam === 'element') {
            params.callback(element);
        } else if (params.callbackParam === 'event') {
            params.callback(eve);
        } else if (params.callbackParam === 'both'){
            params.callback(element, eve);
        } else {
            params.callback();
        }
    });
}