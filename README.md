# To-Dos Frontend&nbsp; :computer:

![License](https://badgen.net/badge/License/MIT/purple?icon=)
![React](https://badgen.net/badge/React/v19/green?icon=)
![Docker](https://badgen.net/badge/icon/Available?icon=docker&label)

Este é o frontend para a aplicação To-Dos, uma interface de usuário para gerenciar tarefas de forma intuitiva.
A aplicação se comunica com a API backend para autenticação, criação, atualização, exclusão e listagem tanto de tarefas, como usuários.

> **⚠ Antes de iniciar o frontend, certifique-se de que o backend está rodando conforme as instruções disponíveis em:**  
> [To-Dos API](https://github.com/brenonsc/todos-api)

<br>

## Tecnologias utilizadas&nbsp; 🔨

<div>
    <img align='center' height='64' width='72' title='React' alt='react' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png' />&nbsp;&nbsp;&nbsp;
    <img align='center' height='60' width='60' title='TypeScript' alt='typescript' src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png' /> &nbsp;&nbsp;&nbsp;
    <img align='center' height='64' width='64' title='Vite' alt='vite' src='https://vitejs.dev/logo.svg' />&nbsp;&nbsp;
    <img align='center' height='46' width='68' title='Tailwind' alt='tailwind' src='https://static-00.iconduck.com/assets.00/tailwind-css-icon-2048x1229-u8dzt4uh.png' /> &nbsp;&nbsp;
    <img align='center' height='70' width='70' title='Docker' alt='docker' src='https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/97_Docker_logo_logos-512.png' />
</div>

<br>

## Instalação&nbsp; 🖥️

1. **Clone o repositório:**
   
   ```sh
   git clone https://github.com/brenonsc/todos-front.git
   cd todos-front
   ```

2. **Certifique-se de que o Docker está instalado na sua máquina.**<br>
   Caso não tenha, faça o download em: [Docker Desktop](https://www.docker.com/products/docker-desktop/).

4. **Execute a aplicação:**

   ```sh
   docker compose up --build
   ```

   O frontend estará disponível em: [https://localhost:8080](https://localhost:8080)

   <br>

## Estrutura do projeto&nbsp; :open_file_folder:

```bash
public
   |-- images
   |   |-- todo.svg
src
   |-- interfaces
   |   |-- Todo.ts
   |   |-- User.ts
   |-- pages
   |   |-- addToDo
   |   |   |-- AddToDo.tsx
   |   |-- editTodo
   |   |   |-- EditTodo.tsx
   |   |-- home
   |   |   |-- Home.tsx
   |   |-- login
   |   |   |-- Login.tsx
   |   |-- profile
   |   |   |-- Profile.tsx
   |   |-- signup
   |   |   |-- SignUp.tsx
   |-- services
   |   |-- axiosConfig.ts
   |-- App.css
   |-- App.jsx
   |-- index.css
   |-- main.jsx
.gitignore
Dockerfile
docker-compose.yaml
eslint.config.js
index.html
LICENSE
package-lock.json
package.json
postcss.config.js
README.md
tailwind.config.js
vite.config.js
```

<br>

## Licença&nbsp; 📋

Este software está licenciado sob a [Licença MIT](https://github.com/brenonsc/todos-front/blob/main/LICENSE).
