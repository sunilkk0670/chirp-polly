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

// Module 09 with proper IPA and usage examples
const module09 = {
    "module_id": "es_a1_m09",
    "language": "es",
    "level": "A1",
    "theme": "Shopping, Money & Services",
    "order": 9,
    "vocabulary": [
        { "word": "Comprar", "translation": "To buy", "phonetic": "/komˈpɾaɾ/", "usage": "Voy a comprar ropa nueva en el centro comercial este fin de semana porque necesito un abrigo para el invierno frío." },
        { "word": "Vender", "translation": "To sell", "phonetic": "/benˈdeɾ/", "usage": "Mi vecino quiere vender su coche usado porque va a comprar uno nuevo más moderno y eficiente en consumo de gasolina." },
        { "word": "Pagar", "translation": "To pay", "phonetic": "/paˈɣaɾ/", "usage": "Tengo que pagar la factura de electricidad antes del viernes para evitar cargos adicionales por retraso en el pago mensual." },
        { "word": "Precio", "translation": "Price", "phonetic": "/ˈpɾe.sjo/", "usage": "El precio de los alimentos ha subido mucho este año y ahora es más difícil ahorrar dinero para otras cosas importantes." },
        { "word": "Costo", "translation": "Cost", "phonetic": "/ˈkos.to/", "usage": "El costo total de las reparaciones del coche fue de quinientos euros, mucho más de lo que esperaba pagar originalmente." },
        { "word": "Dinero", "translation": "Money", "phonetic": "/diˈne.ɾo/", "usage": "Necesito ahorrar más dinero para poder viajar a Japón el próximo año y cumplir mi sueño de visitar Tokio finalmente." },
        { "word": "Efectivo", "translation": "Cash", "phonetic": "/efekˈti.βo/", "usage": "Prefiero pagar en efectivo en lugar de usar tarjeta porque así controlo mejor mis gastos y no gasto de más." },
        { "word": "Tarjeta", "translation": "Card", "phonetic": "/taɾˈxe.ta/", "usage": "Perdí mi tarjeta de crédito ayer y tuve que llamar al banco inmediatamente para cancelarla y evitar fraudes o robos." },
        { "word": "Cajero", "translation": "Cashier / ATM", "phonetic": "/kaˈxe.ɾo/", "usage": "Fui al cajero automático para sacar dinero en efectivo pero la máquina estaba fuera de servicio y tuve que buscar otro." },
        { "word": "Tienda", "translation": "Store", "phonetic": "/ˈtjen.da/", "usage": "Hay una tienda nueva de ropa en mi barrio que tiene precios muy buenos y ropa de moda moderna y elegante." },
        { "word": "Mercado", "translation": "Market", "phonetic": "/meɾˈka.ðo/", "usage": "Voy al mercado todos los sábados por la mañana para comprar frutas y verduras frescas directamente de los agricultores locales." },
        { "word": "Supermercado", "translation": "Supermarket", "phonetic": "/supeɾmeɾˈka.ðo/", "usage": "El supermercado cerca de mi casa está abierto las veinticuatro horas y es muy conveniente para compras de emergencia nocturnas." },
        { "word": "Centro comercial", "translation": "Shopping mall", "phonetic": "/ˈsen.tɾo komeɾˈsjal/", "usage": "El centro comercial tiene más de cien tiendas diferentes, restaurantes, cines y es el lugar perfecto para pasar todo el día." },
        { "word": "Bolsa", "translation": "Bag", "phonetic": "/ˈbol.sa/", "usage": "Siempre llevo bolsas reutilizables cuando voy de compras para no usar bolsas de plástico y proteger el medio ambiente natural." },
        { "word": "Carrito", "translation": "Cart", "phonetic": "/kaˈri.to/", "usage": "Necesito un carrito de compras porque voy a comprar muchas cosas hoy y no puedo cargar todo en mis manos." },
        { "word": "Recibo", "translation": "Receipt", "phonetic": "/reˈsi.βo/", "usage": "Guardo todos los recibos de mis compras importantes por si necesito devolver algo o reclamar la garantía del producto comprado." },
        { "word": "Cambio", "translation": "Change", "phonetic": "/ˈkam.bjo/", "usage": "El cajero me dio el cambio incorrecto y tuve que pedirle que contara el dinero de nuevo para verificar el monto." },
        { "word": "Descuento", "translation": "Discount", "phonetic": "/desˈkwen.to/", "usage": "Hay un descuento del treinta por ciento en toda la ropa de invierno esta semana en la tienda del centro comercial." },
        { "word": "Oferta", "translation": "Offer / Sale", "phonetic": "/oˈfeɾ.ta/", "usage": "Aproveché una oferta especial y compré dos camisas por el precio de una en la tienda de ropa de mi barrio." },
        { "word": "Gratis", "translation": "Free", "phonetic": "/ˈɡɾa.tis/", "usage": "El café es gratis para todos los clientes que compren un desayuno completo en el restaurante antes de las diez de la mañana." },
        { "word": "Barato", "translation": "Cheap", "phonetic": "/baˈɾa.to/", "usage": "Encontré un hotel muy barato en el centro de la ciudad que cuesta solo veinte euros por noche con desayuno incluido." },
        { "word": "Caro", "translation": "Expensive", "phonetic": "/ˈka.ɾo/", "usage": "Ese restaurante es muy caro y una cena para dos personas puede costar más de cien euros sin incluir las bebidas." },
        { "word": "Probarse", "translation": "To try on", "phonetic": "/pɾoˈβaɾ.se/", "usage": "Voy a probarme estos pantalones en el probador para ver si me quedan bien antes de comprarlos y pagar por ellos." },
        { "word": "Talla", "translation": "Size", "phonetic": "/ˈta.ʝa/", "usage": "¿Tiene esta camisa en talla mediana? La talla pequeña me queda muy ajustada y no es cómoda para usar diariamente." },
        { "word": "Banco", "translation": "Bank", "phonetic": "/ˈbaŋ.ko/", "usage": "Tengo que ir al banco mañana para abrir una cuenta de ahorros nueva y depositar el dinero que recibí de regalo." },
        { "word": "Cuenta", "translation": "Account", "phonetic": "/ˈkwen.ta/", "usage": "Reviso mi cuenta bancaria en línea todos los días para asegurarme de que no haya cargos fraudulentos o errores en transacciones." },
        { "word": "Ahorrar", "translation": "To save", "phonetic": "/aoˈraɾ/", "usage": "Trato de ahorrar al menos el veinte por ciento de mi salario cada mes para tener un fondo de emergencia seguro." },
        { "word": "Prestar", "translation": "To lend", "phonetic": "/pɾesˈtaɾ/", "usage": "Mi hermano me prestó dinero para pagar el alquiler este mes y le voy a devolver todo el próximo mes sin falta." },
        { "word": "Deuda", "translation": "Debt", "phonetic": "/ˈdew.ða/", "usage": "Tengo una deuda de dos mil euros con el banco por el préstamo del coche que estoy pagando en cuotas mensuales." },
        { "word": "Inversión", "translation": "Investment", "phonetic": "/imbeɾˈsjon/", "usage": "Hice una inversión en acciones de tecnología el año pasado y ahora he ganado un quince por ciento de retorno financiero." },
        { "word": "Cliente", "translation": "Customer", "phonetic": "/ˈklijen.te/", "usage": "El cliente siempre tiene la razón es el lema de esta tienda y por eso tienen un servicio al cliente excelente." },
        { "word": "Queja", "translation": "Complaint", "phonetic": "/ˈke.xa/", "usage": "Presenté una queja formal en el restaurante porque la comida estaba fría y el servicio fue muy lento y poco profesional." },
        { "word": "Regalo", "translation": "Gift", "phonetic": "/reˈɣa.lo/", "usage": "Compré un regalo de cumpleaños para mi madre, un collar de plata que sé que le va a encantar mucho cuando lo vea." },
        { "word": "Gastar", "translation": "To spend", "phonetic": "/ɡasˈtaɾ/", "usage": "Gasté demasiado dinero en ropa este mes y ahora tengo que ser más cuidadoso con mis finanzas personales el próximo mes." },
        { "word": "Rico", "translation": "Rich", "phonetic": "/ˈri.ko/", "usage": "Mi tío es muy rico porque tiene varios negocios exitosos y propiedades inmobiliarias en diferentes ciudades del país entero." },
        { "word": "Pobre", "translation": "Poor", "phonetic": "/ˈpo.βɾe/", "usage": "Hay muchas personas pobres en el mundo que no tienen acceso a comida, agua limpia o educación básica de calidad." },
        { "word": "Moneda", "translation": "Coin / Currency", "phonetic": "/moˈne.ða/", "usage": "Colecciono monedas antiguas de diferentes países como hobby y tengo más de doscientas monedas en mi colección personal valiosa." },
        { "word": "Billete", "translation": "Bill / Ticket", "phonetic": "/biˈʝe.te/", "usage": "Necesito cambiar este billete de cincuenta euros porque la máquina expendedora solo acepta billetes de diez o veinte euros." },
        { "word": "Firma", "translation": "Signature", "phonetic": "/ˈfiɾ.ma/", "usage": "Necesito tu firma en este documento legal para completar la transacción de compra de la casa nueva que queremos adquirir." },
        { "word": "Dueño", "translation": "Owner", "phonetic": "/ˈdwe.ɲo/", "usage": "El dueño del restaurante es muy amable y siempre saluda personalmente a todos los clientes que entran a su establecimiento acogedor." },
        { "word": "Negocio", "translation": "Business", "phonetic": "/neˈɣo.sjo/", "usage": "Mi hermana abrió su propio negocio de diseño gráfico hace dos años y ahora tiene más de veinte clientes regulares satisfechos." },
        { "word": "Compañía", "translation": "Company", "phonetic": "/kompaˈɲi.a/", "usage": "Trabajo para una compañía internacional de tecnología que tiene oficinas en más de cincuenta países alrededor del mundo globalizado." },
        { "word": "Calidad", "translation": "Quality", "phonetic": "/kaliˈðað/", "usage": "Prefiero comprar productos de alta calidad aunque sean más caros porque duran más tiempo y funcionan mejor siempre sin problemas." },
        { "word": "Cantidad", "translation": "Quantity", "phonetic": "/kantiˈðað/", "usage": "La cantidad de trabajo que tengo esta semana es enorme y voy a tener que trabajar horas extra para terminarlo todo." },
        { "word": "Número", "translation": "Number", "phonetic": "/ˈnu.me.ɾo/", "usage": "¿Cuál es tu número de teléfono? Necesito llamarte mañana para confirmar la hora de nuestra reunión importante de negocios programada." },
        { "word": "Total", "translation": "Total", "phonetic": "/toˈtal/", "usage": "El total de la cuenta del restaurante es de ochenta euros incluyendo la propina del quince por ciento para el camarero." },
        { "word": "Mitad", "translation": "Half", "phonetic": "/miˈtað/", "usage": "Ya terminé la mitad del libro y está muy interesante, espero poder terminar de leerlo este fin de semana completo." },
        { "word": "Doble", "translation": "Double", "phonetic": "/ˈdo.βle/", "usage": "Pedí una habitación doble en el hotel para mi esposa y yo con vista al mar y desayuno buffet incluido diariamente." },
        { "word": "Menos", "translation": "Less", "phonetic": "/ˈme.nos/", "usage": "Necesito comer menos azúcar y más verduras para mejorar mi salud y perder algunos kilos de peso extra que tengo." },
        { "word": "Más", "translation": "More", "phonetic": "/mas/", "usage": "Quiero aprender más sobre la cultura española leyendo libros de historia y visitando museos en diferentes ciudades del país ibérico." },
        { "word": "Mucho", "translation": "Much", "phonetic": "/ˈmu.tʃo/", "usage": "Hay mucho tráfico en la ciudad durante las horas pico y por eso prefiero usar el transporte público en lugar de conducir." },
        { "word": "Poco", "translation": "Little", "phonetic": "/ˈpo.ko/", "usage": "Tengo poco tiempo libre esta semana porque estoy muy ocupado con el trabajo y varios proyectos importantes que debo terminar pronto." },
        { "word": "Suficiente", "translation": "Enough", "phonetic": "/sufiˈsjen.te/", "usage": "¿Tienes suficiente dinero para pagar la cuenta o necesitas que te preste algo para completar el monto total requerido ahora?" },
        { "word": "Demasiado", "translation": "Too much", "phonetic": "/demaˈsja.ðo/", "usage": "Comí demasiado en la cena de anoche y ahora me siento muy lleno e incómodo, debería haber comido menos cantidad." },
        { "word": "Varios", "translation": "Several", "phonetic": "/ˈba.ɾjos/", "usage": "He visitado varios países de Europa durante mis vacaciones incluyendo Francia, Italia, Alemania y España en diferentes viajes memorables siempre." },
        { "word": "Ambos", "translation": "Both", "phonetic": "/ˈam.bos/", "usage": "Ambos hermanos estudian medicina en la universidad y quieren ser doctores para ayudar a las personas enfermas en el futuro cercano." },
        { "word": "Igual", "translation": "Equal / Same", "phonetic": "/iˈɣwal/", "usage": "Estos dos productos son iguales en calidad pero uno es más barato que el otro así que voy a comprar el más económico." },
        { "word": "Diferente", "translation": "Different", "phonetic": "/difeˈɾen.te/", "usage": "Cada persona es diferente y tiene sus propias opiniones, gustos y preferencias que debemos respetar siempre sin juzgar a nadie nunca." },
        { "word": "Único", "translation": "Unique", "phonetic": "/ˈu.ni.ko/", "usage": "Este cuadro es único en el mundo porque fue pintado por un artista famoso hace más de doscientos años atrás." },
        { "word": "Primero", "translation": "First", "phonetic": "/pɾiˈme.ɾo/", "usage": "Soy el primero en llegar a la oficina todas las mañanas porque me gusta empezar el día temprano y tranquilo sin prisa." },
        { "word": "Último", "translation": "Last", "phonetic": "/ˈul.ti.mo/", "usage": "Este es el último día para inscribirse en el curso de español y no quiero perder esta oportunidad de aprender el idioma." },
        { "word": "Próximo", "translation": "Next", "phonetic": "/ˈpɾok.si.mo/", "usage": "La próxima semana voy a viajar a Barcelona para una conferencia de trabajo y aprovecharé para visitar la ciudad hermosa también." },
        { "word": "Anterior", "translation": "Previous", "phonetic": "/anteˈɾjoɾ/", "usage": "En mi trabajo anterior ganaba menos dinero pero tenía más tiempo libre para pasar con mi familia y amigos cercanos siempre." },
        { "word": "Nuevo", "translation": "New", "phonetic": "/ˈnwe.βo/", "usage": "Compré un teléfono nuevo porque el anterior se rompió y ya no funcionaba bien después de tres años de uso constante." },
        { "word": "Usado", "translation": "Used", "phonetic": "/uˈsa.ðo/", "usage": "Prefiero comprar libros usados porque son más baratos y además estoy ayudando a reciclar y cuidar el medio ambiente natural global." },
        { "word": "Viejo", "translation": "Old", "phonetic": "/ˈbje.xo/", "usage": "Mi abuelo es muy viejo pero todavía tiene una memoria excelente y nos cuenta historias fascinantes de cuando era joven siempre." },
        { "word": "Moderno", "translation": "Modern", "phonetic": "/moˈðeɾ.no/", "usage": "Este edificio es muy moderno con tecnología de punta, diseño minimalista y sistemas de energía solar renovable eficiente y ecológico." },
        { "word": "Clásico", "translation": "Classic", "phonetic": "/ˈkla.si.ko/", "usage": "Me gusta la música clásica de compositores como Mozart, Beethoven y Bach porque es atemporal, elegante y relajante para escuchar." },
        { "word": "Elegante", "translation": "Elegant", "phonetic": "/eleˈɣan.te/", "usage": "Ella siempre viste de manera muy elegante con ropa de diseñador, zapatos de tacón y accesorios de lujo caros y sofisticados." },
        { "word": "Simple", "translation": "Simple", "phonetic": "/ˈsim.ple/", "usage": "Prefiero un estilo de vida simple sin muchas complicaciones ni posesiones materiales innecesarias que solo ocupan espacio en casa siempre." },
        { "word": "Útil", "translation": "Useful", "phonetic": "/ˈu.til/", "usage": "Este libro es muy útil para aprender español porque tiene explicaciones claras, ejercicios prácticos y ejemplos de uso cotidiano real." },
        { "word": "Inútil", "translation": "Useless", "phonetic": "/iˈnu.til/", "usage": "Este aparato viejo es completamente inútil porque ya no funciona y no se puede reparar, mejor lo tiro a la basura." },
        { "word": "Seguro", "translation": "Safe", "phonetic": "/seˈɣu.ɾo/", "usage": "Este barrio es muy seguro y tranquilo, puedes caminar por las calles de noche sin preocuparte por la seguridad personal nunca." },
        { "word": "Peligroso", "translation": "Dangerous", "phonetic": "/peliˈɣɾo.so/", "usage": "Conducir a alta velocidad en la lluvia es muy peligroso y puede causar accidentes graves con consecuencias fatales para todos." },
        { "word": "Famoso", "translation": "Famous", "phonetic": "/faˈmo.so/", "usage": "Picasso es un pintor muy famoso de España conocido en todo el mundo por sus obras de arte cubistas revolucionarias e innovadoras." },
        { "word": "Importante", "translation": "Important", "phonetic": "/impoɾˈtan.te/", "usage": "Es importante estudiar todos los días para mantener el conocimiento fresco y prepararse bien para los exámenes finales del curso académico." },
        { "word": "Necesario", "translation": "Necessary", "phonetic": "/neseˈsa.ɾjo/", "usage": "Es necesario beber mucha agua todos los días para mantenerse hidratado y saludable, especialmente durante el verano caluroso y seco." },
        { "word": "Posible", "translation": "Possible", "phonetic": "/poˈsi.βle/", "usage": "¿Es posible terminar este proyecto antes del viernes? Tenemos mucho trabajo pero creo que podemos lograrlo si trabajamos en equipo." },
        { "word": "Imposible", "translation": "Impossible", "phonetic": "/impoˈsi.βle/", "usage": "Es imposible aprender un idioma nuevo en una semana, se necesita tiempo, práctica constante y dedicación diaria para dominarlo bien." },
        { "word": "Fácil", "translation": "Easy", "phonetic": "/ˈfa.sil/", "usage": "Este ejercicio de matemáticas es muy fácil y puedo resolverlo en menos de cinco minutos sin ninguna dificultad o problema." },
        { "word": "Difícil", "translation": "Difficult", "phonetic": "/diˈfi.sil/", "usage": "El examen de física fue muy difícil y muchos estudiantes no pudieron terminarlo a tiempo durante las tres horas asignadas." },
        { "word": "Rápido", "translation": "Fast", "phonetic": "/ˈra.pi.ðo/", "usage": "Este tren es muy rápido y puede viajar a más de trescientos kilómetros por hora conectando ciudades en poco tiempo." },
        { "word": "Lento", "translation": "Slow", "phonetic": "/ˈlen.to/", "usage": "El internet en mi casa es muy lento y tarda mucho en cargar las páginas web, necesito cambiar de proveedor urgentemente." },
        { "word": "Temprano", "translation": "Early", "phonetic": "/temˈpɾa.no/", "usage": "Me levanto temprano todos los días a las seis de la mañana para hacer ejercicio antes de ir al trabajo diario." },
        { "word": "Tarde", "translation": "Late", "phonetic": "/ˈtaɾ.ðe/", "usage": "Llegué tarde a la reunión porque había mucho tráfico en la carretera y no pude llegar a tiempo como había planeado." },
        { "word": "Pronto", "translation": "Soon", "phonetic": "/ˈpɾon.to/", "usage": "Voy a terminar este trabajo pronto, solo me faltan algunos detalles finales y estará listo para entregar al cliente satisfecho." },
        { "word": "Ahora", "translation": "Now", "phonetic": "/aˈo.ɾa/", "usage": "Necesito hablar contigo ahora mismo sobre un asunto urgente que no puede esperar hasta mañana por la mañana temprano." },
        { "word": "Después", "translation": "After", "phonetic": "/desˈpwes/", "usage": "Vamos a cenar después de la película en un restaurante italiano que está cerca del cine y tiene muy buenas reseñas." },
        { "word": "Antes", "translation": "Before", "phonetic": "/ˈan.tes/", "usage": "Antes de salir de casa siempre reviso que tengo las llaves, la cartera y el teléfono móvil para no olvidar nada." },
        { "word": "Entonces", "translation": "Then", "phonetic": "/enˈton.ses/", "usage": "Si no puedes venir hoy, entonces nos vemos mañana a la misma hora en el mismo lugar que acordamos anteriormente." },
        { "word": "Siempre", "translation": "Always", "phonetic": "/ˈsjem.pɾe/", "usage": "Siempre digo la verdad porque creo que la honestidad es muy importante en todas las relaciones personales y profesionales de vida." },
        { "word": "Nunca", "translation": "Never", "phonetic": "/ˈnuŋ.ka/", "usage": "Nunca he visitado Asia pero es mi sueño viajar a Japón, China y Tailandia algún día en el futuro cercano." },
        { "word": "Todavía", "translation": "Still", "phonetic": "/toðaˈβi.a/", "usage": "Todavía no he terminado de leer este libro aunque lo empecé hace dos semanas, está muy largo y denso de contenido." },
        { "word": "Ya", "translation": "Already", "phonetic": "/ʝa/", "usage": "Ya terminé toda mi tarea de español y ahora puedo relajarme viendo una película o leyendo un libro interesante tranquilamente." },
        { "word": "Casi", "translation": "Almost", "phonetic": "/ˈka.si/", "usage": "Casi pierdo el tren esta mañana porque me desperté tarde pero corrí rápido y llegué justo a tiempo afortunadamente." },
        { "word": "Apenas", "translation": "Hardly / Barely", "phonetic": "/aˈpe.nas/", "usage": "Apenas puedo ver sin mis gafas porque tengo miopía y todo se ve borroso y difuso a la distancia lejana." },
        { "word": "Quizás", "translation": "Maybe", "phonetic": "/kiˈsas/", "usage": "Quizás vaya al cine este fin de semana si tengo tiempo libre y no estoy muy cansado del trabajo de la semana." },
        { "word": "Además", "translation": "Besides / Also", "phonetic": "/aðeˈmas/", "usage": "Este restaurante tiene comida deliciosa y además los precios son muy razonables y el servicio es excelente y rápido siempre." },
        { "word": "Incluso", "translation": "Even", "phonetic": "/iŋˈklu.so/", "usage": "Incluso en invierno hace calor en esta ciudad tropical y la temperatura nunca baja de veinte grados centígrados durante el día." },
        { "word": "Solo", "translation": "Only", "phonetic": "/ˈso.lo/", "usage": "Solo tengo diez euros en mi cartera y no es suficiente para comprar todo lo que necesito en el supermercado hoy." }
    ]
};

async function uploadModule09() {
    try {
        console.log('\n🚀 Uploading Spanish A1 Module 09...\n');

        await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .doc(module09.module_id)
            .set(module09, { merge: false });

        console.log(`✓ Uploaded: ${module09.theme}`);
        console.log(`  Module ID: ${module09.module_id} (clean format)`);

        const doc = await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .doc(module09.module_id)
            .get();

        const data = doc.data();
        console.log(`✓ Word 10: ${data.vocabulary[9].word} - ${data.vocabulary[9].translation}\n`);

        const localPath = join(__dirname, '../assets/data/curriculum/es_a1/es_a1_m09.json');
        writeFileSync(localPath, JSON.stringify(data, null, 2));
        console.log(`✓ Local mirror created\n`);

        console.log('✅ Module 09 Complete! (900 words total)\n');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

uploadModule09();
