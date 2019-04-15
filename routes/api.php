<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', 'AuthController@register');
Route::post('login', 'AuthController@login');

 
Route::post('recover', 'AuthController@recover');
Route::group(['middleware' => ['jwt.auth']], function() {
    Route::get('logout', 'AuthController@logout');
    Route::get('users', function(Request $request){
        return auth()->user();
    });

    Route::group(['namespace' => 'Sentinela'], function () {
        Route::group(['prefix' => 'modulo'], function() {
            Route::get('index', 'ModuloController@index')->name('ModuloController.index');
            Route::post('store', 'ModuloController@store')->name('ModuloController.store');
            Route::get('create', 'ModuloController@create')->name('ModuloController.create');
            Route::get('show/{id}', 'ModuloController@show')->name('ModuloController.show');
            Route::put('update/{id}', 'ModuloController@update')->name('ModuloController.update');
            Route::delete('destroy/{id}', 'ModuloController@destroy')->name('ModuloController.destroy');
        });
    });

    
    /*
        Route::get('exemplo', 'sentinela\ExemploController@index')->name('exemplo.index');
    */
   
});
