<?php

namespace App\Policies;

use App\Modulo;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ModuloPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine whether the user can view the vehicle.
     *
     * @param  \App\User $user
     * @param Modulo $modulo
     * @return mixed
     */
    public function view(User $user, Modulo $modulo)
    {
        return true;
    }

    /**
     * Determine whether the user can create vehicles.
     *
     * @param  \App\User $user
     * @return mixed
     */
    public function create(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can update the vehicle.
     *
     * @param  \App\User $user
     * @param Modulo $modulo
     * @return mixed
     */
    public function update(User $user, Modulo $modulo)
    {
        return true;
    }

    /**
     * Determine whether the user can delete the vehicle.
     *
     * @param  \App\User $user
     * @param Modulo $modulo
     * @return mixed
     */
    public function destroy(User $user, Modulo $modulo)
    {
        return true;
    }
}
