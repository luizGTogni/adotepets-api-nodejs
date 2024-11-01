# AdotePets API 🐶🐱
**AdotePets** é uma API desenvolvida em Node.js para facilitar o processo de adoção de pets, permitindo que organizações (ORGs) conectem animais disponíveis para adoção com adotantes. 

A aplicação utiliza princípios de **SOLID** e possui uma cobertura de **testes** para garantir sua funcionalidade e confiabilidade.

## ⚙️ Funcionalidades

### Funcionalidades da Aplicação
- Cadastro de pets: Organizações podem cadastrar animais para adoção, incluindo informações sobre a raça, idade, porte e outras características relevantes.
- Listagem de pets: Adotantes podem buscar pets disponíveis para adoção em uma cidade específica, com a possibilidade de aplicar filtros opcionais (idade, porte, tipo de animal).
- Detalhes de um pet: Visualização de informações detalhadas de um pet, incluindo características e informações de contato.
- Cadastro e login de ORGs: Organizações podem se cadastrar e fazer login para gerenciar os pets cadastrados.
- Administração de ORGs: ORGs autenticadas podem acessar a aplicação para administrar seus pets e informações.
### Regras de Negócio
- A cidade é um campo obrigatório para a listagem de pets.
- Cada ORG deve fornecer um endereço e número de WhatsApp.
- Os pets devem estar associados a uma ORG, que será o ponto de contato com adotantes.
- Usuários interessados em adotar entrarão em contato diretamente com a ORG via WhatsApp.
- O acesso administrativo só é permitido para ORGs autenticadas.
## 📐 Arquitetura e Design
O projeto adota os princípios SOLID para promover uma arquitetura organizada e escalável, sendo:

- Single Responsibility para garantir que cada classe tenha uma única responsabilidade.
- Dependency Inversion para tornar a aplicação mais fácil de manter e testar.
- Open-Closed Principle para facilitar a adição de novas funcionalidades sem modificar o código existente.
## 🚀 Tecnologias e Ferramentas
- Node.js & Fastify: para construção e gerenciamento da API.
- Postgres: banco de dados SQL para modelagem e armazenamento dos dados das ORGs e pets.
- Autenticação JWT: autenticação baseada em token para segurança dos endpoints administrativos.
- Vitest: framework de testes para garantir a confiabilidade da aplicação.
- TypeScript: para proporcionar tipagem estática e segurança adicional.
## 🛠 Como Configurar e Executar o Projeto
1. Clone o repositório e entre na pasta do projeto.
2. Instale as dependências com npm install.
3. Configure as variáveis de ambiente (ex.: dados do Banco de Dados, secret do JWT).
4. Configure o docker com docker compose up -d
5. Execute o Prisma com o comando npx prisma migrate dev
6. Execute a API com npm start:dev.
7. Para rodar os testes, utilize o comando npm run test ou npm run test:e2e.
