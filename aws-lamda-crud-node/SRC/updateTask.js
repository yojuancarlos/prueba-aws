const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const updateTask = async (event) => {
    try {
        const { id } = event.pathParameters;
        const { title, description } = JSON.parse(event.body);

        // Actualiza solo los campos proporcionados
        const updateExpression = [];
        const expressionAttributes = {};

        if (title) {
            updateExpression.push("title = :title");
            expressionAttributes[":title"] = title;
        }

        if (description) {
            updateExpression.push("description = :description");
            expressionAttributes[":description"] = description;
        }

        // Si no hay campos para actualizar, retorna error
        if (updateExpression.length === 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "No se proporcionaron campos para actualizar" })
            };
        }

        const params = {
            TableName: 'taskstable',
            Key: { id },
            UpdateExpression: `SET ${updateExpression.join(", ")}`,
            ExpressionAttributeValues: expressionAttributes,
            ReturnValues: "ALL_NEW"
        };

        const result = await dynamoDB.update(params).promise();

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",  // CORS
                "Access-Control-Allow-Credentials": true,
              },
            body: JSON.stringify(result.Attributes)
        };

    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error al actualizar la tarea" })
        };
    }
};

module.exports = { updateTask };