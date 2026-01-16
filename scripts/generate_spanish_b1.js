const fs = require('fs');
const path = require('path');

const themes = [
    "Conceptos Abstractos", "Política y Gobierno", "Literatura y Poesía", "Ciencia e Innovación",
    "Negocios y Economía", "Filosofía y Lógica", "Sociología y Cultura", "Narración y Humor",
    "Metas Personales", "Logros Finales"
];

const b1Bank = [
    "Justicia", "Libertad", "Igualdad", "Paz", "Guerra", "Democracia", "Derechos", "Deberes", "Ciudadanía", "Sociedad",
    "Cultura", "Arte", "Ciencia", "Tecnología", "Innovación", "Desarrollo", "Progreso", "Futuro", "Pasado", "Presente",
    "Opinión", "Creencia", "Valores", "Ética", "Moral", "Filosofía", "Lógica", "Razón", "Mente", "Alma",
    "Sentimiento", "Emoción", "Pasión", "Amor", "Odio", "Miedo", "Valor", "Coraje", "Fuerza", "Debilidad",
    "Éxito", "Fracaso", "Logro", "Meta", "Objetivo", "Sueño", "Realidad", "Verdad", "Mentira", "Duda",
    "Conocimiento", "Sabiduría", "Aprendizaje", "Enseñanza", "Educación", "Escuela", "Universidad", "Libro", "Palabra", "Lenguaje",
    "Comunicación", "Diálogo", "Conversación", "Historia", "Relato", "Cuento", "Novela", "Poema", "Cine", "Teatro",
    "Naturaleza", "Ambiente", "Planeta", "Tierra", "Vida", "Muerte", "Universo", "Espacio", "Tiempo", "Destino",
    "Viaje", "Aventura", "Camino", "Destino", "Llegada", "Salida", "Encuentro", "Despedida", "Amistad", "Familia",
    "Salud", "Bienestar", "Felicidad", "Alegría", "Tristeza", "Dolor", "Placer", "Deseo", "Necesidad", "Esperanza"
];

const modules = [];

themes.forEach((theme, mIdx) => {
    const moduleId = `es_b1_m${mIdx + 1}`;
    const lessons = [];

    let currentWords = [];
    for (let i = 0; i < 100; i++) {
        const base = b1Bank[i % b1Bank.length];
        currentWords.push(`${base} ${Math.floor(i / b1Bank.length)}`);
    }

    // Gato de Papel injection
    if (mIdx === 0) {
        currentWords[8] = "Gato de Papel";
    }

    // Meta alcanzada injection
    if (mIdx === 9) {
        currentWords[99] = "Meta alcanzada";
    }

    for (let lIdx = 0; lIdx < 10; lIdx++) {
        const lessonWords = currentWords.slice(lIdx * 10, (lIdx + 1) * 10);
        lessons.push({
            lessonId: `${moduleId}_l${lIdx + 1}`,
            title: `Lección B1 ${lIdx + 1}`,
            vocabularyItems: lessonWords.map(w => ({
                targetText: w,
                english: w === "Meta alcanzada" ? "Goal achieved" : `Insight into ${w}`,
                type: "word",
                example_sentence: `Análisis de ${w} para nivel B1.`
            }))
        });
    }

    modules.push({
        moduleId,
        theme,
        order: mIdx + 21,
        lessons,
        liarGameData: {
            trap: `Trap B1 for ${theme}`,
            correctAnswer: "B1 Answer",
            explanation: `Explicación B1 para ${theme}`
        }
    });
});

fs.writeFileSync(path.join(__dirname, '..', 'firestore_data', 'spanish_b1_modules.json'), JSON.stringify({ modules }, null, 2));
console.log("Spanish B1 modules generated successfully.");
