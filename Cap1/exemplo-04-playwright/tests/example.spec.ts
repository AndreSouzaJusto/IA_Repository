import { test, expect } from '@playwright/test';

// Configura o URL alvo para testar a aplicação
const baseURL = 'https://erickwendel.github.io/vanilla-js-web-app-example/';

// Testes para a aplicação Vanilla JS Web App Example
// Este teste verifica se o titulo do formulário está visível na página, garantindo que a funcionalidade específica da aplicação está presente, image URL e botão de envio também estão disponíveis.
test('should load the app and display form', async ({ page }) => {
  // Navega para a página inicial da aplicação
  await page.goto(baseURL);

  // Localiza os elementos do formulário na página
  const titleInput = page.locator('#title');
  const imageUrlInput = page.locator('#imageUrl');
  const submitButton = page.locator('#btnSubmit');

  // Verifica se os elementos do formulário estão visíveis na página
  await expect(titleInput).toBeVisible();
  await expect(imageUrlInput).toBeVisible();
  await expect(submitButton).toBeVisible();
});

// Este teste verifica se os cartões de imagem existentes estão visíveis na página, garantindo que as imagens previamente adicionadas à aplicação estão sendo exibidas corretamente.
test('should display existing image cards', async ({ page }) => {
  // Navega para a página inicial da aplicação
  await page.goto(baseURL);

  // Localiza a lista de cartões e os cartões individuais na página
  const cardList = page.locator('#card-list');
  const cards = page.locator('article');

  // Verifica se a lista de cartões e os cartões individuais estão visíveis na página
  await expect(cardList).toBeVisible();
  await expect(cards).toHaveCount(3);
});

// Este teste verifica se o formulário pode ser enviado corretamente, garantindo que novos cartões de imagem podem ser adicionados à aplicação.
test('should allow submitting the form', async ({ page }) => {
  // Navega para a página inicial da aplicação
  await page.goto(baseURL);
  // Localiza os elementos do formulário na página
  const titleInput = page.locator('#title');
  const imageUrlInput = page.locator('#imageUrl');
  const submitButton = page.locator('#btnSubmit');

  // Preenche os campos do formulário e envia os dados
  await titleInput.fill('Test Image');
  // Preenche o campo de URL da imagem
  await imageUrlInput.fill('https://via.placeholder.com/300x300');
  // Clica no botão de envio para adicionar o novo cartão de imagem
  await submitButton.click();
  // Verifica se o novo cartão de imagem foi adicionado à lista de cartões
  const cards = page.locator('article');
  // Aguarda até que o novo cartão de imagem esteja visível na página antes de verificar a contagem
  await expect(cards).toHaveCount(4);
});

// Testes de validação do formulário
// Este teste verifica se o formulário valida corretamente quando o campo de título está vazio.
test('should validate empty title field', async ({ page }) => {
  // Navega para a página inicial da aplicação
  await page.goto(baseURL);

  // Localiza os elementos do formulário na página
  const titleInput = page.locator('#title');
  const imageUrlInput = page.locator('#imageUrl');
  const submitButton = page.locator('#btnSubmit');
  const titleFeedback = page.locator('#titleFeedback');

  // Deixa o campo de título vazio e preenche o URL da imagem
  await imageUrlInput.fill('https://via.placeholder.com/300x300');
  // Clica no botão de envio sem preencher o título
  await submitButton.click();

  // Verifica se a mensagem de validação aparece para o campo de título vazio
  await expect(titleFeedback).toBeVisible();
  // Verifica o conteúdo da mensagem de validação
  await expect(titleFeedback).toContainText('Please type a title');
});

// Este teste verifica se o formulário valida corretamente quando o campo de URL está vazio.
test('should validate empty image URL field', async ({ page }) => {
  // Navega para a página inicial da aplicação
  await page.goto(baseURL);

  // Localiza os elementos do formulário na página
  const titleInput = page.locator('#title');
  const submitButton = page.locator('#btnSubmit');
  const urlFeedback = page.locator('#urlFeedback');

  // Preenche apenas o título, deixando o URL vazio
  await titleInput.fill('Test Image');
  // Clica no botão de envio sem preencher a URL da imagem
  await submitButton.click();

  // Verifica se a mensagem de validação aparece para o campo de URL vazio
  await expect(urlFeedback).toBeVisible();
  // Verifica o conteúdo da mensagem de validação
  await expect(urlFeedback).toContainText('Please type a valid URL');
});

// Este teste verifica se o formulário valida corretamente quando uma URL inválida é fornecida.
test('should validate invalid URL format', async ({ page }) => {
  // Navega para a página inicial da aplicação
  await page.goto(baseURL);

  // Localiza os elementos do formulário na página
  const titleInput = page.locator('#title');
  const imageUrlInput = page.locator('#imageUrl');
  const submitButton = page.locator('#btnSubmit');
  const urlFeedback = page.locator('#urlFeedback');

  // Preenche o título com um valor válido
  await titleInput.fill('Test Image');
  // Preenche a URL com um formato inválido (sem protocolo http/https)
  await imageUrlInput.fill('not-a-valid-url');
  // Clica no botão de envio
  await submitButton.click();

  // Verifica se a mensagem de validação aparece para URL inválida
  await expect(urlFeedback).toBeVisible();
  // Verifica o conteúdo da mensagem de validação
  await expect(urlFeedback).toContainText('Please type a valid URL');
});

// Este teste verifica se ambos os campos exibem mensagens de validação quando estão vazios.
test('should validate both empty fields', async ({ page }) => {
  // Navega para a página inicial da aplicação
  await page.goto(baseURL);

  // Localiza os elementos do formulário na página
  const submitButton = page.locator('#btnSubmit');
  const titleFeedback = page.locator('#titleFeedback');
  const urlFeedback = page.locator('#urlFeedback');

  // Clica no botão de envio com ambos os campos vazios
  await submitButton.click();

  // Verifica se as mensagens de validação aparecem para ambos os campos
  await expect(titleFeedback).toBeVisible();
  await expect(urlFeedback).toBeVisible();
});
