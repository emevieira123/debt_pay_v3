# Debt Pay - Sistema de Gerenciamento de Dívidas

Uma aplicação web moderna para controle e acompanhamento de dívidas pessoais, desenvolvida com React, TypeScript e Tailwind CSS.

## 🚀 Funcionalidades

- **Dashboard Interativo**: Visualização geral das dívidas com métricas e gráficos
- **Gestão de Dívidas**: Cadastro, edição e acompanhamento de dívidas
- **Controle de Pagamentos**: Registro de pagamentos e histórico
- **Sistema de Autenticação**: Login e registro de usuários
- **Interface Responsiva**: Design adaptável para desktop e mobile
- **Tema Escuro**: Interface moderna com tema dark por padrão

## 🛠️ Tecnologias Utilizadas

### Frontend

- **React 19** - Biblioteca para construção de interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis e customizáveis

### Estado e Roteamento

- **Zustand** - Gerenciamento de estado global
- **React Router DOM** - Roteamento da aplicação
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas

### UI/UX

- **Lucide React** - Ícones
- **Recharts** - Gráficos e visualizações
- **Sonner** - Notificações toast
- **Framer Motion** - Animações

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Dashboard/      # Componentes específicos do dashboard
│   ├── Layout/         # Componentes de layout (header, sidebar)
│   └── ui/            # Componentes base da interface
├── hooks/              # Custom hooks
├── infra/              # Configurações e constantes
├── lib/                # Utilitários e helpers
├── pages/              # Páginas da aplicação
├── store/              # Stores Zustand (estado global)
├── types/              # Definições de tipos TypeScript
└── App.tsx            # Componente principal
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório**

   ```bash
   git clone [url-do-repositorio]
   cd debt_pay
   ```

2. **Instale as dependências**

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Execute o servidor de desenvolvimento**

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Acesse a aplicação**
   - Abra [http://localhost:5173](http://localhost:5173) no seu navegador

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linter

## 🔧 Configuração

### Variáveis de Ambiente

O projeto utiliza dados mockados para demonstração. Para produção, configure:

- Variáveis de ambiente para APIs
- Configurações de banco de dados
- Chaves de autenticação

### Personalização

- **Tema**: Edite `tailwind.config.js` para personalizar cores e estilos
- **Componentes**: Modifique componentes em `src/components/ui/`
- **Layout**: Ajuste layouts em `src/components/Layout/`

## 📱 Funcionalidades Principais

### Dashboard

- Métricas de dívidas (total, pago, restante)
- Gráficos de pagamentos
- Lista dos últimos pagamentos
- Layout responsivo para mobile

### Gestão de Dívidas

- Cadastro de novas dívidas
- Acompanhamento de parcelas
- Status de pagamento
- Histórico de transações

### Sistema de Usuários

- Registro de conta
- Login/Logout
- Rotas protegidas
- Persistência de sessão

## 🎨 Design System

O projeto utiliza um design system consistente baseado em:

- **Cores**: Paleta escura com acentos
- **Tipografia**: Hierarquia clara de textos
- **Espaçamento**: Sistema de espaçamento consistente
- **Componentes**: Biblioteca de componentes reutilizáveis

## 🔒 Segurança

- Rotas protegidas para usuários autenticados
- Validação de formulários com Zod
- Sanitização de inputs
- Gerenciamento seguro de estado

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Desenvolvedor

**Emerson Vieira** - Desenvolvedor Full Stack

## 📞 Suporte

Para dúvidas ou suporte:

- Abra uma issue no repositório
- Entre em contato através do email: emevieira.dev@gmail.com

---

**Nota**: Este projeto foi desenvolvido como demonstração de habilidades em React, TypeScript e desenvolvimento frontend moderno.
