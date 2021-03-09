/*
Pega os dados do form e transforma em uma string JSON para mandar na requisi��o em 'enviarCadastro'
 */
function jsonFormData() {
    let form = document.querySelector('form');
    let formData = new FormData(form);
    let entries = Object.fromEntries(formData);
    return JSON.stringify(entries);
}
/*
Prepara os par�metros para uma requisi��o e chama a fun��o makeXMLHttpRequest
Envia os dados do formul�rio de cadastro por post, para serem inseridos no banco de dados
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
@cpf - string de n�meros do cpf
Aplica a m�scara no cpf (123.456.789-12)
 */
function mascaraCpf(cpf) {
    cpf = cpf.replace(/\D/g, "");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return cpf;
}
/*
@strCPF - cpf em string com m�scara
Realiza a valida��o de CPF
Retorna True se for v�lido
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
/*
Fun��o chamada ap�s o carregamento da DOM pelo eventListener ouvindo "DOMContentLoaded"
 */
function loadCadastro() {
    let button = document.getElementById("enviar-cadastro");
    button.addEventListener("click", function () {
        let cpf = document.getElementById('cpf');
        if (testaCPF(cpf.value)) {
            enviarCadastro();
        } else {
            console.log('CPF Inv�lido');
        }
    }, false);

    let cpf = document.getElementById('cpf');
    cpf.addEventListener('input', function (e) {
        e.target.value = mascaraCpf(e.target.value);
        if (!testaCPF(cpf.value)) {
            cpf.classList.add("invalid");
        } else {
            cpf.classList.remove("invalid");
        }
        return true;
    });

    let params = new URLSearchParams(window.location.search);
    if (params.get('id')) {
        editar(params.get('id'));
    }
}

window.addEventListener("DOMContentLoaded", loadCadastro, false);