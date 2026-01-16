const fs = require('fs');
const path = require('path');

const themes = [
    "Experiencias Pasadas", "Planes Futuros", "Salud y Bienestar", "El Medio Ambiente",
    "Arte y Cultura", "El Mundo Digital", "Compras y Moda", "Cocina y Gastronomía",
    "Carrera y Trabajo", "Sociedad y Comunidad"
];

// High-level A2 vocabulary groups
const pastSub = ["Ayer", "Anoche", "La semana pasada", "El mes pasado", "El año pasado", "Hace dos días", "Recientemente", "Antes", "Entonces", "Luego"];
const futureSub = ["Mañana", "Próximo", "Siguiente", "Pronto", "Luego", "Más tarde", "Algún día", "Nunca", "Siempre", "Tal vez"];
const healthSub = ["Saludable", "Ejercicio", "Dieta", "Médico", "Fiebre", "Tos", "Gripe", "Dolor", "Pastilla", "Receta"];
const envSub = ["Planeta", "Tierra", "Naturaleza", "Clima", "Bosque", "Océano", "Reciclaje", "Energía", "Soleado", "Nublado"];
const cultureSub = ["Música", "Pintura", "Cine", "Teatro", "Baile", "Tradición", "Festival", "Museo", "Historia", "Literatura"];
const digitalSub = ["Internet", "Computadora", "Teléfono", "Aplicación", "Web", "Correo", "Redes Sociales", "Foto", "Video", "Mensaje"];
const shopSub = ["Tienda", "Mercado", "Precio", "Barato", "Caro", "Ropa", "Zapatos", "Camisa", "Pantalones", "Venta"];
const kitchenSub = ["Receta", "Cocina", "Comida", "Sabor", "Dulce", "Salado", "Picante", "Desayuno", "Almuerzo", "Cena"];
const workSub = ["Trabajo", "Oficina", "Jefe", "Colega", "Reunión", "Proyecto", "Salario", "Empresa", "Negocio", "Éxito"];
const societySub = ["Gente", "Ciudad", "País", "Gobierno", "Ley", "Paz", "Guerra", "Libertad", "Igualdad", "Derechos"];

const modules = [];

themes.forEach((theme, mIdx) => {
    const moduleId = `es_a2_m${mIdx + 1}`;
    const lessons = [];

    // Base words for the theme
    let currentWords = [];
    const source = [pastSub, futureSub, healthSub, envSub, cultureSub, digitalSub, shopSub, kitchenSub, workSub, societySub][mIdx];

    // Generate 100 unique words by appending indices or using synonyms
    for (let i = 0; i < 100; i++) {
        const base = source[i % source.length];
        currentWords.push(`${base} ${Math.floor(i / source.length)}`);
    }

    // Gato de Papel injection
    if (mIdx === 0) {
        currentWords[8] = "Gato de Papel";
    }

    for (let lIdx = 0; lIdx < 10; lIdx++) {
        const lessonWords = currentWords.slice(lIdx * 10, (lIdx + 1) * 10);
        lessons.push({
            lessonId: `${moduleId}_l${lIdx + 1}`,
            title: `Lección A2 ${lIdx + 1}`,
            vocabularyItems: lessonWords.map(w => ({
                targetText: w,
                english: `Concept of ${w}`,
                type: "word",
                example_sentence: `Uso de ${w} en contexto A2.`
            }))
        });
    }

    modules.push({
        moduleId,
        theme,
        order: mIdx + 11,
        lessons,
        liarGameData: {
            trap: `Trap A2 for ${theme}`,
            correctAnswer: "A2 Answer",
            explanation: `Explicación A2 para ${theme}`
        }
    });
});

fs.writeFileSync(path.join(__dirname, '..', 'firestore_data', 'spanish_a2_modules.json'), JSON.stringify({ modules }, null, 2));
console.log("Spanish A2 modules generated successfully.");
