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

# Navigate into the project directory
cd sauce-demo

# Install required dependencies
npm install
```
