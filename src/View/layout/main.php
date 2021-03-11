<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="/css/reset.css">
    <link rel="stylesheet" href="/css/main.css">
    <script src="/js/utils.js"></script>
    <script src="/js/Modal.js"></script>
    <?php
        $path = $_SERVER['REQUEST_URI'] ?? '/';
        $position = strpos($path, '?');
        if ($position) {
            $path = substr($path, 0, $position);
        }
        if ($path === '/cadastro') { ?>
            <script src="/js/cadastro.js"></script>
            <script src="/js/editCard.js"></script>
            <link rel="stylesheet" href="/css/cadastro.css">
        <?php } else { ?>
            <script src="/js/deleteCard.js"></script>
            <script src="/js/CardBuilder.js"></script>
            <script src="/js/listagem.js"></script>
            <link rel="stylesheet" href="/css/home.css">
        <?php } ?>
</head>
<body>
<div class="nav-bar">
    <ul>
        <li><a href="/cadastro">Cadastrar Paciente</a></li>
        <li><a href="/">Listar Pacientes</a></li>
    </ul>
</div>

<div id="container" class="container">
    {{content}}
</div>

<div class="footer-div">
    <?php echo "Esse é o footer." ?>
</div>
</body>
</html>