# React Website Scaffolding Project

This project is a scaffolding template for building React websites. It includes the following technologies:

- **Material UI**: For building responsive and customizable UI components.
- **React Router**: For handling navigation within the application.
- **Styled Components**: For styling React components with tagged template literals.
- **axios**: For making HTTP requests to APIs.
- **Declarative Templating Components**: This project includes custom components like <Render /> for conditional rendering and <ForEach /> for lists of data, enhancing the readability and maintainability of the code.
- **Context API Management**: Improved management of global state using React's Context API, ensuring a more scalable and organized state management approach.

## Disclaimer

This project uses **Vite** in development mode but is configured to build with **Parcel** for production. This is because Material UI depends on `@emotion` and this lib is breaking vite builds due to discrepancies when mixing ESM modules with CommonJS. Parcel builds seems to be working just fine.

## Getting Started

To get started with this project, follow these steps:

#### 1. Clone the repository:

```bash
git clone <repository-url>
cd react-website-scaffolding
```

#### 2. Install the dependencies:

```bash
npm install
```

#### 3. Start the Dev Server

```bash
npm run dev
```

#### 4. Make whatever changes you like to the project

#### 5. Once satisfied, build the website

```bash
npm run build
```
