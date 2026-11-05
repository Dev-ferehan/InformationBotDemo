# Public Service Guide

A React and Vite frontend for browsing Ethiopian public-service guidance exclusively in Amharic.

## Project structure

```text
src/
├── App.jsx
├── App.module.css
├── assets/
├── components/
│   └── assistant/
│       ├── ChatInput.jsx
│       ├── ChatInput.module.css
│       ├── PublicServiceWidget.jsx
│       ├── PublicServiceWidget.module.css
│       ├── QuickFaqCards.jsx
│       ├── QuickFaqCards.module.css
│       ├── WidgetHeader.jsx
│       └── WidgetHeader.module.css
├── data/
│   └── publicServiceContent.js
├── pages/
│   ├── ArticlesPage.jsx
│   ├── ArticlesPage.module.css
│   ├── ChatPage.jsx
│   ├── ChatPage.module.css
│   ├── HomePage.jsx
│   ├── HomePage.module.css
│   ├── PublicServicePage.jsx
│   └── PublicServicePage.module.css
├── services/
│   └── mockApi.js
├── index.css
└── main.jsx
```

`App.jsx` applies the app root styles and renders `PublicServicePage.jsx`, which owns shared chat, tab, and widget state. Individual pages render their own views. Amharic copy and service-card data live in `data/`, and mock backend functions are kept in `services/`.

## Styling convention

Bootstrap 5 CSS is imported in `src/main.jsx`. Use Bootstrap grid, flex, button, card, and form classes for layout and common controls. Component-specific visual refinements belong in the adjacent CSS Module. The `scope` class in each module scopes the existing design selectors to its component wrapper. Keep global rules in `index.css` limited to fonts, theme tokens, resets, and accessibility defaults.

```jsx
import styles from './App.module.css'

function AppFrame({ children }) {
  return <div className={`container-fluid p-0 ${styles.appRoot}`}>{children}</div>
}

export default AppFrame
```

```css
.appRoot {
  min-height: 100vh;
}
```

## Development

```sh
npm install
npm run dev
npm run lint
npm run build
```
