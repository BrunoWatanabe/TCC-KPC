# 🚀 Guia de Teste e Execução - KPC Frontend (MVVM)

## 📋 Sumário

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Executando a Aplicação](#executando-a-aplicação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Fluxo de Teste](#fluxo-de-teste)
- [Testando Funcionalidades](#testando-funcionalidades)
- [Troubleshooting](#troubleshooting)
- [Scripts Disponíveis](#scripts-disponíveis)

---

## 🔧 Pré-requisitos

### Software Necessário

```bash
# Node.js (versão 16 ou superior)
node --version
# Deve mostrar: v16.x.x ou superior

# npm (vem com Node.js)
npm --version
# Deve mostrar: 8.x.x ou superior

# Git (opcional, para clonar o repositório)
git --version
```

### Backend API

A aplicação frontend precisa do backend rodando. Certifique-se de que:

- ✅ Backend está rodando em `http://localhost:8000`
- ✅ APIs estão acessíveis
- ✅ Banco de dados está populado com dados de teste

---

## 📦 Instalação

### 1. Clone o Repositório (se ainda não tiver)

```bash
git clone <url-do-repositorio>
cd kpc-frontend
```

### 2. Instale as Dependências

```bash
npm install
```

Isso instalará todas as dependências listadas em `package.json`:
- React
- React Router DOM
- Material-UI (MUI)
- Zustand (gerenciamento de estado)
- Vite (build tool)
- E outras...

### 3. Verifique a Instalação

```bash
npm list --depth=0
```

Deve mostrar todas as dependências instaladas sem erros.

---

## 🚀 Executando a Aplicação

### Modo Desenvolvimento (Recomendado para Testes)

```bash
npm run dev:mvvm
```

Ou o comando completo:

```bash
vite --config vite.mvvm.config.js --port 5174
```

**O que acontece:**
- ✅ Servidor de desenvolvimento inicia em `http://localhost:5174`
- ✅ Hot Module Replacement (HMR) ativado - mudanças aparecem instantaneamente
- ✅ Console mostra logs detalhados de sincronização

**Saída esperada:**

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5174/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Modo Produção

```bash
# Build da aplicação
npm run build:mvvm

# Preview do build
npm run preview
```

---

## 📁 Estrutura do Projeto

```
kpc-frontend/
├── src-mvvm/                    # ⭐ Código principal MVVM
│   ├── AppMVVM.jsx             # Componente raiz com rotas
│   ├── mainMVVM.jsx            # Entry point
│   ├── models/                 # Camada Model
│   ├── viewmodels/             # Camada ViewModel
│   └── views/                  # Camada View
│
├── index.mvvm.html             # HTML entry point
├── vite.mvvm.config.js         # Configuração Vite MVVM
├── package.json                # Dependências
└── docs/                       # Documentação
    ├── ARQUITETURA_MVVM.md    # Documentação completa
    └── GUIA_TESTE_EXECUCAO.md # Este arquivo
```

---

## 🧪 Fluxo de Teste

### 1. Iniciar Backend

```bash
# No diretório do backend
cd backend
python -m uvicorn api.main:app --reload --port 8000
```

Verifique se está rodando:
```bash
curl http://localhost:8000/health
# Deve retornar: {"status": "ok"}
```

### 2. Iniciar Frontend

```bash
# No diretório do frontend
cd kpc-frontend
npm run dev:mvvm
```

### 3. Acessar a Aplicação

Abra o navegador em: **http://localhost:5174**

### 4. Login

**Tela de Login** (`/login`)

1. Digite um username (ex: `test_user`)
2. Digite uma senha (ex: `password123`)
3. Clique em "Login"

**Credenciais de Teste:**
- Username: `test_user`
- Password: `password123`

**Verificar:**
- ✅ Login bem-sucedido redireciona para `/topic-selection`
- ✅ Token armazenado no localStorage
- ✅ Mensagem de boas-vindas no console

### 5. Seleção de Tópico

**Tela de Seleção** (`/topic-selection`)

1. Veja lista de tópicos disponíveis
2. Clique em um tópico (ex: "Machine Learning")
3. Clique em "Continue"

**Verificar:**
- ✅ Lista de tópicos carregada do backend
- ✅ Tópico selecionado destacado
- ✅ Redirecionamento para `/keyphrase-curation`

---

## 🎯 Testando Funcionalidades

### Tela 1: Keyphrase Clustering

**URL:** `/keyphrase-curation` (painel esquerdo)

#### Teste 1: Carregar Keyphrases

**Passos:**
1. Observe o painel esquerdo "Source Keyphrases"
2. Veja lista de keyphrases não clusterizadas

**Verificar:**
- ✅ Keyphrases carregadas do backend
- ✅ Cada keyphrase mostra label e score
- ✅ Loading spinner durante carregamento
- ✅ Console mostra: `🔔 KeyphraseClustering: Listener registrado`

#### Teste 2: Mudar Ordenação

**Passos:**
1. Clique no dropdown de ordenação
2. Selecione "By Score"
3. Observe a lista reordenar

**Tipos de Ordenação Disponíveis:**
- **Alphabetical**: Ordem A-Z
- **By Score**: Por relevância (maior primeiro)
- **By Cluster Size**: Por tamanho do cluster
- **By Sentence Similarity**: Por similaridade de sentença
- **By Word Similarity**: Por similaridade de palavra

**Verificar:**
- ✅ Lista reordena instantaneamente
- ✅ Estatísticas atualizam (se disponível)
- ✅ Nenhum erro no console

#### Teste 3: Drag and Drop

**Passos:**
1. Arraste uma keyphrase da lista
2. Solte sobre um cluster no painel do meio
3. Observe a sincronização

**Verificar:**
- ✅ Keyphrase some da lista (ou vai para o fim se não filtrada)
- ✅ Console mostra: `📢 Disparando sincronização: clustering`
- ✅ Painel do meio atualiza automaticamente
- ✅ Painel direito atualiza automaticamente
- ✅ Console mostra em outras telas: `🔔 Recebeu notificação de sincronização`

#### Teste 4: Filtrar Clusterizadas

**Passos:**
1. Toggle o switch "Hide Clustered"
2. Observe apenas keyphrases não clusterizadas

**Verificar:**
- ✅ Lista filtra corretamente
- ✅ Contador de keyphrases atualiza

---

### Tela 2: Keyphrase Clusters

**URL:** `/keyphrase-curation` (painel central)

#### Teste 5: Visualizar Clusters

**Passos:**
1. Observe o painel central "Keyphrase Clusters"
2. Veja lista de clusters com suas keyphrases

**Verificar:**
- ✅ Clusters carregados corretamente
- ✅ Cada cluster mostra ID e keyphrases
- ✅ Keyphrases dentro do cluster visíveis

#### Teste 6: Mudar Ordenação de Clusters

**Passos:**
1. Clique no dropdown de ordenação
2. Selecione "By Size"
3. Observe clusters reordenarem

**Tipos de Ordenação Disponíveis:**
- **Numerical**: Por ID do cluster
- **Alphabetical**: Ordem A-Z
- **By Size**: Por número de keyphrases
- **By Cohesion**: Por coesão interna
- **By Relevance**: Por relevância

**Verificar:**
- ✅ Clusters reordenam corretamente
- ✅ Ordem visual muda na UI
- ✅ IDs corretos mantidos

#### Teste 7: Selecionar Cluster (0/1)

**Passos:**
1. Clique no botão "0" ou "1" em um cluster
2. Observe mudança de cor
3. Veja sincronização com outras telas

**Significado:**
- **0**: Cluster rejeitado (cinza)
- **1**: Cluster aceito (verde)

**Verificar:**
- ✅ Botão muda estado visual
- ✅ Chamada API bem-sucedida
- ✅ Console mostra: `📢 Disparando sincronização: clusters`
- ✅ Outras telas recebem notificação e atualizam
- ✅ Painel direito reflete seleção

#### Teste 8: Selecionar Keyphrases Representativas

**Passos:**
1. Em um cluster aceito (1), clique em "Select" na primeira keyphrase
2. Clique em "Select" em uma segunda keyphrase
3. Observe marcação visual

**Verificar:**
- ✅ Primeira keyphrase marca como "S1"
- ✅ Segunda keyphrase marca como "S2"
- ✅ Apenas 2 keyphrases podem ser selecionadas por cluster
- ✅ Sincronização funciona
- ✅ Painel direito mostra keyphrases selecionadas

#### Teste 9: Modo Adjudicador (se disponível)

**Passos:**
1. Se houver "Clues from other annotators", observe os chips
2. Veja sugestões de outros anotadores

**Verificar:**
- ✅ Chips coloridos por anotador
- ✅ Tooltip mostra username
- ✅ Ajuda na decisão de seleção

---

### Tela 3: Curated Keyphrases

**URL:** `/keyphrase-curation` (painel direito)

#### Teste 10: Visualizar Curadas

**Passos:**
1. Observe o painel direito "Curated Keyphrases"
2. Veja apenas clusters selecionados (1)

**Verificar:**
- ✅ Apenas clusters aceitos aparecem
- ✅ Keyphrases selecionadas (S1, S2) destacadas
- ✅ Campo de alias disponível

#### Teste 11: Mudar Ordenação de Aliases

**Passos:**
1. Clique no dropdown de ordenação
2. Alterne entre ordenações

**Tipos de Ordenação Disponíveis:**
- **Numerical Cluster**: Por ID do cluster
- **Alphabetical Cluster Alias**: Por alias (A-Z)

**Verificar:**
- ✅ Ordem muda conforme seleção
- ✅ IDs mantidos corretos

#### Teste 12: Editar Alias

**Passos:**
1. Em um cluster curado, digite um alias no campo de texto
2. Clique no botão "Save" (ícone de salvar)
3. Observe sincronização

**Exemplo:**
- Cluster tem keyphrases: ["machine learning", "ML", "deep learning"]
- Digite alias: "Machine Learning"
- Clique em Save

**Verificar:**
- ✅ Campo de texto aceita entrada
- ✅ Botão Save fica habilitado
- ✅ Chamada API bem-sucedida
- ✅ Console mostra: `📢 Disparando sincronização: curated`
- ✅ Alias salvo persiste ao recarregar
- ✅ Outras telas recebem notificação

#### Teste 13: Filtrar Apenas Curados

**Passos:**
1. Toggle o switch "Show Only Curated"
2. Observe apenas clusters com alias definido

**Verificar:**
- ✅ Filtro funciona corretamente
- ✅ Contador atualiza

---

## 🔄 Testando Sincronização Global

### Teste Completo de Sincronização

**Objetivo:** Verificar que mudanças em uma tela atualizam TODAS as outras.

**Setup:**
1. Abra DevTools (F12)
2. Vá para aba Console
3. Mantenha visível enquanto testa

#### Cenário 1: Mover Keyphrase

**Passos:**
1. No painel esquerdo, arraste uma keyphrase para um cluster
2. Observe os 3 painéis simultaneamente

**Console Esperado:**
```
📢 Disparando sincronização: clustering, move_to_cluster
🔔 KeyphraseClusters recebeu notificação:
  ⏭️ Ignorando sincronização da própria tela (não)
  🔄 Recarregando dados após sincronização...
🔔 CuratedKeyphrases recebeu notificação:
  🔄 Recarregando dados após sincronização...
```

**Resultado Esperado:**
- ✅ Painel esquerdo: Keyphrase some ou vai para final
- ✅ Painel central: Cluster recebe nova keyphrase
- ✅ Painel direito: Atualiza (se cluster foi aceito)

#### Cenário 2: Selecionar Cluster

**Passos:**
1. No painel central, clique "1" em um cluster
2. Observe os 3 painéis

**Console Esperado:**
```
📢 Disparando sincronização: clusters, select_cluster
🔔 KeyphraseClustering recebeu notificação:
  🔄 Recarregando dados...
🔔 CuratedKeyphrases recebeu notificação:
  🔄 Recarregando dados...
```

**Resultado Esperado:**
- ✅ Painel central: Botão muda para estado ativo
- ✅ Painel esquerdo: Atualiza dados
- ✅ Painel direito: Cluster aparece na lista

#### Cenário 3: Salvar Alias

**Passos:**
1. No painel direito, edite e salve um alias
2. Observe os 3 painéis

**Console Esperado:**
```
📢 Disparando sincronização: curated, set_alias
🔔 KeyphraseClustering recebeu notificação:
  🔄 Recarregando dados...
🔔 KeyphraseClusters recebeu notificação:
  🔄 Recarregando dados...
```

**Resultado Esperado:**
- ✅ Painel direito: Alias salvo
- ✅ Painel esquerdo: Dados atualizados
- ✅ Painel central: Dados atualizados

---

## 🐛 Troubleshooting

### Problema: Aplicação não inicia

**Erro:**
```
Error: Cannot find module 'react'
```

**Solução:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

### Problema: Backend não responde

**Erro no Console:**
```
Failed to fetch
Network error
```

**Soluções:**

1. **Verificar se backend está rodando:**
```bash
curl http://localhost:8000/health
```

2. **Verificar porta correta no código:**
```javascript
// src-mvvm/models/services/index.js
const API_BASE_URL = 'http://localhost:8000';
```

3. **Verificar CORS no backend:**
```python
# backend/api/main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

### Problema: Loop infinito / "Maximum update depth exceeded"

**Erro no Console:**
```
Error: Maximum update depth exceeded
```

**Causa:** Bug no sistema de sincronização.

**Verificação:**
```javascript
// ❌ ERRADO: Isso causa loop
const syncStore = useSyncStore();
useEffect(() => {
  syncStore.registerListener(...);
}, [syncStore]); // syncStore sempre muda!

// ✅ CORRETO: Usar seletores
const registerListener = useSyncStore(state => state.registerListener);
useEffect(() => {
  registerListener(...);
}, [registerListener]); // Função estável
```

**Solução:** Já corrigida na versão atual. Se ocorrer, verifique arquivos em `src-mvvm/viewmodels/hooks/`.

---

### Problema: Dados não sincronizam

**Sintoma:** Mudo algo em um painel mas outros não atualizam.

**Debug:**

1. **Verificar console logs:**
```
# Deve aparecer:
📢 Disparando sincronização: ...
🔔 [Tela] recebeu notificação: ...
🔄 Recarregando dados após sincronização...
```

2. **Verificar listeners registrados:**
```javascript
// No console do navegador
window.__ZUSTAND_DEVTOOLS__ // Se devtools instalado
```

3. **Verificar chamadas API:**
   - Abra DevTools → Network
   - Filtrar por "Fetch/XHR"
   - Deve ver chamadas GET após cada operação

**Solução comum:**
- Recarregue a página (Ctrl+R)
- Limpe cache (Ctrl+Shift+R)
- Verifique se `username` e `topicName` estão definidos

---

### Problema: Ordenação não funciona

**Sintoma:** Seleciono ordenação mas nada muda.

**Verificar:**

1. **Dados do backend incluem todas ordenações:**
```javascript
// Deve retornar objeto com chaves:
{
  "alphabetical": [...],
  "score": [...],
  "cluster_size": [...],
  // etc
}
```

2. **Console mostra erros:**
```
⚠️ Tipo de ordenação inválido: ...
```

**Solução:**
- Verificar implementação no backend
- Verificar enum `KeyphraseSorting` ou `ClusterSorting`

---

### Problema: Drag and Drop não funciona

**Verificar:**

1. **Navegador suporta Drag and Drop API:**
   - Chrome, Firefox, Edge: ✅
   - Safari: ✅
   - Mobile: ❌ (não suportado)

2. **Console mostra erros:**
```javascript
// Deve aparecer ao arrastar:
onDragStart: keyphrase_id
onDrop: cluster_num
```

**Solução:**
- Use navegador desktop
- Verifique handlers `onDragStart`, `onDragOver`, `onDrop`

---

### Problema: Autenticação falha

**Erro:**
```
401 Unauthorized
```

**Soluções:**

1. **Verificar credenciais:**
```bash
# Testar diretamente na API
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test_user","password":"password123"}'
```

2. **Verificar token:**
```javascript
// No console do navegador
localStorage.getItem('token')
// Deve mostrar um token JWT
```

3. **Token expirado:**
```javascript
// Fazer logout e login novamente
localStorage.clear()
// Recarregar página
```

---

## 📊 Scripts Disponíveis

```bash
# Desenvolvimento MVVM
npm run dev:mvvm
# Inicia servidor em http://localhost:5174

# Build MVVM
npm run build:mvvm
# Gera build otimizado em dist-mvvm/

# Preview do Build
npm run preview
# Serve o build localmente

# Desenvolvimento Original (src/)
npm run dev
# Inicia versão antiga

# Limpar Cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Verificar Dependências Desatualizadas
npm outdated

# Atualizar Dependências
npm update
```

---

## 🔍 Verificação de Estado

### Zustand DevTools (Opcional)

**Instalar:**
```bash
npm install @redux-devtools/extension
```

**Configurar Store:**
```javascript
import { devtools } from 'zustand/middleware';

const useMyStore = create(
  devtools(
    (set) => ({ /* state */ }),
    { name: 'MyStore' }
  )
);
```

**Usar:**
- Instalar Redux DevTools Extension no navegador
- Abrir DevTools → Redux tab
- Ver estado de todos os stores em tempo real

---

## 📝 Checklist de Teste Completo

### Preparação
- [ ] Backend rodando em `http://localhost:8000`
- [ ] Frontend rodando em `http://localhost:5174`
- [ ] DevTools aberto (F12)
- [ ] Console visível

### Login & Navegação
- [ ] Login bem-sucedido
- [ ] Redirecionamento para topic selection
- [ ] Seleção de tópico funciona
- [ ] Redirecionamento para curation

### Keyphrase Clustering (Painel Esquerdo)
- [ ] Keyphrases carregam
- [ ] 5 tipos de ordenação funcionam
- [ ] Drag and drop funciona
- [ ] Filtro "Hide Clustered" funciona
- [ ] Sincronização dispara

### Keyphrase Clusters (Painel Central)
- [ ] Clusters carregam
- [ ] 5 tipos de ordenação funcionam
- [ ] Seleção 0/1 funciona
- [ ] Seleção S1/S2 funciona
- [ ] Modo adjudicador exibe (se disponível)
- [ ] Sincronização dispara

### Curated Keyphrases (Painel Direito)
- [ ] Apenas clusters selecionados aparecem
- [ ] 2 tipos de ordenação funcionam
- [ ] Edição de alias funciona
- [ ] Save persiste dados
- [ ] Filtro "Show Only Curated" funciona
- [ ] Sincronização dispara

### Sincronização Global
- [ ] Mover keyphrase atualiza outras telas
- [ ] Selecionar cluster atualiza outras telas
- [ ] Salvar alias atualiza outras telas
- [ ] Console mostra logs corretos
- [ ] Sem loops infinitos
- [ ] Sem erros no console

### Performance
- [ ] Carregamento rápido (< 2s)
- [ ] Operações instantâneas
- [ ] Sem travamentos
- [ ] Memória estável (não aumenta continuamente)

---

## 🎓 Dicas para Apresentação/Demo

### Preparar Demo

1. **Criar usuário de teste:**
```bash
# No backend
python scripts/create_test_user.py
```

2. **Popular dados de teste:**
```bash
# No backend
python scripts/populate_test_data.py
```

3. **Abrir múltiplas abas:**
   - Aba 1: Aplicação
   - Aba 2: Console logs
   - Aba 3: Network tab (para mostrar APIs)

### Roteiro de Demo (5 minutos)

**Minuto 1:** Login e seleção de tópico
- Mostrar autenticação
- Selecionar tópico interessante

**Minuto 2:** Keyphrase Clustering
- Mostrar lista de keyphrases
- Mudar ordenação (alphabetical → score)
- Arrastar 2-3 keyphrases para clusters

**Minuto 3:** Cluster Selection
- Mostrar clusters formados
- Selecionar cluster (1)
- Selecionar 2 keyphrases representativas
- **Destacar sincronização automática**

**Minuto 4:** Alias Curation
- Mostrar painel de curadas
- Editar e salvar alias
- **Destacar sincronização novamente**

**Minuto 5:** Demonstrar Sincronização
- Abrir console
- Fazer operação em painel 1
- Mostrar logs de sincronização
- Mostrar atualização em painéis 2 e 3

### Pontos-Chave para Destacar

1. **Arquitetura MVVM:**
   - "Separação clara entre UI e lógica"
   - "Fácil de testar e manter"

2. **Sincronização Global:**
   - "Mudanças se propagam automaticamente"
   - "Não precisa recarregar nada"
   - "Sistema pub/sub com Zustand"

3. **Múltiplas Ordenações:**
   - "5 tipos de ordenação para keyphrases"
   - "5 tipos para clusters"
   - "Baseado em diferentes critérios"

4. **UX Moderna:**
   - "Drag and drop intuitivo"
   - "Material-UI responsivo"
   - "Feedback visual imediato"

---

## 📞 Suporte

### Problemas Comuns

Se encontrar problemas não listados aqui:

1. **Verificar console do navegador** (F12)
2. **Verificar logs do backend**
3. **Limpar cache e recarregar**
4. **Verificar versões de dependências**

### Recursos

- **Documentação Completa:** `docs/ARQUITETURA_MVVM.md`
- **Código Fonte:** `src-mvvm/`
- **Issues do Projeto:** [Link para GitHub Issues]

---

## ✅ Conclusão

Seguindo este guia, você deve ser capaz de:

- ✅ Instalar e executar a aplicação
- ✅ Testar todas as funcionalidades principais
- ✅ Entender o fluxo de sincronização
- ✅ Debugar problemas comuns
- ✅ Preparar uma demonstração

**Boa sorte com os testes!** 🚀

---

**Última atualização:** 03/11/2025  
**Versão:** 1.0.0  
**Autor:** Sistema de Curação de Keyphrases - Guia de Testes
