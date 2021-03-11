/*
Pega os dados do form e transforma em uma string JSON para mandar na requisição em 'enviarCadastro'
 */
function jsonFormData() {
    let form = document.querySelector('form');
    let formData = new FormData(form);
    let entries = Object.fromEntries(formData);
    return JSON.stringify(entries);
}

/*
Prepara os parâmetros para uma requisição e chama a função makeXMLHttpRequest
Envia os dados do formulário de cadastro por post, para serem inseridos no banco de dados
 */
function enviarCadastro() {
    let params = {
        method: 'post',
        url: '/cadastro',
        async: true,
        postData: 'jsonData=' + jsonFormData(),
        callback: (xhr) => {
            if (xhr.responseText === "create success") {
                Modal.modalMessage('Paciente cadastrado com sucesso.', 'modal-stay');
                Modal.enableModal('modal-stay');
            } else if (xhr.responseText === "update success") {
                Modal.modalMessage('Paciente editado com sucesso.', 'modal-redirect');
                Modal.enableModal('modal-redirect');
            }
        }
    }
    makeXMLHttpRequest(params);
    document.getElementById('cadastro-form').reset();
}

/*
@cpf - string de números do cpf
Aplica a máscara no cpf (123.456.789-12)
 */
function mascaraCpf(cpf) {
    cpf = cpf.replace(/\D/g, "");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return cpf;
}

/*
@strCPF - cpf em string com máscara
Realiza a validação de CPF
Retorna True se for válido
 */
function testaCPF(strCPF) {
    let soma;
    let resto;
    soma = 0;

    strCPF = strCPF.replace(/\./g, "");
    strCPF = strCPF.replace(/-/g, "");
    let regex = new RegExp('^(\\d)\\1+$');

    if (regex.test(strCPF)) {
        return false;
    }

    for (let i = 1; i <= 9; i++) soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(strCPF.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) resto = 0;
    return resto === parseInt(strCPF.substring(10, 11));
}

/*
Cria um eventListener no elemento com id = @elementId com função de marcar para highlight caso o campo não esteja válido
 */
function required(elementId) {
    let e = document.getElementById(elementId);
    e.required
    let eventParams = {
        elementId: elementId,
        eventType: 'blur',
        callbackParam: 'element',
        callback: (element) => {
            if (!element.validity.valid) {
                element.classList.add("required");
            } else {
                element.classList.remove("required");
            }
        }
    }
    eventListener(eventParams);
}

/*
Verifica se os @campos do formulário de cadastro estão válidos e modifica as classes para dar o highlight pelo css
 */
function isValid(campos) {
    let valid = true;
    campos.forEach((e) => {
        let element = document.getElementById(e);
        if (!element.validity.valid) {
            valid = false;
            element.classList.add("required");
        } else {
            element.classList.remove("required");
        }
    });
    return valid;
}

/*
Função chamada após o carregamento da DOM pelo eventListener ouvindo "DOMContentLoaded"
 */
function loadCadastro() {
    let campos = ['nome', 'sobrenome', 'cpf', 'nascimento'];
    let btnEventParams = {
        elementId: 'enviar-cadastro',
        eventType: 'click',
        callbackParam: '',
        callback: () => {
            let cpf = document.getElementById('cpf');
            if (!isValid(campos)) {
                Modal.modalMessage('Campos com * são obrigatórios.', 'modal-stay');
                Modal.enableModal('modal-stay');
                setTimeout(()=>{Modal.disableModal('modal-stay')}, 3000)
            } else if (!testaCPF(cpf.value)) {
                Modal.modalMessage('CPF Inválido.', 'modal-stay');
                Modal.enableModal('modal-stay');
            } else {
                enviarCadastro();
            }
        }
    }
    let cpfEventParams = {
        elementId: 'cpf',
        eventType: 'input',
        callbackParam: 'both',
        callback: (element, event) => {
            event.target.value = mascaraCpf(event.target.value);
            if (!testaCPF(element.value)) {
                element.classList.add("invalid");
            } else {
                element.classList.remove("invalid");
            }
        }
    }
    let closeParamsRedirect = {
        elementId: 'close-modal-redirect',
        eventType: 'click',
        callbackParam: '',
        callback: () => {
            Modal.disableModal('modal-redirect');
            window.location.replace("/");
        }
    }
    let closeParams = {
        elementId: 'close-modal-stay',
        eventType: 'click',
        callbackParam: '',
        callback: () => {
            Modal.disableModal('modal-stay');
        }
    }

    let modal = new Modal();
    modal.createModal('modal-redirect');
    modal.createModal('modal-stay');
    eventListener(closeParamsRedirect);
    eventListener(closeParams);

    eventListener(btnEventParams);
    eventListener(cpfEventParams);

    required('nome');
    required('sobrenome');
    required('cpf');
    required('nascimento');

    let params = new URLSearchParams(window.location.search);
    if (params.get('id')) {
        editar(params.get('id'));
    }
}

window.addEventListener("DOMContentLoaded", loadCadastro, false);