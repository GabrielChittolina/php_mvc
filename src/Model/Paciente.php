<?php

namespace app\Model;

class Paciente extends DbModel
{
    public $id;
    public $nome;
    public $sobrenome;
    public $cpf;
    public $nascimento;
    public $prioridade;


    public function setId($id): void
    {
        $this->id = $id;
    }

    public function getId()
    {
        return $this->id;
    }

    public function cadastrar(): bool
    {
        return $this->save();
    }

    /*
     * @param - par�metros para a query SELECT WHERE da fun��o read()
     */
    public function listarPacientes($param = false)
    {
        if ($param === false) {
            return $this->read();
        }
        $result = [];
        $nroPram = count($param);
        foreach ($param as $index => $item) {
            $result[] = ['coluna' => $index, 'operador' => '=', 'valor' => $item, 'logica' => $nroPram > 1 ? ' AND ' : ''];
        }
        return json_encode($this->read($result));
    }

    public function editarPaciente(): bool
    {
        return $this->update();
    }

    public function deletarPaciente(): bool
    {
        return $this->delete();
    }

    public function tableName(): string
    {
        return 'paciente';
    }

    /*
     * @value - poss�vel adi��o de atributo para ser utilizado em alguma opera��o com o Banco de Dados
     */
    public function attributes($value = false): array
    {
        $attr = ['nome', 'sobrenome', 'cpf', 'nascimento', 'prioridade'];
        if ($value){
            $attr[] = $value;
        }
        return $attr;
    }
}

?>