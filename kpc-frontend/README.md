<div align="center">

# 🔑 Keyphrase Curation Frontend (MVVM)

Interface web para curação e adjudicação de *keyphrases* com arquitetura MVVM, suporte a clustering, aliasing e sincronização reativa entre painéis.

</div>

---

## 📚 Sumário

1. [Visão Geral](#-visão-geral)
2. [Arquitetura](#-arquitetura)
3. [Estrutura de Pastas](#-estrutura-de-pastas)
4. [Pré-requisitos](#-pré-requisitos)
5. [Instalação](#-instalação)
6. [Configuração](#-configuração)
7. [Scripts NPM](#-scripts-npm)
8. [Execução em Desenvolvimento](#-execução-em-desenvolvimento)
9. [Build & Distribuição](#-build--distribuição)
10. [Storybook & Design System](#-storybook--design-system)
11. [Testes](#-testes)
12. [Fluxo de Desenvolvimento Sugerido](#-fluxo-de-desenvolvimento-sugerido)
13. [Troubleshooting](#-troubleshooting)
14. [Roadmap / Próximos Passos](#-roadmap--próximos-passos)
15. [Referências & Documentação](#-referências--documentação)

---

## 🧭 Visão Geral

Este frontend implementa uma interface reativa para o processo de curação de *keyphrases* provenientes de um backend (documentado separadamente). Há suporte para:

| Funcionalidade | Descrição |
|----------------|-----------|
| Clustering de Keyphrases | Agrupamento e organização semântica |
| Seleção e Representatividade | Marcação S1/S2 de termos representativos |
| Alias Curados | Definição de nomes consolidados para clusters |
| Adjudicação | Modo para conciliar curadores/anotadores distintos |
| Sincronização Reativa | Atualização cruzada entre painéis via store global (Zustand) |
| Ordenações Avançadas | Múltiplos critérios (similaridade, score, coesão, etc.) |

O projeto segue progressivamente a migração para MVVM dentro de `src-mvvm/`, mantendo a versão anterior (se existir) isolada em `src/` ou pastas auxiliares.

---

## 🏗 Arquitetura

A abordagem MVVM separa responsabilidades em três camadas principais:

| Camada | Pasta | Responsabilidade |
|--------|-------|------------------|
| Model | `src-mvvm/models` | Acesso a dados, entidades, contratos, adapters de API |
| ViewModel | `src-mvvm/viewmodels` | Orquestra estado, regras de negócio, transformação para UI |
| View | `src-mvvm/views` | Componentes React/MUI e layouts apresentacionais |

Outros diretórios relevantes:

- `src-mvvm/shared/` – utilidades, configuração (`config.js`), constantes.
- `src-mvvm/styles/` – estilos globais, módulos CSS.
- `estilo_story/` – estrutura Storybook e histórias de componentes.
- `docs/` – documentação complementar (arquitetura, plano de ação, unificação de API).

### Fluxo Simplificado

1. View dispara ação → ViewModel atualiza estado ou invoca Model.
2. Model consome backend (via Axios) usando endpoints definidos em `shared/config.js`.
3. ViewModel publica mudanças nas stores (Zustand) → Views reagem.
4. Eventos de sincronização propagam ações para outros painéis.

---

## 📂 Estrutura de Pastas

```
kpc-frontend/
├── src-mvvm/
│   ├── AppMVVM.jsx
│   ├── mainMVVM.jsx
│   ├── models/
│   ├── viewmodels/
│   ├── views/
│   ├── shared/
│   │   └── config.js
│   ├── styles/
│   └── index.html
├── estilo_story/           # Storybook (componentes + histórias)
├── docs/                   # Documentação do projeto
├── vite.mvvm.config.js     # Config MVVM (root = src-mvvm)
├── vite.config.js          # Config para build library UMD
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🛠 Pré-requisitos

| Ferramenta | Versão recomendada | Verificação |
|------------|--------------------|-------------|
| Node.js | ≥ 18.x (funciona em 16+, mas preferir LTS recente) | `node --version` |
| npm | ≥ 8.x | `npm --version` |
| Git | opcional | `git --version` |
| Python (backend) | conforme doc backend | ver tutorial backend |

> O backend deve estar acessível antes de testes completos (veja documentação própria). Porta padrão pode variar: `8000`, `3132`, etc. Ajuste conforme ambiente.

---

## 📦 Instalação

```bash
git clone <URL-DO-REPOSITORIO>
cd kpc-frontend
npm install
```

Verifique rapidamente:
```bash
npm list --depth=0
```

Se houver erros de dependência, limpe e reinstale:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## ⚙ Configuração

Não há `.env` por padrão. Os parâmetros centrais vivem em `src-mvvm/shared/config.js`.

Principais chaves:

| Chave | Finalidade | Default |
|-------|------------|---------|
| `api_base_url` | Base das requisições HTTP | `http://localhost:3132` |
| `curated_keyphrases_length` | Meta de curação | `20` |
| `similarity_threshold` | Limite para clustering | `0.5` |
| `session_timeout` | Tempo sessão (ms) | `3600000` |
| `adjudicator.enabled` | Modo adjudicação | `true` |

### Alterando URL da API

```javascript
// src-mvvm/shared/config.js
export const config = {
  api_base_url: 'http://localhost:8000', // ajuste aqui
  // ... restante
};
```

> Caso futuramente adote variáveis de ambiente: usar `import.meta.env.VITE_API_BASE_URL` e definir em `vite.mvvm.config.js` ou `.env`.

### Aliases de Importação

Definidos em `vite.mvvm.config.js`:
```js
resolve: { alias: { '@components': './views/components', '@viewmodels': './viewmodels', '@models': './models' } }
```
Com TypeScript, ajuste `paths` no `tsconfig.json` conforme evolução (atualmente aponta para `src-mvvm/*`).

---

## 📜 Scripts NPM

| Script | Função | Config Base |
|--------|--------|-------------|
| `dev` / `dev:mvvm` | Dev server MVVM (`http://localhost:5174`) | `vite.mvvm.config.js` |
| `build` / `build:mvvm` | Build MVVM (SPA) → `dist-mvvm/` | `vite.mvvm.config.js` |
| `preview` / `preview:mvvm` | Servir build gerado | `vite.mvvm.config.js` |
| `serve` | Preview na porta `3000` | útil para testes rápidos |
| `storybook` | Inicia Storybook (`:6006`) | `estilo_story` estrutura |
| `build-storybook` | Gera Storybook estático | `storybook-static/` |

> Há também `vite.config.js` para build em formato biblioteca UMD (outDir `dist/`). Use quando precisar publicar componentes isolados.

---

## 🧪 Execução em Desenvolvimento

### MVVM (recomendado)
```bash
npm run dev:mvvm
# Acessar: http://localhost:5174
```

Hot Module Replacement ativo; alterações em Views e ViewModels aplicadas imediatamente.

### Biblioteca de Componentes (modo UMD)
```bash
npm run build
ls dist/
```
Gera bundle UMD (`keyphrase-curation-components.umd.js`) externo a `react` / `react-dom`.

### Storybook
```bash
npm run storybook
# http://localhost:6006
```

---

## 📦 Build & Distribuição

### SPA (MVVM)
```bash
npm run build:mvvm
npm run preview
# Preview padrão em http://localhost:4174
```

Resultado: diretório `dist-mvvm/` otimizado (tree-shaking, minificação).

### Biblioteca UMD
Uso quando os componentes forem consumidos por outra aplicação:
```bash
npm run build
```
Marcar `react` e `react-dom` como `peerDependencies` em caso de publicação futura.

### Deploy Simples (exemplo nginx)
```
dist-mvvm/
└── index.html
```
Configurar rewrite para SPA (qualquer rota → `index.html`).

---

## 🧾 Storybook & Design System

Localização de histórias: diretório `estilo_story/src/stories/` (e componentes em `estilo_story/src/components/`).

### Adicionando uma Nova História
```bash
touch estilo_story/src/stories/MeuComponente.stories.jsx
```
Exemplo mínimo:
```jsx
export default { title: 'Meu Componente/Default', component: MeuComponente };
export const Default = () => <MeuComponente />;
```

### Testes de Story + Vitest
Plugin `@storybook/addon-vitest` já configurado em `vite.config.js` (se optar por rodar testes baseados em stories futuramente).

---

## 🧪 Testes

Embora o projeto tenha dependências de teste (Vitest, Playwright, addon de Storybook), ainda não há script `test` explícito. Você pode adicionar:

```jsonc
// package.json
"scripts": { "test": "vitest --run", "test:ui": "vitest" }
```

### Teste Unitário (exemplo sugerido)
```bash
npm run test
```
Exemplo de teste:
```tsx
import { describe, it, expect } from 'vitest';
import { getDerivedConfig } from '@/shared/config';

describe('Config derivada', () => {
  it('calcula porcentagem corretamente', () => {
    const { getCurationPercentage } = getDerivedConfig();
    expect(getCurationPercentage(10, 20)).toBe(50);
  });
});
```

### Testes de Componente / Storybook
Futuro: usar `@storybook/test-runner` ou o plugin de Vitest já incluído.

### Testes End-to-End (Playwright)
Configurar um diretório `tests/e2e/` e script:
```bash
npx playwright test
```

---

## 🔄 Fluxo de Desenvolvimento Sugerido

1. Criar/ajustar entidade em `models/entities`.
2. Implementar serviço/API em `models/services` usando `axios`.
3. Construir lógica de agregação em `viewmodels/` (stores zustand + hooks).
4. Consumir estado em componentes React dentro de `views/`.
5. Adicionar história no Storybook para validação visual.
6. Criar testes unitários (Vitest) para funções puras (ViewModels / utils).
7. Rodar `npm run build:mvvm` para validar ausência de erros de bundling.

---

## 🩺 Troubleshooting

| Sintoma | Causa Provável | Solução |
|---------|----------------|---------|
| Build falha | Versão Node antiga | Atualizar para LTS ≥ 18 |
| 404 em rotas | Falta rewrite SPA | Configurar servidor para redirecionar para `index.html` |
| Falha de CORS | Backend sem origens liberadas | Ajustar middleware CORS no backend |
| Sem sincronização | Listener não registrado ou store resetada | Ver logs de console e hooks em `viewmodels/` |
| Loop de render | Dependências instáveis em `useEffect` | Usar seletores de zustand (`useStore(state => ...)`) |
| API inacessível | Porta incorreta | Corrigir `api_base_url` em `config.js` |

### Resolução Rápida
```bash
rm -rf node_modules package-lock.json
npm install
```
```bash
curl -I http://localhost:8000/health   # validar backend
```

---

## 🗺 Roadmap / Próximos Passos

- Adicionar script oficial de testes (`test`, `test:watch`).
- Introduzir ESLint + Prettier + husky (pre-commit). 
- Extrair componentes compartilhados em pacote interno (monorepo?).
- Suporte `.env` para múltiplos ambientes (dev/staging/prod). 
- Métricas de performance (Web Vitals) + monitoramento.
- Acessibilidade (revisar ARIA, foco, contraste).

---

## 📖 Referências & Documentação

| Arquivo | Descrição |
|---------|-----------|
| `docs/ARQUITETURA_MVVM.md` | Detalhes profundos da arquitetura MVVM |
| `docs/PLANO_ACAO_MVVM.md` | Plano de migração/adoção progressiva |
| `docs/PLANO_ACAO_MVVM_PROGRESS.md` | Status e checkpoints da migração |
| `docs/UNIFIED_API_INTEGRATION.md` | Integração e unificação de endpoints |
| `estilo_story/` | Base do Storybook (componentes + histórias) |
| `src-mvvm/shared/config.js` | Configuração central do frontend |

> Tutorial do backend: consulte repositório / pasta específica (não duplicado aqui).

---

## 📄 Licença

Ainda não definida neste repositório. Recomenda-se adicionar um arquivo `LICENSE` (ex: MIT) para publicação ou colaboração aberta.

---

## ✨ Créditos

Equipe de desenvolvimento e pesquisa de curação de keyphrases. Contribuições são bem-vindas via Pull Requests e Issues.

---

**Última atualização:** 06/11/2025  
**Versão do frontend:** 1.0.0  
**Contato:** (adicione e-mail ou canal de suporte)

</div>
