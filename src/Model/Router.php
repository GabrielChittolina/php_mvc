<?php

namespace app\Model;

class Router
{
    protected $routes = [];
    public $request;
    public $response;

    public function __construct($request, $response)
    {
        $this->request = $request;
        $this->response = $response;
    }
    /*
     * @method - m�todo GET ou POST
     * @path - URL escolhida
     * Define um endere�o, associando o endere�� e o m�todo (GET o POST) com um callback
     */
    public function on($method, $path, $callback)
    {
        $method = strtolower($method);
        if (!isset($this->routes[$method])) {
            $this->routes[$method] = [];
        }
        $this->routes[$method][$path] = $callback;
    }

    /*
     * Realiza a execu��o do callback associado a URL atual
     */
    public function resolve()
    {
        $path = $this->request->getPath();
        $method = $this->request->getMethod();
        $callback = $this->routes[$method][$path] ?? false;

        if ($callback === false) {
            $this->response->setStatusCode(404);
            return "Not Found";
        }

        if (is_string($callback)) {
            return $this->renderView($callback);
        }

        if (is_array($callback)) {
            $callback[0] = new $callback[0];
        }

        return call_user_func($callback, $this->request);
    }
    /*
     * Monta a p�gina, colocando o conte�do da View dentro do layout
     */
    public function renderView($view, $params = [])
    {
        $layoutContent = $this->layoutContent();
        $viewContent = $this->renderOnlyView($view, $params);
        return str_replace('{{content}}', $viewContent, $layoutContent);
    }
    /*
     * Carrega o layout (header, footer, ...) da p�gina que ser� renderizada
     */
    private function layoutContent()
    {
        ob_start();
        include_once Application::$ROOT_DIR . "/src/View/layout/main.php";
        return ob_get_clean();
    }
    /*
     * @view - nome da view que deve ser renderizada
     */
    protected function renderOnlyView($view, $params)
    {
        ob_start();
        include_once Application::$ROOT_DIR . "/src/View/$view.php";
        return ob_get_clean();
    }
}

?>