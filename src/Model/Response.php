<?php


namespace app\Model;


class Response
{
    public function setStatusCode($code)
    {
        http_response_code($code);
    }

    public function redirect(string $url)
    {
        header('Location '.$url);
        die();
    }

}