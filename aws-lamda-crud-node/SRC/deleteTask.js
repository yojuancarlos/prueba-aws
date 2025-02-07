const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const deleteTask = async (event) => {
    try {
        const { id } = event.pathParameters;

        // Verificar si la tarea existe antes de eliminar
        const getResult = await dynamoDB.get({
            TableName: 'taskstable',
            Key: { id }
        }).promise();

        if (!getResult.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "Tarea no encontrada" })
            };
        }

        // Eliminar la tarea
        await dynamoDB.delete({
            TableName: 'taskstable',
            Key: { id }
        }).promise();

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",  // CORS
                "Access-Control-Allow-Credentials": true,
              },
            body: JSON.stringify({ message: "Tarea eliminada correctamente" })
        };


    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error al eliminar la tarea" })
        };
    }
};

module.exports = { deleteTask };