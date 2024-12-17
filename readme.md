**Proyecto Integrador - Comisión 24231 -  Front-End JS de Talento Tech**
**Alumno: Espinosa Matias Alejandro**
*Fase: Entrega Final* 

*Subido en netlify :  https://whiser.netlify.app/*

*Repositorio en github: https://github.com/MrBrewerCat/whiser-frontEnd*

**Descripción proyecto:**

Este proyecto se plantea la confección de un sitio web responsivo para una marca ficticia llamada “Whiser” la cual produce su propia cerveza 
artesanal, revende productos importados y merchandising relacionada a su marca.

Para este proyecto se usado:
    _ Bootstrap: solo para  el nav y el carrousel
    _ Fontawsome: para iconos en el header y en footer
    _ formspree: paragestin de formulario.
    _ pravatar: para generacion de imagenes de prueba en comentarios
    _Google font: se elegico como base del protyecto el suso de la fuente "Catamaran"

El sitio contendrá una navegación interna compuesta por Inicio (index.html), Productos (product.html), Contacto (contact.html), Sobre nosotros (about_us.html).

**Inicio (index)**: página principal del sitio maquetada en Grid y respetando las etiquetas semánticas principales: header, nav, main, section, footer.
También contiene un sidebar y una galería de imágenes.

**Productos**: contiene el catalogo completo de productos usando un diseño de “Cards” mediate flexbox. Cada card posee 2 botones: 
     _"ver mas" que despliega un menu modal desde la izquieda del viewport, mostrando el contenido del detalla del product.
     _"comprar" suma el producto al carro de compra.

**Contacto**: acá se encuentra el formulario de consultas el cual esta administrado por el sitio https://formspree.io/ para el direccionamiento de la mensajería. 

**Sobre nosotros**: esta subpágina se dividide en dos secciones. La primera contiene un biografía ficticia con una muestra de imágenes extraídas de https://unsplash.com/ y otras de pertenencia personal. La segunda sección contiene las reseñas las cuales se presentan en forma de cards, utilizando Grid. Para las imágenes de usuarios se han utilizado las imágenes de prueba de persona del sitio https://pravatar.cc/

otras paginas:
**resumen de compras**: se accede desde el icono del carro de compras ubicado en el header, en el se puede visualizar las compras, aumentar la cantidad, quitarlas o borrar la lista completa.

**Iniciar session/ Crear cuentas / comprar (boton en resumen de compras)**: todos ellos llevan a una pagina la cual indica que se encuentran  bajo diseño.

Se otorgo funcionalidades con javascrip, haciendo uso de la manipulación básica del DOM y eventos click. Las funcionalidades incorporadas son:

**Diseño de flex card en la pagina de productos y en la seccion destacados de index**: Se recibe un Json el cual contiene un array de objetos,  a medida que recorre este crea las cards que se visualizan en la pagina
    _ las card poseen el boton ver mas, la cual desplega un menul modal con el detalla del producto.
    _ el boton compra agrega el producto a la lista del carrito o resumen de compra.

**Carrito de compras / Resumen de compras**: visualiza el valor total de todos los elementos guardados para comprar, se puede editar la cantidaddes, quitar un elemento individualmente o borrar la lista completa. se dio usa se localStorage y sessionStorage. 

**Verificacion de campos de formulario**: se utilizan funcione spara verificar que los campos se encuentren completos y se permita el envio del mismo.

