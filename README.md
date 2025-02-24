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

## Descrição do projeto

Foi usado next js com react, para o design system foi usado o shadcn ui, pois combina com o tailwind e é intuitivo, para gerenciamento de banco de dados foi usado o prisma orm para node e o sqLite para o banco de dados, para gerenciamento de campos foi usado o react hook form , pois é uma biblioteca muita ágil para manipular os campos e para validações foi usado o zod.
