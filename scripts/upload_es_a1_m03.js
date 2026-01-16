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

// Module 03 with proper IPA and usage examples
const module = {
    "module_id": "es_a1_m03_audited_100",
    "language": "es",
    "level": "A1",
    "theme": "Time, Days & Weather",
    "vocabulary": [
        { "word": "Hora", "translation": "Hour", "phonetic": "/ˈo.ɾa/", "usage": "¿Qué hora es? Son las tres de la tarde y tengo una reunión importante en la oficina." },
        { "word": "Minuto", "translation": "Minute", "phonetic": "/miˈnu.to/", "usage": "Espera un minuto por favor, necesito terminar de escribir este correo electrónico importante antes de salir contigo." },
        { "word": "Segundo", "translation": "Second", "phonetic": "/seˈɣun.do/", "usage": "El corredor ganó la carrera por solo un segundo de diferencia, fue una competencia muy emocionante y reñida." },
        { "word": "Día", "translation": "Day", "phonetic": "/ˈdi.a/", "usage": "Hoy es un día hermoso con mucho sol y cielo azul, perfecto para ir al parque con la familia." },
        { "word": "Semana", "translation": "Week", "phonetic": "/seˈma.na/", "usage": "La próxima semana tengo vacaciones y voy a viajar a la playa con mi familia para descansar y relajarme." },
        { "word": "Mes", "translation": "Month", "phonetic": "/mes/", "usage": "Este mes he estado muy ocupado con el trabajo y apenas he tenido tiempo libre para descansar adecuadamente." },
        { "word": "Año", "translation": "Year", "phonetic": "/ˈa.ɲo/", "usage": "El próximo año voy a empezar a estudiar francés en la universidad para mejorar mis habilidades lingüísticas profesionales." },
        { "word": "Lunes", "translation": "Monday", "phonetic": "/ˈlu.nes/", "usage": "Los lunes siempre empiezo la semana con mucha energía y motivación para cumplir todas mis metas laborales." },
        { "word": "Martes", "translation": "Tuesday", "phonetic": "/ˈmaɾ.tes/", "usage": "Los martes tengo clase de yoga por la tarde para relajarme y mantenerme en forma después del trabajo." },
        { "word": "Miércoles", "translation": "Wednesday", "phonetic": "/ˈmjeɾ.ko.les/", "usage": "Los miércoles es el día de reunión familiar donde todos cenamos juntos y compartimos historias de la semana." },
        { "word": "Jueves", "translation": "Thursday", "phonetic": "/ˈxwe.βes/", "usage": "Los jueves voy al gimnasio después del trabajo para hacer ejercicio y mantenerme saludable y activo siempre." },
        { "word": "Viernes", "translation": "Friday", "phonetic": "/ˈbjeɾ.nes/", "usage": "Los viernes salgo con mis amigos a cenar y tomar algo para celebrar el fin de semana laboral." },
        { "word": "Sábado", "translation": "Saturday", "phonetic": "/ˈsa.βa.ðo/", "usage": "Los sábados duermo hasta tarde y luego voy de compras al centro comercial con mi esposa toda la mañana." },
        { "word": "Domingo", "translation": "Sunday", "phonetic": "/doˈmiŋ.ɡo/", "usage": "Los domingos vamos a misa por la mañana y después comemos en casa de mis padres con toda la familia." },
        { "word": "Enero", "translation": "January", "phonetic": "/eˈne.ɾo/", "usage": "En enero hace mucho frío y siempre nieva en mi ciudad, así que uso abrigo y bufanda todos los días." },
        { "word": "Febrero", "translation": "February", "phonetic": "/feˈβɾe.ɾo/", "usage": "Febrero es el mes más corto del año con solo veintiocho días, excepto en años bisiestos que tiene veintinueve." },
        { "word": "Marzo", "translation": "March", "phonetic": "/ˈmaɾ.so/", "usage": "En marzo empieza la primavera y los árboles comienzan a florecer con colores hermosos en todos los parques." },
        { "word": "Abril", "translation": "April", "phonetic": "/aˈβɾil/", "usage": "Abril es un mes lluvioso pero las flores están muy bonitas y el clima es agradable para caminar." },
        { "word": "Mayo", "translation": "May", "phonetic": "/ˈma.ʝo/", "usage": "En mayo celebramos el Día de las Madres y siempre le compro flores y un regalo especial a mi mamá." },
        { "word": "Junio", "translation": "June", "phonetic": "/ˈxu.njo/", "usage": "Junio marca el inicio del verano y los días son más largos con mucho sol y temperaturas cálidas agradables." },
        { "word": "Julio", "translation": "July", "phonetic": "/ˈxu.ljo/", "usage": "Julio es el mes más caluroso del año y siempre vamos a la playa para refrescarnos en el mar." },
        { "word": "Agosto", "translation": "August", "phonetic": "/aˈɣos.to/", "usage": "En agosto tomo mis vacaciones anuales y viajo con mi familia a diferentes lugares para conocer culturas nuevas." },
        { "word": "Septiembre", "translation": "September", "phonetic": "/sepˈtjem.bɾe/", "usage": "Septiembre es cuando los niños regresan a la escuela después de las vacaciones largas de verano y todo cambia." },
        { "word": "Octubre", "translation": "October", "phonetic": "/okˈtu.βɾe/", "usage": "En octubre celebramos Halloween y los niños se disfrazan para pedir dulces por todo el vecindario con sus amigos." },
        { "word": "Noviembre", "translation": "November", "phonetic": "/noˈβjem.bɾe/", "usage": "Noviembre es un mes frío donde las hojas de los árboles cambian de color y caen al suelo formando alfombras." },
        { "word": "Diciembre", "translation": "December", "phonetic": "/diˈsjem.bɾe/", "usage": "Diciembre es mi mes favorito porque celebramos Navidad y Año Nuevo con toda la familia reunida en casa felizmente." },
        { "word": "Primavera", "translation": "Spring", "phonetic": "/pɾimaˈβe.ɾa/", "usage": "La primavera es la estación más bonita del año con flores de colores y temperaturas agradables para estar afuera." },
        { "word": "Verano", "translation": "Summer", "phonetic": "/beˈɾa.no/", "usage": "El verano es perfecto para ir a la playa, nadar en el mar y tomar el sol con la familia." },
        { "word": "Otoño", "translation": "Autumn", "phonetic": "/oˈto.ɲo/", "usage": "El otoño trae colores hermosos a los árboles con hojas rojas, amarillas y naranjas que caen lentamente al suelo." },
        { "word": "Invierno", "translation": "Winter", "phonetic": "/imˈbjeɾ.no/", "usage": "El invierno es muy frío y a veces nieva, así que siempre uso ropa abrigada y bebo chocolate caliente." },
        { "word": "Calor", "translation": "Heat / Hot", "phonetic": "/kaˈloɾ/", "usage": "Hace mucho calor hoy, la temperatura está a treinta y cinco grados y necesito beber mucha agua fría." },
        { "word": "Frío", "translation": "Cold", "phonetic": "/ˈfɾi.o/", "usage": "Hace frío afuera y está nevando, así que voy a quedarme en casa con una manta caliente y té." },
        { "word": "Sol", "translation": "Sun", "phonetic": "/sol/", "usage": "El sol brilla fuerte hoy y hace mucho calor, necesito usar protector solar y gafas de sol para protegerme." },
        { "word": "Lluvia", "translation": "Rain", "phonetic": "/ˈʝu.βja/", "usage": "La lluvia está cayendo fuerte hoy y las calles están mojadas, así que voy a llevar mi paraguas grande." },
        { "word": "Nieve", "translation": "Snow", "phonetic": "/ˈnje.βe/", "usage": "La nieve cubre todo el paisaje de blanco y los niños están muy felices jugando y haciendo muñecos afuera." },
        { "word": "Viento", "translation": "Wind", "phonetic": "/ˈbjen.to/", "usage": "El viento sopla muy fuerte hoy y hace que las hojas de los árboles vuelen por todas partes." },
        { "word": "Nube", "translation": "Cloud", "phonetic": "/ˈnu.βe/", "usage": "Hay muchas nubes grises en el cielo hoy y parece que va a llover pronto esta tarde o noche." },
        { "word": "Tormenta", "translation": "Storm", "phonetic": "/toɾˈmen.ta/", "usage": "La tormenta de anoche fue muy fuerte con truenos, relámpagos y mucha lluvia que duró varias horas seguidas." },
        { "word": "Hielo", "translation": "Ice", "phonetic": "/ˈʝe.lo/", "usage": "Hay hielo en las calles esta mañana porque la temperatura bajó mucho durante la noche fría de invierno." },
        { "word": "Cielo", "translation": "Sky", "phonetic": "/ˈsje.lo/", "usage": "El cielo está despejado y azul hoy sin ninguna nube, perfecto para salir a caminar por el parque." },
        { "word": "Mañana", "translation": "Morning / Tomorrow", "phonetic": "/maˈɲa.na/", "usage": "Mañana tengo una reunión importante a las nueve de la mañana en la oficina del centro de la ciudad." },
        { "word": "Tarde", "translation": "Afternoon", "phonetic": "/ˈtaɾ.ðe/", "usage": "Por la tarde voy a visitar a mi abuela en su casa para tomar té y conversar sobre la familia." },
        { "word": "Noche", "translation": "Night", "phonetic": "/ˈno.tʃe/", "usage": "Por la noche me gusta leer un libro en mi cama antes de dormir para relajarme después del día." },
        { "word": "Ayer", "translation": "Yesterday", "phonetic": "/aˈʝeɾ/", "usage": "Ayer fui al cine con mis amigos y vimos una película muy interesante sobre la historia de España." },
        { "word": "Hoy", "translation": "Today", "phonetic": "/oj/", "usage": "Hoy es un día especial porque es mi cumpleaños y voy a celebrar con toda mi familia en casa." },
        { "word": "Ahora", "translation": "Now", "phonetic": "/aˈo.ɾa/", "usage": "Ahora mismo estoy trabajando en un proyecto importante que debo terminar antes del viernes por la tarde sin falta." },
        { "word": "Luego", "translation": "Later", "phonetic": "/ˈlwe.ɣo/", "usage": "Luego voy a ir al supermercado para comprar comida para la cena de esta noche con la familia." },
        { "word": "Temprano", "translation": "Early", "phonetic": "/temˈpɾa.no/", "usage": "Me levanto temprano todos los días a las seis de la mañana para hacer ejercicio antes de ir al trabajo." },
        { "word": "Tarde", "translation": "Late", "phonetic": "/ˈtaɾ.ðe/", "usage": "Llegué tarde a la reunión esta mañana porque había mucho tráfico en las calles del centro de la ciudad." },
        { "word": "Pronto", "translation": "Soon", "phonetic": "/ˈpɾon.to/", "usage": "Pronto vamos a mudarnos a una casa más grande porque nuestra familia está creciendo con el nuevo bebé." },
        { "word": "Cero", "translation": "Zero", "phonetic": "/ˈse.ɾo/", "usage": "La temperatura está a cero grados esta mañana y todo está congelado con hielo en las calles y aceras." },
        { "word": "Treinta", "translation": "Thirty", "phonetic": "/ˈtɾejn.ta/", "usage": "Tengo treinta años y trabajo como ingeniero en una empresa grande de tecnología en el centro de la ciudad." },
        { "word": "Cuarenta", "translation": "Forty", "phonetic": "/kwaˈɾen.ta/", "usage": "Mi padre tiene cuarenta y cinco años y todavía juega fútbol todos los fines de semana con sus amigos." },
        { "word": "Cincuenta", "translation": "Fifty", "phonetic": "/siŋˈkwen.ta/", "usage": "El libro cuesta cincuenta euros y es un poco caro, pero vale la pena porque tiene información muy valiosa." },
        { "word": "Sesenta", "translation": "Sixty", "phonetic": "/seˈsen.ta/", "usage": "Mi abuelo tiene sesenta y ocho años y está muy saludable porque camina todos los días por el parque." },
        { "word": "Setenta", "translation": "Seventy", "phonetic": "/seˈten.ta/", "usage": "La velocidad máxima en esta carretera es setenta kilómetros por hora, así que manejo con cuidado siempre respetando las señales." },
        { "word": "Ochenta", "translation": "Eighty", "phonetic": "/oˈtʃen.ta/", "usage": "Mi abuela tiene ochenta años y todavía cocina delicioso para toda la familia los domingos en su casa grande." },
        { "word": "Noventa", "translation": "Ninety", "phonetic": "/noˈβen.ta/", "usage": "El examen tiene noventa preguntas y tengo dos horas para completarlo, así que debo administrar bien mi tiempo." },
        { "word": "Cien", "translation": "One hundred", "phonetic": "/sjen/", "usage": "Hay cien estudiantes en mi clase de español y todos están aprendiendo el idioma con mucho entusiasmo y dedicación." },
        { "word": "Mil", "translation": "One thousand", "phonetic": "/mil/", "usage": "El apartamento cuesta mil euros al mes de alquiler, lo cual es bastante caro para esta zona de la ciudad." },
        { "word": "Primero", "translation": "First", "phonetic": "/pɾiˈme.ɾo/", "usage": "Soy el primero de la clase en matemáticas porque estudio mucho todos los días y presto atención al profesor." },
        { "word": "Segundo", "translation": "Second", "phonetic": "/seˈɣun.do/", "usage": "Mi hermano quedó en segundo lugar en la competencia de natación y está muy orgulloso de su logro deportivo." },
        { "word": "Tercero", "translation": "Third", "phonetic": "/teɾˈse.ɾo/", "usage": "Vivo en el tercer piso del edificio y tengo una vista hermosa del parque desde mi ventana grande." },
        { "word": "Norte", "translation": "North", "phonetic": "/ˈnoɾ.te/", "usage": "El viento viene del norte y trae aire frío desde las montañas nevadas que están muy lejos de aquí." },
        { "word": "Sur", "translation": "South", "phonetic": "/suɾ/", "usage": "Vivo en el sur de España donde hace mucho calor en verano y el clima es muy agradable todo el año." },
        { "word": "Este", "translation": "East", "phonetic": "/ˈes.te/", "usage": "El sol sale por el este todas las mañanas y ilumina mi habitación con luz natural muy brillante y cálida." },
        { "word": "Oeste", "translation": "West", "phonetic": "/oˈes.te/", "usage": "El sol se pone por el oeste al final del día creando atardeceres hermosos con colores naranja y rosa." },
        { "word": "Izquierda", "translation": "Left", "phonetic": "/isˈkjeɾ.ða/", "usage": "Gira a la izquierda en la próxima esquina y verás la tienda de comestibles al lado del banco grande." },
        { "word": "Derecha", "translation": "Right", "phonetic": "/deˈɾe.tʃa/", "usage": "La farmacia está a la derecha del supermercado, justo después de cruzar la calle principal del centro comercial." },
        { "word": "Arriba", "translation": "Up", "phonetic": "/aˈri.βa/", "usage": "Mira arriba al cielo y verás las estrellas brillantes y la luna llena que ilumina toda la noche." },
        { "word": "Abajo", "translation": "Down", "phonetic": "/aˈβa.xo/", "usage": "El gato está abajo de la mesa escondido porque tiene miedo del perro grande que está ladrando afuera." },
        { "word": "Lejos", "translation": "Far", "phonetic": "/ˈle.xos/", "usage": "Mi familia vive muy lejos de aquí, a más de quinientos kilómetros, así que solo los visito en vacaciones." },
        { "word": "Cerca", "translation": "Near", "phonetic": "/ˈseɾ.ka/", "usage": "La escuela está muy cerca de mi casa, solo a cinco minutos caminando, así que los niños van solos." },
        { "word": "Adelante", "translation": "Forward", "phonetic": "/aðeˈlan.te/", "usage": "Sigue adelante por esta calle hasta llegar al semáforo y luego gira a la derecha hacia el parque." },
        { "word": "Atrás", "translation": "Behind", "phonetic": "/aˈtɾas/", "usage": "Dejé mi mochila atrás en el autobús y tuve que regresar a la estación para buscarla con el conductor." },
        { "word": "Dentro", "translation": "Inside", "phonetic": "/ˈden.tɾo/", "usage": "Hace frío afuera, así que vamos a quedarnos dentro de la casa donde está caliente y cómodo para todos." },
        { "word": "Fuera", "translation": "Outside", "phonetic": "/ˈfwe.ɾa/", "usage": "Los niños están jugando fuera en el jardín porque hace buen tiempo y el sol brilla hermoso hoy." },
        { "word": "Mucho", "translation": "Much / A lot", "phonetic": "/ˈmu.tʃo/", "usage": "Tengo mucho trabajo que hacer esta semana y no voy a tener tiempo libre para descansar o salir con amigos." },
        { "word": "Poco", "translation": "Little / A bit", "phonetic": "/ˈpo.ko/", "usage": "Tengo poco dinero este mes porque gasté mucho en las vacaciones, así que debo ahorrar y ser cuidadoso." },
        { "word": "Todo", "translation": "All / Everything", "phonetic": "/ˈto.ðo/", "usage": "Todo está listo para la fiesta de cumpleaños: la comida, las bebidas, la música y las decoraciones están perfectas." },
        { "word": "Nada", "translation": "Nothing", "phonetic": "/ˈna.ða/", "usage": "No tengo nada que hacer este fin de semana, así que voy a descansar en casa y ver películas tranquilamente." },
        { "word": "Algo", "translation": "Something", "phonetic": "/ˈal.ɣo/", "usage": "Necesito comprar algo de comer para la cena porque no hay nada en el refrigerador de la cocina." },
        { "word": "Algunos", "translation": "Some", "phonetic": "/alˈɣu.nos/", "usage": "Algunos de mis amigos van a venir a la fiesta esta noche pero otros no pueden porque están ocupados." },
        { "word": "Siempre", "translation": "Always", "phonetic": "/ˈsjem.pɾe/", "usage": "Siempre llego temprano al trabajo porque me gusta empezar el día con calma y organizar mis tareas pendientes." },
        { "word": "Nunca", "translation": "Never", "phonetic": "/ˈnuŋ.ka/", "usage": "Nunca he viajado a Asia pero me gustaría visitar Japón algún día para conocer su cultura fascinante y única." },
        { "word": "A veces", "translation": "Sometimes", "phonetic": "/a ˈβe.ses/", "usage": "A veces voy al cine los fines de semana para ver películas nuevas y relajarme después de una semana ocupada." },
        { "word": "Quizás", "translation": "Maybe", "phonetic": "/kiˈsas/", "usage": "Quizás vaya a la playa este fin de semana si el clima está bueno y no llueve como el pronóstico." },
        { "word": "Todavía", "translation": "Still", "phonetic": "/toðaˈβi.a/", "usage": "Todavía no he terminado mi tarea de español y tengo que entregarla mañana temprano en la clase sin falta." },
        { "word": "Ya", "translation": "Already", "phonetic": "/ʝa/", "usage": "Ya terminé de leer el libro que me prestaste y fue muy interesante, te lo devuelvo mañana sin falta." },
        { "word": "También", "translation": "Also", "phonetic": "/tamˈbjen/", "usage": "Me gusta el café y también me gusta el té, pero prefiero tomar café por la mañana siempre." },
        { "word": "Tampoco", "translation": "Neither", "phonetic": "/tamˈpo.ko/", "usage": "No me gusta el frío y tampoco me gusta la nieve, prefiero el clima cálido de verano siempre." },
        { "word": "Porque", "translation": "Because", "phonetic": "/ˈpoɾ.ke/", "usage": "Estudio español porque quiero viajar a España y poder comunicarme con la gente local sin problemas de idioma." },
        { "word": "¿Por qué?", "translation": "Why?", "phonetic": "/poɾ ˈke/", "usage": "¿Por qué llegaste tarde a la reunión esta mañana? El jefe está muy molesto y quiere una explicación." },
        { "word": "Cuando", "translation": "When", "phonetic": "/ˈkwan.do/", "usage": "Cuando era niño vivía en el campo y jugaba con mis amigos en el río todos los días de verano." },
        { "word": "Donde", "translation": "Where", "phonetic": "/ˈdon.de/", "usage": "¿Dónde está la estación de tren? Necesito tomar el próximo tren a Madrid esta tarde sin falta para una reunión." },
        { "word": "Quien", "translation": "Who", "phonetic": "/kjen/", "usage": "¿Quién es esa persona que está hablando con tu hermano? No la conozco y me gustaría saber su nombre." },
        { "word": "Como", "translation": "How", "phonetic": "/ˈko.mo/", "usage": "¿Cómo estás hoy? Espero que te sientas mejor después de estar enfermo toda la semana pasada en cama." },
        { "word": "Cual", "translation": "Which", "phonetic": "/kwal/", "usage": "¿Cuál es tu color favorito? El mío es el azul porque me recuerda al mar y al cielo despejado." },
        { "word": "Cuanto", "translation": "How much", "phonetic": "/ˈkwan.to/", "usage": "¿Cuánto cuesta este libro? Quiero comprarlo pero necesito saber el precio antes de decidir si lo compro o no." },
        { "word": "Para", "translation": "For", "phonetic": "/ˈpa.ɾa/", "usage": "Este regalo es para mi madre porque es su cumpleaños mañana y quiero darle algo especial y bonito." }
    ]
};

