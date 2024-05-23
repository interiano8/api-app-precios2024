// import bwipjs from 'bwip-js';

// // Función para generar el código de barras y convertirlo a base64
// export default async function generateBarcodeBase64(value) {
//     // Generar el código de barras
//     const pngBuffer = await bwipjs.toBuffer({
//         bcid: 'qrcode',       // Tipo de código de barras
//         text: value.toString(),           // Valor para el código de barras
//         scale: 1,              // Escala del código de barras
//         includetext: true,     // Incluir el valor en el código de barras
//         textxalign: 'center',  // Alineación horizontal del texto
//         backgroundcolor : '#ffffff', // Color de fondo
//         height:      80,
//         width:       80
//     });

//     // Convertir el código de barras a base64
//     const base64Image = pngBuffer.toString('base64');

//     return base64Image;
// }