# Calculadoras Trabalhistas

Um site completo com diversas calculadoras trabalhistas para facilitar cálculos conforme a legislação brasileira.

## Visão Geral

Este projeto é um site de calculadoras trabalhistas desenvolvido com React e TypeScript, utilizando Tailwind CSS para estilização. O site oferece diversas calculadoras para realizar cálculos trabalhistas conforme a legislação brasileira, incluindo:

- Calculadora de FGTS
- Calculadora de décimo terceiro proporcional
- Calculadora de décimo terceiro salário
- Calculadora de férias
- Calculadora de rescisão trabalhista CLT
- Calculadora de horas extras
- Simulador de escala de trabalho com folha de ponto
- Calculadora de INSS
- Calculadora de IRRF (Imposto de Renda)
- Calculadora de salário empregado doméstico
- Calculadora de salário líquido
- Calculadora de seguro desemprego

## Requisitos do Sistema

- Node.js (versão 16.x ou superior)
- npm, yarn ou pnpm (recomendamos pnpm para melhor performance)
- Navegador web moderno (Chrome, Firefox, Safari, Edge)

## Instalação

Siga os passos abaixo para instalar e executar o projeto localmente:

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/calculadoras-trabalhistas.git
cd calculadoras-trabalhistas
```

### 2. Instale as dependências

Usando npm:

```bash
npm install
```

Usando yarn:

```bash
yarn install
```

Usando pnpm (recomendado):

```bash
pnpm install
```

### 3. Inicie o servidor de desenvolvimento

Usando npm:

```bash
npm run dev
```

Usando yarn:

```bash
yarn dev
```

Usando pnpm:

```bash
pnpm dev
```

### 4. Acesse o site

Abra seu navegador e acesse:

```
http://localhost:5173
```

## Estrutura do Projeto

```
calculadoras-trabalhistas/
├── public/              # Arquivos públicos
├── src/                 # Código fonte
│   ├── assets/          # Imagens e outros recursos estáticos
│   ├── components/      # Componentes React
│   │   ├── calculadoras/# Componentes das calculadoras
│   │   ├── ui/          # Componentes de UI reutilizáveis
│   │   └── Layout.tsx   # Layout principal do site
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Funções utilitárias e lógica de cálculo
│   ├── pages/           # Páginas do site
│   ├── App.tsx          # Componente principal
│   ├── index.css        # Estilos globais
│   └── main.tsx         # Ponto de entrada
├── .gitignore           # Arquivos ignorados pelo git
├── index.html           # HTML de entrada
├── package.json         # Dependências e scripts
├── postcss.config.js    # Configuração do PostCSS
├── tailwind.config.js   # Configuração do Tailwind CSS
├── tsconfig.json        # Configuração do TypeScript
└── vite.config.ts       # Configuração do Vite
```

## Funcionalidades

### Calculadora de FGTS
Calcula o valor do FGTS (8% do salário bruto) que deve ser depositado mensalmente pelo empregador.

### Calculadora de Décimo Terceiro
Calcula o valor do décimo terceiro salário, tanto integral quanto proporcional, com base no salário bruto e meses trabalhados.

### Calculadora de Férias
Calcula o valor das férias, incluindo o terço constitucional e a possibilidade de vender até 10 dias de férias.

### Calculadora de Rescisão Trabalhista CLT
Calcula os valores devidos na rescisão do contrato de trabalho, considerando diferentes tipos de rescisão (sem justa causa, com justa causa, pedido de demissão).

### Calculadora de Horas Extras
Calcula o valor das horas extras trabalhadas, considerando diferentes percentuais de adicional.

### Simulador de Escala de Trabalho
Simula diferentes escalas de trabalho (5x2, 6x1, 12x36, 4x2) e gera uma folha de ponto com os dias de trabalho e folga.

### Calculadora de INSS
Calcula o valor da contribuição ao INSS com base no salário bruto, considerando as faixas e alíquotas vigentes.

### Calculadora de IRRF
Calcula o valor do Imposto de Renda Retido na Fonte, considerando o salário bruto, descontos do INSS e número de dependentes.

### Calculadora de Salário Empregado Doméstico
Calcula o salário líquido do empregado doméstico, considerando os descontos específicos desta categoria.

### Calculadora de Salário Líquido
Calcula o salário líquido após todos os descontos (INSS, IRRF e outros).

### Calculadora de Seguro Desemprego
Calcula o valor e o número de parcelas do seguro desemprego, com base nos últimos salários e tempo trabalhado.

## Personalização

### Alterando Cores e Tema

O projeto utiliza Tailwind CSS para estilização. Para alterar as cores e o tema, edite o arquivo `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f0ff',
          100: '#b3d1ff',
          // ... adicione suas cores personalizadas
        },
        // ... outras cores
      },
    },
  },
  // ... outras configurações
};
```

### Adicionando Novas Calculadoras

Para adicionar uma nova calculadora:

1. Crie a função de cálculo em `src/lib/calculadoras.ts`
2. Crie o componente da calculadora em `src/components/calculadoras/`
3. Adicione a rota para a nova calculadora em `src/App.tsx`
4. Adicione um link para a nova calculadora na página inicial (`src/pages/HomePage.tsx`)

## Build para Produção

Para gerar uma versão otimizada para produção:

Usando npm:

```bash
npm run build
```

Usando yarn:

```bash
yarn build
```

Usando pnpm:

```bash
pnpm build
```

Os arquivos de build serão gerados na pasta `dist/`. Estes arquivos podem ser servidos por qualquer servidor web estático.

## Servindo a Versão de Produção Localmente

Para testar a versão de produção localmente:

Usando npm:

```bash
npm run preview
```

Usando yarn:

```bash
yarn preview
```

Usando pnpm:

```bash
pnpm preview
```

## Tecnologias Utilizadas

- [React](https://reactjs.org/) - Biblioteca JavaScript para construção de interfaces
- [TypeScript](https://www.typescriptlang.org/) - Superset tipado de JavaScript
- [Vite](https://vitejs.dev/) - Ferramenta de build rápida
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- [React Router](https://reactrouter.com/) - Roteamento para React

## Considerações Finais

Este projeto foi desenvolvido para fins educacionais e informativos. Os cálculos são baseados na legislação trabalhista brasileira vigente no momento do desenvolvimento. Recomendamos sempre consultar um profissional especializado para obter orientações específicas sobre sua situação particular.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.
