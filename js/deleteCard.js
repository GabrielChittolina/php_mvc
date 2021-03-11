/*
@data - id do card escolhido para deletar
Prepara os parâmetros para uma requisição e chama a função makeXMLHttpRequest
Envia o id pela url para ser feita a remoção do paciente
 */
function deletar(data) {
    let params = {
        method: 'get',
        url: '/deletar?id=' + data,
        async: true,
        postData: '',
        callback: (xhr) => {
            if (xhr.responseText === 'delete success') {
                Modal.modalMessage('Paciente deletado com Sucesso.', 'modal-redirect');
                Modal.enableModal('modal-redirect');
            }
        }
    };
    makeXMLHttpRequest(params);
}