const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); 

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.post('/generate', async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: "El campo 'text' es obligatorio." });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

        const prompt = `Analiza el siguiente texto: "${text}" e identifica lo que le gusta a la persona que escribió el texto. Basado en lo que entendiste del texto, genera recomendaciones de entretenimiento en formato JSON.  
        Proporciona 20 películas y 20 series.  
        Incluye solo los nombres originales en inglés y sus versiones más recientes, priorizando los lanzamientos de 2024 y en las series no me des temporadas, solo dame su nombre.  
        No añadas el año entre paréntesis, solo proporciona los nombres exactos y únicamente el retorno sea el JSON. Donde el objeto sea las recomendaciones.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const generatedText = response.text();
        console.log(generatedText);
        res.json({ result: generatedText });
    } catch (error) {
        console.error("Error en la generación de contenido:", error);
        res.status(500).json({ error: "Error al procesar la solicitud." });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
