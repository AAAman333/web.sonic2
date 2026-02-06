ppid=${WEATHER_API_KEY}&units=${UNITS}`
    );
    const data = await response.json();
    if (data.cod !== 200) {
      return res.json({ error: "Unable to fetch weather" });
    }
    res.json({
      temperature: data.main.temp,
      feels_like: data.main.feels_like,
      description: data.weather[0].description,
      wind_speed: data.wind.speed,
      rain_3h: data.rain?.["3h"] || 0,
      country: data.sys.country,
    });
  } catch {
    res.json({ error: "Weather service unavailable" });
  }
});

app.get("/random-fact", async (req, res) => {
  try {
    const response = await fetch(
      "https://uselessfacts.jsph.pl/random.json?language=en"
    );
    const data = await response.json();

    res.json({
      fact: data.text
    });
  } catch (err) {
    console.error(err);
    res.json({ error: "Fact service unavailable" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
