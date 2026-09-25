import express from "express";
import { fileURLToPath } from "url";
import {
  loadModel,
  completion,
  unloadModel,
  LLAMA_3_2_1B_INST_Q4_0
} from "@qvac/sdk";

const app = express();
const PORT = 3000;

const publicPath = fileURLToPath(new URL("./public/", import.meta.url));

app.use(express.json());
app.use(express.static(publicPath));

let modelId = null;
let qvacStatus = "loading";
let qvacError = null;

async function initializeQVAC() {
  try {
    console.log("Loading QVAC local AI model...");

    modelId = await loadModel({
      modelSrc: LLAMA_3_2_1B_INST_Q4_0,
      onProgress: (progress) => {
        console.log(
          `QVAC model: ${progress.percentage.toFixed(0)}%`
        );
      }
    });

    qvacStatus = "ready";

    console.log("QVAC local AI model loaded successfully.");
  } catch (error) {
    qvacStatus = "error";
    qvacError = error.message;

    console.error("QVAC model failed to load:");
    console.error(error);
  }
}

app.get("/", (req, res) => {
  res.sendFile(
    fileURLToPath(new URL("./public/index.html", import.meta.url))
  );
});

app.get("/api/qvac-status", (req, res) => {
  res.json({
    status: qvacStatus,
    error: qvacError
  });
});

app.get("/api/weather", async (req, res) => {
  try {
    const city = req.query.city;

    if (!city) {
      return res.status(400).json({
        error: "City is required"
      });
    }

    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        city
      )}&count=1&language=en&format=json`
    );

    if (!geoResponse.ok) {
      throw new Error("Weather geocoding service unavailable");
    }

    const geo = await geoResponse.json();

    if (!geo.results || geo.results.length === 0) {
      return res.status(404).json({
        error: "City not found"
      });
    }

    const place = geo.results[0];

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`
    );

    if (!weatherResponse.ok) {
      throw new Error("Weather service unavailable");
    }

    const weather = await weatherResponse.json();

    res.json({
      city: place.name,
      country: place.country,
      current: weather.current,
      daily: weather.daily,
      qvacStatus
    });

  } catch (error) {
    console.error("Weather error:", error);

    res.status(500).json({
      error: "Could not get weather data",
      details: error.message
    });
  }
});

app.post("/api/summary", async (req, res) => {
  try {
    if (qvacStatus !== "ready" || !modelId) {
      return res.status(503).json({
        error: "QVAC AI is still loading.",
        qvacStatus
      });
    }

    const {
      city,
      country,
      temperature,
      feelsLike,
      humidity,
      wind,
      precipitation,
      maxTemperature,
      minTemperature,
      rainProbability
    } = req.body;

    const weatherPrompt = `
You are a helpful weather assistant.

Give a very short weather summary in 2-3 sentences.

City: ${city}, ${country}
Temperature: ${temperature} C
Feels like: ${feelsLike} C
Humidity: ${humidity}%
Wind: ${wind} km/h
Precipitation: ${precipitation} mm
Today's maximum: ${maxTemperature} C
Today's minimum: ${minTemperature} C
Rain probability: ${rainProbability}%

Mention the main weather condition and give ONE practical suggestion.
Keep the answer concise.
`;

    console.log("Starting QVAC weather summary...");

    const result = completion({
      modelId,
      history: [
        {
          role: "user",
          content: weatherPrompt
        }
      ],
      stream: true
    });

    let output = "";

    for await (const token of result.tokenStream) {
      output += token;
    }

    const summary = output.trim();

    console.log("QVAC summary complete.");

    res.json({
      summary
    });

  } catch (error) {
    console.error("QVAC summary error:", error);

    res.status(500).json({
      error: "QVAC summary failed",
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log("");
  console.log("=================================");
  console.log("QVAC Weather is running!");
  console.log(`http://localhost:${PORT}`);
  console.log("=================================");
  console.log("QVAC AI is loading in the background...");
});

initializeQVAC();

async function shutdown() {
  console.log("\nShutting down...");

  try {
    if (modelId) {
      await unloadModel({
        modelId
      });

      console.log("QVAC model unloaded.");
    }
  } catch (error) {
    console.error("Error unloading QVAC:", error);
  }

  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);