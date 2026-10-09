# Busca CNPJ

API que recebe um CNPJ, consulta os dados da empresa na [ReceitaWS](https://receitaws.com.br) e cadastra essa empresa no banco do SGN como **fornecedor**, **cliente**, **empresa** ou **filial**.

Os dados vindos da ReceitaWS ficam guardados numa base auxiliar. Se o mesmo CNPJ for pedido de novo, a API usa o que já está salvo e não consulta a ReceitaWS outra vez.

## Tecnologias

- Node.js 20.18 ou mais novo, Express e TypeScript (compilado com Babel)
- TypeORM com SQL Server (`mssql`)
- PM2 para rodar em produção
- Swagger para a documentação das rotas

## Fluxo de uma requisição

```
GET /v1Paga/fornecedor/:cnpj/:banco
        │
        ▼
1. Procura o CNPJ na base auxiliar (tabela EMPRESA)
        │
        ├── não encontrou ──► 2. Consulta a ReceitaWS
        │                     3. Grava em EMPRESA e ENDERECO (base auxiliar)
        │
        ▼
4. Lê empresa + endereço da base auxiliar
5. Grava no banco do SGN informado em :banco
   (ex.: PESSOA_JURIDICA + FORNECEDOR)
6. Devolve o ID gerado
```

Cliente, empresa e filial seguem o mesmo fluxo e mudam só as tabelas gravadas no passo 5.

### Rotas

| Versão | Prefixo | Consulta à ReceitaWS |
|---|---|---|
| Gratuita | `/v1Gratis` | API pública (tem limite de consultas por minuto) |
| Paga | `/v1Paga` | API comercial, autenticada com o `TOKEN_WS` |

Rotas disponíveis em cada versão:

| Rota | O que cadastra |
|---|---|
| `GET /fornecedor/:cnpj/:banco` | Pessoa jurídica + fornecedor |
| `GET /cliente/:cnpj/:banco` | Pessoa jurídica + cliente |
| `GET /empresa/:cnpj/:banco` | Empresa |
| `GET /filial/:cnpj/:banco/:emprCod` | Filial ligada à empresa `emprCod` |

- `:cnpj` é o CNPJ só com números.
- `:banco` é o nome do banco do SGN. Só são aceitos letras, números e `_`.
- A documentação Swagger fica em `/v1Gratis/doc` e em `/v1Paga/doc`.

### Estrutura de pastas

```
src/
  server.ts        inicia o Express e a conexão com o banco
  routes/          rotas (v1Free, v1Paga)
  controllers/     fluxo de cada cadastro
  services/        uma operação por arquivo (consultar a ReceitaWS, inserir, buscar...)
  queries/         SQL usado pelos services (sempre com parâmetros @0, @1...)
  typeorm/         conexão (DataSource), entidades e migrations
  swagger/         documentação das rotas
```

## Configuração

### 1. Instalar as dependências

```bash
npm install
```

### 2. Criar o arquivo `.env`

Copie o `.env.example` para `.env` e preencha os valores:

| Variável | Descrição |
|---|---|
| `PORT` | Porta em que a API vai rodar (ex.: `3333`) |
| `SERVER` | Endereço do SQL Server |
| `USER_NAMES` | Usuário do SQL Server |
| `PASSWORDS` | Senha do SQL Server |
| `DATABASE` | Base auxiliar, onde ficam as tabelas `EMPRESA` e `ENDERECO` |
| `TOKEN_WS` | Token da ReceitaWS paga (usado pelas rotas `/v1Paga`) |
| `TOKEN_SECRET_REFRESH`, `TOKEN_SECRET_ACESS` | Segredos de token |

O `.env` tem credenciais e não deve ir para o git (ele já está no `.gitignore`).

O usuário do banco precisa poder gravar na base auxiliar e também nos bancos do SGN que serão informados em `:banco`.

### 3. Rodar em desenvolvimento

```bash
npm run dev
```

O código é recarregado sozinho quando um arquivo muda. O debugger fica disponível na porta 9229.

## Produção com PM2

### Instalar o PM2 (uma vez por servidor)

```bash
npm install -g pm2
```

### Compilar e subir

```bash
npm run build        # gera a pasta dist/
npm run pm2:start    # sobe a API com o ecosystem.config.js
```

Para atualizar depois de um `git pull`, use:

```bash
npm run deploy       # compila de novo e recarrega o processo no PM2
```

### Comandos do dia a dia

| Comando | O que faz |
|---|---|
| `npm run pm2:logs` | Mostra os logs em tempo real |
| `npm run pm2:restart` | Reinicia a API |
| `npm run pm2:stop` | Para a API |
| `pm2 status` | Lista os processos e o estado de cada um |
| `pm2 monit` | Mostra CPU e memória em tempo real |

Os logs também ficam gravados em `logs/out.log` e `logs/error.log`.

### O que o `ecosystem.config.js` define

- Nome do processo: `busca-cnpj`
- Arquivo que roda: `dist/server.js`. Por isso é preciso rodar o build antes de subir.
- Reinicia sozinho se o processo cair ou se passar de 300 MB de memória.
- O `.env` é lido da raiz do projeto.

### Iniciar junto com o servidor

**Linux:**

```bash
pm2 startup     # mostra um comando: rode esse comando
pm2 save        # salva a lista de processos que está rodando agora
```

**Windows:** o `pm2 startup` não funciona no Windows. Use o pacote `pm2-installer` ou `pm2-windows-startup`:

```bash
npm install -g pm2-windows-startup
pm2-startup install
pm2 save
```

## Scripts

| Script | Descrição |
|---|---|
| `npm run dev` | Desenvolvimento, com reload automático |
| `npm run build` | Compila `src/` para `dist/` |
| `npm start` | Roda o `dist/` sem o PM2 |
| `npm run typecheck` | Verifica os tipos do TypeScript |
| `npm run deploy` | Build + recarrega no PM2 |
