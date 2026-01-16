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

// Module 04 with IPA and usage examples
const module04 = {
    "module_id": "es_a1_m04_audited_100",
    "language": "es",
    "level": "A1",
    "theme": "Clothes & The Body",
    "vocabulary": [
        { "word": "Cuerpo", "translation": "Body", "phonetic": "/ˈkweɾ.po/", "usage": "El cuerpo humano es una máquina perfecta con muchos órganos que trabajan juntos para mantenernos vivos y saludables." },
        { "word": "Cabeza", "translation": "Head", "phonetic": "/kaˈβe.sa/", "usage": "Me duele la cabeza porque ayer trabajé muchas horas frente a la computadora sin descansar adecuadamente durante el día." },
        { "word": "Cara", "translation": "Face", "phonetic": "/ˈka.ɾa/", "usage": "Me lavo la cara todas las mañanas con agua fría para despertarme bien y empezar el día con energía." },
        { "word": "Ojo", "translation": "Eye", "phonetic": "/ˈo.xo/", "usage": "Tengo los ojos azules como mi madre y uso gafas para leer porque mi vista no es muy buena." },
        { "word": "Nariz", "translation": "Nose", "phonetic": "/naˈɾis/", "usage": "Mi nariz está congestionada porque tengo un resfriado y no puedo respirar bien por las noches cuando duermo." },
        { "word": "Boca", "translation": "Mouth", "phonetic": "/ˈbo.ka/", "usage": "Me cepillo los dientes tres veces al día para mantener mi boca limpia y tener un aliento fresco siempre." },
        { "word": "Oreja", "translation": "Ear", "phonetic": "/oˈɾe.xa/", "usage": "Tengo las orejas grandes como mi abuelo y uso aretes pequeños de plata que me regaló mi madre." },
        { "word": "Pelo", "translation": "Hair", "phonetic": "/ˈpe.lo/", "usage": "Mi pelo es largo y castaño, me gusta llevarlo suelto pero a veces lo recojo en una cola de caballo." },
        { "word": "Cuello", "translation": "Neck", "phonetic": "/ˈkwe.ʝo/", "usage": "Me duele el cuello porque dormí en una mala posición anoche y ahora no puedo moverlo bien sin dolor." },
        { "word": "Hombro", "translation": "Shoulder", "phonetic": "/ˈom.bɾo/", "usage": "Llevo mi bolsa pesada en el hombro derecho todos los días y por eso me duele mucho al final." },
        { "word": "Brazo", "translation": "Arm", "phonetic": "/ˈbɾa.so/", "usage": "Me rompí el brazo izquierdo jugando fútbol el mes pasado y tuve que usar un yeso durante seis semanas." },
        { "word": "Mano", "translation": "Hand", "phonetic": "/ˈma.no/", "usage": "Me lavo las manos con jabón antes de comer para evitar enfermedades y mantener una buena higiene personal siempre." },
        { "word": "Dedo", "translation": "Finger", "phonetic": "/ˈde.ðo/", "usage": "Me corté el dedo con un cuchillo mientras cocinaba y tuve que ponerme una curita para detener el sangrado." },
        { "word": "Pecho", "translation": "Chest", "phonetic": "/ˈpe.tʃo/", "usage": "Me duele el pecho cuando corro mucho porque no estoy acostumbrado a hacer ejercicio cardiovascular intenso regularmente." },
        { "word": "Espalda", "translation": "Back", "phonetic": "/esˈpal.da/", "usage": "Me duele la espalda porque paso muchas horas sentado en la oficina sin levantarme a estirar los músculos." },
        { "word": "Estómago", "translation": "Stomach", "phonetic": "/esˈto.ma.ɣo/", "usage": "Me duele el estómago porque comí demasiado en la cena de anoche y ahora me siento muy lleno e incómodo." },
        { "word": "Pierna", "translation": "Leg", "phonetic": "/ˈpjeɾ.na/", "usage": "Mis piernas están cansadas después de caminar todo el día por la ciudad haciendo compras en diferentes tiendas del centro." },
        { "word": "Rodilla", "translation": "Knee", "phonetic": "/roˈði.ʝa/", "usage": "Me lastimé la rodilla jugando baloncesto y ahora tengo que usar una venda elástica para poder caminar sin dolor." },
        { "word": "Pie", "translation": "Foot", "phonetic": "/pje/", "usage": "Me duelen los pies porque caminé mucho hoy con zapatos nuevos que no son muy cómodos para largas distancias." },
        { "word": "Corazón", "translation": "Heart", "phonetic": "/koɾaˈson/", "usage": "El corazón es el órgano más importante del cuerpo porque bombea sangre a todas las partes para mantenernos vivos." },
        { "word": "Sangre", "translation": "Blood", "phonetic": "/ˈsaŋ.gɾe/", "usage": "Doné sangre en el hospital la semana pasada para ayudar a personas enfermas que necesitan transfusiones urgentes de emergencia." },
        { "word": "Piel", "translation": "Skin", "phonetic": "/pjel/", "usage": "Tengo la piel sensible y uso protector solar todos los días para protegerme del sol y evitar quemaduras dolorosas." },
        { "word": "Hueso", "translation": "Bone", "phonetic": "/ˈwe.so/", "usage": "Me rompí un hueso del pie hace dos años y tuve que usar muletas durante un mes para caminar." },
        { "word": "Ropa", "translation": "Clothes", "phonetic": "/ˈro.pa/", "usage": "Necesito comprar ropa nueva para el invierno porque la que tengo del año pasado ya no me queda bien." },
        { "word": "Camisa", "translation": "Shirt", "phonetic": "/kaˈmi.sa/", "usage": "Llevo una camisa blanca y pantalones negros al trabajo todos los días porque es el código de vestimenta de la oficina." },
        { "word": "Camiseta", "translation": "T-shirt", "phonetic": "/kamiˈse.ta/", "usage": "Me gusta usar camisetas cómodas de algodón los fines de semana cuando estoy en casa descansando y relajándome tranquilamente." },
        { "word": "Pantalones", "translation": "Pants", "phonetic": "/pantaˈlo.nes/", "usage": "Estos pantalones vaqueros son muy cómodos y me quedan perfectos, los uso casi todos los días para ir al trabajo." },
        { "word": "Vestido", "translation": "Dress", "phonetic": "/besˈti.ðo/", "usage": "Mi hermana compró un vestido rojo muy bonito para la fiesta de bodas de nuestra prima el próximo sábado." },
        { "word": "Falda", "translation": "Skirt", "phonetic": "/ˈfal.da/", "usage": "Me gusta usar faldas largas en verano porque son frescas y cómodas cuando hace mucho calor durante el día." },
        { "word": "Chaqueta", "translation": "Jacket", "phonetic": "/tʃaˈke.ta/", "usage": "Llevo una chaqueta de cuero negra cuando hace frío porque me protege del viento y me mantiene caliente siempre." },
        { "word": "Abrigo", "translation": "Coat", "phonetic": "/aˈβɾi.ɣo/", "usage": "En invierno uso un abrigo largo y grueso para protegerme del frío intenso y la nieve que cae constantemente." },
        { "word": "Zapatos", "translation": "Shoes", "phonetic": "/saˈpa.tos/", "usage": "Necesito comprar zapatos nuevos porque los que tengo están viejos y rotos después de usarlos todos los días." },
        { "word": "Botas", "translation": "Boots", "phonetic": "/ˈbo.tas/", "usage": "Uso botas de lluvia cuando está lloviendo para mantener mis pies secos y evitar mojarme con el agua de los charcos." },
        { "word": "Calcetines", "translation": "Socks", "phonetic": "/kalseˈti.nes/", "usage": "Siempre uso calcetines de algodón porque son cómodos y mantienen mis pies calientes durante todo el día en invierno." },
        { "word": "Sombrero", "translation": "Hat", "phonetic": "/somˈbɾe.ɾo/", "usage": "Uso un sombrero grande en verano para proteger mi cara del sol fuerte y evitar quemaduras en la piel." },
        { "word": "Gorra", "translation": "Cap", "phonetic": "/ˈgo.ra/", "usage": "Me gusta usar una gorra de béisbol cuando salgo a correr por el parque los fines de semana por la mañana." },
        { "word": "Gafas", "translation": "Glasses", "phonetic": "/ˈɡa.fas/", "usage": "Uso gafas para ver mejor porque tengo miopía y sin ellas no puedo leer ni ver la televisión claramente desde lejos." },
        { "word": "Cinturón", "translation": "Belt", "phonetic": "/sintuˈɾon/", "usage": "Necesito un cinturón nuevo de cuero marrón para usar con mis pantalones formales del trabajo en la oficina del centro." },
        { "word": "Guantes", "translation": "Gloves", "phonetic": "/ˈɡwan.tes/", "usage": "Uso guantes de lana en invierno para mantener mis manos calientes cuando camino por la calle con mucho frío." },
        { "word": "Bufanda", "translation": "Scarf", "phonetic": "/buˈfan.da/", "usage": "Llevo una bufanda roja alrededor del cuello en invierno para protegerme del viento frío que sopla fuerte siempre." },
        { "word": "Bolsa", "translation": "Bag", "phonetic": "/ˈbol.sa/", "usage": "Llevo una bolsa grande para guardar mis libros, mi computadora y otras cosas que necesito durante el día de trabajo." },
        { "word": "Cartera", "translation": "Wallet / Purse", "phonetic": "/kaɾˈte.ɾa/", "usage": "Guardo mi dinero, mis tarjetas de crédito y mi identificación en mi cartera de cuero que siempre llevo conmigo." },
        { "word": "Reloj", "translation": "Watch", "phonetic": "/reˈlox/", "usage": "Uso un reloj de pulsera elegante que me regaló mi padre para mi cumpleaños hace dos años y lo cuido mucho." },
        { "word": "Joyas", "translation": "Jewelry", "phonetic": "/ˈxo.ʝas/", "usage": "Mi madre tiene muchas joyas hermosas de oro y plata que heredó de mi abuela y las guarda en una caja." },
        { "word": "Anillo", "translation": "Ring", "phonetic": "/aˈni.ʝo/", "usage": "Llevo un anillo de oro en mi dedo anular que me dio mi esposo el día de nuestra boda hace cinco años." },
        { "word": "Llevar", "translation": "To wear / carry", "phonetic": "/ʝeˈβaɾ/", "usage": "Hoy llevo una camisa azul y pantalones grises porque tengo una reunión importante en la oficina esta tarde con clientes." },
        { "word": "Ponerse", "translation": "To put on", "phonetic": "/poˈneɾ.se/", "usage": "Me pongo el abrigo antes de salir de casa porque hace mucho frío afuera y está nevando intensamente hoy." },
        { "word": "Quitarse", "translation": "To take off", "phonetic": "/kiˈtaɾ.se/", "usage": "Me quito los zapatos cuando llego a casa para estar más cómodo y relajarme después de un largo día." },
        { "word": "Comprar", "translation": "To buy", "phonetic": "/komˈpɾaɾ/", "usage": "Voy a comprar ropa nueva este fin de semana en el centro comercial porque hay grandes descuentos y ofertas especiales." },
        { "word": "Vender", "translation": "To sell", "phonetic": "/benˈdeɾ/", "usage": "Voy a vender mi ropa vieja en internet para ganar algo de dinero y comprar ropa nueva más moderna." },
        { "word": "Precio", "translation": "Price", "phonetic": "/ˈpɾe.sjo/", "usage": "El precio de esta chaqueta es muy alto, cuesta doscientos euros y no tengo suficiente dinero para comprarla ahora." },
        { "word": "Barato", "translation": "Cheap", "phonetic": "/baˈɾa.to/", "usage": "Esta tienda vende ropa muy barata y de buena calidad, por eso siempre compro aquí cuando necesito algo nuevo." },
        { "word": "Caro", "translation": "Expensive", "phonetic": "/ˈka.ɾo/", "usage": "Este restaurante es muy caro, una cena para dos personas cuesta más de cien euros sin incluir las bebidas alcohólicas." },
        { "word": "Nuevo", "translation": "New", "phonetic": "/ˈnwe.βo/", "usage": "Compré un coche nuevo el mes pasado y estoy muy feliz porque es cómodo, rápido y consume poca gasolina." },
        { "word": "Viejo", "translation": "Old", "phonetic": "/ˈbje.xo/", "usage": "Mi abuelo es muy viejo, tiene noventa años pero todavía está muy activo y camina todos los días por el parque." },
        { "word": "Grande", "translation": "Big", "phonetic": "/ˈɡɾan.de/", "usage": "Vivo en una casa grande con cinco habitaciones, un jardín amplio y una piscina para nadar en verano." },
        { "word": "Pequeño", "translation": "Small", "phonetic": "/peˈke.ɲo/", "usage": "Mi apartamento es pequeño pero cómodo, tiene una habitación, una cocina y un baño que es suficiente para mí." },
        { "word": "Largo", "translation": "Long", "phonetic": "/ˈlaɾ.ɣo/", "usage": "Tengo el pelo largo hasta la cintura y me gusta mucho aunque toma tiempo lavarlo y secarlo completamente todos los días." },
        { "word": "Corto", "translation": "Short", "phonetic": "/ˈkoɾ.to/", "usage": "Mi hermano tiene el pelo muy corto porque prefiere un estilo simple que no requiere mucho mantenimiento ni cuidado diario." },
        { "word": "Ancho", "translation": "Wide", "phonetic": "/ˈaŋ.tʃo/", "usage": "Esta calle es muy ancha y tiene cuatro carriles para los coches, así que el tráfico fluye rápido sin problemas." },
        { "word": "Estrecho", "translation": "Narrow", "phonetic": "/esˈtɾe.tʃo/", "usage": "El pasillo de mi casa es muy estrecho y solo cabe una persona a la vez caminando por él sin problemas." },
        { "word": "Bonito", "translation": "Pretty / Nice", "phonetic": "/boˈni.to/", "usage": "Qué vestido tan bonito llevas hoy, el color azul te queda muy bien y te hace ver muy elegante y hermosa." },
        { "word": "Feo", "translation": "Ugly", "phonetic": "/ˈfe.o/", "usage": "Ese edificio es muy feo, tiene un diseño antiguo y está en mal estado, necesita una renovación completa urgente." },
        { "word": "Limpio", "translation": "Clean", "phonetic": "/ˈlim.pjo/", "usage": "Mi casa siempre está limpia porque limpio todos los días y no me gusta vivir en un lugar desordenado o sucio." },
        { "word": "Sucio", "translation": "Dirty", "phonetic": "/ˈsu.sjo/", "usage": "Mi coche está muy sucio después del viaje por el campo, necesito lavarlo este fin de semana sin falta para que brille." },
        { "word": "Rápido", "translation": "Fast", "phonetic": "/ˈra.pi.ðo/", "usage": "Este tren es muy rápido y llega a Madrid en solo dos horas, es mucho mejor que conducir en coche." },
        { "word": "Lento", "translation": "Slow", "phonetic": "/ˈlen.to/", "usage": "El autobús es muy lento porque para en muchas estaciones, prefiero tomar el metro que es más rápido siempre." },
        { "word": "Fuerte", "translation": "Strong", "phonetic": "/ˈfweɾ.te/", "usage": "Mi hermano es muy fuerte porque va al gimnasio todos los días y levanta pesas pesadas para desarrollar músculos grandes." },
        { "word": "Débil", "translation": "Weak", "phonetic": "/ˈde.βil/", "usage": "Me siento débil hoy porque estoy enfermo con gripe y no tengo energía para hacer nada más que descansar." },
        { "word": "Alto", "translation": "Tall / High", "phonetic": "/ˈal.to/", "usage": "Mi padre es muy alto, mide un metro noventa y siempre tiene que agacharse para pasar por las puertas bajas." },
        { "word": "Bajo", "translation": "Short / Low", "phonetic": "/ˈba.xo/", "usage": "Soy bajo de estatura, mido solo un metro sesenta y cinco, pero no me importa porque me siento cómodo así." },
        { "word": "Gordo", "translation": "Fat", "phonetic": "/ˈɡoɾ.ðo/", "usage": "Estoy un poco gordo porque como mucho y no hago suficiente ejercicio, necesito empezar una dieta saludable pronto." },
        { "word": "Delgado", "translation": "Thin", "phonetic": "/delˈɣa.ðo/", "usage": "Mi hermana es muy delgada porque hace mucho ejercicio y come saludable todos los días sin excepción alguna nunca." },
        { "word": "Joven", "translation": "Young", "phonetic": "/ˈxo.βen/", "usage": "Soy joven, tengo veinticinco años y todavía tengo mucho tiempo para cumplir todos mis sueños y metas en la vida." },
        { "word": "Mayor", "translation": "Older", "phonetic": "/maˈʝoɾ/", "usage": "Mi hermano mayor tiene treinta años y ya está casado con dos hijos pequeños que son muy traviesos y activos." },
        { "word": "Inteligente", "translation": "Smart", "phonetic": "/inteliˈxen.te/", "usage": "Mi hija es muy inteligente, siempre saca las mejores notas en la escuela y lee muchos libros todos los días." },
        { "word": "Divertido", "translation": "Funny", "phonetic": "/diβeɾˈti.ðo/", "usage": "Mi tío es muy divertido, siempre cuenta chistes graciosos en las reuniones familiares y nos hace reír a todos mucho." },
        { "word": "Serio", "translation": "Serious", "phonetic": "/ˈse.ɾjo/", "usage": "Mi jefe es muy serio y nunca sonríe en la oficina, siempre está concentrado en su trabajo sin distracciones nunca." },
        { "word": "Amable", "translation": "Kind", "phonetic": "/aˈma.βle/", "usage": "Mi vecina es muy amable, siempre me ayuda cuando necesito algo y me trae comida cuando estoy enfermo en casa." },
        { "word": "Simpático", "translation": "Nice / Friendly", "phonetic": "/simˈpa.ti.ko/", "usage": "El nuevo compañero de trabajo es muy simpático y agradable, todos en la oficina lo quieren mucho ya desde el principio." },
        { "word": "Feliz", "translation": "Happy", "phonetic": "/feˈlis/", "usage": "Estoy muy feliz hoy porque es mi cumpleaños y voy a celebrar con toda mi familia en un restaurante elegante." },
        { "word": "Triste", "translation": "Sad", "phonetic": "/ˈtɾis.te/", "usage": "Estoy triste porque mi mejor amigo se mudó a otra ciudad y ya no puedo verlo todos los días como antes." },
        { "word": "Cansado", "translation": "Tired", "phonetic": "/kanˈsa.ðo/", "usage": "Estoy muy cansado después de trabajar doce horas hoy, solo quiero llegar a casa y dormir inmediatamente sin hacer nada." },
        { "word": "Enfermo", "translation": "Sick", "phonetic": "/emˈfeɾ.mo/", "usage": "Estoy enfermo con gripe y tengo fiebre alta, me duele todo el cuerpo y no puedo ir al trabajo hoy." },
        { "word": "Enojado", "translation": "Angry", "phonetic": "/enoˈxa.ðo/", "usage": "Estoy enojado porque mi hermano rompió mi computadora nueva y no quiere pagar para repararla como debería hacer responsablemente." },
        { "word": "Asustado", "translation": "Scared", "phonetic": "/asusˈta.ðo/", "usage": "Estoy asustado de las arañas grandes porque cuando era niño una me picó y tuve una reacción alérgica muy fuerte." },
        { "word": "Hambre", "translation": "Hunger", "phonetic": "/ˈam.bɾe/", "usage": "Tengo mucha hambre porque no he comido nada desde esta mañana temprano y ya son las tres de la tarde." },
        { "word": "Sed", "translation": "Thirst", "phonetic": "/seð/", "usage": "Tengo mucha sed después de correr cinco kilómetros bajo el sol caliente, necesito beber agua fría inmediatamente ahora mismo." },
        { "word": "Sueño", "translation": "Sleepiness", "phonetic": "/ˈswe.ɲo/", "usage": "Tengo mucho sueño porque anoche me acosté muy tarde viendo una película y hoy me levanté temprano para trabajar." },
        { "word": "Calor", "translation": "Heat", "phonetic": "/kaˈloɾ/", "usage": "Tengo mucho calor porque la temperatura está a treinta y ocho grados y el aire acondicionado de la oficina está roto." },
        { "word": "Frío", "translation": "Cold", "phonetic": "/ˈfɾi.o/", "usage": "Tengo frío porque olvidé mi abrigo en casa y afuera está nevando con una temperatura bajo cero grados centígrados." },
        { "word": "Dolor", "translation": "Pain", "phonetic": "/doˈloɾ/", "usage": "Tengo un dolor fuerte en la espalda desde hace una semana y necesito ir al médico para que me examine." },
        { "word": "Salud", "translation": "Health", "phonetic": "/saˈluð/", "usage": "La salud es lo más importante en la vida, por eso hago ejercicio y como bien todos los días sin excepción." },
        { "word": "Fuerza", "translation": "Strength", "phonetic": "/ˈfweɾ.sa/", "usage": "Necesito fuerza mental para superar este momento difícil de mi vida y seguir adelante con optimismo y esperanza siempre." },
        { "word": "Vida", "translation": "Life", "phonetic": "/ˈbi.ða/", "usage": "La vida es hermosa y debemos disfrutar cada momento con las personas que amamos antes de que sea demasiado tarde." },
        { "word": "Muerte", "translation": "Death", "phonetic": "/ˈmweɾ.te/", "usage": "La muerte es parte natural de la vida y todos debemos aceptarla aunque sea difícil perder a nuestros seres queridos." },
        { "word": "Sentimiento", "translation": "Feeling", "phonetic": "/sentiˈmjen.to/", "usage": "Tengo un sentimiento extraño hoy, como si algo importante fuera a pasar pero no sé exactamente qué es todavía." },
        { "word": "Pensamiento", "translation": "Thought", "phonetic": "/pensaˈmjen.to/", "usage": "Mis pensamientos están ocupados con el trabajo y no puedo concentrarme en nada más durante todo el día de hoy." },
        { "word": "Acción", "translation": "Action", "phonetic": "/akˈsjon/", "usage": "La acción es más importante que las palabras, debemos hacer cosas concretas para cambiar el mundo y mejorar la sociedad." },
        { "word": "Trabajo", "translation": "Work / Job", "phonetic": "/tɾaˈβa.xo/", "usage": "Mi trabajo es muy interesante y me gusta mucho, aprendo cosas nuevas todos los días y conozco gente fascinante siempre." }
    ]
};

async function uploadModule04() {
    try {
        console.log('\n🚀 Uploading Module 04...\n');

        await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .doc(module04.module_id)
            .set(module04, { merge: false });

        console.log(`✓ Module 04 uploaded: ${module04.theme}`);

        // Verify
        const doc = await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .doc(module04.module_id)
            .get();

        const data = doc.data();
        console.log(`✓ Word 10: ${data.vocabulary[9].word} - ${data.vocabulary[9].translation}\n`);

        // Create local mirror
        const localPath = join(__dirname, '../assets/data/curriculum/es_a1/es_a1_m04.json');
        writeFileSync(localPath, JSON.stringify(data, null, 2));
        console.log(`✓ Local mirror created\n`);

        console.log('✅ Module 04 Complete!');
        console.log(`   Total: 400 words (4 modules)\n`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

uploadModule04();
