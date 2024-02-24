## Frontend Setup for Vite Application

### 1. Clone the Repository
```bash
git clone <repository-url>
```

### 2. Navigate to Project Directory
```bash
cd Frontend/task-management
```

### 3. Install Dependencies
```bash
npm install
```


### 4. Start the Development Server
```bash
npm run dev
```

### 5. Build for Production
To build your application for production, use the following command:
```bash
npm run build
```
This will create an optimized build of your application in the `dist` directory.

### 6. Serve the Production Build
You can serve the production build locally using a simple HTTP server. For example, you can use `serve`:
```bash
npm install -g serve
serve -s dist
```
This will serve your application at `http://localhost:5173` by default.

### 8. Additional Configuration
You can customize the build configuration and project settings by modifying the `vite.config.js` file in the root directory of your project. This file contains various options and settings for your Vite application.

### 9. Start Development
You can start developing your frontend application by modifying the files in the `src` directory. Vite supports hot module replacement (HMR), so you'll see your changes reflected instantly in the browser as you develop.
