<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>

<div>
    Olá {{ $name }},
    <br>
    Obrigado por criar sua conta conosco. Você ainda não finalizou seu registro!
    <br>
    Por favor clique no link a seguir ou copie o endereço e cole em seu navegador para confirmar sua conta:
    <br>

    <a href="{{ url('user/verify', $verification_code)}}">Confirmar e-mail </a>

    <br/>
</div>

</body>
</html>