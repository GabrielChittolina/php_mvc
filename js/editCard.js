/*
@data - id do card escolhido para editar
Prepara os par�metros para uma requisi��o e chama a fun��o makeXMLHttpRequest
Envia pela url o id do paciente escolhido para ser editado
 */
function editar(data) {
    let params = {
        method: 'get',
        url: '/editar?id=' + data,
        async: true,
        postData: '',
        callback: (xhr) => {
            let card = JSON.parse(xhr.responseText);
            card.forEach((e) => {
                for (let key in e) {
                    document.getElementById(key).value = e[key];
                }
            });
        }
    };
    makeXMLHttpRequest(params);
}
