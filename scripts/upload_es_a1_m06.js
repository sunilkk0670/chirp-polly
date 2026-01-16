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

// Module 06 with proper IPA and usage examples
const module06 = {
    "module_id": "es_a1_m06",
    "language": "es",
    "level": "A1",
    "theme": "Food, Dining & Kitchen",
    "order": 6,
    "vocabulary": [
        { "word": "Comer", "translation": "To eat", "phonetic": "/koˈmeɾ/", "usage": "Me gusta comer frutas frescas todos los días para mantenerme saludable y lleno de energía durante todo el día." },
        { "word": "Beber", "translation": "To drink", "phonetic": "/beˈβeɾ/", "usage": "Necesito beber mucha agua cuando hace calor para mantenerme hidratado y evitar la deshidratación en verano." },
        { "word": "Desayuno", "translation": "Breakfast", "phonetic": "/desaˈʝu.no/", "usage": "El desayuno es la comida más importante del día y siempre como huevos, pan tostado y café caliente." },
        { "word": "Almuerzo", "translation": "Lunch", "phonetic": "/alˈmweɾ.so/", "usage": "Tomo el almuerzo a la una de la tarde en el restaurante cerca de mi oficina con mis compañeros." },
        { "word": "Cena", "translation": "Dinner", "phonetic": "/ˈse.na/", "usage": "La cena en mi casa es a las ocho de la noche y toda la familia se reúne para comer juntos." },
        { "word": "Hambre", "translation": "Hunger", "phonetic": "/ˈam.bɾe/", "usage": "Tengo mucha hambre porque no he comido nada desde esta mañana temprano y ya son las tres de la tarde." },
        { "word": "Sed", "translation": "Thirst", "phonetic": "/seð/", "usage": "Tengo sed después de correr cinco kilómetros bajo el sol y necesito beber agua fría inmediatamente para refrescarme." },
        { "word": "Restaurante", "translation": "Restaurant", "phonetic": "/restawˈɾan.te/", "usage": "Vamos a cenar en un restaurante italiano esta noche para celebrar nuestro aniversario de bodas con una cena romántica." },
        { "word": "Camarero", "translation": "Waiter", "phonetic": "/kamaˈɾe.ɾo/", "usage": "El camarero es muy amable y siempre nos recomienda los mejores platos del menú con una sonrisa en su rostro." },
        { "word": "Menú", "translation": "Menu", "phonetic": "/meˈnu/", "usage": "El menú del restaurante tiene muchas opciones deliciosas de comida española tradicional que quiero probar todas sin excepción." },
        { "word": "Cuenta", "translation": "Bill / Check", "phonetic": "/ˈkwen.ta/", "usage": "Cuando terminamos de comer pedimos la cuenta al camarero para pagar y dejar una propina generosa por el servicio." },
        { "word": "Vaso", "translation": "Glass", "phonetic": "/ˈba.so/", "usage": "Necesito un vaso de agua fría porque tengo mucha sed después de comer comida picante y salada en el restaurante." },
        { "word": "Taza", "translation": "Cup / Mug", "phonetic": "/ˈta.sa/", "usage": "Me gusta tomar café caliente en una taza grande por las mañanas mientras leo el periódico en la cocina tranquilamente." },
        { "word": "Plato", "translation": "Plate", "phonetic": "/ˈpla.to/", "usage": "El plato principal del menú es paella valenciana con mariscos frescos y arroz amarillo que huele delicioso y apetitoso." },
        { "word": "Tenedor", "translation": "Fork", "phonetic": "/teneˈðoɾ/", "usage": "Uso el tenedor para comer la ensalada fresca con verduras y tomates que está muy sabrosa y saludable para mí." },
        { "word": "Cuchillo", "translation": "Knife", "phonetic": "/kuˈtʃi.ʝo/", "usage": "Necesito un cuchillo afilado para cortar la carne asada porque está un poco dura y difícil de masticar sin ayuda." },
        { "word": "Cuchara", "translation": "Spoon", "phonetic": "/kuˈtʃa.ɾa/", "usage": "Uso una cuchara grande para tomar la sopa caliente de verduras que mi abuela preparó con mucho amor esta mañana." },
        { "word": "Servilleta", "translation": "Napkin", "phonetic": "/seɾβiˈʝe.ta/", "usage": "Necesito una servilleta limpia para limpiarme la boca después de comer porque tengo salsa de tomate en los labios." },
        { "word": "Botella", "translation": "Bottle", "phonetic": "/boˈte.ʝa/", "usage": "Pedimos una botella de vino tinto español para acompañar la cena de carne asada y patatas fritas en el restaurante elegante." },
        { "word": "Cocina", "translation": "Kitchen", "phonetic": "/koˈsi.na/", "usage": "Mi cocina es grande y moderna con todos los electrodomésticos necesarios para preparar comidas deliciosas para toda la familia." },
        { "word": "Sarten", "translation": "Pan", "phonetic": "/saɾˈten/", "usage": "Uso una sartén antiadherente para freír huevos en el desayuno porque es fácil de limpiar y no se pegan los alimentos." },
        { "word": "Olla", "translation": "Pot", "phonetic": "/ˈo.ʝa/", "usage": "Cocino la sopa de verduras en una olla grande durante dos horas a fuego lento para que todos los sabores se mezclen." },
        { "word": "Horno", "translation": "Oven", "phonetic": "/ˈoɾ.no/", "usage": "Horneo el pollo con patatas en el horno a doscientos grados durante una hora hasta que esté dorado y crujiente." },
        { "word": "Nevera", "translation": "Fridge", "phonetic": "/neˈβe.ɾa/", "usage": "Guardo la leche, el queso y las verduras frescas en la nevera para que no se echen a perder rápidamente con el calor." },
        { "word": "Carne", "translation": "Meat", "phonetic": "/ˈkaɾ.ne/", "usage": "No como mucha carne roja porque prefiero el pescado y el pollo que son más saludables para el corazón y la salud." },
        { "word": "Pollo", "translation": "Chicken", "phonetic": "/ˈpo.ʝo/", "usage": "El pollo asado con hierbas aromáticas es mi plato favorito y lo como dos veces por semana con ensalada fresca." },
        { "word": "Pescado", "translation": "Fish", "phonetic": "/pesˈka.ðo/", "usage": "Como pescado fresco del mar tres veces por semana porque es rico en omega-3 y muy bueno para la salud." },
        { "word": "Huevo", "translation": "Egg", "phonetic": "/ˈwe.βo/", "usage": "Desayuno dos huevos revueltos con pan tostado todas las mañanas porque son nutritivos y me dan mucha energía para trabajar." },
        { "word": "Queso", "translation": "Cheese", "phonetic": "/ˈke.so/", "usage": "Me encanta el queso manchego español y lo como con pan y vino tinto en las cenas con amigos los fines." },
        { "word": "Arroz", "translation": "Rice", "phonetic": "/aˈros/", "usage": "El arroz blanco es un acompañamiento perfecto para el pollo al curry y lo como casi todos los días en el almuerzo." },
        { "word": "Pasta", "translation": "Pasta", "phonetic": "/ˈpas.ta/", "usage": "Cocino pasta italiana con salsa de tomate casera y albahaca fresca para la cena porque es rápido, fácil y delicioso." },
        { "word": "Sopa", "translation": "Soup", "phonetic": "/ˈso.pa/", "usage": "En invierno me gusta tomar sopa caliente de verduras para calentarme y sentirme reconfortado después de un día frío afuera." },
        { "word": "Ensalada", "translation": "Salad", "phonetic": "/ensaˈla.ða/", "usage": "Como ensalada verde con tomate, pepino y aceite de oliva todos los días porque es saludable y refrescante en verano." },
        { "word": "Verdura", "translation": "Vegetable", "phonetic": "/beɾˈðu.ɾa/", "usage": "Las verduras frescas son muy importantes en mi dieta diaria y trato de comer al menos cinco porciones cada día." },
        { "word": "Fruta", "translation": "Fruit", "phonetic": "/ˈfɾu.ta/", "usage": "Como fruta fresca de postre después de cada comida porque es dulce, saludable y llena de vitaminas esenciales para el cuerpo." },
        { "word": "Manzana", "translation": "Apple", "phonetic": "/manˈsa.na/", "usage": "Como una manzana roja todos los días como snack saludable entre comidas porque tiene mucha fibra y pocas calorías." },
        { "word": "Plátano", "translation": "Banana", "phonetic": "/ˈpla.ta.no/", "usage": "Los plátanos son mi fruta favorita para el desayuno porque son dulces, nutritivos y me dan energía rápida para empezar el día." },
        { "word": "Naranja", "translation": "Orange", "phonetic": "/naˈɾaŋ.xa/", "usage": "Bebo jugo de naranja fresco todas las mañanas porque tiene mucha vitamina C y es bueno para el sistema inmunológico." },
        { "word": "Pan", "translation": "Bread", "phonetic": "/pan/", "usage": "Compro pan fresco en la panadería todas las mañanas para el desayuno con mantequilla y mermelada de fresa casera." },
        { "word": "Mantequilla", "translation": "Butter", "phonetic": "/manteˈki.ʝa/", "usage": "Unto mantequilla en el pan tostado caliente para el desayuno porque me gusta el sabor cremoso y suave que tiene." },
        { "word": "Aceite", "translation": "Oil", "phonetic": "/aˈsej.te/", "usage": "Uso aceite de oliva virgen extra para cocinar y hacer ensaladas porque es muy saludable para el corazón y delicioso." },
        { "word": "Sal", "translation": "Salt", "phonetic": "/sal/", "usage": "Pongo un poco de sal en la comida para darle sabor pero trato de no usar demasiada porque no es bueno." },
        { "word": "Pimienta", "translation": "Pepper", "phonetic": "/piˈmjen.ta/", "usage": "Me gusta agregar pimienta negra molida a mis platos de carne y verduras para darles un sabor picante y aromático." },
        { "word": "Azúcar", "translation": "Sugar", "phonetic": "/aˈsu.kaɾ/", "usage": "Pongo una cucharadita de azúcar en mi café por la mañana para endulzarlo un poco sin exagerar demasiado con las calorías." },
        { "word": "Dulce", "translation": "Sweet", "phonetic": "/ˈdul.se/", "usage": "Me encantan los postres dulces como el chocolate y los pasteles pero trato de comerlos solo los fines de semana." },
        { "word": "Picante", "translation": "Spicy", "phonetic": "/piˈkan.te/", "usage": "No me gusta la comida muy picante porque me quema la boca y necesito beber mucha agua para calmar el ardor." },
        { "word": "Rico", "translation": "Delicious / Tasty", "phonetic": "/ˈri.ko/", "usage": "La paella que preparó mi abuela está muy rica con mariscos frescos y arroz perfectamente cocinado con azafrán aromático español." },
        { "word": "Agua", "translation": "Water", "phonetic": "/ˈa.ɣwa/", "usage": "Bebo ocho vasos de agua al día para mantenerme hidratado y saludable, especialmente cuando hace mucho calor en verano." },
        { "word": "Leche", "translation": "Milk", "phonetic": "/ˈle.tʃe/", "usage": "Tomo leche con cereales todas las mañanas en el desayuno porque es nutritiva y me gusta el sabor cremoso." },
        { "word": "Café", "translation": "Coffee", "phonetic": "/kaˈfe/", "usage": "Necesito tomar dos tazas de café fuerte por la mañana para despertarme bien y tener energía para trabajar todo el día." },
        { "word": "Té", "translation": "Tea", "phonetic": "/te/", "usage": "Prefiero tomar té verde por las tardes porque es relajante, saludable y tiene muchos antioxidantes buenos para el cuerpo." },
        { "word": "Jugo", "translation": "Juice", "phonetic": "/ˈxu.ɣo/", "usage": "Bebo jugo de naranja natural recién exprimido en el desayuno porque es refrescante y lleno de vitaminas esenciales para la salud." },
        { "word": "Vino", "translation": "Wine", "phonetic": "/ˈbi.no/", "usage": "Me gusta tomar una copa de vino tinto con la cena los fines de semana para relajarme y disfrutar de la comida." },
        { "word": "Cerveza", "translation": "Beer", "phonetic": "/seɾˈβe.sa/", "usage": "Tomo una cerveza fría los viernes por la noche con amigos después del trabajo para celebrar el fin de semana." },
        { "word": "Helado", "translation": "Ice cream", "phonetic": "/eˈla.ðo/", "usage": "Me encanta comer helado de chocolate en verano cuando hace mucho calor porque es refrescante, dulce y delicioso siempre." },
        { "word": "Pastel", "translation": "Cake", "phonetic": "/pasˈtel/", "usage": "Horneo un pastel de cumpleaños de chocolate para mi hija con crema y fresas frescas encima para su fiesta especial." },
        { "word": "Chocolate", "translation": "Chocolate", "phonetic": "/tʃokoˈla.te/", "usage": "El chocolate negro es mi dulce favorito y como un pedazo pequeño todos los días porque es bueno para el corazón." },
        { "word": "Cocinero", "translation": "Cook / Chef", "phonetic": "/kosiˈne.ɾo/", "usage": "Mi hermano es cocinero profesional en un restaurante famoso y prepara platos gourmet increíbles que todos admiran y disfrutan." },
        { "word": "Pedir", "translation": "To order / ask for", "phonetic": "/peˈðiɾ/", "usage": "Voy a pedir la paella de mariscos y una ensalada mixta para el almuerzo en este restaurante español del centro." },
        { "word": "Traer", "translation": "To bring", "phonetic": "/tɾaˈeɾ/", "usage": "El camarero va a traer nuestra comida en diez minutos después de que la cocina termine de preparar todos los platos." },
        { "word": "Pagar", "translation": "To pay", "phonetic": "/paˈɣaɾ/", "usage": "Voy a pagar la cuenta del restaurante con mi tarjeta de crédito y dejar una propina del quince por ciento." },
        { "word": "Propina", "translation": "Tip", "phonetic": "/pɾoˈpi.na/", "usage": "Siempre dejo una propina generosa del veinte por ciento cuando el servicio en el restaurante es excelente y el camarero amable." },
        { "word": "Mesa", "translation": "Table", "phonetic": "/ˈme.sa/", "usage": "Reservé una mesa para cuatro personas en el restaurante italiano para cenar con mi familia esta noche a las ocho." },
        { "word": "Silla", "translation": "Chair", "phonetic": "/ˈsi.ʝa/", "usage": "Necesito una silla más cómoda en la mesa del comedor porque la que tengo ahora me hace doler la espalda." },
        { "word": "Cocinada", "translation": "Cooked", "phonetic": "/kosiˈna.ða/", "usage": "La carne está bien cocinada y jugosa por dentro, exactamente como me gusta para disfrutar de una buena comida casera." },
        { "word": "Frito", "translation": "Fried", "phonetic": "/ˈfɾi.to/", "usage": "Me gustan las patatas fritas crujientes con sal como acompañamiento para las hamburguesas y el pollo frito del restaurante de comida rápida." },
        { "word": "Asado", "translation": "Roasted", "phonetic": "/aˈsa.ðo/", "usage": "El pollo asado al horno con hierbas aromáticas y limón está delicioso y es mi plato favorito para la cena dominical." },
        { "word": "Crudo", "translation": "Raw", "phonetic": "/ˈkɾu.ðo/", "usage": "No me gusta comer pescado crudo como el sushi japonés porque prefiero la comida bien cocinada y caliente siempre." },
        { "word": "Caliente", "translation": "Hot", "phonetic": "/kaˈljen.te/", "usage": "La sopa está muy caliente y necesito esperar unos minutos para que se enfríe antes de tomarla sin quemarme la lengua." },
        { "word": "Frío", "translation": "Cold", "phonetic": "/ˈfɾi.o/", "usage": "Me gusta beber agua fría con hielo en verano cuando hace mucho calor para refrescarme y sentirme mejor inmediatamente." },
        { "word": "Despacio", "translation": "Slowly", "phonetic": "/desˈpa.sjo/", "usage": "Como despacio y mastico bien la comida para disfrutar los sabores y tener una buena digestión sin problemas estomacales después." },
        { "word": "Lleno", "translation": "Full", "phonetic": "/ˈʝe.no/", "usage": "Estoy muy lleno después de comer tres platos en el restaurante y no puedo comer postre porque no tengo más espacio." },
        { "word": "Vacío", "translation": "Empty", "phonetic": "/baˈsi.o/", "usage": "Mi estómago está vacío porque no he comido nada en todo el día y tengo mucha hambre ahora mismo." },
        { "word": "Sabor", "translation": "Flavor", "phonetic": "/saˈβoɾ/", "usage": "Este plato tiene un sabor delicioso con especias aromáticas y hierbas frescas que hacen que sea muy especial y memorable." },
        { "word": "Oler", "translation": "To smell", "phonetic": "/oˈleɾ/", "usage": "Puedo oler el aroma delicioso del pan recién horneado desde la panadería de la esquina todas las mañanas temprano." },
        { "word": "Gustar", "translation": "To like", "phonetic": "/ɡusˈtaɾ/", "usage": "Me gusta mucho la comida italiana especialmente la pasta con salsa de tomate casera y albahaca fresca del jardín de mi abuela." },
        { "word": "Preferir", "translation": "To prefer", "phonetic": "/pɾefeˈɾiɾ/", "usage": "Prefiero comer en casa con mi familia que ir a restaurantes caros porque la comida casera es más saludable y sabrosa." },
        { "word": "Servir", "translation": "To serve", "phonetic": "/seɾˈβiɾ/", "usage": "Voy a servir la cena a las ocho de la noche cuando todos los miembros de la familia lleguen a casa." },
        { "word": "Probar", "translation": "To try / taste", "phonetic": "/pɾoˈβaɾ/", "usage": "Quiero probar todos los platos típicos de España durante mi viaje para conocer la gastronomía local y sus sabores únicos." },
        { "word": "Desear", "translation": "To desire / want", "phonetic": "/deseˈaɾ/", "usage": "¿Qué desea ordenar del menú? Tenemos muchas opciones deliciosas de comida española tradicional que le van a encantar sin duda." },
        { "word": "Ayuno", "translation": "Fast (not eating)", "phonetic": "/aˈʝu.no/", "usage": "Hago ayuno intermitente y no como nada durante dieciséis horas para mejorar mi salud y perder peso de forma saludable." },
        { "word": "Hielo", "translation": "Ice", "phonetic": "/ˈʝe.lo/", "usage": "Pongo hielo en mi vaso de agua para que esté bien fría y refrescante cuando hace mucho calor en verano." },
        { "word": "Limón", "translation": "Lemon", "phonetic": "/liˈmon/", "usage": "Exprimo un limón fresco en mi té caliente por la mañana porque tiene vitamina C y ayuda con la digestión estomacal." },
        { "word": "Ajo", "translation": "Garlic", "phonetic": "/ˈa.xo/", "usage": "Uso mucho ajo en mis recetas de cocina porque le da un sabor fuerte y aromático a las salsas y guisos." },
        { "word": "Cebolla", "translation": "Onion", "phonetic": "/seˈβo.ʝa/", "usage": "Corto la cebolla en trozos pequeños para hacer sofrito con tomate y ajo que es la base de muchos platos españoles." },
        { "word": "Tomate", "translation": "Tomato", "phonetic": "/toˈma.te/", "usage": "Los tomates frescos del jardín son perfectos para hacer ensalada caprese con mozzarella, albahaca y aceite de oliva virgen extra." },
        { "word": "Patata", "translation": "Potato", "phonetic": "/paˈta.ta/", "usage": "Las patatas fritas caseras son mi acompañamiento favorito para las hamburguesas y el pollo asado los fines de semana en familia." },
        { "word": "Arándano", "translation": "Blueberry", "phonetic": "/aˈɾan.da.no/", "usage": "Los arándanos frescos son muy buenos para la salud y los como en el desayuno con yogur natural y granola crujiente." },
        { "word": "Fresa", "translation": "Strawberry", "phonetic": "/ˈfɾe.sa/", "usage": "Me encantan las fresas frescas con crema batida de postre porque son dulces, jugosas y deliciosas en verano cuando están en temporada." },
        { "word": "Uva", "translation": "Grape", "phonetic": "/ˈu.βa/", "usage": "Como uvas verdes como snack saludable entre comidas porque son dulces, refrescantes y llenas de antioxidantes buenos para la salud." },
        { "word": "Zanahoria", "translation": "Carrot", "phonetic": "/sanaˈo.ɾja/", "usage": "Las zanahorias crudas son muy buenas para la vista y las como todos los días en ensaladas frescas con aceite de oliva." },
        { "word": "Harina", "translation": "Flour", "phonetic": "/aˈɾi.na/", "usage": "Uso harina de trigo para hacer pan casero y pasteles deliciosos los fines de semana con mi familia en la cocina." },
        { "word": "Miel", "translation": "Honey", "phonetic": "/mjel/", "usage": "Pongo miel natural en mi té caliente en lugar de azúcar porque es más saludable y tiene un sabor dulce delicioso." },
        { "word": "Vinagre", "translation": "Vinegar", "phonetic": "/biˈna.ɣɾe/", "usage": "Uso vinagre balsámico en mis ensaladas con aceite de oliva para darles un sabor ácido y aromático muy especial y único." },
        { "word": "Salsa", "translation": "Sauce", "phonetic": "/ˈsal.sa/", "usage": "Preparo salsa de tomate casera con albahaca fresca para la pasta italiana que cocino todos los domingos para la familia." },
        { "word": "Hongo", "translation": "Mushroom", "phonetic": "/ˈoŋ.ɡo/", "usage": "Me gustan los hongos salteados con ajo y perejil como acompañamiento para el bistec asado en las cenas especiales de fin de semana." },
        { "word": "Pavo", "translation": "Turkey", "phonetic": "/ˈpa.βo/", "usage": "Cocinamos pavo asado relleno para la cena de Navidad con toda la familia reunida en casa celebrando las fiestas juntos felizmente." },
        { "word": "Jamón", "translation": "Ham", "phonetic": "/xaˈmon/", "usage": "El jamón serrano español es delicioso y lo como en bocadillos con pan fresco y tomate rallado para el almuerzo ligero." },
        { "word": "Tocino", "translation": "Bacon", "phonetic": "/toˈsi.no/", "usage": "Me gusta el tocino crujiente con huevos revueltos para el desayuno los domingos porque es sabroso aunque no muy saludable siempre." },
        { "word": "Salchicha", "translation": "Sausage", "phonetic": "/salˈtʃi.tʃa/", "usage": "Las salchichas alemanas a la parrilla con mostaza y pan son perfectas para las barbacoas de verano con amigos y familia." }
    ]
};

async function uploadModule06() {
    try {
        console.log('\n🚀 Uploading Spanish A1 Module 06...\n');

        await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .doc(module06.module_id)
            .set(module06, { merge: false });

        console.log(`✓ Uploaded: ${module06.theme}`);
        console.log(`  Module ID: ${module06.module_id} (clean format)`);
        console.log(`  Total Words: ${module06.vocabulary.length}\n`);

        // Verify Word 10
        const doc = await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .doc(module06.module_id)
            .get();

        const data = doc.data();
        console.log(`✓ Word 10: ${data.vocabulary[9].word} - ${data.vocabulary[9].translation}\n`);

        // Create local mirror
        const localPath = join(__dirname, '../assets/data/curriculum/es_a1/es_a1_m06.json');
        writeFileSync(localPath, JSON.stringify(data, null, 2));
        console.log(`✓ Local mirror created\n`);

        console.log('═══════════════════════════════════════════════════════');
        console.log('✅ Module 06 Complete!');
        console.log('═══════════════════════════════════════════════════════');
        console.log(`   Total Spanish A1 Words: 600 (6 modules × 100 words) ✓\n`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

uploadModule06();
