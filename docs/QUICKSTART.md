# Quickstart

## From template
```bash
degit YOUR_USER/vibeTemplate my-app && cd my-app && npm i
```

## Commands
```bash
npm run dev      # localhost:5173
npm run test     # vitest watch
npm run build    # production
npm run lint     # eslint + prettier
```

## Add features
```bash
# Router
npm i react-router-dom

# State management
npm i @tanstack/react-query zustand

# Forms
npm i react-hook-form zod @hookform/resolvers
```

## Path aliases
Use `@/` to import from `src/`:
```tsx
import { Button } from '@/components/Button'
```
