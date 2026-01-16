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

// Module 10 with proper IPA and usage examples - FINAL MODULE ending with "Fin"
const module10 = {
    "module_id": "es_a1_m10",
    "language": "es",
    "level": "A1",
    "theme": "Society, Health & Environment",
    "order": 10,
    "vocabulary": [
        { "word": "Salud", "translation": "Health", "phonetic": "/saˈluð/", "usage": "La salud es lo más importante en la vida y debemos cuidarla comiendo bien, haciendo ejercicio y durmiendo suficiente siempre." },
        { "word": "Vida", "translation": "Life", "phonetic": "/ˈbi.ða/", "usage": "La vida es un regalo precioso y debemos aprovechar cada momento para ser felices y hacer lo que amamos sin arrepentimientos." },
        { "word": "Cuerpo", "translation": "Body", "phonetic": "/ˈkweɾ.po/", "usage": "Cuido mi cuerpo haciendo ejercicio tres veces por semana y comiendo alimentos saludables ricos en vitaminas y minerales esenciales naturales." },
        { "word": "Mente", "translation": "Mind", "phonetic": "/ˈmen.te/", "usage": "Es importante mantener la mente activa leyendo libros, resolviendo acertijos y aprendiendo cosas nuevas todos los días de la vida." },
        { "word": "Médico", "translation": "Doctor", "phonetic": "/ˈme.ði.ko/", "usage": "Voy al médico una vez al año para un chequeo general de salud y asegurarme de que todo está bien." },
        { "word": "Enfermo", "translation": "Sick", "phonetic": "/enˈfeɾ.mo/", "usage": "Estoy enfermo con gripe y tengo fiebre alta, dolor de cabeza y tos, así que me quedaré en casa descansando." },
        { "word": "Medicina", "translation": "Medicine", "phonetic": "/mediˈsi.na/", "usage": "El médico me recetó medicina para la infección y debo tomarla tres veces al día durante una semana completa sin falta." },
        { "word": "Hospital", "translation": "Hospital", "phonetic": "/ospiˈtal/", "usage": "Mi abuela está en el hospital recuperándose de una cirugía y la voy a visitar esta tarde para llevarle flores frescas." },
        { "word": "Dolor", "translation": "Pain", "phonetic": "/doˈloɾ/", "usage": "Tengo un dolor fuerte en la espalda desde ayer y necesito ir al médico para que me examine y me dé tratamiento." },
        { "word": "Emergencia", "translation": "Emergency", "phonetic": "/emeɾˈxen.sja/", "usage": "En caso de emergencia médica llama al número de emergencias inmediatamente para recibir ayuda profesional rápida y eficiente siempre." },
        { "word": "Corazón", "translation": "Heart", "phonetic": "/koɾaˈson/", "usage": "El corazón es el órgano más importante del cuerpo humano porque bombea sangre a todo el organismo constantemente sin parar." },
        { "word": "Sangre", "translation": "Blood", "phonetic": "/ˈsaŋ.ɡɾe/", "usage": "Doné sangre en el hospital la semana pasada para ayudar a personas que necesitan transfusiones urgentes por accidentes o cirugías." },
        { "word": "Respirar", "translation": "To breathe", "phonetic": "/respiˈɾaɾ/", "usage": "Es difícil respirar cuando hay mucha contaminación en el aire de la ciudad grande y por eso uso mascarilla protectora." },
        { "word": "Dormir", "translation": "To sleep", "phonetic": "/doɾˈmiɾ/", "usage": "Necesito dormir al menos ocho horas cada noche para sentirme descansado y tener energía para trabajar todo el día siguiente." },
        { "word": "Descansar", "translation": "To rest", "phonetic": "/deskanˈsaɾ/", "usage": "Después de trabajar todo el día necesito descansar un poco antes de hacer las tareas del hogar y preparar la cena." },
        { "word": "Sociedad", "translation": "Society", "phonetic": "/sosjeˈðað/", "usage": "Vivimos en una sociedad moderna donde la tecnología juega un papel muy importante en nuestra vida diaria y trabajo constante." },
        { "word": "Gobierno", "translation": "Government", "phonetic": "/ɡoˈβjeɾ.no/", "usage": "El gobierno debe trabajar para mejorar la educación, la salud y la seguridad de todos los ciudadanos del país sin excepción." },
        { "word": "País", "translation": "Country", "phonetic": "/paˈis/", "usage": "España es un país hermoso con una rica historia, cultura diversa y paisajes naturales impresionantes que atraen millones de turistas." },
        { "word": "Mundo", "translation": "World", "phonetic": "/ˈmun.do/", "usage": "Quiero viajar por todo el mundo y conocer diferentes culturas, idiomas y tradiciones de países lejanos y exóticos fascinantes siempre." },
        { "word": "Gente", "translation": "People", "phonetic": "/ˈxen.te/", "usage": "La gente en este pueblo es muy amable y siempre está dispuesta a ayudar a los visitantes con indicaciones y recomendaciones." },
        { "word": "Ley", "translation": "Law", "phonetic": "/lej/", "usage": "Todos debemos respetar la ley y las normas de convivencia social para vivir en paz y armonía con los demás." },
        { "word": "Derecho", "translation": "Right", "phonetic": "/deˈɾe.tʃo/", "usage": "Todos tenemos derecho a la educación, la salud y un trabajo digno sin importar nuestro origen o condición social económica." },
        { "word": "Paz", "translation": "Peace", "phonetic": "/pas/", "usage": "La paz mundial es el objetivo más importante de las Naciones Unidas y todos debemos trabajar juntos para lograrlo sin violencia." },
        { "word": "Guerra", "translation": "War", "phonetic": "/ˈɡe.ra/", "usage": "La guerra causa mucho sufrimiento y destrucción y debemos hacer todo lo posible para evitarla y resolver conflictos pacíficamente siempre." },
        { "word": "Voto", "translation": "Vote", "phonetic": "/ˈbo.to/", "usage": "Es importante ejercer nuestro derecho al voto en las elecciones para elegir a los representantes que mejor defiendan nuestros intereses." },
        { "word": "Ciudadano", "translation": "Citizen", "phonetic": "/sjuðaˈða.no/", "usage": "Como ciudadano responsable debo pagar mis impuestos, respetar las leyes y participar activamente en la vida democrática del país." },
        { "word": "Justicia", "translation": "Justice", "phonetic": "/xusˈti.sja/", "usage": "La justicia social es fundamental para una sociedad equitativa donde todos tengan las mismas oportunidades sin discriminación de ningún tipo." },
        { "word": "Naturaleza", "translation": "Nature", "phonetic": "/natuɾaˈle.sa/", "usage": "Me encanta pasar tiempo en la naturaleza caminando por bosques, montañas y playas lejos del ruido de la ciudad urbana." },
        { "word": "Ambiente", "translation": "Environment", "phonetic": "/amˈbjen.te/", "usage": "Debemos proteger el ambiente reduciendo la contaminación, reciclando y usando energías renovables limpias para las futuras generaciones del planeta." },
        { "word": "Tierra", "translation": "Earth / Land", "phonetic": "/ˈtje.ra/", "usage": "La Tierra es nuestro hogar y debemos cuidarla para que las futuras generaciones puedan disfrutar de sus recursos naturales abundantes." },
        { "word": "Aire", "translation": "Air", "phonetic": "/ˈai.ɾe/", "usage": "El aire limpio es esencial para nuestra salud y por eso debemos reducir las emisiones de gases contaminantes de vehículos e industrias." },
        { "word": "Agua", "translation": "Water", "phonetic": "/ˈa.ɣwa/", "usage": "El agua potable es un recurso limitado y valioso que debemos conservar cerrando grifos, reparando fugas y no desperdiciándola nunca innecesariamente." },
        { "word": "Energía", "translation": "Energy", "phonetic": "/eneɾˈxi.a/", "usage": "Debemos usar energía renovable como la solar y eólica para reducir nuestra dependencia de combustibles fósiles contaminantes y dañinos siempre." },
        { "word": "Reciclar", "translation": "To recycle", "phonetic": "/resiˈklaɾ/", "usage": "Es importante reciclar papel, plástico, vidrio y metal para reducir la basura y proteger el medio ambiente natural del planeta Tierra." },
        { "word": "Basura", "translation": "Trash", "phonetic": "/baˈsu.ɾa/", "usage": "Siempre separo la basura en diferentes contenedores para reciclar y ayudar a reducir la contaminación ambiental en mi ciudad local." },
        { "word": "Árbol", "translation": "Tree", "phonetic": "/ˈaɾ.βol/", "usage": "Los árboles son esenciales para la vida porque producen oxígeno, absorben dióxido de carbono y proporcionan sombra refrescante en verano." },
        { "word": "Flor", "translation": "Flower", "phonetic": "/floɾ/", "usage": "Me encantan las flores de primavera porque llenan el jardín de colores vibrantes y aromas dulces que alegran el espíritu humano." },
        { "word": "Animal", "translation": "Animal", "phonetic": "/aniˈmal/", "usage": "Debemos proteger a los animales en peligro de extinción y preservar sus hábitats naturales para mantener la biodiversidad del planeta Tierra." },
        { "word": "Clima", "translation": "Climate", "phonetic": "/ˈkli.ma/", "usage": "El cambio climático es un problema grave que afecta a todo el planeta y debemos actuar ahora para reducir las emisiones." },
        { "word": "Futuro", "translation": "Future", "phonetic": "/fuˈtu.ɾo/", "usage": "El futuro de nuestro planeta depende de las acciones que tomemos hoy para proteger el medio ambiente y los recursos naturales." },
        { "word": "Historia", "translation": "History", "phonetic": "/isˈto.ɾja/", "usage": "Estudiar la historia nos ayuda a entender el presente y aprender de los errores del pasado para no repetirlos en el futuro." },
        { "word": "Cultura", "translation": "Culture", "phonetic": "/kulˈtu.ɾa/", "usage": "La cultura española es muy rica con tradiciones antiguas, arte famoso, música flamenca y gastronomía deliciosa reconocida mundialmente siempre." },
        { "word": "Tradición", "translation": "Tradition", "phonetic": "/tɾaðiˈsjon/", "usage": "En mi familia tenemos la tradición de reunirnos todos los domingos para comer juntos y compartir historias de la semana." },
        { "word": "Idioma", "translation": "Language", "phonetic": "/iˈðjo.ma/", "usage": "Aprender un idioma nuevo abre puertas a nuevas culturas, oportunidades laborales y amistades internacionales en todo el mundo globalizado." },
        { "word": "Religión", "translation": "Religion", "phonetic": "/reliˈxjon/", "usage": "La religión es importante para muchas personas porque les da esperanza, consuelo y un sentido de propósito en la vida diaria." },
        { "word": "Dios", "translation": "God", "phonetic": "/djos/", "usage": "Muchas personas creen en Dios y rezan todos los días pidiendo guía, protección y bendiciones para ellos y sus familias queridas." },
        { "word": "Alma", "translation": "Soul", "phonetic": "/ˈal.ma/", "usage": "Creo que el alma es la esencia espiritual de una persona que trasciende el cuerpo físico y continúa después de la muerte." },
        { "word": "Sueño", "translation": "Dream", "phonetic": "/ˈswe.ɲo/", "usage": "Mi sueño es viajar por todo el mundo, conocer diferentes culturas y escribir un libro sobre mis experiencias y aventuras emocionantes." },
        { "word": "Verdad", "translation": "Truth", "phonetic": "/beɾˈðað/", "usage": "Siempre digo la verdad aunque a veces sea difícil porque creo que la honestidad es la base de todas las relaciones." },
        { "word": "Mentira", "translation": "Lie", "phonetic": "/menˈti.ɾa/", "usage": "No me gustan las mentiras porque destruyen la confianza entre las personas y causan problemas innecesarios en las relaciones personales." },
        { "word": "Razón", "translation": "Reason", "phonetic": "/raˈson/", "usage": "Tienes razón en lo que dices sobre el cambio climático, es un problema serio que requiere acción inmediata de todos." },
        { "word": "Pensar", "translation": "To think", "phonetic": "/penˈsaɾ/", "usage": "Pienso mucho sobre el futuro y qué puedo hacer para mejorar mi vida y la de las personas que me rodean." },
        { "word": "Creer", "translation": "To believe", "phonetic": "/kɾeˈeɾ/", "usage": "Creo que todos podemos hacer una diferencia positiva en el mundo si trabajamos juntos por un objetivo común de paz." },
        { "word": "Saber", "translation": "To know (fact)", "phonetic": "/saˈβeɾ/", "usage": "Sé que el español es un idioma importante hablado por más de quinientos millones de personas en todo el mundo." },
        { "word": "Conocer", "translation": "To know (person)", "phonetic": "/konoˈseɾ/", "usage": "Quiero conocer a personas de diferentes países para aprender sobre sus culturas y tradiciones únicas e interesantes siempre fascinantes." },
        { "word": "Sentir", "translation": "To feel", "phonetic": "/senˈtiɾ/", "usage": "Me siento muy feliz cuando paso tiempo con mi familia y amigos disfrutando de buena comida y conversaciones agradables." },
        { "word": "Llamar", "translation": "To call", "phonetic": "/ʝaˈmaɾ/", "usage": "Voy a llamar a mi madre esta noche para preguntarle cómo está y contarle sobre mi semana de trabajo." },
        { "word": "Ayudar", "translation": "To help", "phonetic": "/aʝuˈðaɾ/", "usage": "Me gusta ayudar a las personas necesitadas haciendo voluntariado en organizaciones benéficas los fines de semana cuando tengo tiempo libre." },
        { "word": "Cuidar", "translation": "To take care of", "phonetic": "/kwiˈðaɾ/", "usage": "Debo cuidar mejor de mi salud comiendo más verduras, haciendo ejercicio regularmente y durmiendo ocho horas cada noche sin falta." },
        { "word": "Cambiar", "translation": "To change", "phonetic": "/kamˈbjaɾ/", "usage": "Quiero cambiar mis hábitos alimenticios y empezar a comer más saludable para mejorar mi salud y sentirme mejor físicamente." },
        { "word": "Mejorar", "translation": "To improve", "phonetic": "/mexoˈɾaɾ/", "usage": "Estoy trabajando duro para mejorar mi español practicando todos los días con aplicaciones, libros y hablando con nativos hispanohablantes siempre." },
        { "word": "Aumentar", "translation": "To increase", "phonetic": "/awmenˈtaɾ/", "usage": "Los precios de los alimentos han aumentado mucho este año debido a la inflación y ahora es más caro hacer las compras." },
        { "word": "Reducir", "translation": "To reduce", "phonetic": "/reðuˈsiɾ/", "usage": "Debemos reducir nuestro consumo de plástico usando bolsas reutilizables y botellas de agua rellenables para proteger el océano y la vida marina." },
        { "word": "Crear", "translation": "To create", "phonetic": "/kɾeˈaɾ/", "usage": "Me gusta crear arte en mi tiempo libre pintando cuadros abstractos con colores vibrantes que expresan mis emociones y sentimientos." },
        { "word": "Destruir", "translation": "To destroy", "phonetic": "/destɾuˈiɾ/", "usage": "La contaminación está destruyendo nuestro planeta y debemos actuar ahora para salvar el medio ambiente para las futuras generaciones humanas." },
        { "word": "Ganar", "translation": "To win", "phonetic": "/ɡaˈnaɾ/", "usage": "Nuestro equipo ganó el campeonato de fútbol después de un partido muy emocionante y todos celebramos la victoria con alegría." },
        { "word": "Perder", "translation": "To lose", "phonetic": "/peɾˈðeɾ/", "usage": "No me gusta perder en los juegos pero entiendo que es parte del aprendizaje y me ayuda a mejorar mis habilidades." },
        { "word": "Luchar", "translation": "To fight", "phonetic": "/luˈtʃaɾ/", "usage": "Debemos luchar por nuestros derechos y por la justicia social para crear un mundo más equitativo para todos sin excepción." },
        { "word": "Esperar", "translation": "To wait / hope", "phonetic": "/espeˈɾaɾ/", "usage": "Espero que el futuro sea mejor para todos y que podamos vivir en paz y armonía cuidando nuestro planeta Tierra." },
        { "word": "Olvidar", "translation": "To forget", "phonetic": "/olβiˈðaɾ/", "usage": "Siempre olvido dónde pongo las llaves de casa y pierdo mucho tiempo buscándolas todas las mañanas antes de salir." },
        { "word": "Recordar", "translation": "To remember", "phonetic": "/rekoɾˈðaɾ/", "usage": "Recuerdo con cariño los veranos de mi infancia cuando jugaba con mis amigos en el parque hasta que se ponía el sol." },
        { "word": "Tratar", "translation": "To try / treat", "phonetic": "/tɾaˈtaɾ/", "usage": "Trato de ser amable con todas las personas que conozco porque creo que la bondad hace del mundo un lugar mejor." },
        { "word": "Parecer", "translation": "To seem", "phonetic": "/paɾeˈseɾ/", "usage": "Parece que va a llover esta tarde porque el cielo está muy nublado y oscuro, mejor llevo un paraguas conmigo." },
        { "word": "Seguir", "translation": "To follow / continue", "phonetic": "/seˈɣiɾ/", "usage": "Voy a seguir estudiando español hasta que pueda hablarlo con fluidez y confianza como un nativo hispanohablante experto siempre." },
        { "word": "Suceder", "translation": "To happen", "phonetic": "/suseˈðeɾ/", "usage": "No sé qué va a suceder en el futuro pero estoy emocionado por las posibilidades y oportunidades que vendrán." },
        { "word": "Lograr", "translation": "To achieve", "phonetic": "/loˈɣɾaɾ/", "usage": "Logré terminar mi proyecto a tiempo trabajando duro y con dedicación durante las últimas tres semanas sin descanso alguno." },
        { "word": "Aceptar", "translation": "To accept", "phonetic": "/asepˈtaɾ/", "usage": "Debemos aceptar a las personas como son sin juzgarlas y respetar sus diferencias culturales, religiosas y personales únicas siempre." },
        { "word": "Rechazar", "translation": "To reject", "phonetic": "/retʃaˈsaɾ/", "usage": "Rechacé la oferta de trabajo porque el salario era muy bajo y las condiciones laborales no eran buenas para mí." },
        { "word": "Permitir", "translation": "To allow", "phonetic": "/peɾmiˈtiɾ/", "usage": "Mis padres no me permiten salir tarde los días de semana porque tengo que levantarme temprano para ir a trabajar." },
        { "word": "Prohibir", "translation": "To forbid", "phonetic": "/pɾoiˈβiɾ/", "usage": "Está prohibido fumar en lugares públicos cerrados para proteger la salud de las personas que no fuman y evitar el humo pasivo." },
        { "word": "Elegir", "translation": "To choose", "phonetic": "/elexiɾ/", "usage": "Es difícil elegir entre tantas opciones buenas pero finalmente decidí estudiar medicina en la universidad estatal pública de mi ciudad." },
        { "word": "Prometer", "translation": "To promise", "phonetic": "/pɾomeˈteɾ/", "usage": "Te prometo que voy a estudiar más para el próximo examen y sacar una mejor nota que la vez anterior sin falta." },
        { "word": "Ofrecer", "translation": "To offer", "phonetic": "/ofɾeˈseɾ/", "usage": "La empresa me ofreció un aumento de salario y mejores beneficios si acepto el puesto de gerente en la nueva oficina." },
        { "word": "Cumplir", "translation": "To fulfill / reach age", "phonetic": "/kumˈpliɾ/", "usage": "Voy a cumplir treinta años el próximo mes y quiero celebrarlo con una fiesta grande con todos mis amigos y familia." },
        { "word": "Nacer", "translation": "To be born", "phonetic": "/naˈseɾ/", "usage": "Nací en Madrid hace veinticinco años y he vivido aquí toda mi vida en esta hermosa ciudad española histórica y cultural." },
        { "word": "Morir", "translation": "To die", "phonetic": "/moˈɾiɾ/", "usage": "Mi abuelo murió hace cinco años pero siempre lo recuerdo con cariño y guardo sus enseñanzas en mi corazón para siempre." },
        { "word": "Crecer", "translation": "To grow", "phonetic": "/kɾeˈseɾ/", "usage": "Los niños crecen muy rápido y en pocos años se convierten en adultos con sus propias vidas, sueños y responsabilidades." },
        { "word": "Vivir", "translation": "To live", "phonetic": "/biˈβiɾ/", "usage": "Quiero vivir una vida plena y feliz haciendo lo que amo, rodeado de personas que me importan y viajando por el mundo." },
        { "word": "Existir", "translation": "To exist", "phonetic": "/eksisˈtiɾ/", "usage": "¿Crees que existe vida en otros planetas del universo? Es una pregunta fascinante que muchos científicos están investigando actualmente siempre." },
        { "word": "Felicidad", "translation": "Happiness", "phonetic": "/felisiˈðað/", "usage": "La felicidad no viene del dinero o las posesiones materiales sino de las relaciones significativas y experiencias memorables de la vida." },
        { "word": "Tristeza", "translation": "Sadness", "phonetic": "/tɾisˈte.sa/", "usage": "Sentí mucha tristeza cuando mi mejor amigo se mudó a otro país pero nos mantenemos en contacto por videollamadas semanales." },
        { "word": "Odio", "translation": "Hatred", "phonetic": "/ˈo.ðjo/", "usage": "El odio solo trae más sufrimiento al mundo y debemos reemplazarlo con amor, comprensión y empatía hacia todos los seres." },
        { "word": "Miedo", "translation": "Fear", "phonetic": "/ˈmje.ðo/", "usage": "Tengo miedo de las alturas y por eso nunca he subido a una montaña muy alta o saltado en paracaídas." },
        { "word": "Fuerza", "translation": "Strength", "phonetic": "/ˈfweɾ.sa/", "usage": "Necesitas mucha fuerza mental y física para superar los desafíos difíciles de la vida y alcanzar tus metas personales ambiciosas." },
        { "word": "Poder", "translation": "Power", "phonetic": "/poˈðeɾ/", "usage": "El poder debe usarse con responsabilidad y sabiduría para ayudar a otros y no para beneficio personal egoísta o corrupto." },
        { "word": "Respeto", "translation": "Respect", "phonetic": "/resˈpe.to/", "usage": "El respeto mutuo es fundamental en todas las relaciones humanas ya sean personales, profesionales o sociales en cualquier contexto cultural." },
        { "word": "Honor", "translation": "Honor", "phonetic": "/oˈnoɾ/", "usage": "Es un honor para mí recibir este premio por mi trabajo y dedicación durante los últimos diez años en esta organización." },
        { "word": "Amor", "translation": "Love", "phonetic": "/aˈmoɾ/", "usage": "El amor es el sentimiento más poderoso del mundo y puede transformar vidas, sanar heridas y unir a las personas para siempre." },
        { "word": "Esperanza", "translation": "Hope", "phonetic": "/espeˈɾan.sa/", "usage": "La esperanza es lo último que se pierde y debemos mantenerla viva incluso en los momentos más difíciles de nuestras vidas siempre." },
        { "word": "Fin", "translation": "End", "phonetic": "/fin/", "usage": "Este es el fin del curso de español A1 y ahora estás listo para continuar aprendiendo en el nivel A2 avanzado." }
    ]
};

