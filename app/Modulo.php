<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $idmodulo
 * @property string $nome_modulo
 * @property PivotPermissao[] $pivotPermissaos
 */
class Modulo extends Model
{
    /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'modulo';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'nsr';

    /**
     * @var array
     */
    protected $fillable = ['pis', 'tipo', 'user_id'];
    protected $dates = ['deleted_at','created_at','updated_at'];

}
