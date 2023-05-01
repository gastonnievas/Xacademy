/* GASTÓN NIEVAS - TRABAJO INTEGRADOR DEL MÓDULO JAVASCRIPT - SANTEX XACADEMY 2023

En el archivo tarea2.js podemos encontrar un código de un supermercado que vende productos.
El código contiene 
    - una clase Producto que representa un producto que vende el super
    - una clase Carrito que representa el carrito de compras de un cliente
    - una clase ProductoEnCarrito que representa un producto que se agrego al carrito
    - una función findProductBySku que simula una base de datos y busca un producto por su sku
El código tiene errores y varias cosas para mejorar / agregar
​
Ejercicios
1) Arreglar errores existentes en el código
    a) Al ejecutar agregarProducto 2 veces con los mismos valores debería agregar 1 solo producto con la suma de las cantidades.    
    b) Al ejecutar agregarProducto debería actualizar la lista de categorías solamente si la categoría no estaba en la lista.
    c) Si intento agregar un producto que no existe debería mostrar un mensaje de error.
​
2) Agregar la función eliminarProducto a la clase Carrito
    a) La función eliminarProducto recibe un sku y una cantidad (debe devolver una promesa)
    b) Si la cantidad es menor a la cantidad de ese producto en el carrito, se debe restar esa cantidad al producto
    c) Si la cantidad es mayor o igual a la cantidad de ese producto en el carrito, se debe eliminar el producto del carrito
    d) Si el producto no existe en el carrito, se debe mostrar un mensaje de error
    e) La función debe retornar una promesa
​
3) Utilizar la función eliminarProducto utilizando .then() y .catch()
*/

// Cada producto que vende el super es creado con esta clase
class Producto {
    sku;            // Identificador único del producto
    nombre;         // Su nombre
    categoria;      // Categoría a la que pertenece este producto
    precio;         // Su precio
    stock;          // Cantidad disponible en stock

    constructor(sku, nombre, precio, categoria, stock = 10) {
        this.sku = sku;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.stock = stock; // Inicio stock = 10, si viene por parametro, será igual al parametro. 

        // Si no me definen stock, pongo 10 por default
        // if (stock) {
        //     this.stock = stock;
        // } else {
        //     this.stock = 10;
        // }
    }
}

// Creo todos los productos que vende mi super
const queso = new Producto('KS944RUR', 'Queso', 10, 'lacteos', 4);
const gaseosa = new Producto('FN312PPE', 'Gaseosa', 5, 'bebidas');
const cerveza = new Producto('PV332MJ', 'Cerveza', 20, 'bebidas');
const arroz = new Producto('XX92LKI', 'Arroz', 7, 'alimentos', 20);
const fideos = new Producto('UI999TY', 'Fideos', 5, 'alimentos');
const lavandina = new Producto('RT324GD', 'Lavandina', 9, 'limpieza');
const shampoo = new Producto('OL883YE', 'Shampoo', 3, 'higiene', 50);
const jabon = new Producto('WE328NJ', 'Jabón', 4, 'higiene', 3);

// Genero un listado de productos. Simulando base de datos
const productosDelSuper = [queso, gaseosa, cerveza, arroz, fideos, lavandina, shampoo, jabon];

// Cada cliente que venga a mi super va a crear un carrito
class Carrito {
    productos;      // Lista de productos agregados
    categorias;     // Lista de las diferentes categorías de los productos en el carrito
    precioTotal;    // Lo que voy a pagar al finalizar mi compra

    // Al crear un carrito, empieza vació
    constructor() {
        this.precioTotal = 0;
        this.productos = [];
        this.categorias = [];
    }

