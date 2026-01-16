import admin from 'firebase-admin';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccount = JSON.parse(
    readFileSync(join(__dirname, 'serviceAccountKey.json'), 'utf8')
);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Module 08 with proper IPA and usage examples
const module08 = {
    "module_id": "es_a1_m08",
    "language": "es",
    "level": "A1",
    "theme": "Hobbies, Socializing & Emotions",
    "order": 8,
    "vocabulary": [
        { "word": "Amigo", "translation": "Friend (male)", "phonetic": "/aˈmi.ɣo/", "usage": "Mi mejor amigo se llama Carlos y nos conocemos desde la escuela primaria hace más de veinte años felices juntos." },
        { "word": "Amiga", "translation": "Friend (female)", "phonetic": "/aˈmi.ɣa/", "usage": "Mi amiga María es muy divertida y siempre me hace reír con sus historias graciosas cuando salimos juntas los fines." },
        { "word": "Persona", "translation": "Person", "phonetic": "/peɾˈso.na/", "usage": "Conocí a una persona muy interesante en la fiesta anoche que trabaja como fotógrafo profesional viajando por todo el mundo." },
        { "word": "Gente", "translation": "People", "phonetic": "/ˈxen.te/", "usage": "Hay mucha gente en el parque los domingos disfrutando del buen tiempo, haciendo picnics y jugando con sus familias felices." },
        { "word": "Fiesta", "translation": "Party", "phonetic": "/ˈfjes.ta/", "usage": "Vamos a hacer una fiesta de cumpleaños sorpresa para mi hermana el sábado con todos sus amigos y familiares cercanos." },
        { "word": "Regalo", "translation": "Gift / Present", "phonetic": "/reˈɣa.lo/", "usage": "Compré un regalo especial para mi madre en su cumpleaños, un collar de plata que le va a encantar mucho." },
        { "word": "Cita", "translation": "Date / Appointment", "phonetic": "/ˈsi.ta/", "usage": "Tengo una cita con el dentista mañana a las tres de la tarde y no puedo cancelarla porque esperé dos meses." },
        { "word": "Amor", "translation": "Love", "phonetic": "/aˈmoɾ/", "usage": "El amor verdadero es difícil de encontrar pero cuando lo encuentras debes cuidarlo y valorarlo todos los días de tu vida." },
        { "word": "Odio", "translation": "Hate", "phonetic": "/ˈo.ðjo/", "usage": "No me gusta la palabra odio porque es muy fuerte y prefiero decir que algo simplemente no me agrada mucho." },
        { "word": "Sonrisa", "translation": "Smile", "phonetic": "/sonˈri.sa/", "usage": "Una sonrisa sincera puede alegrar el día de cualquier persona y crear un ambiente positivo y feliz en cualquier lugar." },
        { "word": "Beso", "translation": "Kiss", "phonetic": "/ˈbe.so/", "usage": "Le di un beso de buenas noches a mi hija antes de que se durmiera en su cama con su osito de peluche." },
        { "word": "Abrazo", "translation": "Hug", "phonetic": "/aˈβɾa.so/", "usage": "Mi abuela siempre me da un abrazo fuerte y cálido cuando la visito los domingos para almorzar en su casa acogedora." },
        { "word": "Hablar", "translation": "To speak", "phonetic": "/aˈβlaɾ/", "usage": "Me gusta hablar con personas de diferentes culturas para aprender sobre sus costumbres y tradiciones únicas e interesantes del mundo." },
        { "word": "Escuchar", "translation": "To listen", "phonetic": "/eskuˈtʃaɾ/", "usage": "Es importante escuchar atentamente cuando alguien te habla para entender bien su mensaje y responder de manera apropiada y respetuosa." },
        { "word": "Reír", "translation": "To laugh", "phonetic": "/reˈiɾ/", "usage": "Me encanta reír con mis amigos viendo comedias divertidas en el cine los viernes por la noche después del trabajo." },
        { "word": "Cantar", "translation": "To sing", "phonetic": "/kanˈtaɾ/", "usage": "Me gusta cantar en la ducha por las mañanas aunque no tengo muy buena voz pero me hace sentir feliz." },
        { "word": "Bailar", "translation": "To dance", "phonetic": "/baiˈlaɾ/", "usage": "Voy a clases de salsa todos los martes por la noche para aprender a bailar mejor y conocer gente nueva interesante." },
        { "word": "Jugar", "translation": "To play", "phonetic": "/xuˈɣaɾ/", "usage": "Los niños juegan en el parque todas las tardes después de la escuela con sus amigos corriendo y riendo felices." },
        { "word": "Deporte", "translation": "Sport", "phonetic": "/deˈpoɾ.te/", "usage": "Practico deporte tres veces por semana para mantenerme en forma y saludable física y mentalmente durante todo el año." },
        { "word": "Fútbol", "translation": "Soccer", "phonetic": "/ˈfut.bol/", "usage": "El fútbol es el deporte más popular en España y millones de personas ven los partidos en la televisión los fines." },
        { "word": "Tenis", "translation": "Tennis", "phonetic": "/ˈte.nis/", "usage": "Juego tenis los sábados por la mañana con mi vecino en las canchas del club deportivo cerca de mi casa." },
        { "word": "Nadar", "translation": "To swim", "phonetic": "/naˈðaɾ/", "usage": "Me encanta nadar en el mar durante el verano cuando el agua está cálida y cristalina bajo el sol brillante." },
        { "word": "Correr", "translation": "To run", "phonetic": "/koˈreɾ/", "usage": "Salgo a correr todas las mañanas antes del trabajo para hacer ejercicio y empezar el día con energía positiva y fresca." },
        { "word": "Caminar", "translation": "To walk", "phonetic": "/kamiˈnaɾ/", "usage": "Prefiero caminar al trabajo en lugar de conducir porque es bueno para la salud y el medio ambiente sin contaminar." },
        { "word": "Viajar", "translation": "To travel", "phonetic": "/bjaˈxaɾ/", "usage": "Me encanta viajar a países nuevos para conocer diferentes culturas, probar comidas exóticas y hacer amigos de todo el mundo." },
        { "word": "Leer", "translation": "To read", "phonetic": "/leˈeɾ/", "usage": "Leo un libro nuevo cada mes para mantener mi mente activa y aprender cosas nuevas sobre diferentes temas interesantes variados." },
        { "word": "Mirar", "translation": "To watch", "phonetic": "/miˈɾaɾ/", "usage": "Me gusta mirar documentales sobre naturaleza en la televisión porque aprendo mucho sobre animales y ecosistemas del planeta Tierra." },
        { "word": "Película", "translation": "Movie", "phonetic": "/peˈli.ku.la/", "usage": "Vimos una película de acción muy emocionante en el cine anoche con efectos especiales increíbles y una trama fascinante absorbente." },
        { "word": "Música", "translation": "Music", "phonetic": "/ˈmu.si.ka/", "usage": "Escucho música todos los días mientras trabajo porque me ayuda a concentrarme mejor y me pone de buen humor siempre." },
        { "word": "Canción", "translation": "Song", "phonetic": "/kanˈsjon/", "usage": "Mi canción favorita es de un artista español y la escucho todos los días porque me recuerda momentos felices de mi vida." },
        { "word": "Pintar", "translation": "To paint", "phonetic": "/pinˈtaɾ/", "usage": "Me gusta pintar paisajes con acuarelas los fines de semana como hobby relajante que me ayuda a expresar mi creatividad artística." },
        { "word": "Dibujar", "translation": "To draw", "phonetic": "/diβuˈxaɾ/", "usage": "Mi hija dibuja muy bien y quiere ser artista cuando sea grande para crear ilustraciones hermosas para libros infantiles educativos." },
        { "word": "Fotografía", "translation": "Photography", "phonetic": "/fotoɣɾaˈfi.a/", "usage": "La fotografía es mi pasión y paso horas tomando fotos de la naturaleza y editándolas en mi computadora con programas profesionales." },
        { "word": "Cámara", "translation": "Camera", "phonetic": "/ˈka.ma.ɾa/", "usage": "Compré una cámara profesional nueva para tomar mejores fotos durante mis viajes por Europa el próximo verano con mi familia." },
        { "word": "Instrumento", "translation": "Instrument", "phonetic": "/instɾuˈmen.to/", "usage": "Toco un instrumento musical desde que era niño y ahora doy clases de piano a estudiantes jóvenes los fines de semana." },
        { "word": "Guitarra", "translation": "Guitar", "phonetic": "/ɡiˈta.ra/", "usage": "Aprendí a tocar la guitarra cuando tenía quince años y ahora toco en una banda con amigos los sábados por la noche." },
        { "word": "Piano", "translation": "Piano", "phonetic": "/ˈpja.no/", "usage": "El piano es un instrumento hermoso y me encanta escuchar música clásica de compositores famosos como Mozart y Beethoven siempre." },
        { "word": "Videojuego", "translation": "Video game", "phonetic": "/biðeoˈxwe.ɣo/", "usage": "Mi hermano juega videojuegos en línea con sus amigos todas las noches después de terminar su tarea escolar y estudiar." },
        { "word": "Internet", "translation": "Internet", "phonetic": "/inteɾˈnet/", "usage": "Uso internet todos los días para trabajar, comunicarme con amigos y familiares, y aprender cosas nuevas en cursos online gratuitos." },
        { "word": "Redes sociales", "translation": "Social media", "phonetic": "/ˈre.ðes soˈsja.les/", "usage": "Paso demasiado tiempo en redes sociales viendo fotos y videos de amigos pero trato de reducir el uso para ser más productivo." },
        { "word": "Feliz", "translation": "Happy", "phonetic": "/feˈlis/", "usage": "Me siento muy feliz cuando paso tiempo con mi familia y amigos disfrutando de buena comida y conversaciones interesantes agradables." },
        { "word": "Triste", "translation": "Sad", "phonetic": "/ˈtɾis.te/", "usage": "Estoy triste porque mi mejor amigo se mudó a otra ciudad y lo voy a extrañar mucho aunque nos mantendremos en contacto." },
        { "word": "Enojado", "translation": "Angry", "phonetic": "/enoˈxa.ðo/", "usage": "Estoy enojado porque alguien rayó mi coche nuevo en el estacionamiento y ahora tengo que pagar por las reparaciones costosas." },
        { "word": "Asustado", "translation": "Scared", "phonetic": "/asusˈta.ðo/", "usage": "Estaba asustado cuando vi la película de terror anoche porque tenía escenas muy intensas y aterradoras que me dieron pesadillas." },
        { "word": "Sorprendido", "translation": "Surprised", "phonetic": "/soɾpɾenˈdi.ðo/", "usage": "Estuve muy sorprendido cuando mis amigos me hicieron una fiesta sorpresa de cumpleaños sin que yo supiera nada al respecto." },
        { "word": "Cansado", "translation": "Tired", "phonetic": "/kanˈsa.ðo/", "usage": "Estoy muy cansado después de trabajar doce horas hoy y solo quiero llegar a casa, ducharme y dormir profundamente." },
        { "word": "Aburrido", "translation": "Bored", "phonetic": "/aβuˈri.ðo/", "usage": "Estoy aburrido en casa este fin de semana porque no tengo planes y todos mis amigos están ocupados con sus familias." },
        { "word": "Preocupado", "translation": "Worried", "phonetic": "/pɾeokuˈpa.ðo/", "usage": "Estoy preocupado por mi examen final de mañana porque el material es muy difícil y no sé si estudié lo suficiente." },
        { "word": "Emocionado", "translation": "Excited", "phonetic": "/emoθjoˈna.ðo/", "usage": "Estoy muy emocionado por mi viaje a España el próximo mes porque siempre he soñado con visitar ese país hermoso." },
        { "word": "Relajado", "translation": "Relaxed", "phonetic": "/relaˈxa.ðo/", "usage": "Me siento relajado cuando estoy en la playa escuchando las olas del mar y sintiendo la brisa cálida en mi cara." },
        { "word": "Sentirse", "translation": "To feel", "phonetic": "/senˈtiɾ.se/", "usage": "Me siento bien hoy porque dormí ocho horas, hice ejercicio por la mañana y comí un desayuno saludable y nutritivo." },
        { "word": "Pensar", "translation": "To think", "phonetic": "/penˈsaɾ/", "usage": "Pienso mucho sobre mi futuro y qué carrera profesional quiero seguir para ser feliz y exitoso en la vida adulta." },
        { "word": "Creer", "translation": "To believe", "phonetic": "/kɾeˈeɾ/", "usage": "Creo que es importante ser honesto y trabajar duro para alcanzar tus metas y sueños en la vida sin rendirse nunca." },
        { "word": "Esperanza", "translation": "Hope", "phonetic": "/espeˈɾan.sa/", "usage": "Tengo esperanza de que el mundo será un lugar mejor en el futuro si todos trabajamos juntos por la paz." },
        { "word": "Miedo", "translation": "Fear", "phonetic": "/ˈmje.ðo/", "usage": "Tengo miedo de las arañas grandes y siempre grito cuando veo una en mi casa pidiendo ayuda a alguien inmediatamente." },
        { "word": "Paz", "translation": "Peace", "phonetic": "/pas/", "usage": "Busco paz y tranquilidad en mi vida diaria meditando todas las mañanas antes de empezar el día con trabajo y responsabilidades." },
        { "word": "Libertad", "translation": "Freedom", "phonetic": "/liβeɾˈtað/", "usage": "La libertad es un derecho fundamental de todos los seres humanos y debemos luchar para protegerla siempre sin excepción alguna." },
        { "word": "Justicia", "translation": "Justice", "phonetic": "/xusˈti.sja/", "usage": "Creo en la justicia social y que todas las personas merecen igualdad de oportunidades sin importar su origen o condición económica." },
        { "word": "Respeto", "translation": "Respect", "phonetic": "/resˈpe.to/", "usage": "El respeto mutuo es la base de todas las relaciones saludables ya sean personales, profesionales o familiares en la vida." },
        { "word": "Confianza", "translation": "Trust", "phonetic": "/konˈfjan.sa/", "usage": "La confianza es difícil de ganar pero fácil de perder, por eso siempre trato de ser honesto con las personas." },
        { "word": "Reunirse", "translation": "To meet up", "phonetic": "/rewˈniɾ.se/", "usage": "Nos reunimos todos los viernes después del trabajo para tomar algo y conversar sobre nuestras vidas y planes futuros emocionantes." },
        { "word": "Visitar", "translation": "To visit", "phonetic": "/bisiˈtaɾ/", "usage": "Voy a visitar a mis abuelos este fin de semana porque hace mucho tiempo que no los veo y los extraño." },
        { "word": "Invitar", "translation": "To invite", "phonetic": "/imbiˈtaɾ/", "usage": "Voy a invitar a todos mis amigos a mi casa el sábado para celebrar mi cumpleaños con una fiesta grande." },
        { "word": "Ayudar", "translation": "To help", "phonetic": "/aʝuˈðaɾ/", "usage": "Me gusta ayudar a las personas necesitadas haciendo trabajo voluntario en un comedor comunitario los fines de semana regularmente siempre." },
        { "word": "Compartir", "translation": "To share", "phonetic": "/kompaɾˈtiɾ/", "usage": "Es importante compartir lo que tienes con los demás y ser generoso con tu tiempo, dinero y conocimientos sin esperar nada." },
        { "word": "Regalar", "translation": "To give (a gift)", "phonetic": "/reɣaˈlaɾ/", "usage": "Voy a regalar un libro a mi hermana para su cumpleaños porque sé que le encanta leer novelas de misterio." },
        { "word": "Celebrar", "translation": "To celebrate", "phonetic": "/seleˈβɾaɾ/", "usage": "Vamos a celebrar nuestro aniversario de bodas con una cena romántica en un restaurante elegante con vista al mar hermoso." },
        { "word": "Bailar", "translation": "To dance", "phonetic": "/baiˈlaɾ/", "usage": "Me encanta bailar salsa y bachata en las fiestas porque es muy divertido y una buena forma de hacer ejercicio también." },
        { "word": "Cantar", "translation": "To sing", "phonetic": "/kanˈtaɾ/", "usage": "Cantamos canciones tradicionales españolas en la fiesta de Navidad con toda la familia reunida alrededor del árbol navideño decorado bellamente." },
        { "word": "Viajar", "translation": "To travel", "phonetic": "/bjaˈxaɾ/", "usage": "Quiero viajar por todo el mundo y conocer diferentes culturas, idiomas y tradiciones antes de ser demasiado viejo para hacerlo." },
        { "word": "Playa", "translation": "Beach", "phonetic": "/ˈpla.ʝa/", "usage": "Vamos a la playa todos los veranos para nadar, tomar el sol y relajarnos lejos del estrés de la ciudad." },
        { "word": "Montaña", "translation": "Mountain", "phonetic": "/monˈta.ɲa/", "usage": "Me gusta hacer senderismo en las montañas los fines de semana para disfrutar de la naturaleza y el aire fresco puro." },
        { "word": "Campo", "translation": "Countryside", "phonetic": "/ˈkam.po/", "usage": "Mis abuelos viven en el campo y tienen una granja con vacas, gallinas y un huerto grande de verduras frescas orgánicas." },
        { "word": "Naturaleza", "translation": "Nature", "phonetic": "/natuɾaˈle.sa/", "usage": "Me encanta la naturaleza y paso mucho tiempo al aire libre caminando por bosques y observando pájaros y animales salvajes." },
        { "word": "Animal", "translation": "Animal", "phonetic": "/aniˈmal/", "usage": "Me gustan todos los animales pero especialmente los perros porque son leales, cariñosos y siempre están felices de verte llegar." },
        { "word": "Perro", "translation": "Dog", "phonetic": "/ˈpe.ro/", "usage": "Tengo un perro labrador que se llama Max y es muy juguetón, inteligente y el mejor amigo que he tenido." },
        { "word": "Gato", "translation": "Cat", "phonetic": "/ˈɡa.to/", "usage": "Mi gata se llama Luna y es muy independiente pero también muy cariñosa cuando quiere atención y comida de su plato." },
        { "word": "Pájaro", "translation": "Bird", "phonetic": "/ˈpa.xa.ɾo/", "usage": "Me gusta observar pájaros en el parque con mis binoculares y aprender sobre las diferentes especies que viven en mi ciudad." },
        { "word": "Flor", "translation": "Flower", "phonetic": "/floɾ/", "usage": "Compro flores frescas todos los viernes para decorar mi casa y llenar las habitaciones con su aroma dulce y agradable natural." },
        { "word": "Árbol", "translation": "Tree", "phonetic": "/ˈaɾ.βol/", "usage": "Hay un árbol grande y viejo en el jardín de mi casa que da mucha sombra en verano y es perfecto." },
        { "word": "Sol", "translation": "Sun", "phonetic": "/sol/", "usage": "El sol brilla intensamente hoy y hace mucho calor, así que voy a ponerme protector solar antes de salir afuera." },
        { "word": "Luna", "translation": "Moon", "phonetic": "/ˈlu.na/", "usage": "Me gusta mirar la luna llena por la noche desde mi balcón porque es hermosa y me hace sentir tranquilo." },
        { "word": "Estrella", "translation": "Star", "phonetic": "/esˈtɾe.ʝa/", "usage": "Las estrellas brillan en el cielo nocturno cuando no hay nubes y es un espectáculo hermoso que me fascina siempre." },
        { "word": "Aire", "translation": "Air", "phonetic": "/ˈai.ɾe/", "usage": "El aire fresco de la montaña es puro y limpio, muy diferente del aire contaminado de la ciudad grande urbana." },
        { "word": "Tierra", "translation": "Earth / Land", "phonetic": "/ˈtje.ra/", "usage": "Debemos cuidar la Tierra y proteger el medio ambiente para las futuras generaciones que vivirán en este planeta hermoso nuestro." },
        { "word": "Fuego", "translation": "Fire", "phonetic": "/ˈfwe.ɣo/", "usage": "Encendemos el fuego en la chimenea durante el invierno para calentar la casa y crear un ambiente acogedor y cálido." },
        { "word": "Agua", "translation": "Water", "phonetic": "/ˈa.ɣwa/", "usage": "El agua es esencial para la vida y debemos conservarla y no desperdiciarla porque es un recurso limitado y valioso fundamental." },
        { "word": "Luz", "translation": "Light", "phonetic": "/lus/", "usage": "La luz del sol entra por la ventana de mi habitación todas las mañanas y me despierta naturalmente sin necesidad." },
        { "word": "Sombra", "translation": "Shadow", "phonetic": "/ˈsom.bɾa/", "usage": "Busco sombra bajo los árboles cuando hace mucho calor en verano para protegerme del sol intenso y refrescarme un poco." },
        { "word": "Color", "translation": "Color", "phonetic": "/koˈloɾ/", "usage": "Mi color favorito es el azul porque me recuerda al mar y al cielo y me hace sentir calmado y relajado." },
        { "word": "Sonido", "translation": "Sound", "phonetic": "/soˈni.ðo/", "usage": "Me gusta el sonido de la lluvia cayendo en el techo por la noche porque me ayuda a dormir profundamente." },
        { "word": "Silencio", "translation": "Silence", "phonetic": "/siˈlen.sjo/", "usage": "Necesito silencio absoluto para concentrarme cuando estudio o trabajo en proyectos importantes que requieren mucha atención y enfoque mental." },
        { "word": "Voz", "translation": "Voice", "phonetic": "/bos/", "usage": "Mi abuela tiene una voz suave y calmante que siempre me reconforta cuando estoy triste o preocupado por algo importante." },
        { "word": "Cuerpo", "translation": "Body", "phonetic": "/ˈkweɾ.po/", "usage": "Cuido mi cuerpo haciendo ejercicio regularmente, comiendo saludable y durmiendo ocho horas todas las noches sin excepción para mantenerme sano." },
        { "word": "Mente", "translation": "Mind", "phonetic": "/ˈmen.te/", "usage": "Es importante mantener la mente activa leyendo, aprendiendo cosas nuevas y resolviendo problemas complejos todos los días de la vida." },
        { "word": "Alma", "translation": "Soul", "phonetic": "/ˈal.ma/", "usage": "Creo que el alma es la esencia de una persona y lo que nos hace únicos y especiales en este mundo." },
        { "word": "Vida", "translation": "Life", "phonetic": "/ˈbi.ða/", "usage": "La vida es corta y debemos aprovechar cada momento, ser felices y hacer lo que amamos sin arrepentimientos ni miedos." },
        { "word": "Muerte", "translation": "Death", "phonetic": "/ˈmweɾ.te/", "usage": "La muerte es parte natural de la vida y aunque es triste, debemos aceptarla y valorar el tiempo que tenemos." },
        { "word": "Tiempo", "translation": "Time", "phonetic": "/ˈtjem.po/", "usage": "El tiempo pasa muy rápido y debemos aprovecharlo bien haciendo cosas que nos hagan felices y pasar momentos con seres queridos." },
        { "word": "Espacio", "translation": "Space", "phonetic": "/esˈpa.sjo/", "usage": "Me fascina el espacio exterior y los planetas, estrellas y galaxias que existen en el universo infinito y misterioso siempre cambiante." }
    ]
};

async function uploadModule08() {
    try {
        console.log('\n🚀 Uploading Spanish A1 Module 08...\n');

        await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .doc(module08.module_id)
            .set(module08, { merge: false });

        console.log(`✓ Uploaded: ${module08.theme}`);
        console.log(`  Module ID: ${module08.module_id} (clean format)`);

        const doc = await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .doc(module08.module_id)
            .get();

        const data = doc.data();
        console.log(`✓ Word 10: ${data.vocabulary[9].word} - ${data.vocabulary[9].translation}\n`);

        const localPath = join(__dirname, '../assets/data/curriculum/es_a1/es_a1_m08.json');
        writeFileSync(localPath, JSON.stringify(data, null, 2));
        console.log(`✓ Local mirror created\n`);

        console.log('✅ Module 08 Complete! (800 words total)\n');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

uploadModule08();
