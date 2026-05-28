# Saucedemo-E2E-Automation-Testing
This repository contains End-to-End (E2E) automation test scripts for the **Saucedemo** web application. The framework is built from scratch using **Playwright with TypeScript**, implementing the **Page Object Model (POM)** architectural design pattern for high maintainability, robust waiting strategies, and dynamic data assertions.

---

## Features
- **Page Object Model (POM):** Separates element locators and page behaviors from the actual test logic.
- **Dynamic Assertions:** Automates tax and total item pricing calculation.
- **Dynamic Sorting Validation:** Programmatically verifies the integrity of the "Price (High to Low)" filter using array matching.
- **Visual Artifacts:** Automatically captures screenshots at the end of each `test.step`.

---

## 1. Prerequisites
Before setting up the project, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes bundled with Node.js)

---

## 2. Installation & Dependencies

First, clone this repository to your local machine, navigate to the project root directory, and install all the required Node modules:

```bash
# Clone the repository
git clone <repository-url>

# Install required dependencies
npm install
```

# Install Playwright Browsers
Playwright requires its own specific browser binaries to run tests. Install them by running:

```bash
npx playwright install
```
---

## 3. Configuration Setup

Key options configured in this framework include:

- **Artifacts Output:** Screenshots taken at the end of each test step are automatically routed into the `test-results/` directory and attached directly to the HTML report.
- **Report Results:** Playwright generates comprehensive reports containing logs, execution steps and embedded screenshots files.

---

## 4. Running the Tests

You can execute the automation test suite using the following command-line scripts:

# Run All Tests (Headless Mode)
Runs the test suite in the background across all configured browsers (Chromium by default).
```bash
npx playwright test
```

# Run Tests in Headed Mode (UI Mode)
Runs the test with the browser window visible so you can watch the execution flow in real-time.
```bash
npx playwright test --headed
```

# Run a Specific Test File
```bash
npx playwright test tests/end-to-end.spec.ts
```

---



