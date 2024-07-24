# Expense Tracker

A simple and efficient expense tracker built with Nuxt 3 and MongoDB. This project allows users to manage their expenses and visualize their spending patterns.

## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- Add, edit, and delete expenses
- Categorize expenses
- View expense history
- Visualize spending patterns with charts

## Demo
A live demo of the application is available [here](#).

## Installation
To get started with this project, follow these steps:

1. **Clone the repository**
    ```bash
    git clone https://github.com/your-username/expense-tracker.git
    cd expense-tracker
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Set up environment variables**
    Create a `.env` file in the root directory and add the following variables:
    ```plaintext
    MONGODB_URI=your_mongodb_connection_string
    AUTH_ORIGIN="http://localhost:3000"
    AUTH_SECRET="your-super-auth-secret"
    ```

4. **Run the application**
    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:3000`.

## Usage
Once the application is running, you can start adding your expenses, categorizing them, and viewing your expense history. The intuitive UI makes it easy to manage and track your expenses efficiently.

## Contributing
We welcome contributions! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. Make your changes
4. Commit your changes
    ```bash
    git commit -m "Add your message here"
    ```
5. Push to the branch
    ```bash
    git push origin feature/your-feature-name
    ```
6. Open a pull request

Please make sure your code adheres to the project's coding standards and includes appropriate tests.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
