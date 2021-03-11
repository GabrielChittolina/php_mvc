class Modal {
    /*
    @modalId - id da modal à ser criada
    Cria uma modal e um espaço para uma mensagem de texto
     */
    createModal(modalId) {
        let container = document.getElementById('container');
        let modalDiv = document.createElement('div');
        let modalContentDiv = document.createElement('div');
        let span = document.createElement('span');
        let content = document.createElement('p');

        container.appendChild(modalDiv);
        modalDiv.appendChild(modalContentDiv);
        modalContentDiv.appendChild(span);
        modalContentDiv.appendChild(content);

        modalDiv.id = modalId;
        modalDiv.classList.add('modal-div');
        modalContentDiv.classList.add('modal-content');
        span.classList.add('close');
        span.innerHTML = '&times;'
        span.id = 'close-' + modalId;

        content.id = 'modal-text-' + modalId;
        content.innerHTML = '';
    }

    static modalMessage(message, modalId) {
        let content = document.getElementById('modal-text-' + modalId);
        content.innerHTML = message;
    }

    static enableModal(id) {
        let modal = document.getElementById(id);
        modal.style.display = 'block';
    }

    static disableModal(id) {
        let modal = document.getElementById(id);
        modal.style.display = 'none';
    }
}