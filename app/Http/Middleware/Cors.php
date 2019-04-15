<?php

namespace App\Http\Middleware;

use Closure;

class Cors {
    public function handle($request, Closure $next)
    {
        if ($request->isMethod('OPTIONS')) {
            $response = response('', 200);
        } else {
            // Pass the request to the next middleware
            $response = $next($request);
        }

        // Adds headers to the response
        $response = $response->header('Access-Control-Allow-Methods', 'HEAD, GET, POST, PUT, PATCH, DELETE');
        $response = $response->header('Access-Control-Allow-Headers', $request->header('Access-Control-Request-Headers'));
        $response = $response->header('Access-Control-Allow-Origin', '*');
        $response = $response->header('Access-Control-Expose-Headers', 'Location');

        // Sends it
        return $response;
    }
}