async function uploadModule10() {
    try {
        console.log('\n🚀 Uploading Spanish A1 Module 10 (FINAL MODULE)...\n');

        await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .doc(module10.module_id)
            .set(module10, { merge: false });

        console.log(`✓ Uploaded: ${module10.theme}`);
        console.log(`  Module ID: ${module10.module_id} (clean format)`);

        const doc = await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .doc(module10.module_id)
            .get();

        const data = doc.data();
        console.log(`✓ Word 10: ${data.vocabulary[9].word} - ${data.vocabulary[9].translation}`);
        console.log(`✓ Word 100 (FINAL): ${data.vocabulary[99].word} - ${data.vocabulary[99].translation}\n`);

        const localPath = join(__dirname, '../assets/data/curriculum/es_a1/es_a1_m10.json');
        writeFileSync(localPath, JSON.stringify(data, null, 2));
        console.log(`✓ Local mirror created\n`);

        console.log('═══════════════════════════════════════════════════════');
        console.log('🎉 SPANISH A1 CURRICULUM COMPLETE! 🎉');
        console.log('═══════════════════════════════════════════════════════');
        console.log(`   Total Modules: 10`);
        console.log(`   Total Words: 1,000`);
        console.log(`   Final Word: "Fin" (End) ✓\n`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

uploadModule10();
