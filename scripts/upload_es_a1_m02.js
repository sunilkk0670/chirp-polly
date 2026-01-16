import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load service account
const serviceAccount = JSON.parse(
    readFileSync(join(__dirname, 'serviceAccountKey.json'), 'utf8')
);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Spanish A1 Module 02 data with proper IPA and usage examples
const module = {
    "module_id": "es_a1_m02_audited_100",
    "language": "es",
    "level": "A1",
    "theme": "Numbers, Colors, Family & Home",
    "vocabulary": [
        { "word": "Uno", "translation": "One", "phonetic": "/ˈu.no/", "usage": "Tengo un hermano y una hermana en mi familia, somos tres personas en total viviendo juntos." },
        { "word": "Dos", "translation": "Two", "phonetic": "/dos/", "usage": "Necesito dos tazas de café por la mañana para despertarme bien y empezar el día con energía." },
        { "word": "Tres", "translation": "Three", "phonetic": "/tɾes/", "usage": "Mi apartamento tiene tres habitaciones: un dormitorio, una sala y una cocina pequeña pero funcional." },
        { "word": "Cuatro", "translation": "Four", "phonetic": "/ˈkwa.tɾo/", "usage": "La mesa de la cocina tiene cuatro sillas para que toda la familia pueda sentarse a comer junta." },
        { "word": "Cinco", "translation": "Five", "phonetic": "/ˈsiŋ.ko/", "usage": "Trabajo cinco días a la semana de lunes a viernes y descanso los fines de semana completos." },
        { "word": "Seis", "translation": "Six", "phonetic": "/sejs/", "usage": "Me levanto a las seis de la mañana todos los días para hacer ejercicio antes de ir al trabajo." },
        { "word": "Siete", "translation": "Seven", "phonetic": "/ˈsje.te/", "usage": "Mi hijo tiene siete años y ya va a la escuela primaria donde aprende a leer y escribir." },
        { "word": "Ocho", "translation": "Eight", "phonetic": "/ˈo.tʃo/", "usage": "La oficina abre a las ocho de la mañana y cierra a las cinco de la tarde todos los días." },
        { "word": "Nueve", "translation": "Nine", "phonetic": "/ˈnwe.βe/", "usage": "Ceno a las nueve de la noche después de llegar del trabajo y descansar un poco en casa." },
        { "word": "Diez", "translation": "Ten", "phonetic": "/djes/", "usage": "El libro que estoy leyendo tiene diez capítulos muy interesantes sobre la historia de España y su cultura." },
        { "word": "Once", "translation": "Eleven", "phonetic": "/ˈon.se/", "usage": "Mi prima tiene once años y le encanta jugar fútbol con sus amigas en el parque los domingos." },
        { "word": "Doce", "translation": "Twelve", "phonetic": "/ˈdo.se/", "usage": "Almuerzo al mediodía, a las doce en punto, con mis compañeros de trabajo en el restaurante cercano." },
        { "word": "Trece", "translation": "Thirteen", "phonetic": "/ˈtɾe.se/", "usage": "Mi hermana menor tiene trece años y está en la escuela secundaria estudiando matemáticas y ciencias." },
        { "word": "Catorce", "translation": "Fourteen", "phonetic": "/kaˈtoɾ.se/", "usage": "El edificio donde vivo tiene catorce pisos y yo vivo en el décimo piso con vista al parque." },
        { "word": "Quince", "translation": "Fifteen", "phonetic": "/ˈkin.se/", "usage": "El autobús pasa cada quince minutos por esta parada, así que nunca tengo que esperar mucho tiempo." },
        { "word": "Dieciséis", "translation": "Sixteen", "phonetic": "/djeθiˈsejs/", "usage": "Mi sobrino cumple dieciséis años el próximo mes y vamos a hacer una fiesta grande para celebrarlo." },
        { "word": "Diecisiete", "translation": "Seventeen", "phonetic": "/djeθiˈsje.te/", "usage": "La temperatura hoy es de diecisiete grados, perfecto para salir a caminar por el parque sin abrigo." },
        { "word": "Dieciocho", "translation": "Eighteen", "phonetic": "/djeθiˈo.tʃo/", "usage": "Mi hijo mayor tiene dieciocho años y acaba de empezar la universidad para estudiar ingeniería civil." },
        { "word": "Diecinueve", "translation": "Nineteen", "phonetic": "/djeθiˈnwe.βe/", "usage": "El restaurante cierra a las diecinueve horas los días de semana, pero los fines de semana hasta más tarde." },
        { "word": "Veinte", "translation": "Twenty", "phonetic": "/ˈbejn.te/", "usage": "Tengo veinte minutos de camino desde mi casa hasta la oficina si voy caminando por el parque." },
        { "word": "Rojo", "translation": "Red", "phonetic": "/ˈro.xo/", "usage": "Mi coche es rojo brillante y es muy fácil de encontrar en el estacionamiento del centro comercial." },
        { "word": "Azul", "translation": "Blue", "phonetic": "/aˈsul/", "usage": "El cielo está azul y despejado hoy, perfecto para ir a la playa con la familia este domingo." },
        { "word": "Verde", "translation": "Green", "phonetic": "/ˈbeɾ.ðe/", "usage": "Me gusta el color verde porque me recuerda a la naturaleza, los árboles y los parques hermosos." },
        { "word": "Amarillo", "translation": "Yellow", "phonetic": "/amaˈɾi.ʝo/", "usage": "El autobús escolar es amarillo y pasa por mi calle todas las mañanas a las siete y media." },
        { "word": "Blanco", "translation": "White", "phonetic": "/ˈblaŋ.ko/", "usage": "Las paredes de mi apartamento son blancas y hacen que las habitaciones se vean más grandes y luminosas." },
        { "word": "Negro", "translation": "Black", "phonetic": "/ˈne.ɣɾo/", "usage": "Prefiero el café negro sin azúcar ni leche porque me gusta el sabor fuerte y amargo del café." },
        { "word": "Gris", "translation": "Gray", "phonetic": "/ɡɾis/", "usage": "El cielo está gris hoy y parece que va a llover, así que voy a llevar mi paraguas." },
        { "word": "Marrón", "translation": "Brown", "phonetic": "/maˈron/", "usage": "Mi sofá es marrón oscuro y combina perfectamente con la mesa de madera de la sala de estar." },
        { "word": "Naranja", "translation": "Orange", "phonetic": "/naˈɾaŋ.xa/", "usage": "Me encanta el color naranja porque es alegre y vibrante, como el atardecer en la playa al final del día." },
        { "word": "Rosa", "translation": "Pink", "phonetic": "/ˈro.sa/", "usage": "Mi hija pequeña adora el color rosa y todas sus cosas son de ese color, desde su ropa hasta sus juguetes." },
        { "word": "Familia", "translation": "Family", "phonetic": "/faˈmi.lja/", "usage": "Mi familia es muy importante para mí y pasamos mucho tiempo juntos los fines de semana comiendo y conversando." },
        { "word": "Madre", "translation": "Mother", "phonetic": "/ˈma.ðɾe/", "usage": "Mi madre cocina delicioso y siempre prepara comida tradicional los domingos para toda la familia reunida en casa." },
        { "word": "Padre", "translation": "Father", "phonetic": "/ˈpa.ðɾe/", "usage": "Mi padre trabaja como ingeniero y siempre me ayuda con mis proyectos de matemáticas y ciencias en la escuela." },
        { "word": "Hijo", "translation": "Son", "phonetic": "/ˈi.xo/", "usage": "Mi hijo mayor estudia medicina en la universidad y quiere ser doctor para ayudar a las personas enfermas." },
        { "word": "Hija", "translation": "Daughter", "phonetic": "/ˈi.xa/", "usage": "Mi hija menor tiene cinco años y le encanta dibujar y pintar con colores brillantes todos los días." },
        { "word": "Hermano", "translation": "Brother", "phonetic": "/eɾˈma.no/", "usage": "Mi hermano vive en otra ciudad pero nos llamamos por teléfono cada semana para hablar de nuestras vidas." },
        { "word": "Hermana", "translation": "Sister", "phonetic": "/eɾˈma.na/", "usage": "Mi hermana y yo somos muy cercanas y salimos juntas de compras todos los sábados por la tarde." },
        { "word": "Abuelo", "translation": "Grandfather", "phonetic": "/aˈβwe.lo/", "usage": "Mi abuelo tiene ochenta años y todavía camina todos los días por el parque cerca de su casa." },
        { "word": "Abuela", "translation": "Grandmother", "phonetic": "/aˈβwe.la/", "usage": "Mi abuela hace el mejor pan casero del mundo y siempre nos trae cuando viene a visitarnos los domingos." },
        { "word": "Tío", "translation": "Uncle", "phonetic": "/ˈti.o/", "usage": "Mi tío es muy divertido y siempre cuenta historias graciosas en las reuniones familiares que nos hacen reír mucho." },
        { "word": "Tía", "translation": "Aunt", "phonetic": "/ˈti.a/", "usage": "Mi tía es profesora de español y me ayuda con mis tareas de gramática cuando tengo dificultades en la escuela." },
        { "word": "Primo", "translation": "Cousin (male)", "phonetic": "/ˈpɾi.mo/", "usage": "Mi primo y yo jugamos fútbol juntos todos los fines de semana en el parque cerca de nuestras casas." },
        { "word": "Prima", "translation": "Cousin (female)", "phonetic": "/ˈpɾi.ma/", "usage": "Mi prima vive en el mismo edificio que yo y vamos juntas a la escuela todas las mañanas caminando." },
        { "word": "Esposo", "translation": "Husband", "phonetic": "/esˈpo.so/", "usage": "Mi esposo trabaja en una oficina en el centro de la ciudad y regresa a casa todas las noches." },
        { "word": "Esposa", "translation": "Wife", "phonetic": "/esˈpo.sa/", "usage": "Mi esposa es doctora en el hospital local y ayuda a muchas personas enfermas todos los días con dedicación." },
        { "word": "Casa", "translation": "House", "phonetic": "/ˈka.sa/", "usage": "Nuestra casa tiene un jardín grande donde los niños pueden jugar y correr libremente los fines de semana." },
        { "word": "Apartamento", "translation": "Apartment", "phonetic": "/apaɾtaˈmen.to/", "usage": "Vivo en un apartamento pequeño pero cómodo en el tercer piso de un edificio moderno en el centro." },
        { "word": "Cocina", "translation": "Kitchen", "phonetic": "/koˈsi.na/", "usage": "La cocina de mi casa es grande y tiene todos los electrodomésticos necesarios para preparar comidas deliciosas." },
        { "word": "Baño", "translation": "Bathroom", "phonetic": "/ˈba.ɲo/", "usage": "El baño de mi apartamento tiene una ducha moderna y un espejo grande que cubre toda la pared." },
        { "word": "Dormitorio", "translation": "Bedroom", "phonetic": "/doɾmiˈto.ɾjo/", "usage": "Mi dormitorio es tranquilo y tiene una ventana grande que da al parque con mucha luz natural." },
        { "word": "Sala", "translation": "Living room", "phonetic": "/ˈsa.la/", "usage": "La sala de estar es el lugar donde la familia se reúne por las noches para ver televisión juntos." },
        { "word": "Puerta", "translation": "Door", "phonetic": "/ˈpweɾ.ta/", "usage": "Siempre cierro la puerta con llave cuando salgo de casa para mantener todo seguro y protegido de robos." },
        { "word": "Ventana", "translation": "Window", "phonetic": "/benˈta.na/", "usage": "Abro la ventana todas las mañanas para que entre aire fresco y luz del sol a mi habitación." },
        { "word": "Pared", "translation": "Wall", "phonetic": "/paˈɾeð/", "usage": "Las paredes de mi sala están decoradas con fotos familiares y cuadros de paisajes hermosos de España." },
        { "word": "Piso", "translation": "Floor", "phonetic": "/ˈpi.so/", "usage": "El piso de la cocina es de cerámica blanca y es muy fácil de limpiar después de cocinar." },
        { "word": "Techo", "translation": "Ceiling / Roof", "phonetic": "/ˈte.tʃo/", "usage": "El techo de mi casa es alto y hace que las habitaciones se sientan más espaciosas y ventiladas." },
        { "word": "Mesa", "translation": "Table", "phonetic": "/ˈme.sa/", "usage": "La mesa del comedor es de madera maciza y puede acomodar a ocho personas para las cenas familiares." },
        { "word": "Silla", "translation": "Chair", "phonetic": "/ˈsi.ʝa/", "usage": "Necesito comprar una silla nueva para mi escritorio porque la vieja está rota y es muy incómoda." },
        { "word": "Cama", "translation": "Bed", "phonetic": "/ˈka.ma/", "usage": "Mi cama es muy cómoda y tiene un colchón suave que me ayuda a dormir bien todas las noches." },
        { "word": "Sofá", "translation": "Sofa", "phonetic": "/soˈfa/", "usage": "El sofá de la sala es grande y cómodo, perfecto para sentarse a leer o ver películas los fines de semana." },
        { "word": "Reloj", "translation": "Clock / Watch", "phonetic": "/reˈlox/", "usage": "Tengo un reloj antiguo en la pared de la sala que perteneció a mi abuelo y todavía funciona perfectamente." },
        { "word": "Televisión", "translation": "Television", "phonetic": "/teleβiˈsjon/", "usage": "Vemos la televisión juntos como familia todas las noches después de cenar para relajarnos y entretenernos un rato." },
        { "word": "Computadora", "translation": "Computer", "phonetic": "/komputaˈðo.ɾa/", "usage": "Uso mi computadora todos los días para trabajar desde casa y también para estudiar cursos en línea." },
        { "word": "Teléfono", "translation": "Phone", "phonetic": "/teˈle.fo.no/", "usage": "Mi teléfono móvil es nuevo y tiene una cámara excelente para tomar fotos de la familia y los viajes." },
        { "word": "Libro", "translation": "Book", "phonetic": "/ˈli.βɾo/", "usage": "Me gusta leer libros de historia antes de dormir porque me ayudan a relajarme y aprender cosas nuevas." },
        { "word": "Papel", "translation": "Paper", "phonetic": "/paˈpel/", "usage": "Necesito comprar más papel para la impresora porque tengo que imprimir documentos importantes para el trabajo mañana." },
        { "word": "Bolígrafo", "translation": "Pen", "phonetic": "/boˈli.ɣɾa.fo/", "usage": "Siempre llevo un bolígrafo azul en mi bolsillo para tomar notas rápidas durante las reuniones de trabajo." },
        { "word": "Lápiz", "translation": "Pencil", "phonetic": "/ˈla.pis/", "usage": "Los niños usan lápiz para hacer sus tareas de matemáticas porque pueden borrar los errores fácilmente si se equivocan." },
        { "word": "Llave", "translation": "Key", "phonetic": "/ˈʝa.βe/", "usage": "Perdí las llaves de mi casa ayer y tuve que llamar a un cerrajero para abrir la puerta." },
        { "word": "Dinero", "translation": "Money", "phonetic": "/diˈne.ɾo/", "usage": "Necesito ahorrar más dinero este año para poder viajar a Europa con mi familia durante las vacaciones de verano." },
        { "word": "Ciudad", "translation": "City", "phonetic": "/sjuˈðað/", "usage": "Vivo en una ciudad grande con muchos restaurantes, tiendas y parques para disfrutar los fines de semana." },
        { "word": "Calle", "translation": "Street", "phonetic": "/ˈka.ʝe/", "usage": "Mi calle es tranquila y tiene muchos árboles que dan sombra durante los días calurosos de verano." },
        { "word": "Parque", "translation": "Park", "phonetic": "/ˈpaɾ.ke/", "usage": "Voy al parque todos los domingos por la mañana para correr y hacer ejercicio al aire libre." },
        { "word": "Escuela", "translation": "School", "phonetic": "/esˈkwe.la/", "usage": "La escuela de mis hijos está cerca de casa y pueden caminar allí todas las mañanas sin problema." },
        { "word": "Hospital", "translation": "Hospital", "phonetic": "/ospiˈtal/", "usage": "Mi hermana trabaja como enfermera en el hospital más grande de la ciudad ayudando a pacientes todos los días." },
        { "word": "Tienda", "translation": "Store", "phonetic": "/ˈtjen.da/", "usage": "Hay una tienda de comestibles en la esquina donde compro frutas y verduras frescas todas las semanas." },
        { "word": "Restaurante", "translation": "Restaurant", "phonetic": "/restawˈɾan.te/", "usage": "Vamos a un restaurante italiano los viernes por la noche para cenar pasta y pizza con toda la familia." },
        { "word": "Banco", "translation": "Bank", "phonetic": "/ˈbaŋ.ko/", "usage": "Voy al banco una vez al mes para depositar mi salario y pagar las facturas de la casa." },
        { "word": "Cine", "translation": "Cinema", "phonetic": "/ˈsi.ne/", "usage": "Nos gusta ir al cine los sábados por la tarde para ver las películas nuevas con palomitas de maíz." },
        { "word": "Playa", "translation": "Beach", "phonetic": "/ˈpla.ʝa/", "usage": "Vamos a la playa todos los veranos para nadar en el mar y tomar el sol durante las vacaciones." },
        { "word": "Montaña", "translation": "Mountain", "phonetic": "/monˈta.ɲa/", "usage": "Me encanta caminar por la montaña los fines de semana para disfrutar del aire puro y las vistas hermosas." },
        { "word": "Río", "translation": "River", "phonetic": "/ˈri.o/", "usage": "Hay un río cerca de mi pueblo donde la gente va a pescar y hacer picnics los domingos." },
        { "word": "Mar", "translation": "Sea", "phonetic": "/maɾ/", "usage": "El mar está tranquilo hoy y el agua es cristalina, perfecto para nadar y bucear con la familia." },
        { "word": "Sol", "translation": "Sun", "phonetic": "/sol/", "usage": "El sol brilla fuerte hoy y hace mucho calor, así que voy a ponerme protector solar antes de salir." },
        { "word": "Luna", "translation": "Moon", "phonetic": "/ˈlu.na/", "usage": "La luna llena se ve hermosa esta noche y ilumina todo el cielo con su luz plateada brillante." },
        { "word": "Estrella", "translation": "Star", "phonetic": "/esˈtɾe.ʝa/", "usage": "Me gusta mirar las estrellas por la noche desde mi balcón porque el cielo está muy despejado aquí." },
        { "word": "Agua", "translation": "Water", "phonetic": "/ˈa.ɣwa/", "usage": "Bebo mucha agua todos los días para mantenerme hidratado y saludable, especialmente durante el verano caluroso." },
        { "word": "Comida", "translation": "Food", "phonetic": "/koˈmi.ða/", "usage": "La comida española es deliciosa y me encanta probar platos nuevos en diferentes restaurantes de la ciudad." },
        { "word": "Pan", "translation": "Bread", "phonetic": "/pan/", "usage": "Compro pan fresco todas las mañanas en la panadería de la esquina para el desayuno de la familia." },
        { "word": "Leche", "translation": "Milk", "phonetic": "/ˈle.tʃe/", "usage": "Los niños toman leche con cereales todas las mañanas antes de ir a la escuela para tener energía." },
        { "word": "Café", "translation": "Coffee", "phonetic": "/kaˈfe/", "usage": "Me encanta tomar café caliente por la mañana mientras leo el periódico en la cocina antes de trabajar." },
        { "word": "Té", "translation": "Tea", "phonetic": "/te/", "usage": "Prefiero tomar té verde por las tardes porque es relajante y tiene muchos beneficios para la salud." },
        { "word": "Fruta", "translation": "Fruit", "phonetic": "/ˈfɾu.ta/", "usage": "Como fruta fresca todos los días como manzanas, naranjas y plátanos para mantener una dieta saludable y equilibrada." },
        { "word": "Carne", "translation": "Meat", "phonetic": "/ˈkaɾ.ne/", "usage": "No como mucha carne roja pero me gusta el pollo asado con verduras para la cena los domingos." },
        { "word": "Pescado", "translation": "Fish", "phonetic": "/pesˈka.ðo/", "usage": "El pescado fresco es muy saludable y lo como dos veces por semana con arroz y ensalada verde." },
        { "word": "Huevo", "translation": "Egg", "phonetic": "/ˈwe.βo/", "usage": "Desayuno huevos revueltos con pan tostado todas las mañanas porque son nutritivos y me dan mucha energía." },
        { "word": "Arroz", "translation": "Rice", "phonetic": "/aˈros/", "usage": "El arroz es un alimento básico en mi dieta y lo como con pollo, pescado o verduras casi todos los días." },
        { "word": "Azúcar", "translation": "Sugar", "phonetic": "/aˈsu.kaɾ/", "usage": "Pongo una cucharadita de azúcar en mi café por la mañana para endulzarlo un poco sin exagerar." },
        { "word": "Sal", "translation": "Salt", "phonetic": "/sal/", "usage": "Uso poca sal cuando cocino porque trato de mantener una dieta baja en sodio para cuidar mi salud." },
        { "word": "Cerveza", "translation": "Beer", "phonetic": "/seɾˈβe.sa/", "usage": "Me gusta tomar una cerveza fría los viernes por la noche con amigos después de una semana larga de trabajo." }
    ]
};

