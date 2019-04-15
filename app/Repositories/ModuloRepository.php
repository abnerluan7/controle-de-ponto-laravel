<?php

namespace App\Repositories;


use App\Modulo;

class ModuloRepository extends CommonRepository
{
    //Aqui estarão as consultas que retornam Queries do Eloquent

    //Aqui estarão consultas completas que retornam Models ou Collections

    public function createOrUpdate(Modulo $modulo = null, $params)
    {
        $moduloBoolean = false;
        if ($modulo == null) {
            $modulo = new Modulo();
            $moduloBoolean = true;
        }

        $modulo->pis = $params['pis'] ?
            $params['pis'] : ($moduloBoolean ? null : $modulo->pis);
        
        $modulo->tipo = $params['tipo'] ?
            $params['tipo'] : ($moduloBoolean ? null : $modulo->tipo);

        $modulo->user_id = $params['user_id'] ?
            $params['user_id'] : ($moduloBoolean ? null : $modulo->user_id);

        if ($modulo->save()) {
            return $modulo;
        } else {
            return null;
        }
    }

    public function queryMount($all, $perPage)
    {
        if(auth()->user()->papel == 1){
            $modulos = Modulo::query();
        }else {
            $modulos = Modulo::query()
            ->where('user_id', auth()->user()->id);
        }

        if ($all) {
            $modulos = $modulos->get();
        } else if ($perPage) {
            $modulos = $modulos->paginate($perPage);
        } else {
            $modulos = $modulos->paginate(30);
        }

        return $modulos;
    }
}