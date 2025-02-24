## Rodar projeto

rodar npm install
criar o .env e colocar a variável = DATABASE_URL="file:./dev.db"
npx prisma migrate dev
rodar npm run dev

#### Para visualizar o banco de dados tem o comando

npx prisma studio

### Tecnologias usadas

Node 18 ou superior
React 19
Next versão 15
tailwind
Biblioteca para componentes shadcn ui (que usa tailwind)
Prisma (ORM para node)
Uso do react-hook-form para gerenciar formulario
uso do zod para fazer validações nos formulários

### Regras de funcionamento

Email é unico por usuario