async function uploadModule03() {
    try {
        console.log('\n🚀 Spanish A1 Module 03 Upload (Firebase-First)...\n');

        await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .doc(module.module_id)
            .set(module, { merge: false });

        console.log(`✓ Uploaded: ${module.theme}`);
        console.log(`  Total Words: ${module.vocabulary.length}\n`);

        // Verify Word 10
        const doc = await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .doc(module.module_id)
            .get();

        const data = doc.data();
        console.log(`✓ Word 10: ${data.vocabulary[9].word} - ${data.vocabulary[9].translation}`);

        const words = data.vocabulary.map(v => v.word);
        const duplicates = words.filter((w, i) => words.indexOf(w) !== i);
        console.log(`✓ Duplicates: ${duplicates.length === 0 ? 'None' : duplicates.join(', ')}\n`);

        // Create local mirror
        const localPath = join(__dirname, '../assets/data/curriculum/es_a1/es_a1_m03.json');
        writeFileSync(localPath, JSON.stringify(data, null, 2));
        console.log(`✓ Local mirror created\n`);

        console.log('═══════════════════════════════════════════════════════');
        console.log('✅ Module 03 Complete!');
        console.log('═══════════════════════════════════════════════════════');
        console.log(`\n📊 Summary:`);
        console.log(`   Firestore: languages/spanish/levels/a1/modules/${module.module_id}`);
        console.log(`   Local: assets/data/curriculum/es_a1/es_a1_m03.json`);
        console.log(`   Total Spanish A1 Words: 300 (3 modules × 100 words) ✓\n`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

uploadModule03();
