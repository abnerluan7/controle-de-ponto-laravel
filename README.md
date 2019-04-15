<p align="center"><img src="https://laravel.com/assets/img/components/logo-laravel.svg"></p>

- Criar um novo banco de Dados no Postgres

- Configurar no arquivo .env as variaveis de banco e smtp (Utilizo mailtrap para testes):

    DB_HOST=[host]
    DB_PORT=[porta]
    DB_DATABASE=[nome_do_banco_de_dados]
    DB_USERNAME=[usuario_do_banco_de_dados]
    DB_PASSWORD=[senha_do_banco_de_dados]

    MAIL_DRIVER=smtp
    MAIL_HOST=smtp.mailtrap.io
    MAIL_PORT=[porta]
    MAIL_USERNAME=[usuario]
    MAIL_PASSWORD=[senha]
    MAIL_ENCRYPTION=null
    FROM_EMAIL_ADDRESS=[endereço]
    MAIL_PRETEND=false

- Executar os seguintes comandos:

    composer install

    php artisan migrate

    php artisan db:seed 

    php -S localhost:8080 -t public/
