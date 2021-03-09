window.addEventListener("DOMContentLoaded", load, false);

/*
@response - objeto retorno js com dados dos paciente
Separa os atributos (nome, sobrenome, ...) de cada paciente
Chama o método create da classe cardBuilder para cada paciente
 */
function initList(response) {
    let data = JSON.parse(response.responseText);
    let container = document.getElementById('container');
    let Builder = new cardBuilder()
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
    let params = {
        method: 'get',
        url: '/pacientes',
        async: true,
        postData: '',
        callback: initList
    };
    makeXMLHttpRequest(params);
}

class cardBuilder {
    /*
    @value - Dados do paciente (nome, sobrenome, cpf, ...)
    @target - Div na qual os elementos vão ser criados
    Cria elementos html para formar os 'cards' da homepage
     */
    create(value, target) {
        let columnDiv = document.createElement("div");
        let cardDiv = document.createElement("div");
        let cardUl = document.createElement("ul");

        columnDiv.classList.add('column-div');
        cardDiv.classList.add('card-div');
        let id;
        let prioridades = ['Baixa', 'Média', 'Alta'];
        value.forEach(function (e) {
            if (e.title === 'id'){
                id = e.value;
            }else {
                let cardLi = document.createElement("li");
                if (e.title === 'Prioridade') {
                    e.value = prioridades[e.value];
                }
                cardLi.innerText = e.title + ': ' + e.value;
                cardUl.appendChild(cardLi);
            }
        });

        let btnsDiv = document.createElement(('div'));
        btnsDiv.classList.add('btns-div');
        let editar = {
            parent: btnsDiv,
            id: 'editar-card',
            content: 'Editar',
            class: 'btn-editar',
            onClick: () => {
                window.location.href = "/cadastro?id="+id;
            }
        };
        let deleta = {
            parent: btnsDiv,
            id: 'deletar-card',
            content: 'Deletar',
            class: 'btn-deletar',
            onClick: () => {
                deletar(id);
            }
        };
        cardBuilder.createBtn(editar);
        cardBuilder.createBtn(deleta);
        cardDiv.appendChild(cardUl);
        cardDiv.appendChild(btnsDiv);
        columnDiv.appendChild(cardDiv);
        target.appendChild(columnDiv);
    }

    /*
    @params - parâmetros para criação de um botão (id, class, content, onClick, parent)
    Cria um botão html dentro do elemento @params.parent
     */
    static createBtn(params) {
        let btn = document.createElement('button');
        btn.classList.add(params.class);
        btn.id = params.id;
        btn.textContent = params.content;
        btn.onclick = params.onClick;
        params.parent.appendChild(btn);
    }
}
