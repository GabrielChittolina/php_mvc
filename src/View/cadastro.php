<div id="cadastro" class="cadastro-div">
    <form id="cadastro-form" class="cadastro-form" method="post">
        <input type="hidden" id="id" name="id">
        <label for="nome">Nome:</label><br>
        <input type="text" id="nome" name="nome" placeholder="Digite seu nome, ex. Eduardo"><br>
        <label for="sobrenome">Sobrenome:</label><br>
        <input type="text" id="sobrenome" name="sobrenome" placeholder="Digite seu sobrenome. Ex. Porsche"><br>
        <label for="cpf">CPF:</label><br>
        <input type="text" id="cpf" name="cpf" maxlength="14" minlength="14" placeholder="Digite seu CPF, ex. 50150405987"><br>
        <label for="nascimento">Data de Nascimento:</label><br>
        <input type="date" id="nascimento" name="nascimento"><br>
        <label for="prioridade">Prioridade:</label><br>
        <select id="prioridade" name="prioridade">
            <option value="0">Baixa</option>
            <option value="1">Média</option>
            <option value="2">Alta</option>
        </select>
    </form>
        <button id="enviar-cadastro">Submit</button>
</div>