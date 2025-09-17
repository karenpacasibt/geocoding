const axios = require("axios");
const readline = require("readline");

const token = "pk.8231024460da30cfa879950653d8e9e3";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Escribe una dirección: ", async (address) => {
    try {
        const response = await axios.get("https://us1.locationiq.com/v1/search.php", {
            params: {
                key: token,
                q: address,
                format: "json",
                limit: 1
            }
        });

        if (response.data.length > 0) {
            const { lat, lon, display_name } = response.data[0];
            console.log("\n Dirección encontrada con LOCATION IQ:", display_name);
            console.log("Latitud:", lat);
            console.log("Longitud:", lon);
        } else {
            console.log("No se encontraron resultados para:", address);
        }
    } catch (error) {
        console.error("Error en la petición:", error.message);
    } finally {
        rl.close();
    }
});
