# TaskFlow — Task Management Dashboard

A modern task management dashboard built with **React + TypeScript + Vite**, using **Zustand** for state, **Tailwind CSS v4** for styling, and **dnd-kit** for drag-and-drop ordering.

## Features

- Create, edit, delete tasks
- Mark tasks as pending/completed
- Drag & drop re-ordering (list + card view)
- Search + filter by status and priority (search is debounced)
- Light/dark mode

## Tech stack

- **React 19**, **TypeScript**
- **Vite**
- **Zustand** (persisted store)
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **dnd-kit**
- **Vitest** (unit tests)

## Getting started

Install dependencies:

```bash
npm install
```

Run the app:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Tests

Run unit tests:

```bash
npm run test
```

Run once (CI-style):

```bash
npm run test:run
```

## Project structure (high level)

- `src/components/`: UI components (with reusable sub-components in `common/`, `filter/`, `task/`)
- `src/store/`: Zustand store (wires UI to services)
- `src/services/`: business-logic helpers (pure functions + seed data)
- `src/types/`: shared types/interfaces (domain + store)
- `src/utils/`: small pure utilities (formatting, date helpers, etc.)
- `src/tests/`: Vitest unit tests

