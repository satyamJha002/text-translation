const express = require("express");
const axios = require("axios");

const { URLSearchParams } = require("url");
// const exp = require("constants");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { translation: null, error: null });
});

app.post("/translate", async (req, res) => {
  const { text, targetLang } = req.body;
  const encodedParams = new URLSearchParams();
  encodedParams.set("source_language", "en");
  encodedParams.set("target_language", targetLang);
  encodedParams.set("text", text);

  const options = {
    method: "POST",
    url: "https://text-translator2.p.rapidapi.com/translate",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "f984e1a6c0msh19a3397a53fe56ap1fa9ecjsn5f8af6d5909b",
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    res.status(200).render("index", {
      translation: response.data.data.translatedText,
      error: null,
    });
  } catch (error) {
    res.status(500).render("index", {
      translation: null,
      error: "Error fetching data. Please try again",
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
