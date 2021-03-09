<?php


namespace app\Model;


class Request
{
    public function getPath()
    {
        $path = $_SERVER['REQUEST_URI'] ?? '/';

        $position = strpos($path, '?');

        if ($position === false) {
            return $path;
        }
        return substr($path, 0, $position);
    }

    public function getMethod(): string
    {
        return strtolower($_SERVER['REQUEST_METHOD']);
    }

    /*
     * Retorna o conteúdo de uma requisição XMLHttpRequest
     */
    public function getBody(): array
    {
        $body = [];

        if ($this->getMethod() === 'get') {
            foreach ($_GET as $key => $value) {
                $body[$key] = filter_input(INPUT_GET, $key, FILTER_SANITIZE_SPECIAL_CHARS);
            }
        }

        if ($this->getMethod() === 'post') {
            if (isset($_POST['jsonData'])) {
                $body = json_decode($_POST['jsonData'],true);
            }else {
                foreach ($_POST as $key => $value) {
                    $body[$key] = filter_input(INPUT_POST, $key, FILTER_SANITIZE_SPECIAL_CHARS);
                }
            }
        }
        return $body;
    }
}