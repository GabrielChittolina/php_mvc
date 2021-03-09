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