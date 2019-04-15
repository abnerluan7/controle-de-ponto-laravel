<?php

namespace App\Http\Controllers\Sentinela;

use App\Modulo;
use App\Http\Requests\Sentinela\Modulo\DestroyRequest;
use App\Http\Requests\Sentinela\Modulo\IndexRequest;
use App\Http\Requests\Sentinela\Modulo\ShowRequest;
use App\Http\Requests\Sentinela\Modulo\StoreRequest;
use App\Http\Requests\Sentinela\Modulo\UpdateRequest;
use App\Http\Resources\Sentinela\ModuloCollection;
use App\Http\Resources\Sentinela\ModuloResource;
use App\Repositories\ModuloRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Log;

class ModuloController extends Controller
{
    /**
     * index - ModuloController
     *
     * Este método irá trazer um conjunto de Modulos baseado
     * nas pesquisas por contexto e subdistrito.
     * Além disso, ele tem a possibilidade de pegar tudo ou fazer um processo de paginação.
     *
     * @param IndexRequest $request
     * @return $this|ModuloCollection
     */
    public function index(IndexRequest $request)
    {
        try {
            $perPage = $request->get('per_page');
            $all = $request->get('all');
            $moduloRepository = new ModuloRepository();
            $modulos = $moduloRepository->queryMount($all, $perPage);

            return new ModuloCollection($modulos);

        } catch (\Exception $exception) {
            return response(['Ocorreu o erro: '.$exception->getMessage()], 500)->header('Content-Type', 'application/json');
        }
    }

    public function create()
    {
        try {
            return null;
        } catch (\Exception $exception) {
            return response(['Ocorreu o erro: '.$exception->getMessage()], 500)->header('Content-Type', 'application/json');
        }
    }

    /**
     * store - ModuloController
     * Este método tem como objetivo criar Modulo,
     *
     * @param StoreRequest $request
     * @return $this|ModuloResource
     */
    public function store(StoreRequest $request)
    {
        $user = auth()->user()->id;
        Log::info($user);
        try {
            $moduloRepository = new ModuloRepository();
            $modulo = $moduloRepository->createOrUpdate(null, [
                'pis' => auth()->user()->pis,
                'tipo' => '3',
                'user_id' => auth()->user()->id
            ]);


            if ($modulo) {
                return new ModuloResource($modulo);
            } else {
                return response(['Problema ao Criar o Modulo'], 500)->header('Content-Type', 'application/json');
            }

        } catch (\Exception $exception) {
            return response(['Ocorreu o erro: '.$exception->getMessage()], 500)->header('Content-Type', 'application/json');
        }
    }

    /**
     * show - ModuloController
     * Este método irá retornar apenas uma Modulo.
     *
     * @param Request $request
     * @param $id
     * @return $this|ModuloResource
     */
    public function show(ShowRequest $request, $id)
    {
        try {
            $modulo = Modulo::find($id);

            if ($modulo) {
                return new ModuloResource($modulo);
            } else {
                return response(['Problema ao procurar o Registro Solicitado'], 500)->header('Content-Type', 'application/json');
            }
        } catch (\Exception $exception) {
            return response(['Ocorreu o erro: '.$exception->getMessage()], 500)->header('Content-Type', 'application/json');
        }
    }

    public function edit()
    {
        try {
            return null;
        } catch (\Exception $exception) {
            return response(['Ocorreu o erro: '.$exception->getMessage()], 500)->header('Content-Type', 'application/json');
        }
    }

    /**
     * update - ModuloController
     * Este método irá atualizar um ou vários campos de um modulo.
     *
     * @param UpdateRequest $request
     * @param $id
     * @return $this|ModuloResource
     */
    public function update(UpdateRequest $request, $id)
    {
        try {
            $modulo = Modulo::find($id);

            if ($modulo) {
                $moduloRepository = new ModuloRepository();
                $modulo = $moduloRepository->createOrUpdate($modulo, [
                    'created_at' => $request->get('created_at'),
                    'pis' => auth()->user()->pis,
                    'tipo' => '3',
                    'user_id' => auth()->user()->id
                ]);

                if ($modulo->save()) {
                    return new ModuloResource($modulo);
                } else {
                    return response(['Problema ao Editar a Modulo'], 500)->header('Content-Type', 'application/json');
                }
            } else {
                return response(['Problema ao procurar o Registro Solicitado'], 500)->header('Content-Type', 'application/json');
            }
        } catch (\Exception $exception) {
            return response(['Ocorreu o erro: '.$exception->getMessage()], 500)->header('Content-Type', 'application/json');
        }
    }

    /**
     * destroy - ModuloController
     * Este método irá destruir um modulo.
     *
     * @param DestroyRequest $request
     * @param $id
     * @return $this|ModuloResource
     */
    public function destroy(DestroyRequest $request, $id)
    {
        try {
            $modulo = Modulo::find($id);
            if ($modulo) {
                if ($modulo->delete()) {
                    return new ModuloResource($modulo);
                } else {
                    return response(['Problema ao Destruir o Modulo'], 500)->header('Content-Type', 'application/json');
                }
            } else {
                return response(['Problema ao procurar o Registro Solicitado'], 500)->header('Content-Type', 'application/json');
            }
        } catch (\Exception $exception) {
            return response(['Ocorreu o erro: '.$exception->getMessage()], 500)->header('Content-Type', 'application/json');
        }
    }
}
