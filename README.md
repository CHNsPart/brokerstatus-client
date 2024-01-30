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

```
/lib
  - theme.js
  - utils.js
```

### For dummy json data (`utils.js`)

The `utils.js` file contains `getSubdomain` function and dummy json data for the components.

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

## Custom Hooks

### 1. `useAxios`

The `useAxios` hook is a custom React hook designed for handling asynchronous HTTP requests using Axios. It provides state variables for data, error, and loading status.

#### Usage:

```jsx
import useAxios from '../path/to/useAxios';

const MyComponent = () => {
  const { data, error, loading, refetch } = useAxios('https://api.example.com/data');

  // Your component logic here

  return (
    // Your JSX here
  );
};

export default MyComponent;
```

### 2. `useTabs`

The `useTabs` hook manages tab functionality in a React component. It keeps track of the active tab and provides a function to handle tab clicks.

```jsx
import useTabs from '../path/to/useTabs';

const MyComponent = () => {
  const { activeTab, handleTabs } = useTabs();

  // Your component logic here

  return (
    // Your JSX here
  );
};

export default MyComponent;
```

### 3. `useTheme`

The `useTheme` hook applies theme styles to the application based on the subdomain. It updates the body background color, text color, navigation styles, and more.

```jsx
import useTheme from '../path/to/useTheme';

const MyComponent = () => {
  useTheme();
  /* useTheme(true) is used in the Button component 
   for the buttons only */

  // Your component logic here

  return (
    // Your JSX here
  );
};

export default MyComponent;
```

## API Directory

### `api.js`

The `api.js` file in the `api` directory contains functions for making HTTP requests using the Axios library. It sets up a base URL and includes functionalities to handle JWT tokens.

```
/api
  - api.js
```

This file serves as a central location for managing API requests and authentication tokens. The `axiosInstance` can be used throughout the application to make consistent requests to the specified backend API URL. The `setAuthToken` function helps in handling and updating the JWT token for authentication.

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