    // Función que agrega @{cantidad} de productos con @{sku} al carrito
    async agregarProducto(sku, cantidad) {
    console.log(`Agregando ${cantidad} ${sku}`);
    console.log("--------------------------------")
        try {
            // Busco el producto en la "base de datos"
            const producto = await findProductBySku(sku);
            // Creo un producto nuevo
            const nuevoProducto = new ProductoEnCarrito(sku, producto.nombre, cantidad, producto.categoria, producto.precio);
            // Busco el producto en el carrito
            const productoEnCarrito = this.productos.find((productoEnCarrito) => productoEnCarrito.sku === sku);

            if (productoEnCarrito){
                console.log(`El producto ${sku}-${producto.nombre} ya existe en el carrito.`)
                if (productoEnCarrito.cantidad + nuevoProducto.cantidad > producto.stock){
                    console.log(`No es posible agregar ${nuevoProducto.cantidad} unidad/es de ${producto.nombre}, quedan en stock ${producto.stock - productoEnCarrito.cantidad} unidades. No se sumaron unidades del producto al carrito.`)
                } else {
                    productoEnCarrito.cantidad += nuevoProducto.cantidad;
                    this.precioTotal = this.precioTotal + (producto.precio * cantidad);
                    console.log("Hay disponible esa cantidad en stock. La cantidad fue actualizada en su carrito.");
                }
            } else if (nuevoProducto.cantidad > producto.stock)  {
                console.log(`No es posible agregar ${nuevoProducto.cantidad} unidad/es de ${producto.nombre}, quedan en stock ${producto.stock} unidades. El producto no fue agregado al carrito.`)
            } else {
                this.productos.push(nuevoProducto);
                this.precioTotal = this.precioTotal + (producto.precio * cantidad);
                if (!this.categorias.includes(producto.categoria)){
                    this.categorias.push(producto.categoria);}
                console.log(`El producto ${sku}-${producto.nombre} fue agregado al carrito.`);
            }
            this.imprimirCarrito();
        } catch (error) {
            console.error(error)
        }
    }
    eliminarProducto (sku, cantidad) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Busco el índice del producto en el carrito
                // Si el producto no existe, el metodo .findIndex() devuelve -1
                const indexProducto = this.productos.findIndex((producto) => producto.sku === sku);
                // Guardo el producto del carrito en una variable
                const productoEnCarrito = this.productos[indexProducto];
                // Guardo el producto de la base de datos de una variable
                const producto = productosDelSuper.find(product => product.sku === sku);
                if(indexProducto === -1){ // Verifica la existencia del producto en el carrito
                    reject(`El producto ${sku} no existe en el carrito.`);
                } else if (cantidad < productoEnCarrito.cantidad) { // Si la cantidad a eliminar en menor a la del carrito
                    productoEnCarrito.cantidad -= cantidad // Actualiza la cantidad
                    this.precioTotal = this.precioTotal - (producto.precio * cantidad); // Actualiza el monto total. 
                    resolve(`Se han reducido ${cantidad} unidad/es del producto ${sku}-${producto.nombre}`);
                } else {  // Si la cantidad es igual o mayor a la existente en el carrito.
                    this.productos.splice(indexProducto, 1); // Elimina el producto del carrito. 
                    this.precioTotal = this.precioTotal - (producto.precio * productoEnCarrito.cantidad); // Actualiza el precioTotal
                    // Verifico si la categoría todavía está presente en el carrito.
                    const indexCategoria = this.categorias.findIndex((categoria) => categoria === productoEnCarrito.categoria);
                    const categoriaProducto = this.productos.filter((producto) => producto.categoria === productoEnCarrito.categoria);
                    // Si la categoría no tiene más productos en el carrito, la elimino del array categorias.
                    if (categoriaProducto.length === 0 && indexCategoria !== -1) {
                        this.categorias.splice(indexCategoria, 1);
                    }
                    resolve(`El producto ${sku}-${producto.nombre} ha sido eliminado del carrito.`)
                }
            }, 0);
        } );
    }

    imprimirCarrito(){
        // Impresión del carrito en consola.
        console.log(`Productos en carrito: `)
        for (let i = 0; i < this.productos.length; i++){
            console.log(`- ${this.productos[i].nombre} por ${this.productos[i].cantidad} unidades a $ ${this.productos[i].precio} c/u.`)
        }
        console.log(`---<<<<< Total a pagar: $ ${this.precioTotal}.- >>>>>---`)
        console.log(`Categorías en el carrito: ${this.categorias.join(", ")}.`)
        console.log("------------------------------------------------------------------")
    }
}

