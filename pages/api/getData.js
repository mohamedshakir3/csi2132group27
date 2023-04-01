import mysql from "mysql2/promise"
require('dotenv').config()


export default async function handler(req, res) {

    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    
    try{
        
        const query ="SELECT r.*, h.hotel_name, h.country, h.city, h.stars, a.amenity FROM Room r INNER JOIN Hotel h ON r.hotel_id = h.hotel_id LEFT JOIN Amenity a ON r.room_id = a.room_id;"

        const values = []   

        const [results] = await (await connection).execute(query, values)  
        
        connection.end()
        
        res.status(200).json({results: results})

    }catch(error){
        res.status(500).json({error: error.message})
    }
    
}