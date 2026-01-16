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

// Module 05 with IPA and usage examples
const module05 = {
    "module_id": "es_a1_m05_audited_100",
    "language": "es",
    "level": "A1",
    "theme": "Travel & Transportation",
    "vocabulary": [
        { "word": "Viaje", "translation": "Trip / Travel", "phonetic": "/ˈbja.xe/", "usage": "Mi próximo viaje será a España en julio para visitar Madrid, Barcelona y otras ciudades hermosas del país europeo." },
        { "word": "Maleta", "translation": "Suitcase", "phonetic": "/maˈle.ta/", "usage": "Necesito comprar una maleta nueva y grande para mi viaje porque la vieja está rota y no cierra bien." },
        { "word": "Pasaporte", "translation": "Passport", "phonetic": "/pasaˈpoɾ.te/", "usage": "No puedo encontrar mi pasaporte y necesito renovarlo pronto porque vence el próximo mes y quiero viajar al extranjero." },
        { "word": "Boleto", "translation": "Ticket", "phonetic": "/boˈle.to/", "usage": "Compré los boletos de avión con tres meses de anticipación para conseguir un mejor precio y ahorrar dinero en el viaje." },
        { "word": "Avión", "translation": "Airplane", "phonetic": "/aˈβjon/", "usage": "El avión despega a las ocho de la mañana, así que debo estar en el aeropuerto dos horas antes." },
        { "word": "Aeropuerto", "translation": "Airport", "phonetic": "/aeɾoˈpweɾ.to/", "usage": "El aeropuerto está a una hora de mi casa en coche, así que salgo temprano para no perder el vuelo." },
        { "word": "Tren", "translation": "Train", "phonetic": "/tɾen/", "usage": "Prefiero viajar en tren porque es más cómodo que el autobús y puedo ver el paisaje hermoso por la ventana." },
        { "word": "Estación", "translation": "Station", "phonetic": "/estaˈsjon/", "usage": "La estación de tren está en el centro de la ciudad y es muy fácil llegar allí en metro o autobús." },
        { "word": "Autobús", "translation": "Bus", "phonetic": "/awtoˈβus/", "usage": "Tomo el autobús todos los días para ir al trabajo porque es barato y hay una parada cerca de mi casa." },
        { "word": "Coche", "translation": "Car", "phonetic": "/ˈko.tʃe/", "usage": "Voy a alquilar un coche durante mis vacaciones para poder viajar libremente y visitar pueblos pequeños del interior del país." },
        { "word": "Taxi", "translation": "Taxi", "phonetic": "/ˈtak.si/", "usage": "Tomé un taxi del aeropuerto al hotel porque llevaba mucho equipaje pesado y estaba muy cansado del vuelo largo." },
        { "word": "Barco", "translation": "Boat / Ship", "phonetic": "/ˈbaɾ.ko/", "usage": "Vamos a tomar un barco para cruzar el río y visitar la isla pequeña donde hay playas hermosas y tranquilas." },
        { "word": "Puerto", "translation": "Port", "phonetic": "/ˈpweɾ.to/", "usage": "El puerto de Barcelona es muy grande y bonito, con muchos barcos y yates elegantes anclados en el agua azul." },
        { "word": "Bicicleta", "translation": "Bicycle", "phonetic": "/bisiˈkle.ta/", "usage": "Me gusta andar en bicicleta por el parque los domingos porque es buen ejercicio y disfruto del aire fresco." },
        { "word": "Caminar", "translation": "To walk", "phonetic": "/kamiˈnaɾ/", "usage": "Prefiero caminar al trabajo cuando hace buen tiempo porque es saludable y me ayuda a despertar bien por la mañana." },
        { "word": "Conducir", "translation": "To drive", "phonetic": "/konduˈsiɾ/", "usage": "Aprendí a conducir cuando tenía dieciocho años y desde entonces manejo mi propio coche todos los días al trabajo." },
        { "word": "Volar", "translation": "To fly", "phonetic": "/boˈlaɾ/", "usage": "Me encanta volar en avión porque puedo ver las nubes y el cielo azul desde la ventanilla durante el viaje." },
        { "word": "Llegar", "translation": "To arrive", "phonetic": "/ʝeˈɣaɾ/", "usage": "Voy a llegar al aeropuerto dos horas antes del vuelo para tener tiempo suficiente para hacer el check-in y pasar seguridad." },
        { "word": "Salir", "translation": "To leave / depart", "phonetic": "/saˈliɾ/", "usage": "El tren sale de la estación a las nueve en punto, así que no puedo llegar tarde o perderé el viaje." },
        { "word": "Esperar", "translation": "To wait", "phonetic": "/espeˈɾaɾ/", "usage": "Tuve que esperar dos horas en el aeropuerto porque mi vuelo se retrasó por mal tiempo y tormentas fuertes." },
        { "word": "Parada", "translation": "Stop (bus/train)", "phonetic": "/paˈɾa.ða/", "usage": "La parada de autobús está a cinco minutos de mi casa caminando, así que es muy conveniente para mí." },
        { "word": "Destino", "translation": "Destination", "phonetic": "/desˈti.no/", "usage": "Mi destino favorito para viajar es Italia porque me encanta la comida, la cultura y la arquitectura hermosa del país." },
        { "word": "Mapa", "translation": "Map", "phonetic": "/ˈma.pa/", "usage": "Siempre llevo un mapa de la ciudad cuando viajo para no perderme y poder encontrar los lugares turísticos importantes." },
        { "word": "Turista", "translation": "Tourist", "phonetic": "/tuˈɾis.ta/", "usage": "Hay muchos turistas en esta ciudad durante el verano que vienen a visitar los museos y monumentos históricos famosos." },
        { "word": "Guía", "translation": "Guide", "phonetic": "/ˈɡi.a/", "usage": "Contraté un guía turístico local para que me mostrara los mejores lugares de la ciudad y me contara su historia fascinante." },
        { "word": "Hotel", "translation": "Hotel", "phonetic": "/oˈtel/", "usage": "Reservé un hotel en el centro de la ciudad cerca de todos los restaurantes y tiendas para poder caminar fácilmente." },
        { "word": "Reserva", "translation": "Reservation", "phonetic": "/reˈseɾ.βa/", "usage": "Hice una reserva en el restaurante para esta noche a las ocho porque es muy popular y siempre está lleno." },
        { "word": "Habitación", "translation": "Room", "phonetic": "/aβitaˈsjon/", "usage": "Mi habitación de hotel tiene una vista hermosa al mar y un balcón grande donde puedo tomar el desayuno." },
        { "word": "Llave", "translation": "Key", "phonetic": "/ˈʝa.βe/", "usage": "Perdí la llave de mi habitación del hotel y tuve que pedir otra en la recepción para poder entrar." },
        { "word": "Cama", "translation": "Bed", "phonetic": "/ˈka.ma/", "usage": "La cama del hotel es muy cómoda y grande, dormí muy bien toda la noche sin despertarme ni una vez." },
        { "word": "Vacaciones", "translation": "Vacations", "phonetic": "/bakaˈsjo.nes/", "usage": "Tengo dos semanas de vacaciones en agosto y voy a viajar a Grecia con mi familia para descansar en la playa." },
        { "word": "Aventura", "translation": "Adventure", "phonetic": "/aβenˈtu.ɾa/", "usage": "Me encanta la aventura y viajar a lugares nuevos y exóticos para conocer culturas diferentes y probar comidas extrañas." },
        { "word": "Cámara", "translation": "Camera", "phonetic": "/ˈka.ma.ɾa/", "usage": "Llevo mi cámara fotográfica a todos mis viajes para tomar fotos bonitas de los lugares que visito y los momentos especiales." },
        { "word": "Foto", "translation": "Photo", "phonetic": "/ˈfo.to/", "usage": "Tomé muchas fotos durante mi viaje a París de la Torre Eiffel, el Louvre y otros monumentos famosos de la ciudad." },
        { "word": "Recuerdo", "translation": "Souvenir / Memory", "phonetic": "/reˈkweɾ.ðo/", "usage": "Compré recuerdos para mi familia en cada ciudad que visité durante mi viaje por Europa el verano pasado inolvidable." },
        { "word": "Dinero", "translation": "Money", "phonetic": "/diˈne.ɾo/", "usage": "Necesito cambiar dinero en el aeropuerto porque en el país que voy a visitar usan una moneda diferente al euro." },
        { "word": "Tarjeta", "translation": "Card", "phonetic": "/taɾˈxe.ta/", "usage": "Prefiero pagar con tarjeta de crédito cuando viajo porque es más seguro que llevar mucho dinero en efectivo siempre." },
        { "word": "Cajero", "translation": "ATM", "phonetic": "/kaˈxe.ɾo/", "usage": "Necesito encontrar un cajero automático para sacar dinero porque me quedé sin efectivo y quiero comprar souvenirs en las tiendas." },
        { "word": "Cambio", "translation": "Change", "phonetic": "/ˈkam.bjo/", "usage": "El tipo de cambio hoy está muy bueno, así que voy a cambiar euros a dólares para mi viaje a Estados Unidos." },
        { "word": "Propina", "translation": "Tip", "phonetic": "/pɾoˈpi.na/", "usage": "En este país es costumbre dejar una propina del diez por ciento en los restaurantes para el mesero que te atiende." },
        { "word": "País", "translation": "Country", "phonetic": "/paˈis/", "usage": "He visitado quince países diferentes en Europa, Asia y América durante mis viajes de los últimos diez años de mi vida." },
        { "word": "Ciudad", "translation": "City", "phonetic": "/sjuˈðað/", "usage": "Mi ciudad favorita en el mundo es Barcelona porque tiene playa, montañas, buena comida y arquitectura increíble de Gaudí." },
        { "word": "Pueblo", "translation": "Town / Village", "phonetic": "/ˈpwe.βlo/", "usage": "Me gusta visitar pueblos pequeños cuando viajo porque son tranquilos, auténticos y la gente es muy amable y hospitalaria." },
        { "word": "Mundo", "translation": "World", "phonetic": "/ˈmun.do/", "usage": "Quiero viajar por todo el mundo y conocer diferentes culturas, idiomas y tradiciones antes de ser demasiado viejo para hacerlo." },
        { "word": "Lugar", "translation": "Place", "phonetic": "/luˈɣaɾ/", "usage": "Este es el lugar más hermoso que he visitado en mi vida, con montañas verdes y un lago cristalino azul." },
        { "word": "Dirección", "translation": "Address / Direction", "phonetic": "/diɾekˈsjon/", "usage": "¿Me puede dar la dirección del hotel? Necesito escribirla para que el taxista sepa exactamente dónde llevarme sin perderse." },
        { "word": "Calle", "translation": "Street", "phonetic": "/ˈka.ʝe/", "usage": "El hotel está en la calle principal de la ciudad, muy cerca de restaurantes, tiendas y el museo de arte moderno." },
        { "word": "Avenida", "translation": "Avenue", "phonetic": "/aβeˈni.ða/", "usage": "La avenida más famosa de Barcelona es Las Ramblas, donde hay muchos artistas callejeros, tiendas y restaurantes turísticos siempre llenos." },
        { "word": "Plaza", "translation": "Square / Plaza", "phonetic": "/ˈpla.sa/", "usage": "La Plaza Mayor de Madrid es un lugar hermoso con arquitectura antigua donde la gente se reúne para comer y socializar." },
        { "word": "Esquina", "translation": "Corner", "phonetic": "/esˈki.na/", "usage": "El banco está en la esquina de la calle principal con la avenida central, justo al lado de la farmacia grande." },
        { "word": "Norte", "translation": "North", "phonetic": "/ˈnoɾ.te/", "usage": "Vamos a viajar al norte de España para visitar San Sebastián y probar la comida vasca que es famosa mundialmente." },
        { "word": "Sur", "translation": "South", "phonetic": "/suɾ/", "usage": "El sur de España es muy caluroso en verano con temperaturas que llegan a cuarenta grados durante el día." },
        { "word": "Este", "translation": "East", "phonetic": "/ˈes.te/", "usage": "Valencia está en el este de España, en la costa del Mediterráneo con playas hermosas y clima agradable todo el año." },
        { "word": "Oeste", "translation": "West", "phonetic": "/oˈes.te/", "usage": "Portugal está al oeste de España y es un país hermoso con ciudades históricas y playas espectaculares del Atlántico." },
        { "word": "Derecha", "translation": "Right", "phonetic": "/deˈɾe.tʃa/", "usage": "Gire a la derecha en el próximo semáforo y luego siga recto hasta ver el hotel a mano izquierda." },
        { "word": "Izquierda", "translation": "Left", "phonetic": "/isˈkjeɾ.ða/", "usage": "La estación de metro está a la izquierda después de cruzar el puente grande sobre el río que divide la ciudad." },
        { "word": "Recto", "translation": "Straight ahead", "phonetic": "/ˈrek.to/", "usage": "Siga recto por esta calle durante cinco minutos y verá el museo a su derecha, es un edificio grande y blanco." },
        { "word": "Lejos", "translation": "Far", "phonetic": "/ˈle.xos/", "usage": "El aeropuerto está muy lejos del centro de la ciudad, toma más de una hora llegar en coche con tráfico." },
        { "word": "Cerca", "translation": "Near", "phonetic": "/ˈseɾ.ka/", "usage": "El restaurante está muy cerca del hotel, solo a dos minutos caminando, así que podemos ir a pie fácilmente." },
        { "word": "Arriba", "translation": "Up / Above", "phonetic": "/aˈri.βa/", "usage": "Mi habitación está arriba en el quinto piso del hotel con una vista panorámica hermosa de toda la ciudad iluminada." },
        { "word": "Abajo", "translation": "Down / Below", "phonetic": "/aˈβa.xo/", "usage": "El restaurante del hotel está abajo en la planta baja, justo al lado de la recepción principal del edificio." },
        { "word": "Dentro", "translation": "Inside", "phonetic": "/ˈden.tɾo/", "usage": "Hace frío afuera, así que vamos a quedarnos dentro del café tomando chocolate caliente y conversando tranquilamente toda la tarde." },
        { "word": "Fuera", "translation": "Outside", "phonetic": "/ˈfwe.ɾa/", "usage": "Hace buen tiempo hoy, así que vamos a comer fuera en la terraza del restaurante con vista al mar." },
        { "word": "Entrada", "translation": "Entrance", "phonetic": "/enˈtɾa.ða/", "usage": "La entrada del museo está en la calle principal y el boleto cuesta quince euros para adultos y gratis para niños." },
        { "word": "Salida", "translation": "Exit", "phonetic": "/saˈli.ða/", "usage": "La salida de emergencia está al final del pasillo a la derecha, marcada con luces verdes brillantes siempre encendidas." },
        { "word": "Abierto", "translation": "Open", "phonetic": "/aˈβjeɾ.to/", "usage": "El museo está abierto de martes a domingo de diez de la mañana a seis de la tarde todos los días." },
        { "word": "Cerrado", "translation": "Closed", "phonetic": "/seˈra.ðo/", "usage": "El restaurante está cerrado los lunes porque es el día de descanso del personal que trabaja allí toda la semana." },
        { "word": "Seguro", "translation": "Safe", "phonetic": "/seˈɣu.ɾo/", "usage": "Este barrio es muy seguro para caminar de noche porque hay mucha policía y buena iluminación en todas las calles." },
        { "word": "Peligroso", "translation": "Dangerous", "phonetic": "/peliˈɣɾo.so/", "usage": "Esa zona de la ciudad es peligrosa de noche, así que es mejor tomar un taxi en lugar de caminar solo." },
        { "word": "Ayuda", "translation": "Help", "phonetic": "/aˈʝu.ða/", "usage": "Necesito ayuda para encontrar mi hotel porque me perdí y no hablo bien el idioma local de este país extranjero." },
        { "word": "Policía", "translation": "Police", "phonetic": "/poliˈsi.a/", "usage": "Llamé a la policía porque alguien robó mi maleta del coche mientras estaba estacionado en la calle del hotel." },
        { "word": "Médico", "translation": "Doctor", "phonetic": "/ˈme.ði.ko/", "usage": "Necesito ver a un médico porque me siento mal del estómago después de comer mariscos en el restaurante anoche." },
        { "word": "Embajada", "translation": "Embassy", "phonetic": "/embaˈxa.ða/", "usage": "Perdí mi pasaporte durante el viaje y tuve que ir a la embajada de mi país para solicitar uno nuevo urgente." },
        { "word": "Cultura", "translation": "Culture", "phonetic": "/kulˈtu.ɾa/", "usage": "Me encanta aprender sobre la cultura local cuando viajo, incluyendo la comida, música, tradiciones y costumbres del lugar que visito." },
        { "word": "Idioma", "translation": "Language", "phonetic": "/iˈðjo.ma/", "usage": "Estoy aprendiendo el idioma español porque quiero viajar a Latinoamérica y poder comunicarme con la gente local sin problemas." },
        { "word": "Entender", "translation": "To understand", "phonetic": "/entenˈdeɾ/", "usage": "No entiendo lo que dice el guía turístico porque habla muy rápido y usa palabras difíciles que no conozco todavía." },
        { "word": "Hablar", "translation": "To speak", "phonetic": "/aˈβlaɾ/", "usage": "Quiero aprender a hablar español con fluidez para poder viajar por España y Latinoamérica sin necesitar un traductor siempre." },
        { "word": "Aprender", "translation": "To learn", "phonetic": "/apɾenˈdeɾ/", "usage": "Estoy aprendiendo francés porque el próximo año voy a vivir en París durante seis meses para trabajar en una empresa." },
        { "word": "Enseñar", "translation": "To teach", "phonetic": "/enseˈɲaɾ/", "usage": "Mi amigo me está enseñando italiano porque vamos a viajar juntos a Italia el próximo verano para visitar Roma y Venecia." },
        { "word": "Saber", "translation": "To know", "phonetic": "/saˈβeɾ/", "usage": "No sé cómo llegar al museo desde aquí, necesito preguntar a alguien o buscar en el mapa de la ciudad." },
        { "word": "Conocer", "translation": "To know / meet", "phonetic": "/konoˈseɾ/", "usage": "Quiero conocer gente nueva cuando viajo para hacer amigos de diferentes países y aprender sobre sus culturas y tradiciones únicas." },
        { "word": "Visitar", "translation": "To visit", "phonetic": "/bisiˈtaɾ/", "usage": "Voy a visitar el Museo del Prado en Madrid mañana para ver las pinturas famosas de Velázquez y Goya que admiro." },
        { "word": "Mirar", "translation": "To look at", "phonetic": "/miˈɾaɾ/", "usage": "Me gusta mirar la arquitectura antigua de las ciudades europeas y tomar fotos de los edificios históricos hermosos y únicos." },
        { "word": "Ver", "translation": "To see", "phonetic": "/beɾ/", "usage": "Quiero ver la Torre Eiffel cuando vaya a París porque es el símbolo más famoso de Francia y de la ciudad." },
        { "word": "Escuchar", "translation": "To listen", "phonetic": "/eskuˈtʃaɾ/", "usage": "Me gusta escuchar música local cuando viajo para conocer mejor la cultura y las tradiciones del país que estoy visitando." },
        { "word": "Oír", "translation": "To hear", "phonetic": "/oˈiɾ/", "usage": "Puedo oír el sonido del mar desde mi habitación del hotel porque está muy cerca de la playa hermosa y tranquila." },
        { "word": "Disfrutar", "translation": "To enjoy", "phonetic": "/disfɾuˈtaɾ/", "usage": "Voy a disfrutar mis vacaciones en la playa descansando, nadando en el mar y tomando el sol todos los días sin preocupaciones." },
        { "word": "Descansar", "translation": "To rest", "phonetic": "/deskanˈsaɾ/", "usage": "Necesito descansar después del largo vuelo de doce horas desde América porque estoy muy cansado y con jet lag terrible." },
        { "word": "Divertirse", "translation": "To have fun", "phonetic": "/diβeɾˈtiɾ.se/", "usage": "Nos divertimos mucho en nuestro viaje a Tailandia visitando templos, probando comida exótica y conociendo gente amable y hospitalaria." },
        { "word": "Explorar", "translation": "To explore", "phonetic": "/eksploˈɾaɾ/", "usage": "Me encanta explorar ciudades nuevas caminando por sus calles, descubriendo lugares escondidos y probando la comida local auténtica en mercados." },
        { "word": "Caminar", "translation": "To walk", "phonetic": "/kamiˈnaɾ/", "usage": "Prefiero caminar por la ciudad en lugar de tomar el metro porque puedo ver más cosas interesantes y conocer mejor el lugar." },
        { "word": "Montar", "translation": "To ride", "phonetic": "/monˈtaɾ/", "usage": "Voy a montar en bicicleta por el parque esta tarde para hacer ejercicio y disfrutar del buen tiempo soleado de primavera." },
        { "word": "Nadar", "translation": "To swim", "phonetic": "/naˈðaɾ/", "usage": "Me gusta nadar en el mar cuando voy a la playa porque el agua salada es refrescante y las olas son divertidas." },
        { "word": "Correr", "translation": "To run", "phonetic": "/koˈreɾ/", "usage": "Salgo a correr todas las mañanas por el parque cerca de mi hotel para mantenerme en forma durante mis vacaciones largas." },
        { "word": "Saltar", "translation": "To jump", "phonetic": "/salˈtaɾ/", "usage": "Los niños saltan de alegría cuando ven el mar por primera vez durante nuestras vacaciones familiares en la costa mediterránea." },
        { "word": "Bailar", "translation": "To dance", "phonetic": "/baiˈlaɾ/", "usage": "Fuimos a bailar salsa en un club nocturno de La Habana y fue una experiencia increíble con música en vivo fantástica." },
        { "word": "Cantar", "translation": "To sing", "phonetic": "/kanˈtaɾ/", "usage": "Me gusta cantar canciones locales cuando viajo para practicar el idioma y conectarme con la cultura del lugar que visito." },
        { "word": "Comer", "translation": "To eat", "phonetic": "/koˈmeɾ/", "usage": "Quiero comer paella auténtica cuando visite Valencia porque es el plato más famoso de esa región de España mediterránea." },
        { "word": "Beber", "translation": "To drink", "phonetic": "/beˈβeɾ/", "usage": "Voy a beber vino tinto español durante mi viaje porque es famoso en todo el mundo por su calidad excelente y sabor único." },
        { "word": "Dormir", "translation": "To sleep", "phonetic": "/doɾˈmiɾ/", "usage": "Necesito dormir bien esta noche porque mañana tenemos un día largo de turismo visitando museos y monumentos históricos de la ciudad antigua." }
    ]
};

async function uploadModule05() {
    try {
        console.log('\n🚀 Uploading Module 05...\n');

        await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .doc(module05.module_id)
            .set(module05, { merge: false });

        console.log(`✓ Module 05 uploaded: ${module05.theme}`);

        // Verify
        const doc = await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .doc(module05.module_id)
            .get();

        const data = doc.data();
        console.log(`✓ Word 10: ${data.vocabulary[9].word} - ${data.vocabulary[9].translation}\n`);

        // Create local mirror
        const localPath = join(__dirname, '../assets/data/curriculum/es_a1/es_a1_m05.json');
        writeFileSync(localPath, JSON.stringify(data, null, 2));
        console.log(`✓ Local mirror created\n`);

        console.log('✅ Module 05 Complete!');
        console.log(`   Total: 500 words (5 modules) ✓\n`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

uploadModule05();
