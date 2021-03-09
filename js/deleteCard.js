/*
@data - id do card escolhido para deletar
Prepara os par�metros para uma requisi��o e chama a fun��o makeXMLHttpRequest
Envia o id pela url para ser feita a remo��o do paciente
 */
function deletar(data) {
    let params = {
        method: 'get',
        url: '/deletar?id=' + data,
        async: true,
        postData: '',
        callback: (xhr) => {
            if (xhr.responseText === 'delete success') {
                window.location.href = "/";
                alert('Paciente deletado com Sucesso.');
            }
        }
    };
    makeXMLHttpRequest(params);
}