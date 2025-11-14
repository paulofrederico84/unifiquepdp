# Guia Completo: Configurar Google Maps API (2025)

## Passo 1: Acessar o Google Cloud Console

1. Abra seu navegador e acesse: **https://console.cloud.google.com**
2. Faça login com sua conta Google
3. Se for a primeira vez, aceite os Termos de Serviço

## Passo 2: Criar ou Selecionar um Projeto

1. No topo da página, clique no seletor de projeto (ao lado de "Google Cloud")
2. Clique em **"NOVO PROJETO"** no canto superior direito da janela
3. Preencha:
   - **Nome do projeto**: `UnifiquePDP` (ou o nome que preferir)
   - **Organização**: deixe como está (sem organização)
4. Clique em **"CRIAR"**
5. Aguarde alguns segundos até o projeto ser criado
6. Certifique-se de que o projeto está selecionado no topo da página

## Passo 3: Ativar o Faturamento (Necessário para APIs)

1. No menu lateral esquerdo (☰), vá em **"Faturamento"**
2. Se aparecer "Este projeto não tem uma conta de faturamento":
   - Clique em **"VINCULAR UMA CONTA DE FATURAMENTO"**
   - Se não tem conta: clique em **"CRIAR CONTA DE FATURAMENTO"**
   - Preencha os dados do cartão (não será cobrado imediatamente - há $200 de crédito grátis por mês)
   - Complete o cadastro
3. Vincule a conta de faturamento ao projeto

## Passo 4: Ativar as APIs Necessárias

### 4.1 Ativar Maps JavaScript API

1. No menu lateral (☰), vá em **"APIs e serviços"** → **"Biblioteca"**
2. Na barra de pesquisa, digite: **"Maps JavaScript API"**
3. Clique no resultado **"Maps JavaScript API"**
4. Clique no botão **"ATIVAR"** (azul)
5. Aguarde a ativação (alguns segundos)

### 4.2 Ativar Places API

1. Clique em **"Biblioteca"** novamente (no menu lateral ou breadcrumb)
2. Na barra de pesquisa, digite: **"Places API"**
3. Clique no resultado **"Places API"** (não confunda com "Places API (New)")
4. Clique no botão **"ATIVAR"**
5. Aguarde a ativação

## Passo 5: Criar a Chave de API

1. No menu lateral (☰), vá em **"APIs e serviços"** → **"Credenciais"**
2. No topo da página, clique em **"+ CRIAR CREDENCIAIS"**
3. Selecione **"Chave de API"** no dropdown
4. Uma janela popup aparecerá mostrando sua chave - **NÃO FECHE AINDA**
5. Clique em **"RESTRINGIR CHAVE"** (importante para segurança)

## Passo 6: Configurar Restrições da Chave (IMPORTANTE)

### 6.1 Configurar Nome

1. Em **"Nome"**, renomeie para algo descritivo: `UnifiquePDP - Frontend`

### 6.2 Configurar Restrições de Aplicativo

1. Em **"Restrições de aplicativo"**, selecione: **"Referenciadores HTTP (sites)"**
2. Em **"Restrições de referenciador de sites"**, clique em **"ADICIONAR UM ITEM"**
3. Adicione os seguintes referenciadores (um por linha):
   ```
   http://localhost:*
   http://127.0.0.1:*
   http://localhost:5173/*
   http://127.0.0.1:5173/*
   ```
4. Se você for fazer deploy no futuro, adicione também:
   ```
   https://seudominio.com.br/*
   ```

### 6.3 Configurar Restrições de API

1. Em **"Restrições de API"**, selecione: **"Restringir chave"**
2. No dropdown **"Selecionar APIs"**, marque apenas:
   - ✅ **Maps JavaScript API**
   - ✅ **Places API**
3. Clique em **"SALVAR"** no final da página

## Passo 7: Copiar a Chave

1. Volte para **"Credenciais"** no menu lateral
2. Na seção **"Chaves de API"**, você verá sua chave criada
3. Clique no ícone de **"Copiar"** (📋) ao lado da chave
4. A chave tem formato: `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

## Passo 8: Adicionar a Chave ao Projeto

1. Abra o arquivo: `frontend/.env`
2. Substitua a linha:
   ```
   VITE_GOOGLE_MAPS_API_KEY=COLOQUE_SUA_CHAVE_AQUI
   ```
   Por:
   ```
   VITE_GOOGLE_MAPS_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```
   (use sua chave real copiada)
3. **SALVE O ARQUIVO** (Cmd + S)

## Passo 9: Testar o Autocomplete

1. Abra o terminal
2. Execute:
   ```bash
   cd /Users/paulo.frederico/Documents/UNIFIQUE/DOCUMENTOS/PROJETOS/UnifiquePDP/frontend
   npm run dev -- --host 127.0.0.1 --port 5173
   ```
3. Abra o navegador em: `http://127.0.0.1:5173`
4. Navegue até **"Novo Projeto"**
5. Preencha os dados básicos e clique em **"Próximo"**
6. Selecione **"Google Maps"** e clique em **"Próximo"**
7. No campo **"Digite o endereço"**, comece a digitar um endereço
8. ✅ Deve aparecer uma lista de sugestões do Google

## Troubleshooting

### Erro: "This API project is not authorized to use this API"
- Verifique se você ativou as APIs corretas (Passo 4)
- Aguarde até 5 minutos para propagação

### Erro: "RefererNotAllowedMapError"
- Verifique as restrições de referenciador (Passo 6.2)
- Certifique-se de incluir `http://127.0.0.1:*` e `http://localhost:*`

### Autocomplete não aparece
1. Abra o Console do navegador (F12)
2. Verifique se há erros relacionados ao Google Maps
3. Confirme que a chave está correta no `.env`
4. Reinicie o servidor Vite (Ctrl+C e rode `npm run dev` novamente)

### Cobrança
- Google oferece **$200 de crédito gratuito por mês**
- Autocomplete: ~$2.83 por 1000 solicitações
- Para desenvolvimento/teste, você não deve atingir o limite
- Configure alertas de cobrança no Google Cloud Console se desejar

## Segurança

⚠️ **NUNCA compartilhe sua chave de API publicamente**
- O arquivo `.env` já está no `.gitignore`
- Não faça commit da chave no GitHub
- Se a chave vazar, revogue-a imediatamente no Google Cloud Console e crie uma nova

## Próximos Passos

Após configurar, você terá:
- ✅ Autocomplete de endereços funcionando
- ✅ Abertura automática do Google Maps ao selecionar um endereço
- ✅ Geolocalização atual também disponível

---

**Data do guia**: 14 de novembro de 2025
**Projeto**: UnifiquePDP
