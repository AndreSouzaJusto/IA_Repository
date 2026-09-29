# Exemplo Playwright — Testes E2E para o demo Vanilla JS

---

## 🇧🇷 Português (Brasil)

### 📋 Descrição do Projeto

Este diretório contém um conjunto de testes end-to-end (E2E) com **Playwright** para a aplicação de demonstração "TDD Frontend Example" (Vanilla JS). Os testes automatizam a interação com o formulário da aplicação hospedada em https://erickwendel.github.io/vanilla-js-web-app-example/, cobrindo submissão de itens e validações de formulário.

Os testes foram criados para serem idempotentes, usar seletores robustos (`getByRole`) e executar contra o navegador Chromium configurado no Playwright.

### 🎯 Objetivo

- Validar que o formulário adiciona itens na lista quando os campos são válidos.
- Verificar que entradas inválidas (por exemplo URL malformada) não são adicionadas.
- Fornecer um conjunto de testes fáceis de estender para outros fluxos da aplicação.

### 🗂️ Estrutura do Projeto

```
playwright.config.ts       # Configuração do Playwright
package.json               # Scripts e dependências
tests/                     # Arquivos de teste
  example.spec.ts
  form.spec.ts             # Testes gerados: submissão e validação
prompts/                   # Prompts usados para geração via MCP
playwright-report/         # Relatórios gerados pelos runs
```

### ⚙️ Como Executar

1) Instalar dependências

```bash
npm install
```

2) Executar os testes (Chromium)

```bash
npx playwright test --project=chromium
```

3) Abrir o relatório HTML gerado

```bash
npx playwright show-report
```

Observações:
- Se o Playwright solicitar instalação interativa de navegadores, confirme com `y`.
- Os testes apontam para a URL pública do exemplo e não dependem de um servidor local.

### 🧩 Papel dos Arquivos

- `tests/form.spec.ts`: testes de submissão de formulário e validação.
- `tests/example.spec.ts`: exemplo adicional fornecido pelo template inicial.
- `playwright.config.ts`: configura timeout, projetos (Chromium, Firefox, etc.) e opções de reporter.

### ✅ Requisitos

- Node.js (versão compatível com o projeto);
- Conexão com internet para acessar a URL de exemplo;
- Navegadores Playwright instalados (o instalador do Playwright fará o download quando solicitado).

### 📌 Possíveis Melhorias

- Adicionar testes para casos de acessibilidade (a11y).
- Incluir execução em múltiplos navegadores (Firefox, WebKit) no CI.
- Tornar os testes mais robustos salvando screenshots e vídeos em falhas.

---

## 🇺🇸 English (American)

### 📋 Project Description

This folder contains end-to-end Playwright tests for the "TDD Frontend Example" (Vanilla JS). Tests automate the form interactions on https://erickwendel.github.io/vanilla-js-web-app-example/, covering item submission and form validation.

Tests are idempotent, prefer robust selectors (`getByRole`) and are configured to run on Chromium via Playwright.

### 🎯 Goals

- Validate item addition on valid submissions.
- Ensure invalid inputs (e.g. malformed URLs) are not added.
- Provide an extendable test suite for other app flows.

### 🗂️ Project Structure

```
playwright.config.ts
package.json
tests/
  example.spec.ts
  form.spec.ts
prompts/
playwright-report/
```

### ⚙️ How to Run

Install dependencies:

```bash
npm install
```

Run tests (Chromium):

```bash
npx playwright test --project=chromium
```

Open the HTML report:

```bash
npx playwright show-report
```

Notes:
- Confirm Playwright browser installation when prompted.
- Tests use the public example URL; no local server required.

### 🧩 File Roles

- `tests/form.spec.ts`: submission and validation tests.
- `tests/example.spec.ts`: original example test.
- `playwright.config.ts`: Playwright configuration and reporters.

### ✅ Requirements

- Node.js supported by the project's packages;
- Internet access to reach the demo page;
- Playwright browser binaries (installed on first run).

### 📌 Suggested Improvements

- Add accessibility (a11y) checks.
- Run across multiple browsers in CI.
- Capture screenshots/videos on failures for easier debugging.