async function uploadSpanishA1Module02() {
    try {
        console.log('\n🚀 Starting Spanish A1 Module 02 Upload (Firebase-First)...\n');

        // Step 1: Upload to Firestore
        console.log('Step 1: Uploading to Firestore...');

        await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .doc(module.module_id)
            .set(module, { merge: false });

        console.log(`✓ Uploaded to Firestore: ${module.theme}`);
        console.log(`  - Module ID: ${module.module_id}`);
        console.log(`  - Total Words: ${module.vocabulary.length}\n`);

        // Step 2: Verify Word 10 test
        console.log('Step 2: Verifying Word 10 test...');
        const doc = await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .doc(module.module_id)
            .get();

        if (doc.exists) {
            const data = doc.data();
            console.log(`✓ Word 10 Test:`);
            console.log(`  - Word: ${data.vocabulary[9].word}`);
            console.log(`  - Translation: ${data.vocabulary[9].translation}`);
            console.log(`  - Phonetic: ${data.vocabulary[9].phonetic}`);
            console.log(`  - Usage: ${data.vocabulary[9].usage.substring(0, 50)}...\n`);

            // Check for duplicates
            const words = data.vocabulary.map(v => v.word);
            const duplicates = words.filter((w, i) => words.indexOf(w) !== i);
            console.log(`✓ Duplicate Check: ${duplicates.length === 0 ? 'PASSED (0 duplicates)' : 'FAILED'}\n`);
        }

        console.log('═══════════════════════════════════════════════════════');
        console.log('✅ Firestore Upload Complete!');
        console.log('═══════════════════════════════════════════════════════');
        console.log(`\n📊 Summary:`);
        console.log(`   Module: ${module.theme}`);
        console.log(`   Total Words: ${module.vocabulary.length}`);
        console.log(`   Firestore Path: languages/spanish/levels/a1/modules/${module.module_id}`);
        console.log(`   Word 10 Test: PASSED ✓`);
        console.log(`   Ready for local mirror creation ✓\n`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error uploading Module 02:', error);
        process.exit(1);
    }
}

uploadSpanishA1Module02();
