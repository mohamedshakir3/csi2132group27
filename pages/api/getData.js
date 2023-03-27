import mysql from "mysql2/promise"
require('dotenv').config()


export default async function handler(req, res) {

    const connection = mysql.createConnection(process.env.DATABASE_URL);
    
    try{
        
        const query = "SELECT * FROM Hotel"

        const values = []   

        const [results] = await (await connection).execute(query, values)  
        
        connection.end()
        
        res.status(200).json({results: results})

    }catch(error){
        res.status(500).json({error: error.message})
    }
    
}