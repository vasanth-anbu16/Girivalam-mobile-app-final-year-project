export const fetchWeather = async () => {
    try {
        const response = await fetch("https://www.google.com/search?q=weather+Tiruvannamalai");
        const html = await response.text();
        const match = html.match(/(-?\d+°C)/);
        return { temp: match ? match[1] : "38", description: "Clear Sky" };
    } catch (error) {
        console.error("Weather API Error:", error);
        return { temp: "38°C", description: "Unavailable" };
    }
};
