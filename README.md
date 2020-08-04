# Music Climate

Music Climate é uma api desenvolvida com Nodejs a partir do framework Express.
Este foi desenvolvido com a finalidade de comprovar minha proficiencia em Javascript,ferramentas auxiliáres para desenvolvimento de apis rest completas e frameworks presentes na stack Node, Postgres e Redis.
A utilização do Docker tem como objetivo a disponibilização dos bancos de dados através de containers totalmente desacoplados ao serviço.

## Getting Started

Para fins de teste você deve ter instalado em sua máquina uma versão LTS ou superior do NodeJs e o Docker com as imagens do Postgres e Redis devidamente configuradas.

### Pré Requisitos

Segue os pré requisitos para rodar o projeto em localhost

* [NODE] (https://nodejs.org/en/download/)
* [YARN] (https://yarnpkg.com/pt-BR/docs/install)
* [DOCKER] (https://docs.docker.com/toolbox/toolbox_install_windows/)
* [MAILTRAP] (https://mailtrap.io)


O projeto music climate.

#### Instalação Docker:
* [DOCKER TOOL BOX - WINDOWS](https://docs.docker.com/toolbox/toolbox_install_windows/) - No meu caso utilizei a toolbox para windows

#### Criar Container redis e prostgress

```
docker run --name pg_music_climate -e POSTGRES_PASSWORD=mysecretpass POSTGRESQL_DATABASE=music_climate -p 5432:5432 -d postgres:11

docker run --name redis_music_climate -p 6379:6379 -d -t redis:alpine

```
Verifique se os containers estão funcionando corretamente:
```
docker ps -a

/* caso os containers contendo os bancos de dados não estejam funcionando rode os seguintes comandos */

docker start {nome/id do container}

```
#### Serviço de email para teste

* [MAILTRAP](https://mailtrap.io) - para envio de emails

Para configurar o mailtrap.io, acesse sua conta e vá para a tela de configuração.
Lá você encontrará as credenciais necessárias para que o serviço funcione corretamente


Antes de iniciar o serviço, crie um arquivo .env com as configurações necessárias de Bancos de dados, emails, e outras variáveis de ambiente necessárias


### Instalação

Passo a passo para rodar o projeto em localhost

Clonar o projeto

```
https://github.com/Sanguinettecode/music_climate.git
```

### dependencias
```
/* instalando as dependencias */

yarn
```

Com todos as dependências instaladas digite o comando adequado

```
/*iniciando o serviço*/

yarn dev
/*iniciando o serviço app*/

yarn queue
/*iniciando o seviço filas*/

```

Respequitivamente para iniciar o serviço da api rest e o monitoramento das filas com Redis


