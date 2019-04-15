<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\User;
use App\Cliente;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Validator, DB, Hash, Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
     /**
     * API Register
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $credentials = $request->only('name', 'email', 'password', 'cpf', 'pis');
        
        $rules = [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'cpf' => 'required|max:11|min:11|cpf|unique:users,cpf',
            'pis' => 'required|max:11|min:11|unique:users,cpf',
        ];

        $validator = Validator::make($credentials, $rules);
        if($validator->fails()) {
            return response()->json(['success'=> false, 'error'=> $validator->messages()]);
        }

        $name = $request->name;
        $email = $request->email;
        $cpf = $request->cpf;
        $pis = $request->pis;
        $cargo = $request->cargo;
        $equipe = $request->equipe;
        $password = $request->password;
        
        $user = User::create([
            'name' => $name, 
            'email' => $email, 
            'papel' => 2,
            'cpf' => $cpf,
            'pis' => $pis,
            'cargo' => $cargo,
            'equipe' => $equipe, 
            'password' => Hash::make($password),
        ]);

        $verification_code = str_random(30); //Generate verification code

        DB::table('user_verifications')->insert(['user_id'=>$user->id,'token'=>$verification_code]);
        

        $subject = "Por Favor Verifique seu email.";

        Mail::send('email.verify', ['name' => $name, 'verification_code' => $verification_code],
            function($mail) use ($email, $name, $subject){
                $mail->from(getenv('FROM_EMAIL_ADDRESS'), "E-mail de envio incorreto");
                $mail->to($email, $name);
                $mail->subject($subject);
            });

        return response()->json(['success'=> true, 'message'=> 'Obrigado por se inscrever! Por favor cheque seu e-mail para completar seu registro.']);
    }

    /**
     * API Verify User
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function verifyUser($verification_code)
    {
        $check = DB::table('user_verifications')->where('token',$verification_code)->first();
        if(!is_null($check)){
            $user = User::find($check->user_id);
            if($user->is_verified == 1){
                return response()->json([
                    'success'=> true,
                    'message'=> 'Conta já verificada..'
                ]);
            }
            $user->update(['is_verified' => 1]);
            DB::table('user_verifications')->where('token',$verification_code)->delete();
            return response()->json([
                'success'=> true,
                'message'=> 'Seu e-mail foi verificado com sucesso.'
            ]);
        }
        return response()->json(['success'=> false, 'error'=> "Código de verificação inválido."]);
    }

    /**
     * API Login, on success return JWT Auth token
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        
        $rules = [
            'email' => 'required|email',
            'password' => 'required',
        ];
        $validator = Validator::make($credentials, $rules);
        if($validator->fails()) {
            return response()->json(['success'=> false, 'error'=> $validator->messages()], 401);
        }
        
        $credentials['is_verified'] = 1;
        
        try {
            // attempt to verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['success' => false, 'error' => 'Não conseguimos encontrar sua conta.'], 404);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['success' => false, 'error' => 'O login falhou, Tente novamente.'], 500);
        }
        // all good so return the token
        return response()->json(['success' => true, 'data'=> [ 'token' => $token ]], 200);
    }

    /**
     * Log out
     * Invalidate the token, so user cannot use it anymore
     * They have to relogin to get a new token
     *
     * @param Request $request
     */
    public function logout(Request $request) {
        
        try {
            JWTAuth::invalidate($request->input('token'));
            return response()->json(['success' => true, 'message'=> "Você foi deslogado."]);
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['success' => false, 'error' => 'O logout falhou, tente novamente.'], 500);
        }
    }

        /**
     * API Recover Password
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function recover(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            $error_message = "Seu email não foi encontrado.";
            return response()->json(['success' => false, 'error' => ['email'=> $error_message]], 401);
        }
        try {
            Password::sendResetLink($request->only('email'), function (Message $message) {
                $message->subject('Your Password Reset Link');
            });
        } catch (\Exception $e) {
            //Return with error
            $error_message = $e->getMessage();
            return response()->json(['success' => false, 'error' => $error_message], 401);
        }
        return response()->json([
            'success' => true, 'data'=> ['message'=> 'O resete de senha foi enviado! Por favor cheque seu e-mail.']
        ]);
    }
}
