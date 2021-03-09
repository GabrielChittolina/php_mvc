<?php


namespace app\Model;


use PDO;

abstract class DbModel extends Model
{
    abstract public function tableName(): string;

    abstract public function attributes(): array;

    public function update(): bool
    {
        $tableName = $this->tableName();
        $attributes = $this->attributes();
        $func = function ($attr) {
            return "$attr = :$attr";
        };
        $params = array_map($func, $attributes);
        $attributes = $this->attributes('id');
        $statement = self::prepare("UPDATE $tableName SET " . implode(', ', $params) . " WHERE id = :id");

        foreach ($attributes as $attribute) {
            $statement->bindValue(":$attribute", $this->{$attribute});
        }
        return $statement->execute();
    }

    public function save(): bool
    {
        $tableName = $this->tableName();
        $attributes = $this->attributes();
        $func = function ($attr) {
            return ":$attr";
        };
        $params = array_map($func, $attributes);
        $statement = self::prepare("INSERT INTO $tableName (" . implode(', ', $attributes) . ") 
                                        VALUES (" . implode(', ', $params) . ")");

        foreach ($attributes as $attribute) {
            $statement->bindValue(":$attribute", $this->{$attribute});
        }
        return $statement->execute();
    }

    /*
     * @param - Parâmetro para o SELECT
     * Se o @param for passado, o SELECT procura por um paciente específico,
     * senão é feito SELECT de todos os pacientes da tabela
     */
    public function read($param = false)
    {
        $opt = '';
        if ($param) {
            $opt = "where ";
            foreach ($param as $p) {
                 $opt .= "{$p['coluna']} {$p['operador']} {$p['valor']} {$p['logica']}";
            }
        } else {
            $opt = "ORDER BY prioridade DESC";
        }
        $tableName = $this->tableName();
        $attributes = $this->attributes('id');
        $statement = self::prepare("SELECT " . implode(',', $attributes) . " FROM {$tableName} {$opt}");
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function delete()
    {
        $tableName = $this->tableName();

        $statement = self::prepare("DELETE FROM {$tableName} WHERE id={$this->getId()['id']}");
        return $statement->execute();
    }

    public static function prepare($sql)
    {
        return Application::$app->db->pdo->prepare($sql);
    }
}