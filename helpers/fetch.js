/**
 * Esta función realiza una consulta a una API utilizando la URL, método y cuerpo proporcionados.
 * @async
 * @function
 * @param {String} url - La URL de la API a consultar.
 * @param {String} [method] - El método HTTP a utilizar en la consulta. Por defecto, "GET".
 * @param {Object} [body={}] - Los datos a enviar a la API. Por defecto, un objeto vacío.
 * @returns {Promise<Object>} - Una Promesa que se resuelve a un objeto que contiene la respuesta de la API.
 * @throws {Error} - Si hay un error durante la consulta a la API.
 */
const consultation = async (url, method, body = {}) => {

    let options = {};

    const data = { ...body }

    try {

        if ( method == "POST" || method == "PUT" ) {

            options = {

                method: method,
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json",
                }

            }
        }

        if(method == 'DELETE'){

            options = { method }
            
        };

        let request = await fetch(url, options);

        let respuesta = await request.json();

        return respuesta;

    } catch (error) {

        console.log(error)

    }
}

module.exports = { consultation };
/**
 * @typedef {Object} ObjetoRespuesta
 * @property {json} 
 */
/**
 * @typedef {Object} ObjetoError
 * @property {String} error - El mensaje de error.
 */ 
