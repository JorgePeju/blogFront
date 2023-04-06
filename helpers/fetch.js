
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