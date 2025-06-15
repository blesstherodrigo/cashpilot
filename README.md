**PROJETO A3 - CASHPILOT <3**

## 👥 Equipe

- Rodrigo Araújo Oliveira – RA: 82417958  
- Leonardo Rodrigues Matsuda – RA: 824110512  
- Jhoel Ramiro Mamani Quispe – RA: 82415169  
- Arthur Alves Farias – RA: 824138792

---

# 💸 CashPilot

> **Gerencie melhor. Viva melhor.**

CashPilot é um site para **gerenciamento pessoal de gastos**, desenvolvido com o objetivo de ajudar jovens e adultos a organizarem seus gastos de forma prática, inteligente e visual. Com uma interface simples, intuitiva e responsiva, o sistema permite o registro de despesas e visualização de gráficos — promovendo a educação financeira e o uso consciente do dinheiro.

---

## 🧠 Sobre o Projeto

O projeto foi desenvolvido por estudantes da Universidade São Judas Tadeu como parte de um trabalho acadêmico, visando aplicar conhecimentos técnicos e contribuir para a conscientização sobre a vida financeira. O CashPilot busca ser uma solução acessível e eficaz para quem deseja organizar seus gastos sem complicações.

---

## 🖥️ Como Funciona

1. O usuário acessa o site e faz login ou cria uma conta.
2. Após o login, é direcionado ao **painel inicial**, onde pode ver seus gastos em gráficos.
3. É possível adicionar, editar ou excluir gastos, que são refletidas automaticamente nos gráficos.
4. É possível o usuário editar nome e email.
5. O usúario pode fazer perguntas para o ChatGPT na área de suporte.

---

## 🛠️ Tecnologias Utilizadas

- Node.js + Express.js + JWT + JavaScript (backend)
- LowDB (biblioteca para banco de dados local, não relacional)
- React.js + CSS + TypeScript (frontend)
- Chart.js (para gráficos)
- API externa para integração com ChatGPT da OpenAI

---

## 📦 Como Rodar Localmente

# Clone o repositório
- git clone https://github.com/seu-usuario/CashPilot.git
- cd CashPilot

# Instale as dependências
- npm install na raiz do projeto cashpilot/
- npm install na pasta /server/ onde fica o Back-end
- npm install na pasta /client/ onde fica o Front-end
- Cada uma contém suas próprias dependências separadas

# Inicie o projeto
- npm start (usamos a biblioteca concurrently para rodar o front-end e back-end apenas com um comando)