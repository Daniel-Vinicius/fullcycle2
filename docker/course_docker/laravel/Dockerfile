FROM php:7.4-cli

WORKDIR /var/www

# installing zip for create laravel project without errors
RUN apt-get update && \
    apt-get install libzip-dev -y && \
    docker-php-ext-install zip

# installing composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php composer-setup.php && \
    php -r "unlink('composer-setup.php');"

# installing laravel
RUN php composer.phar create-project laravel/laravel laravel

ENTRYPOINT ["php", "laravel/artisan", "serve"]
CMD ["--host=0.0.0.0"]
