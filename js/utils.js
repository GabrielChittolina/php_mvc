/*
@params - par�metros (method, url, async, callback, postData) para fazer a requisi��o (XMLHttpRequest)
Realiza uma requisi��o XMLHttpRequest
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