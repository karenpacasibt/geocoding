const axios = require("axios");
const readline = require("readline");

const apiKey = "54bf2e5c8b124e59b7b7035dd2249f1c";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Escribe una dirección: ", async (address) => {
    try {
        const response = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
            params: {
                q: address,
                key: apiKey,
                limit: 1,
                language: "es"
            }
        });

        if (response.data.results.length > 0) {
            const { lat, lng } = response.data.results[0].geometry;
            const display_name = response.data.results[0].formatted;

            console.log("\nDirección encontrada con OPENCAGE:", display_name);
            console.log( "Latitud:", lat);
            console.log("Longitud:", lng);
        } else {
            console.log("No se encontraron resultados para:", address);
        }
    } catch (error) {
        console.error("Error en la petición:", error.message);
    } finally {
        rl.close();
    }
});
