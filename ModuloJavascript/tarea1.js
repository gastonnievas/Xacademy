// Tarea 1 - Módulo Javascript | Gastón E. Nievas | Xacademy Santex 

/* ENUNCIADO EJERCICIO 1) Realizar una funcion que reciba un numero y escriba una piramide 
desde 1 hasta ese numero de la siguiente forma:
para valor 6
1
12
123
1234
12356

para valor 3
1
12
123  */

// RESPUESTA 1: En principio intente hacer sumatoria++ pero solo me daba el resultado de la sumatoria. 
// La forma que se me ocurrio fue ir concatenando los i mientras se recorría el bucle for.
// Inicializo la variable sumatoria como un string vacío. 
console.log("EJERCICIO 1")
function piramide (numero){
    let sumatoria = "";
    for(i=1; i <= numero; i++){
        sumatoria = sumatoria.concat(i);
        console.log(sumatoria + "\n") // Agrego salto de línea
    }    
}
piramide(3);
piramide(6);

/* ENUNCIADO EJERCICIO 2) Escribir una funcion que reciba 2 array y devuelva un array con todos los elementos que coinciden entre ellos

Ejemplo:
Array1: ['rojo', 'azul', 'amarillo']
Array2: ['blanco', 'negro', 'rojo']
Resultado: ['rojo']

Ejemplo 2:
Array1: [4, 3, true, 'manzana']
Array2: ['pera', 3, f alse, true, 3, true]
Resultado: [3, true] */

console.log("EJERCICIO 2")
// RESPUESTA 2: Utilizo el método indexOf() visto en la segunda clase.  
function iguales(arr1, arr2){
    const arreglo = [];
    for (i=0; i < arr1.length; i++){
        if(arr2.indexOf(arr1[i]) >= 0){ // Si el elemento del arr1 existe en el arr2, indexOf() devuelve 0 o más.
            arreglo.push(arr1[i]) // Si indexOf() devuelve 0 o más, existe el elemento y lo agrego al array de resultado.
        }
    }
    return console.log(arreglo);
}
iguales(['rojo', 'azul', 'amarillo'], ['blanco', 'negro', 'rojo']);
iguales([4, 3, true, 'manzana'], ['pera', 3, false, true, 3, true]);

/* ENUNCIADO EJERCICIO 3)
3.1) Dado el siguiente objeto
let carrito = {
    montoTotal: 10,
    productos: ["Leche"]
}

Crear las clases necesarias para generar carritos respetando la estructura del objeto dado.

3.2) Agregar un metodo a la clase que agregue un producto al carrito y actualice el montoTotal
agregarProducto(nombre, precio, unidades) {
    // Completar aca...
}

Ej:
agregarProducto("Azucar", 5, 2);

//Resultado esperado
carrito = {
    montoTotal: 20,
    productos: ["Leche", "Azucar"]
}
*/

// RESPUESTA 3.1 y 3.2: ------------------------------
/*----------------------
console.log("EJERCICIO 3.1 y 3.2")
class Producto { // Clase para crear el objeto Producto, con nombre, precio y cantidad
    constructor(nombre, precio, cantidad){
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad
    }
}
class Carrito { // Clase solicitada Carrito, con Monto Total = 0 y Producto como array. 
    constructor(montoTotal = 0, producto = []){
        this.producto = producto;
        this.montoTotal = montoTotal;
    }

    agregarProducto(nombre, precio, cantidad){ // Método para agregar productos. 
        const nuevoProducto = new Producto(nombre, precio, cantidad); // Crea el objeto Producto que se agrega al carrito. 
        this.producto.push(nuevoProducto.nombre); // Agrego el nombre del producto 
        this.montoTotal += precio * cantidad; // Actualizo el monto total. 
    }    
}
// Prueba del punto 3.1 y 3.2
const carrito = new Carrito(); // Creo el objeto carrito
carrito.agregarProducto("Leche", 1, 10); // Agrego nuevo producto
carrito.agregarProducto("Azucar", 5, 2); // Agrego otro producto
console.log(carrito)
------------------------------------------ */

console.log("EJERCICIO 3 - Puntos 3.1, 3.2 y 3.3")
/* EJERCICIO 3 punto 3.3) Agregar al ejercicio anterior una validación para no permitir 
duplicados e imprimir un mensaje si el item ya existe “ya existe el producto xxx” */

// RESPUESTA 3 con el punto 3.3 incluido. 
class Producto { // Clase para crear el objeto producto, con nombre, precio y cantidad
    constructor(nombre, precio, cantidad){
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad
    }
}

class Carrito { // Clase solicitada Carrito, con Monto Total = 0 y Producto como array. 
    constructor(montoTotal = 0, producto = []){
        this.producto = producto;
        this.montoTotal = montoTotal;
    }
    agregarProducto(nombre, precio, cantidad){ // Método para agregar productos.         
        try { if (this.producto.indexOf(nombre) >= 0){ // Si el producto ya existe larga el error.
                throw (`El producto ${nombre} ya existe en el carrito.`) // Lanzo el error se cumple la condición
                } 
            const nuevoProducto = new Producto(nombre, precio, cantidad); // Crea el objeto Producto que se agrega al carrito. 
            this.producto.push(nuevoProducto.nombre); // Agrego el nombre del producto. 
            this.montoTotal += precio * cantidad; // Actualizo el monto total. 
            console.log(`Nuevo producto agregado: ${nuevoProducto.nombre} ${nuevoProducto.cantidad} unidades a $ ${nuevoProducto.precio} c/u`);
            } catch (error) {
            console.error(error); // Imprime el error enviado. 
        }
    }  
}
// Prueba del punto 3.1 y 3.2
const carrito = new Carrito(); // Creo el objeto carrito
carrito.agregarProducto("Leche", 1, 10); // Agrego nuevo producto
carrito.agregarProducto("Azucar", 5, 2); // Agrego otro producto
carrito.agregarProducto("Azucar", 10, 4); // Agrego ejemplo de ERROR
carrito.agregarProducto("Cacao", 15, 3); // Agrego otro producto
carrito.agregarProducto("Vaso", 12, 1); // Agrego otro producto
carrito.agregarProducto("Leche", 10, 4); // Agrego ejemplo de ERROR
console.log(`Productos en carrito: ${carrito.producto}
Monto total: $ ${carrito.montoTotal}`)