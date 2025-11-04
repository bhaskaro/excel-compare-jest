---

# 📊 Excel Compare Jest Project

A simple Node.js project that reads data from an Excel file using the **`xlsx`** library and compares it against a reference **JSON file** using **Jest** unit tests.

---

## 🚀 Features

* Converts Excel sheets (`.xlsx`) to JSON.
* Compares the parsed data with a reference `expected.json`.
* Includes Jest-based automated tests.
* Easy to extend for multiple sheets or datasets.

---

## 🛠️ Setup

```bash
git clone git@github.com:bhaskaro/excel-compare-jest.git
cd excel-compare-jest
npm install
```

---

## ▶️ Run Tests

```bash
npm test
```

This runs all Jest test cases and verifies that your Excel data matches `expected.json`.

---

## 📁 Project Structure

```
excel-compare-jest/
├── src/
│   └── parseExcel.js          # Excel parsing logic
├── tests/
│   ├── parseExcel.test.js     # Jest tests for comparison
│   └── fixtures/
│       ├── sample.xlsx        # Example Excel file
│       └── expected.json      # Expected JSON reference
├── .gitignore
├── jest.config.js
├── package.json
└── README.md
```

---

## 🧩 Example Test Output

```
 PASS  tests/parseExcel.test.js
  Excel to JSON → compare with expected.json
    ✓ matches expected data exactly
    ✓ contains at least expected rows (subset check)
```

---

## 🧰 Tech Stack

* **Node.js**
* **Jest**
* **xlsx**

---

## 📜 License

This project is released under the [MIT License](https://opensource.org/licenses/MIT).

---
