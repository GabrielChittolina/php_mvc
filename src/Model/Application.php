<?php


namespace app\Model;


class Application
{
    public static $ROOT_DIR;
    public $router;
    public $request;
    public $response;
//    public $session;
    public static $app;
    public $db;

    public function __construct($rootPath, array $config)
    {
        self::$ROOT_DIR = $rootPath;
        self::$app = $this;
        $this->request = new Request();
        $this->response = new Response();
        $this->router = new Router($this->request, $this->response);
        $this->db = new Database($config['db']);
//        $this->session = new Session();
    }

    public function run()
    {
        echo $this->router->resolve();
    }

}