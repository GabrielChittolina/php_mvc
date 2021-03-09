<?php

namespace app\Controller;

use app\Model\Application;
use app\Model\Controller;
use app\Model\Paciente;

class SiteController extends Controller
{
    public function home()
    {
        return $this->render('home');
    }

    /*
     * Chama a função listarPacientes sem passar parâmetros
     * Retorna o resultado se obter sucesso
     */
    public function listaHandler()
    {
        $paciente = new Paciente();
        $result = $paciente->listarPacientes();
        if ($result) {
            return json_encode($result);
        }
    }

    /*
     * Chama a função listarPacientes, passando como parâmetro um id
     * Retorna o resultado da query
     */
    public function editarHandler($request)
    {
        $paciente = new Paciente();
        $param = $request->getBody();
        return $paciente->listarPacientes($param);
    }

    public function cadastro()
    {
        return $this->render('cadastro');
    }

    /*
     * Função chamada em Application::$app->router->resolve()
     * Controla a chamada das funções de editar e cadastrar um paciente
     * Retorna uma confirmação se obter sucesso
     */
    public function handleCadastro($request)
    {
        $paciente = new Paciente();
        $paciente->loadData($request->getBody());

        if ($paciente->id != '') {
            if ($paciente->editarPaciente()) {
                return 'update success';
            }
        } else {
            if ($paciente->cadastrar()) {
                return 'create success';
            }
        }
        return $this->render('cadastro');
    }

    /*
     * Função chamada em Application::$app->router->resolve()
     * Controla a chamada da função de deletar um paciente
     * Retorna uma confirmação se obter sucesso
     */
    public function deletarHandler($request)
    {
        $paciente = new Paciente();
        $param = $request->getBody();
        $paciente->setId($param);
        if ($paciente->deletarPaciente()) {
            return 'delete success';
        }
        return $this->render('home');
    }
}