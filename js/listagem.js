window.addEventListener("DOMContentLoaded", load, false);

/*
@response - objeto retorno js com dados dos paciente
Separa os atributos (nome, sobrenome, ...) de cada paciente
Chama o método create da classe cardBuilder para cada paciente
 */
function initList(response) {
    let data = JSON.parse(response.responseText);
    let container = document.getElementById('container');
    let Builder = new CardBuilder();
    data.forEach(function (itemPaciente) {
        let cardData = [{
            title: 'id',
            value: itemPaciente.id
        }, {
            title: 'Nome',
            value: itemPaciente.nome
        }, {
            title: 'Sobrenome',
            value: itemPaciente.sobrenome
        }, {
            title: 'Cpf',
            value: itemPaciente.cpf
        }, {
            title: 'Data de Nascimento',
            value: itemPaciente.nascimento
        }, {
            title: 'Prioridade',
            value: itemPaciente.prioridade
        }]
        Builder.create(cardData, container)
    });
}

function load() {
    let closeParamsRedirect = {
        elementId: 'close-modal-redirect',
        eventType: 'click',
        callbackParam: '',
        callback: () => {
            Modal.disableModal('modal-redirect');
            window.location.replace("/");
        }
    }
    let params = {
        method: 'get',
        url: '/pacientes',
        async: true,
        postData: '',
        callback: initList
    }

    makeXMLHttpRequest(params);

    let modal = new Modal();
    modal.createModal('modal-redirect');
    eventListener(closeParamsRedirect);
}