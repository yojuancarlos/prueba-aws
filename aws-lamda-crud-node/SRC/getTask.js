const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const getTask = async (event) => {
    try {
        const result = await dynamoDB.scan({
            TableName: 'taskstable',
        }).promise();

        const tasks = result.Items;
        return {
            statusCode: 200, 
            headers: {
                "Access-Control-Allow-Origin": "*",  // CORS
                "Access-Control-Allow-Credentials": true,
              },
            body: JSON.stringify(tasks),
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error al obtener las tareas" }),
        };
    }
};

module.exports = { getTask };