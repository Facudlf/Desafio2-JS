// https://www.geeksforgeeks.org/node-js-fs-writefile-method/
// const fs = require('fs')

const fs = require('fs').promises;

// PUNTO 1
function promedioEdad(personas) {
    let edad = 0;
    let total = 0;
    personas.forEach(persona => {
        edad += persona.edad;
        total++;
    });
    return Math.round(edad / total);
}

// PUNTO 2
function encontrarMenor(personas) {
    let menor = personas[0].edad;
    let personaMenor = personas[0];
    personas.forEach(persona => {
        let edad = persona.edad;
        if (edad < menor) {
            menor = edad;
            personaMenor = persona;
        }
    });
    return personaMenor;
}

// PUNTO 3
function encontrarGomez(personas) {
    let gomez = [];
    personas.forEach(persona => {
        if (persona.apellido === 'GOMEZ') {
            gomez.push(persona.nombre);
        }
    });
    return gomez.sort();
}

// PUNTO 4
function sumaEdadesParImpar(personas) {
    let suma = 0;
    personas.forEach(persona => {
        if ((persona.nombre.length % 2 === 0) && (persona.apellido.length % 2 !== 0)) {
            suma += persona.edad;
        }
    });
    return suma;
}

// PUNTO 5 CON PROMESAS
async function generarArchivoPunto5(personas) {
    try {
        let mayoresDeEdad = 0;
        let menoresDeEdad = 0;
        let primeraMitad = 0;
        let segundaMitad = 0;

        personas.forEach(persona => {
            if (persona.edad > 18) {
                mayoresDeEdad++;
            } else {
                menoresDeEdad++;
            }

            const primerLetraApellido = persona.apellido.charAt(0).toUpperCase();

            if (primerLetraApellido >= 'A' && primerLetraApellido <= 'L') {
                primeraMitad++;
            } else if (primerLetraApellido >= 'M' && primerLetraApellido <= 'Z') {
                segundaMitad++;
            }
        });

        const datos = {
            mayoresDeEdad,
            menoresDeEdad,
            primeraMitad,
            segundaMitad
        };

        const json = JSON.stringify(datos);

        await fs.writeFile('punto5.json', json, 'utf8');
        console.log('Archivo generado exitosamente');
    } catch (err) {
        console.error('Error al generar el archivo:', err);
    }
}

// PUNTO 6 CON PROMESAS
async function generarArchivoPunto6(personas) {
    try {
        let castillo = 0;
        let diaz = 0;
        let ferrer = 0;
        let pino = 0;
        let romero = 0;
        personas.forEach(persona => {
            if (persona.apellido.toLowerCase() === 'castillo') {
                castillo++;
            } else if (persona.apellido.toLowerCase() === 'diaz') {
                diaz++;
            } else if (persona.apellido.toLowerCase() === 'ferrer') {
                ferrer++;
            } else if (persona.apellido.toLowerCase() === 'pino') {
                pino++;
            } else if (persona.apellido.toLowerCase() === 'romero') {
                romero++;
            }
        });
        const apellidos = {
            castillo,
            diaz,
            ferrer,
            pino,
            romero
        };
        const json = JSON.stringify(apellidos);
        await fs.writeFile('punto6.json', json, 'utf8');
        console.log('Archivo generado exitosamente');
    } catch (err) {
        console.error('Error al generar el archivo:', err);
    }
}

// FUNCION PRINCIPAL CON PROMESAS
async function main() {
    try {
        const data = await fs.readFile('personas.json', 'utf8');
        const personas = JSON.parse(data);
        const menor = encontrarMenor(personas);
        
        console.log('La edad promedio del archivo JSON es: ' + promedioEdad(personas));
        console.log('La persona más joven del conjunto es ' + menor.nombre + ', ' + menor.apellido);
        console.log('Listado de todos los Gomez: ' + encontrarGomez(personas));
        console.log('La suma de las edades de las personas es: ' + sumaEdadesParImpar(personas));
        
        await generarArchivoPunto5(personas);
        await generarArchivoPunto6(personas);
    } catch (err) {
        console.error('Error al leer el archivo:', err);
    }
}

main();


// FUNCION PRINCIPAL SIN PROMESAS
 /* function main() {
    fs.readFile('personas.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return;
        }
        const personas = JSON.parse(data);
        const menor = encontrarMenor(personas);
        console.log('La edad promedio del archivo JSON es: ' + promedioEdad(personas));
        console.log('La persona más joven del conjunto es ' + menor.nombre + ', ' + menor.apellido);
        console.log('Listado de todos los Gomez: ' + encontrarGomez(personas));
        console.log('La suma de las edades de las personas es: ' + sumaEdadesParImpar(personas));
        generarArchivoPunto5(personas);
        generarArchivoPunto6(personas);
    });
} */

// PUNTO 5 SIN PROMESAS
/* function generarArchivoPunto5(personas) {
    let mayoresDeEdad = 0;
    let menoresDeEdad = 0;
    let primeraMitad = 0;
    let segundaMitad = 0;

    personas.forEach(persona => {
        if (persona.edad > 18) {
            mayoresDeEdad++;
        } else {
            menoresDeEdad++;
        }

        const primerLetraApellido = persona.apellido.charAt(0).toUpperCase();

        if (primerLetraApellido >= 'A' && primerLetraApellido <= 'L') {
            primeraMitad++;
        } else if (primerLetraApellido >= 'M' && primerLetraApellido <= 'Z') {
            segundaMitad++;
        }
    });

    const datos = {
        mayoresDeEdad,
        menoresDeEdad,
        primeraMitad,
        segundaMitad
    };

    const json = JSON.stringify(datos);

    fs.writeFile('punto5.json', json, 'utf8', (err) => {
        if (err) {
            console.error('Error al generar el archivo:', err);
            return;
        }
        console.log('Archivo generado exitosamente');
    });
}*/

// PUNTO 6 SIN PROMESAS
/* function generarArchivoPunto6(personas) {
    let castillo = 0;
    let diaz = 0;
    let ferrer = 0;
    let pino = 0;
    let romero = 0;

    personas.forEach(persona => {
        if (persona.apellido.toLowerCase() === 'castillo') {
            castillo++;
        } else if (persona.apellido.toLowerCase() === 'diaz') {
            diaz++;
        } else if (persona.apellido.toLowerCase() === 'ferrer') {
            ferrer++;
        } else if (persona.apellido.toLowerCase() === 'pino') {
            pino++;
        } else if (persona.apellido.toLowerCase() === 'romero') {
            romero++;
        }
    });

    const apellidos = {
        castillo,
        diaz,
        ferrer,
        pino,
        romero
    };

    const json = JSON.stringify(apellidos);

    fs.writeFile('punto6.json', json, 'utf8', (err) => {
        if (err) {
            console.error('Error al generar el archivo:', err);
            return;
        }
        console.log('Archivo generado exitosamente');
    });
} */
