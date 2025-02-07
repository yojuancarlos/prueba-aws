const AWS = require('aws-sdk');
const { v4 } = require('uuid');
const s3 = new AWS.S3();

const { json } = require('stream/consumers');



const addTask = async (event) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    
    // Parsea el body incluyendo el archivo (en base64)
    const { title, description, fileName, fileContent } = JSON.parse(event.body);
    
    // Sube el archivo a S3
    const fileUrl = await uploadToS3(fileName, fileContent);
  
    const newTask = {
      id: v4(),
      title,
      description,
      createdAt: new Date().toISOString(),
      fileUrl  // Guarda la URL en DynamoDB
    };
  
    await dynamoDB.put({
      TableName: 'taskstable',
      Item: newTask
    }).promise();
  
    return {
      statusCode: 200,
      headers: { 
        "Access-Control-Allow-Origin": "http://localhost:5173",
        "Content-Type": "application/json" 
       

      },
      body: JSON.stringify(newTask)
    };
  };
  
  // Función auxiliar para subir a S3
  const uploadToS3 = async (fileName, fileContent) => {
    const buffer = Buffer.from(fileContent, 'base64');
    
    const params = {
      Bucket: 'archivosalmacenados',
      Key: `${Date.now()}-${fileName}`,
      Body: buffer,
      ContentType: 'application/octet-stream'
    };
  
    await s3.upload(params).promise();
    return `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
  };
  
  module.exports = { addTask };













