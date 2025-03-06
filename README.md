# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

# React Component Library

This repository contains a set of reusable React components, styled using bootstrap CSS, and managed with TypeScript. It includes various features like smooth horizontal scrolling, product display components, and custom SVG icons. This library is built with Vite for fast development and optimized builds.

## Features

- **React Components:** Components like product sliders, quick view modals, headers, and more.
- **bootstrap CSS:** Utility-first CSS framework for rapid design and custom styling.
- **TypeScript:** Type-safe components with clear prop interfaces.
- **SVG Icons:** Custom SVG icons used throughout the project.
- **Vite for Build:** Fast development setup with hot reloading and optimized production builds.
- **React Icons Integration:** For adding star ratings and other icons.
- **Responsive Design:** Components are designed to be responsive based on breakpoints (e.g., 1 product on mobile, 2 on tablet).


### Prerequisites

Before you start, make sure you have the following installed:

- **Node.js:** [Download Node.js](https://nodejs.org/en/download/) (Recommended version: 18.x or higher)
- **npm** (comes with Node.js)

## Web Accessibility Implementation

Ensuring web accessibility is a key focus in this project. We follow **WCAG (Web Content Accessibility Guidelines)** to make the website accessible for users with disabilities. Here’s how we implement accessibility:

### **1. Semantic HTML**

- Using correct HTML elements like `<button>`, `<nav>`, `<header>`, `<section>` instead of generic `<div>` elements.
- `<label>` elements for form inputs to improve screen reader support.
- `<alt>` attributes for images to provide descriptive text.

### **2. Keyboard Navigation & Focus Management**

- Ensuring all interactive elements (buttons, links, inputs) are **keyboard navigable** using `Tab`, `Enter`, and `Space`.
- Managing focus within modals (`QuickViewModal`) to prevent users from navigating outside when open.

### **3. ARIA (Accessible Rich Internet Applications) Attributes**

- Adding `aria-label`, `aria-labelledby`, and `aria-describedby` for elements that require additional context.
- Using `aria-hidden="true"` for elements that should be ignored by screen readers.
- Implementing `role="dialog"` for modals and `role="button"` for custom buttons.

### **4. Color Contrast & Readability**

- Ensuring **sufficient contrast ratio** between text and background colors (`4.5:1` for normal text, `3:1` for large text).
- Allowing users to resize text without breaking layout.

### **5. Skip Links**

- Implementing a **"Skip to Content"** link at the top for screen reader and keyboard users to bypass navigation.

### **6. Form Accessibility**

- Ensuring form inputs have **associated `<label>` elements**.
- Using `aria-live="polite"` for error messages to be read by screen readers.
- Adding `required` attributes where necessary.

### **7. Web Accessibility Implementation in Input Components**

The project ensures accessible input handling in forms. Example:

#### **Accessibility Features Used:**

✅ **Label for Screen Readers:** Hidden with `visually-hidden`, ensuring assistive technologies can read it.  
✅ **Error Handling with ARIA:** `aria-invalid` and `aria-describedby` ensure errors are properly announced.  
✅ **Keyboard Navigation & Clear Functionality:** `onClear` function allows users to clear input via keyboard interactions.  
✅ **Error Message for Screen Readers:** Errors are hidden visually but announced by screen readers.

## Web Accessibility Testing

We use multiple tools to test and ensure accessibility compliance in the project.

### **1. Browser Extensions & DevTools**

**Axe DevTools** : Chrome/Firefox extension for automated WCAG analysis.                  (https://chromewebstore.google.com/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd) 

**WAVE (Web Accessibility Evaluation Tool)** : Highlights accessibility issues directly on the page.                  (https://chromewebstore.google.com/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh)     

**Lighthouse (Chrome DevTools)**  : Measures accessibility score and suggests improvements.      

**Siteimprove Accessibility Checker** :Evaluates pages for missing alt text, color contrast issues, and more. (https://chromewebstore.google.com/detail/siteimprove-accessibility/djcglbmbegflehmbfleechkjhmedcopn?hl=en) 

### **2. Screen Readers**
 **NVDA (NonVisual Desktop Access)**  Windows  Free screen reader for testing navigation.  (https://www.nvaccess.org/download/)              

 **Screen Reader**   Windows  Advanced screen reader .    
(https://chromewebstore.google.com/detail/screen-reader/kgejglhpjiefppelpmljglcjbhoiplfn)

| **VoiceOver (Mac)**   Mac screen reader for mac .                    
(https://www.apple.com/accessibility/)                                                   

### **4. Manual Testing**

- **Keyboard Navigation**: Manually navigate using `Tab`, `Enter`, `Esc`, and arrow keys.
- **High Contrast Mode**: Test in Windows **High Contrast Mode** to ensure readability.
- **Zoom & Text Resizing**: Ensure layout doesn't break when zoomed to `200%`.

## Accessibility Checklist

 Page titles, headings, and labels are descriptive.  
 Keyboard navigation works for all interactive elements.  
 Forms have associated labels and provide meaningful feedback.  
 Color contrast meets WCAG guidelines (`4.5:1` for text, `3:1` for large text).  
 No reliance on color alone to convey information.  
 ARIA roles and attributes are used where needed.  
 Screen reader testing is performed for critical workflows.

## Contributing

We welcome contributions! If you'd like to improve this project, please fork the repository, make your changes, and submit a pull request.
