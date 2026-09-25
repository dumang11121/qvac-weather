# QVAC Weather 🌤️

**QVAC Weather** is a local AI-powered weather web app that lets you search for a city, view its current weather conditions and 5-day forecast, and receive an AI-generated weather summary.

The AI analysis runs **locally on the device using Tether's QVAC SDK**, rather than sending the weather prompt to a cloud AI service.

## 🔗 Links

* **GitHub Repository:** https://github.com/dumang11121/qvac-weather
* **Local App:** http://localhost:3000/

---

## ✨ Features

QVAC Weather includes:

* 🌡️ Current temperature
* 💧 Humidity
* 💨 Wind speed
* 🌧️ Rain probability
* 🌡️ Feels-like temperature
* 📅 5-day forecast
* 🤖 AI-generated weather summary
* 🔍 Search weather by city
* 🔒 Local AI inference with QVAC

---

## 🤖 QVAC Integration

QVAC Weather uses the **QVAC JavaScript/TypeScript SDK** for on-device AI inference.

### QVAC SDK

```text
@qvac/sdk
```

The project uses QVAC to:

1. Load a local AI model with `loadModel()`
2. Generate the weather analysis using `completion()`
3. Display the generated AI summary in the web application

The QVAC inference runs locally on the user's device.

QVAC's JavaScript/TypeScript SDK provides `loadModel()` and `completion()` for loading a model and running local text generation.

### QVAC Version

```text
@qvac/sdk 0.20.0
```

---

## 💻 Requirements

Before running QVAC Weather, you need:

* **Node.js 22.17 or newer**
* **npm 10.9 or newer**
* **Git** (optional if downloading the ZIP)
* A modern web browser such as Chrome, Edge, or Firefox

QVAC's current JavaScript/TypeScript SDK documentation lists Node.js `>= 22.17` and npm `>= 10.9` as requirements.

Check your installed versions:

```bash
node -v
npm -v
```

---

# 📥 Download QVAC Weather

## Method 1 — Clone with Git

Open PowerShell or Command Prompt and run:

```bash
git clone https://github.com/dumang11121/qvac-weather.git
```

Then enter the project directory:

```bash
cd qvac-weather
```

---

## Method 2 — Download ZIP

1. Open the QVAC Weather GitHub repository:

   https://github.com/dumang11121/qvac-weather

2. Click the green **Code** button.

3. Select **Download ZIP**.

4. Extract the downloaded ZIP file.

5. Open the extracted `qvac-weather` folder.

---

# 📦 Install Dependencies

Inside the project folder, run:

```bash
npm install
```

This installs the project's dependencies, including:

```text
@qvac/sdk
express
```

---

# ▶️ Start QVAC Weather

Run:

```bash
npm start
```

The local server will start on:

```text
http://localhost:3000/
```

Open that address in your browser.

---

# 🌎 Using the App

1. Open:

   http://localhost:3000/

2. Enter a city in the search box.

   Example:

   ```text
   Manila
   ```

3. Click **Get Weather**.

4. The application retrieves the weather information.

5. QVAC processes the weather information locally and generates an AI weather summary.

You can try cities such as:

* Manila
* Cagayan de Oro
* Cebu City
* Davao City
* Tokyo
* New York

---

# 🧠 How the AI Works

The basic flow of the application is:

```text
User searches for a city
        ↓
Weather information is retrieved
        ↓
Weather data is prepared for AI analysis
        ↓
QVAC loadModel()
        ↓
QVAC completion()
        ↓
Local AI generates weather summary
        ↓
AI summary is displayed in the browser
```

The AI generation is performed locally using QVAC rather than using a cloud-based LLM API.

---

# 🛑 Stop the Application

To stop the local server:

1. Return to the PowerShell or Command Prompt window running the app.
2. Press:

```text
Ctrl + C
```

---

# 🔄 Start the Application Again

Open the project directory:

```bash
cd qvac-weather
```

Then run:

```bash
npm start
```

Open:

```text
http://localhost:3000/
```

---

## 🛠️ Technologies Used

* HTML
* CSS
* JavaScript
* Node.js
* Express
* QVAC JavaScript/TypeScript SDK
* `@qvac/sdk` 0.20.0
* Weather API
* Local/on-device AI inference

---

## 📁 Project Structure

```text
qvac-weather/
│
├── public/
│   └── index.html
│
├── package.json
├── package-lock.json
├── server.js
├── README.md
└── LICENSE
```

---

# 🐛 Troubleshooting

## `npm` is not recognized

Make sure Node.js is installed correctly.

Check:

```bash
node -v
npm -v
```

If the commands do not work, install the current Node.js LTS release and restart your terminal.

---

## Port 3000 is already in use

Another application may already be using port 3000.

Stop the other application or stop the existing QVAC Weather server before starting it again.

---

## The page is blank

Make sure the server is running:

```bash
npm start
```

Then open:

```text
http://localhost:3000/
```

Refresh the browser if necessary.

---

## Weather isn't loading

Make sure:

* The city name is valid.
* The server is running.
* Your internet connection is available for retrieving weather data.

---

## QVAC model loading takes time

The first QVAC run may take longer because the local model needs to be loaded/downloaded and initialized.

QVAC's SDK supports loading a model with `loadModel()` and then using that loaded model for `completion()`.

---

# 📜 License

This project is open source and licensed under the **MIT License**.

See the `LICENSE` file for the complete license text.

---

# 📌 Project

QVAC Weather was created as a local AI weather application using Tether's QVAC SDK.

The project demonstrates how QVAC can be integrated into a web application to perform AI text generation locally.

**Repository:**

https://github.com/dumang11121/qvac-weather

**Run locally:**

http://localhost:3000/
