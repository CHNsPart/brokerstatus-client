# BrokerStatus Client

## Overview

This is the front-end client for BrokerStatus. It is built using React and Vite, and it includes internationalization (i18n) support using i18next.

## Prerequisites

Before running the application, ensure that you have the following prerequisites installed on your machine:

 **Node.js and npm:** * Make sure you have Node.js installed. You can download it from [Node.js official website](https://nodejs.org/).

* npm (Node Package Manager) is included with Node.js. Confirm that npm is available by running the following commands in your terminal:

  ```bash
  node -v
  npm -v
  ```
* If not installed, follow the instructions on the official website to install Node.js and npm.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/CHNsPart/brokerstatus-client.git
   cd brokerstatus-client
   ```
2. **Install Dependencies:**

   ```bash
   npm install
   ```
3. **Run the Development Server:**

   ```bash
   npm run dev
   ```

   This will start the development server. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- **Development Server:**

  ```bash
  npm run dev
  ```
- **Build:**

  ```bash
  npm run build
  ```
- **Linting:**

  ```bash
  npm run lint
  ```
- **Preview Production Build:**

  ```bash
  npm run preview
  ```

## Project Structure

The project follows a structured organization to enhance maintainability and readability. Here's a breakdown of the primary directories:

### 1. `components` Directory

The `components` directory contains reusable React components that are used across different pages. Each component is designed to perform a specific function and can be easily imported into various parts of the application. This promotes code reusability and a modular approach to building the user interface.

#### Example:

```
/src
  /components
    /DealView
     - Conditions.jsx
     - Contacts.jsx
     - ...
    /Modals
     - DocumentUploadModal.jsx
     - MessageModal.jsx
    - Navbar.jsx
    - LabeledInput.jsx
    - Button.jsx
    - ...
```

### 2. `pages` Directory

The `pages` directory holds React components that represent different pages of the application. Each page component typically combines multiple smaller components to create a complete user interface for a specific view or feature.

#### Example:

```
/src
  /pages
    - Signin.jsx
    - ResetPassword.jsx
    - Home.jsx
    - DocumentLib.jsx
    - DealsOverview.jsx
    - DealView.jsx
    - ...
```

This separation of `components` and `pages` helps maintain a clean and organized project structure. Components can be easily managed and reused, while pages encapsulate the logic and layout for specific views.

## Routes

| Path               | Component         | Description                        |
| ------------------ | ----------------- | ---------------------------------- |
| `/`              | `Signin`        | Public route - Signin page         |
| `/resetPassword` | `ResetPassword` | Public route - Reset Password page |
| `/home`          | `Home`          | Protected route - Home page        |
| `/deals`         | `DealsOverview` | Protected route - Deals Overview   |
| `/docs`          | `DocumentLib`   | Protected route - Document Library |
| `/dview`         | `DealView`      | Protected route - Deal View        |

## Locales Directory

The `locales` directory contains translation files for different languages. Below are the details of the files:

| File Name   | Language | Description                              |
| ----------- | -------- | ---------------------------------------- |
| `en.json` | English  | Central translation for English language |
| `fr.json` | French   | Central translation for French language  |

These files store key-value pairs where keys represent translation keys and values represent the corresponding translations in the specified language. Make sure to keep these files organized and update them accordingly for seamless language support in your application.

## Lib Directory

The `lib` directory contains utility files and configuration related to the application. Below are the details of the files:

### Theme Configuration (`theme.js`)

The `theme.js` file within the `lib` directory contains theme configurations for different subdomains. These themes define the visual appearance of the application based on the subdomain. Below are the details of the themes:

**Default Theme:**

* Background Color: `#fff`
* Text Color: `black`
* Navigation Background Color: `#1e1e1e`
* Navigation Text Color: `white`
* Primary Button Background Color: `#000`
* Secondary Button Background Color: `#000`
* Primary Button Text Color: `#ffffff`
* Latest News Color: `#1e1e1e`
* Logo: [defaultLogo]

### Utility Function

#### `getSubdomain()`

The `getSubdomain()` function is a utility function that extracts the subdomain from the current URL. It splits the hostname and returns the subdomain if available.

## Subdomain Configuration

The application uses subdomains to apply different themes. Make sure your machine's hosts file is configured to recognize subdomains. For testing purposes, you can update the hosts file with entries like:

```bash
default.localhost #for default theme
sam.localhost #for sam theme
john.localhost #for john theme
```

Replace `localhost` with your local domain if needed.

## Dependencies

- [React](https://reactjs.org/) - JavaScript library for building user interfaces.
- [React Router](https://reactrouter.com/) - Declarative routing for React.js.
- [i18next](https://www.i18next.com/) - Internationalization (i18n) framework for JavaScript.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.
- [Vite](https://vitejs.dev/) - Fast development server, optimized for front-end development.

## Development Tools

- [ESLint](https://eslint.org/) - Linting tool for identifying and fixing problems in JavaScript code.
- [PostCSS](https://postcss.org/) - A tool for transforming styles with JavaScript plugins.
- [Autoprefixer](https://autoprefixer.github.io/) - A plugin to parse CSS and add vendor prefixes.

## License

This project is licensed under the [MIT License](LICENSE).
