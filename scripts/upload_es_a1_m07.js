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

// Module 07 with proper IPA and usage examples
const module07 = {
    "module_id": "es_a1_m07",
    "language": "es",
    "level": "A1",
    "theme": "Work, Education & Technology",
    "order": 7,
    "vocabulary": [
        { "word": "Trabajo", "translation": "Work / Job", "phonetic": "/tɾaˈβa.xo/", "usage": "Mi trabajo es muy interesante y aprendo cosas nuevas todos los días trabajando con personas de diferentes países del mundo." },
        { "word": "Oficina", "translation": "Office", "phonetic": "/ofiˈsi.na/", "usage": "Voy a la oficina todos los días de lunes a viernes desde las nueve de la mañana hasta las seis." },
        { "word": "Jefe", "translation": "Boss", "phonetic": "/ˈxe.fe/", "usage": "Mi jefe es muy exigente pero justo y siempre nos ayuda cuando tenemos problemas o dudas en el trabajo diario." },
        { "word": "Empleado", "translation": "Employee", "phonetic": "/emple ˈa.ðo/", "usage": "Soy empleado de una empresa grande de tecnología y trabajo en el departamento de desarrollo de software innovador y moderno." },
        { "word": "Negocio", "translation": "Business", "phonetic": "/neˈɣo.sjo/", "usage": "Tengo mi propio negocio de consultoría y ayudo a pequeñas empresas a crecer y mejorar sus procesos de trabajo eficientemente." },
        { "word": "Reunión", "translation": "Meeting", "phonetic": "/ɾewˈnjon/", "usage": "Tenemos una reunión importante con el cliente esta tarde a las tres para discutir el nuevo proyecto de desarrollo." },
        { "word": "Dinero", "translation": "Money", "phonetic": "/diˈne.ɾo/", "usage": "Necesito ahorrar más dinero este año para poder comprar un coche nuevo y viajar a Europa en verano con mi familia." },
        { "word": "Salario", "translation": "Salary", "phonetic": "/saˈla.ɾjo/", "usage": "Mi salario mensual es suficiente para pagar todas mis facturas y ahorrar un poco para el futuro y emergencias inesperadas." },
        { "word": "Empresa", "translation": "Company", "phonetic": "/emˈpɾe.sa/", "usage": "La empresa donde trabajo tiene más de mil empleados y oficinas en veinte países diferentes alrededor del mundo entero." },
        { "word": "Escuela", "translation": "School", "phonetic": "/esˈkwe.la/", "usage": "Mis hijos van a la escuela primaria cerca de casa y caminan allí todas las mañanas con sus amigos." },
        { "word": "Universidad", "translation": "University", "phonetic": "/uniβeɾsiˈðað/", "usage": "Estudié ingeniería en la universidad durante cinco años y me gradué con honores hace tres años en una ceremonia especial." },
        { "word": "Profesor", "translation": "Teacher", "phonetic": "/pɾofeˈsoɾ/", "usage": "Mi profesor de español es muy paciente y explica la gramática de manera clara y fácil de entender para todos." },
        { "word": "Estudiante", "translation": "Student", "phonetic": "/estuˈðjan.te/", "usage": "Soy estudiante de medicina en la universidad y estudio muchas horas todos los días para aprobar los exámenes difíciles." },
        { "word": "Clase", "translation": "Class", "phonetic": "/ˈkla.se/", "usage": "Tengo clase de matemáticas los lunes y miércoles por la mañana y siempre llego temprano para repasar mis notas." },
        { "word": "Libro", "translation": "Book", "phonetic": "/ˈli.βɾo/", "usage": "Estoy leyendo un libro muy interesante sobre la historia de España y sus reyes durante la Edad Media europea fascinante." },
        { "word": "Cuaderno", "translation": "Notebook", "phonetic": "/kwaˈðeɾ.no/", "usage": "Escribo todas mis notas de clase en un cuaderno grande para poder estudiar mejor antes de los exámenes importantes." },
        { "word": "Lápiz", "translation": "Pencil", "phonetic": "/ˈla.pis/", "usage": "Uso un lápiz para hacer los ejercicios de matemáticas porque puedo borrar los errores fácilmente si me equivoco en algo." },
        { "word": "Bolígrafo", "translation": "Pen", "phonetic": "/boˈli.ɣɾa.fo/", "usage": "Prefiero escribir con bolígrafo azul en mis apuntes de clase porque la tinta no se borra y es más permanente." },
        { "word": "Examen", "translation": "Exam", "phonetic": "/ekˈsa.men/", "usage": "Tengo un examen final de química la próxima semana y estoy estudiando mucho para sacar una buena nota alta." },
        { "word": "Tarea", "translation": "Homework", "phonetic": "/taˈɾe.a/", "usage": "Hago mi tarea de español todas las noches después de cenar para practicar la gramática y el vocabulario nuevo aprendido." },
        { "word": "Aprender", "translation": "To learn", "phonetic": "/apɾenˈdeɾ/", "usage": "Me gusta aprender idiomas nuevos porque me ayuda a comunicarme con personas de diferentes culturas y países del mundo." },
        { "word": "Enseñar", "translation": "To teach", "phonetic": "/enseˈɲaɾ/", "usage": "Mi madre enseña inglés en una escuela secundaria y le encanta ayudar a los estudiantes a mejorar sus habilidades lingüísticas." },
        { "word": "Estudiar", "translation": "To study", "phonetic": "/estuˈðjaɾ/", "usage": "Necesito estudiar más para el examen de mañana porque el material es muy difícil y complicado de entender completamente." },
        { "word": "Escribir", "translation": "To write", "phonetic": "/eskɾiˈβiɾ/", "usage": "Me gusta escribir cuentos cortos en mi tiempo libre y espero publicar un libro algún día en el futuro cercano." },
        { "word": "Leer", "translation": "To read", "phonetic": "/leˈeɾ/", "usage": "Leo el periódico todas las mañanas mientras tomo café para estar informado sobre las noticias actuales del mundo y mi país." },
        { "word": "Computadora", "translation": "Computer", "phonetic": "/komputaˈðo.ɾa/", "usage": "Uso mi computadora portátil para trabajar desde casa y también para ver películas y navegar por internet en mi tiempo libre." },
        { "word": "Internet", "translation": "Internet", "phonetic": "/inteɾˈnet/", "usage": "Necesito internet rápido en casa para trabajar eficientemente y hacer videollamadas con clientes de otros países sin problemas técnicos." },
        { "word": "Correo", "translation": "Email / Mail", "phonetic": "/koˈre.o/", "usage": "Reviso mi correo electrónico varias veces al día para responder mensajes importantes de trabajo y clientes urgentes rápidamente siempre." },
        { "word": "Teléfono", "translation": "Phone", "phonetic": "/teˈle.fo.no/", "usage": "Mi teléfono móvil es nuevo y tiene una cámara excelente para tomar fotos de alta calidad durante mis viajes." },
        { "word": "Pantalla", "translation": "Screen", "phonetic": "/panˈta.ʝa/", "usage": "La pantalla de mi computadora es grande y de alta resolución, perfecta para editar fotos y videos profesionales con precisión." },
        { "word": "Teclado", "translation": "Keyboard", "phonetic": "/tekˈla.ðo/", "usage": "Necesito un teclado ergonómico nuevo porque el que tengo me hace doler las muñecas después de escribir muchas horas." },
        { "word": "Ratón", "translation": "Mouse (computer)", "phonetic": "/raˈton/", "usage": "Mi ratón inalámbrico funciona muy bien y es cómodo para trabajar durante largas horas sin cansar la mano derecha." },
        { "word": "Archivo", "translation": "File", "phonetic": "/aɾˈtʃi.βo/", "usage": "Guardo todos mis archivos importantes en la nube para poder acceder a ellos desde cualquier lugar del mundo con internet." },
        { "word": "Contraseña", "translation": "Password", "phonetic": "/kontɾaˈse.ɲa/", "usage": "Uso contraseñas fuertes y diferentes para cada cuenta online para proteger mi información personal y financiera de hackers maliciosos." },
        { "word": "Red", "translation": "Network / Web", "phonetic": "/reð/", "usage": "La red wifi de mi oficina es muy rápida y estable, perfecta para hacer videollamadas y descargar archivos grandes sin problemas." },
        { "word": "Llamar", "translation": "To call", "phonetic": "/ʝaˈmaɾ/", "usage": "Voy a llamar a mi madre esta noche para preguntarle cómo está y contarle sobre mi nuevo trabajo emocionante." },
        { "word": "Mensaje", "translation": "Message", "phonetic": "/menˈsa.xe/", "usage": "Envío mensajes de texto a mis amigos todos los días para mantenerme en contacto y saber cómo están ellos." },
        { "word": "Cargar", "translation": "To charge / load", "phonetic": "/kaɾˈɣaɾ/", "usage": "Necesito cargar la batería de mi teléfono porque está casi vacía y tengo llamadas importantes que hacer esta tarde." },
        { "word": "Encender", "translation": "To turn on", "phonetic": "/ensenˈdeɾ/", "usage": "Enciendo mi computadora todas las mañanas a las ocho para empezar a trabajar y revisar mis correos electrónicos pendientes." },
        { "word": "Apagar", "translation": "To turn off", "phonetic": "/apaˈɣaɾ/", "usage": "Apago todas las luces de la casa antes de dormir para ahorrar energía y reducir la factura de electricidad mensual." },
        { "word": "Médico", "translation": "Doctor", "phonetic": "/ˈme.ði.ko/", "usage": "Mi hermana es médica en un hospital grande y trabaja en el departamento de emergencias salvando vidas todos los días." },
        { "word": "Enfermera", "translation": "Nurse", "phonetic": "/enfeɾˈme.ɾa/", "usage": "La enfermera del hospital es muy amable y cuida muy bien de los pacientes enfermos con dedicación y profesionalismo siempre." },
        { "word": "Ingeniero", "translation": "Engineer", "phonetic": "/inxeˈnje.ɾo/", "usage": "Soy ingeniero civil y diseño puentes y edificios grandes que deben ser seguros y duraderos para muchos años de uso." },
        { "word": "Abogado", "translation": "Lawyer", "phonetic": "/aβoˈɣa.ðo/", "usage": "Mi primo es abogado y trabaja en un bufete importante defendiendo los derechos de sus clientes en casos legales complejos." },
        { "word": "Policía", "translation": "Police officer", "phonetic": "/poliˈsi.a/", "usage": "El policía patrulla las calles del barrio todas las noches para mantener la seguridad y proteger a los ciudadanos de crímenes." },
        { "word": "Bombero", "translation": "Firefighter", "phonetic": "/bomˈbe.ɾo/", "usage": "Los bomberos son muy valientes y arriesgan sus vidas para apagar incendios y salvar personas atrapadas en edificios en llamas." },
        { "word": "Conductor", "translation": "Driver", "phonetic": "/kondukˈtoɾ/", "usage": "El conductor del autobús es muy amable y siempre saluda a los pasajeros con una sonrisa cuando suben al vehículo." },
        { "word": "Vendedor", "translation": "Salesperson", "phonetic": "/bendeˈðoɾ/", "usage": "El vendedor de la tienda me ayudó a encontrar los zapatos perfectos y me dio un descuento especial por ser cliente frecuente." },
        { "word": "Artista", "translation": "Artist", "phonetic": "/aɾˈtis.ta/", "usage": "Mi vecino es artista y pinta cuadros hermosos de paisajes naturales que vende en galerías de arte de la ciudad." },
        { "word": "Músico", "translation": "Musician", "phonetic": "/ˈmu.si.ko/", "usage": "Mi hermano es músico profesional y toca la guitarra en una banda de rock que da conciertos los fines de semana." },
        { "word": "Construcción", "translation": "Construction", "phonetic": "/konstɾukˈsjon/", "usage": "Trabajo en construcción y ayudo a construir casas nuevas y edificios comerciales grandes en toda la ciudad en desarrollo constante." },
        { "word": "Fábrica", "translation": "Factory", "phonetic": "/ˈfa.βɾi.ka/", "usage": "Mi padre trabaja en una fábrica de automóviles donde ensamblan coches nuevos todos los días con tecnología moderna avanzada." },
        { "word": "Tienda", "translation": "Store", "phonetic": "/ˈtjen.da/", "usage": "Voy a la tienda de comestibles todos los sábados para comprar frutas, verduras y otros alimentos frescos para la semana." },
        { "word": "Venta", "translation": "Sale", "phonetic": "/ˈben.ta/", "usage": "Hay una venta especial en la tienda de ropa este fin de semana con descuentos de hasta el cincuenta por ciento." },
        { "word": "Compra", "translation": "Purchase", "phonetic": "/ˈkom.pɾa/", "usage": "Hice una compra grande en el supermercado y gasté más de cien euros en comida y productos de limpieza para casa." },
        { "word": "Recibo", "translation": "Receipt", "phonetic": "/reˈsi.βo/", "usage": "Siempre guardo los recibos de mis compras importantes por si necesito devolver algo o reclamar la garantía del producto." },
        { "word": "Impuesto", "translation": "Tax", "phonetic": "/imˈpwes.to/", "usage": "Tengo que pagar impuestos sobre mis ingresos todos los años antes del quince de abril sin falta para evitar multas." },
        { "word": "Banco", "translation": "Bank", "phonetic": "/ˈbaŋ.ko/", "usage": "Voy al banco una vez al mes para depositar mi salario y pagar las facturas de servicios públicos de la casa." },
        { "word": "Ahorros", "translation": "Savings", "phonetic": "/aˈo.ros/", "usage": "Tengo una cuenta de ahorros en el banco donde guardo dinero para emergencias y para comprar una casa en el futuro." },
        { "word": "Crédito", "translation": "Credit", "phonetic": "/ˈkɾe.ði.to/", "usage": "Uso mi tarjeta de crédito para compras grandes y pago el saldo completo cada mes para evitar intereses altos innecesarios." },
        { "word": "Invertir", "translation": "To invest", "phonetic": "/imbeɾˈtiɾ/", "usage": "Quiero invertir mi dinero en la bolsa de valores para hacer crecer mis ahorros y tener más seguridad financiera futura." },
        { "word": "Ganar", "translation": "To win / earn", "phonetic": "/ɡaˈnaɾ/", "usage": "Gano un buen salario en mi trabajo actual y puedo vivir cómodamente sin preocupaciones financieras constantes todos los meses." },
        { "word": "Perder", "translation": "To lose", "phonetic": "/peɾˈðeɾ/", "usage": "No quiero perder mi trabajo porque necesito el dinero para pagar el alquiler y mantener a mi familia con dignidad." },
        { "word": "Gastar", "translation": "To spend", "phonetic": "/ɡasˈtaɾ/", "usage": "Trato de no gastar mucho dinero en cosas innecesarias y prefiero ahorrar para el futuro y emergencias inesperadas importantes." },
        { "word": "Éxito", "translation": "Success", "phonetic": "/ˈek.si.to/", "usage": "El éxito en mi carrera profesional es importante para mí y trabajo duro todos los días para alcanzar mis metas ambiciosas." },
        { "word": "Fracaso", "translation": "Failure", "phonetic": "/fɾaˈka.so/", "usage": "No tengo miedo al fracaso porque sé que es parte del proceso de aprendizaje y crecimiento personal continuo en la vida." },
        { "word": "Plan", "translation": "Plan", "phonetic": "/plan/", "usage": "Tengo un plan detallado para los próximos cinco años que incluye objetivos profesionales y personales que quiero lograr sin falta." },
        { "word": "Idea", "translation": "Idea", "phonetic": "/iˈðe.a/", "usage": "Tengo una idea brillante para un nuevo negocio que podría ser muy exitoso si consigo los fondos necesarios para empezar." },
        { "word": "Proyecto", "translation": "Project", "phonetic": "/pɾoˈʝek.to/", "usage": "Estoy trabajando en un proyecto importante en la oficina que debe estar terminado antes del fin de mes sin retrasos." },
        { "word": "Meta", "translation": "Goal", "phonetic": "/ˈme.ta/", "usage": "Mi meta principal este año es aprender español con fluidez para poder viajar a España y comunicarme sin problemas con locales." },
        { "word": "Difícil", "translation": "Difficult", "phonetic": "/diˈfi.sil/", "usage": "El examen de matemáticas fue muy difícil y muchos estudiantes no pudieron terminarlo a tiempo durante las dos horas." },
        { "word": "Fácil", "translation": "Easy", "phonetic": "/ˈfa.sil/", "usage": "La tarea de hoy es fácil y puedo terminarla en menos de treinta minutos sin ningún problema o dificultad." },
        { "word": "Rápido", "translation": "Fast", "phonetic": "/ˈra.pi.ðo/", "usage": "Necesito una conexión de internet rápida para poder trabajar eficientemente desde casa sin interrupciones molestas y constantes siempre." },
        { "word": "Lento", "translation": "Slow", "phonetic": "/ˈlen.to/", "usage": "El tráfico está muy lento esta mañana y voy a llegar tarde al trabajo si no encuentro una ruta alternativa." },
        { "word": "Importante", "translation": "Important", "phonetic": "/impoɾˈtan.te/", "usage": "Es importante estudiar todos los días para mantener el conocimiento fresco y prepararse bien para los exámenes finales difíciles." },
        { "word": "Urgente", "translation": "Urgent", "phonetic": "/uɾˈxen.te/", "usage": "Tengo un asunto urgente que resolver hoy y necesito hablar con mi jefe inmediatamente antes de que sea demasiado tarde." },
        { "word": "Libre", "translation": "Free (available)", "phonetic": "/ˈli.βɾe/", "usage": "Estoy libre este fin de semana y podemos reunirnos para tomar café y conversar sobre nuestros planes futuros emocionantes." },
        { "word": "Ocupado", "translation": "Busy", "phonetic": "/okuˈpa.ðo/", "usage": "Estoy muy ocupado esta semana con reuniones y proyectos importantes y no tengo tiempo libre para salir con amigos desafortunadamente." },
        { "word": "Listo", "translation": "Ready / Smart", "phonetic": "/ˈlis.to/", "usage": "Estoy listo para empezar el nuevo proyecto y tengo todas las herramientas y recursos necesarios para hacerlo bien exitosamente." },
        { "word": "Cerrado", "translation": "Closed", "phonetic": "/seˈra.ðo/", "usage": "La tienda está cerrada los domingos porque es el día de descanso del personal que trabaja allí toda la semana." },
        { "word": "Abierto", "translation": "Open", "phonetic": "/aˈβjeɾ.to/", "usage": "El museo está abierto de martes a domingo de diez de la mañana a seis de la tarde para visitantes interesados." },
        { "word": "Próximo", "translation": "Next", "phonetic": "/ˈpɾok.si.mo/", "usage": "La próxima reunión es el lunes a las nueve de la mañana en la sala de conferencias del tercer piso." },
        { "word": "Último", "translation": "Last", "phonetic": "/ˈul.ti.mo/", "usage": "Este es el último día para entregar el proyecto y necesito trabajar toda la noche para terminarlo a tiempo sin falta." },
        { "word": "Primero", "translation": "First", "phonetic": "/pɾiˈme.ɾo/", "usage": "Soy el primero en llegar a la oficina todas las mañanas porque me gusta empezar el día temprano y tranquilo." },
        { "word": "Segundo", "translation": "Second", "phonetic": "/seˈɣun.do/", "usage": "Mi oficina está en el segundo piso del edificio y tiene una vista hermosa del parque cercano con árboles verdes." },
        { "word": "Tercero", "translation": "Third", "phonetic": "/teɾˈse.ɾo/", "usage": "Quedé en tercer lugar en la competencia de ventas este mes y estoy muy orgulloso de mi desempeño laboral excelente." },
        { "word": "Ciencia", "translation": "Science", "phonetic": "/ˈsjen.sja/", "usage": "Me encanta la ciencia y especialmente la física porque explica cómo funciona el universo y las leyes naturales fundamentales que lo rigen." },
        { "word": "Historia", "translation": "History", "phonetic": "/isˈto.ɾja/", "usage": "Estudio historia en la universidad porque me fascina aprender sobre el pasado y cómo ha influenciado nuestro presente actual." },
        { "word": "Matemáticas", "translation": "Mathematics", "phonetic": "/mateˈma.ti.kas/", "usage": "Las matemáticas son mi materia favorita porque me gusta resolver problemas complejos y encontrar soluciones lógicas y precisas siempre." },
        { "word": "Arte", "translation": "Art", "phonetic": "/ˈaɾ.te/", "usage": "Me gusta visitar museos de arte los fines de semana para ver pinturas y esculturas de artistas famosos de diferentes épocas." },
        { "word": "Música", "translation": "Music", "phonetic": "/ˈmu.si.ka/", "usage": "Escucho música clásica mientras trabajo porque me ayuda a concentrarme mejor y ser más productivo durante el día laboral." },
        { "word": "Idioma", "translation": "Language", "phonetic": "/iˈðjo.ma/", "usage": "Estoy aprendiendo tres idiomas al mismo tiempo: español, francés e italiano para poder viajar por Europa sin barreras lingüísticas." },
        { "word": "Pregunta", "translation": "Question", "phonetic": "/pɾeˈɣun.ta/", "usage": "Tengo una pregunta importante sobre el proyecto y necesito hablar con mi supervisor antes de continuar con el trabajo pendiente." },
        { "word": "Respuesta", "translation": "Answer", "phonetic": "/resˈpwes.ta/", "usage": "Necesito encontrar la respuesta correcta a este problema de matemáticas antes del examen de mañana por la mañana temprano." },
        { "word": "Verdad", "translation": "Truth", "phonetic": "/beɾˈðað/", "usage": "Siempre digo la verdad porque creo que la honestidad es muy importante en todas las relaciones personales y profesionales de la vida." },
        { "word": "Mentira", "translation": "Lie", "phonetic": "/menˈti.ɾa/", "usage": "No me gustan las mentiras y prefiero que la gente sea honesta conmigo aunque la verdad sea difícil de escuchar." },
        { "word": "Ejemplo", "translation": "Example", "phonetic": "/eˈxem.plo/", "usage": "El profesor dio un ejemplo claro de cómo resolver el problema de matemáticas y ahora lo entiendo mucho mejor que antes." },
        { "word": "Página", "translation": "Page", "phonetic": "/ˈpa.xi.na/", "usage": "Estoy en la página cien del libro y me quedan doscientas páginas más para terminar de leer esta novela interesante." },
        { "word": "Línea", "translation": "Line", "phonetic": "/ˈli.ne.a/", "usage": "Dibuja una línea recta con la regla para dividir el papel en dos partes iguales y simétricas perfectamente alineadas." },
        { "word": "Palabra", "translation": "Word", "phonetic": "/paˈla.βɾa/", "usage": "Aprendo diez palabras nuevas en español todos los días para mejorar mi vocabulario y poder comunicarme mejor con nativos hispanohablantes." }
    ]
};

async function uploadModule07() {
    try {
        console.log('\n🚀 Uploading Spanish A1 Module 07...\n');

        await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .doc(module07.module_id)
            .set(module07, { merge: false });

        console.log(`✓ Uploaded: ${module07.theme}`);
        console.log(`  Module ID: ${module07.module_id} (clean format)`);

        const doc = await db
            .collection('languages')
            .doc('spanish')
            .collection('levels')
            .doc('a1')
            .collection('modules')
            .doc(module07.module_id)
            .get();

        const data = doc.data();
        console.log(`✓ Word 10: ${data.vocabulary[9].word} - ${data.vocabulary[9].translation}\n`);

        const localPath = join(__dirname, '../assets/data/curriculum/es_a1/es_a1_m07.json');
        writeFileSync(localPath, JSON.stringify(data, null, 2));
        console.log(`✓ Local mirror created\n`);

        console.log('✅ Module 07 Complete! (700 words total)\n');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

uploadModule07();