// Cada producto que se agrega al carrito es creado con esta clase
class ProductoEnCarrito {
    sku;       // Identificador único del producto
    nombre;    // Su nombre
    cantidad;  // Cantidad de este producto en el carrito
    categoria; // Agrego categoría al producto en carrito para utilizarlo en la eliminación.
    precio;    // Agrego precio al producto en carrito para utilizarlo en la impresión en consola. 

    constructor(sku, nombre, cantidad, categoria, precio) {
        this.sku = sku;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.categoria = categoria;
        this.precio = precio;
    }
}

// Función que busca un producto por su sku en "la base de datos"
function findProductBySku(sku) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const foundProduct = productosDelSuper.find(product => product.sku === sku);
            if (foundProduct) {
                resolve(foundProduct);
            } else {
                reject(`El producto ${sku} no existe. Verifique el código.`);
            }
        }, 0);
    });
}

// PRUEBAS DE AGREGAR PRODUCTOS -------------------------------------------------------------------------
const carrito = new Carrito();
carrito.agregarProducto('WE328NJ', 2);   // Agrega un nuevo producto.
carrito.agregarProducto('XX92LKI', 20);  // Agrega un nuevo producto con una cantidad igual al stock.
carrito.agregarProducto('WE328NJ', 1);   // Agrega un producto que ya estaba en carrito para aumentar su cantidad.
carrito.agregarProducto('FN312PPE', 6);  // Agrega al carrito un producto que no tenía stock como parametro.
carrito.agregarProducto('UI999TY', 2);   // Agrega al carrito un producto que no tenía stock como parametro.

carrito.agregarProducto('WE328NJ++', 2);  // Intenta agregar un producto inexistente.
carrito.agregarProducto('PV332MJ', 12);   // Intenta agregar un nuevo producto con una cantidad mayor al stock que no vino por parametro.
carrito.agregarProducto('FN312PPE', 7);   // Intenta actualizar en el carrito producto por una cantidad, que sumada a la que ya esta en el carrito, es mayor al stock (que no vino como parametro).

// PRUEBAS DE ELIMINAR PRODUCTO --------------------------------------------------------------------------
carrito.eliminarProducto('WE328NJ', 2) // Elimina 2 productos de 3 existentes en el carrito.
.then((mensaje) => {
    console.log(mensaje);
    carrito.imprimirCarrito();
})
.catch((error) => console.error(error));

carrito.eliminarProducto('WE328NJ', 2) // Intenta eliminar 2 más, pero solo queda 1,
.then((mensaje) => {                   // por lo tanto elimina el producto del carrito
    console.log(mensaje);              // y también la categoría, ya que no hay otro producto                             
    carrito.imprimirCarrito();         // de la categoría "higiene" en el carrito.
})
.catch((error) => console.error(error));

carrito.eliminarProducto('WE328NJ++', 2) // Intenta eliminar un producto que no existe. 
.then((mensaje) => {
    console.log(mensaje);
    carrito.imprimirCarrito();
})
.catch((error) => console.error(error));

carrito.eliminarProducto('WE328NJ', 2) // Intenta eliminar un producto que ya no esta en el carrito. 
.then((mensaje) => {
    console.log(mensaje);
    carrito.imprimirCarrito();
})
.catch((error) => console.error(error));

carrito.eliminarProducto('RT324GD', 2) // Intenta eliminar un producto que no esta en el carrito. 
.then((mensaje) => {
    console.log(mensaje);
    carrito.imprimirCarrito();
})
.catch((error) => console.error(error));

carrito.eliminarProducto() // Intenta elimiar sin parametros para controlar el error. 
.then((mensaje) => {
    console.log(mensaje);
    carrito.imprimirCarrito();
})
.catch((error) => console.error(error));