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
                alert("Paciente cadastrado com sucesso.");
                window.location.replace("/");
            } else if (xhr.responseText === "update success") {
                alert("Paciente editado com sucesso.");
                window.location.replace("/");
            }
        }
    };
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
    let Soma;
    let Resto;
    Soma = 0;

    strCPF = strCPF.replace(/\./g, "");
    strCPF = strCPF.replace(/-/g, "");
    let regex = new RegExp('^(\\d)\\1+$');

    if (regex.test(strCPF)) {
        return false;
    }

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11)) Resto = 0;
    if (Resto !== parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11)) Resto = 0;
    return Resto === parseInt(strCPF.substring(10, 11));
}

function required(elementId) {
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
                alert('Campos com * são obrigatórios.');
            } else if (!testaCPF(cpf.value)) {
                alert('CPF Inválido.');
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
