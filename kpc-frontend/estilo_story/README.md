# Frontend - Keyphrase Curation

Este diretório contém o frontend React para o projeto Keyphrase Curation.

## Estrutura

```
frontend/
├── src/
│   ├── components/
│   │   ├── KeyphraseClustering.jsx          # Componente React principal
│   │   ├── KeyphraseClusteringContainer.jsx # Container com gestão de estado
│   │   └── index.js                         # Exports dos componentes
│   ├── index.js                             # Entry point para build
│   └── main.jsx                             # Entry point para desenvolvimento
├── package.json                             # Dependências e scripts
├── vite.config.js                           # Configuração do Vite
└── index.html                               # Template HTML para desenvolvimento
```

## Componentes

### KeyphraseClustering

Componente React puro que renderiza a interface de clustering de keyphrases, equivalente ao componente ReactPy original.

**Props:**
- `clusters`: Objeto com os clusters disponíveis
- `keyphraseClustering`: Array com as keyphrases e seus clusters
- `hideClusteredState`: Boolean para ocultar keyphrases clustered
- `keyphraseOrder`: String com a ordem de classificação
- `onKeyphrasesOrderByChange`: Callback para mudança de ordem
- `onHideClusteredChange`: Callback para mudança do hide clustered
- `onKeyphraseClusteringChange`: Callback para mudança de cluster

### KeyphraseClusteringContainer

Container que gerencia o estado local dos componentes usando React hooks.

**Props:**
- `initialClusters`: Clusters iniciais
- `initialKeyphraseClustering`: Keyphrases iniciais
- `initialHideClustered`: Estado inicial do hide clustered
- `initialKeyphraseOrder`: Ordem inicial
- `onStateChange`: Callback para mudanças de estado (comunicação com backend)

## Scripts

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## Integração com Backend

O componente `KeyphraseClusteringContainer` aceita um callback `onStateChange` que é chamado sempre que o estado muda. Este callback recebe um objeto com:

```javascript
{
  type: 'keyphraseOrderChange' | 'hideClusteredChange' | 'keyphraseClusteringChange',
  value: any, // O novo valor
  state: {    // Estado completo atual
    clusters,
    keyphraseClustering,
    hideClustered,
    keyphraseOrder
  }
}
```

## Build

O build gera um bundle UMD que pode ser integrado em qualquer aplicação, incluindo o backend Python atual.