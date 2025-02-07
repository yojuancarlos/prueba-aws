const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const getTaskById = async (event) => {
    try {
        const { id } = event.pathParameters; // Extrae el ID de la URL
        
        const result = await dynamoDB.get({
            TableName: 'taskstable',
            Key: { id } // Busca la tarea por el ID
        }).promise();

        // Si no existe la tarea, retorna 404
        if (!result.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "Tarea no encontrada" })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(result.Item)
        };

    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error al obtener la tarea" })
        };
    }
};

module.exports = { getTaskById };