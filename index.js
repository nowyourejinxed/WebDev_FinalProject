//Jesus Valenzuela
const { MongoClient } = require('mongodb');

const username = 'renijjw';
const password = 'bpZ6IqAZsQz15z0v';
const host = 'cluster0.j1forlp.mongodb.net';
const databaseName = 'x91Final';

async function connectToDatabase() {
    const uri = `mongodb+srv://${username}:${password}@${host}/${databaseName}?retryWrites=true&w=majority`;

    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log('Connected to the database successfully');

        const db = client.db(databaseName);
        const coursesCollection = db.collection('Courses');
        
        // Retrieve all documents from the 'Courses' collection
        const courses = await coursesCollection.find().toArray();
        console.log('All documents in the Courses collection:');
        console.log(courses);

        await client.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
}

async function findCoursesBySubject(subject) {
    const uri = `mongodb+srv://${username}:${password}@${host}/${databaseName}?retryWrites=true&w=majority`;

    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log('Connected to the database successfully');

        const db = client.db(databaseName);
        const coursesCollection = db.collection('Courses');
        
        // Search for courses by subject
        const query = { subject: subject };
        const courses = await coursesCollection.find(query).toArray();
        
        // Convert the result to JSON format
        const coursesJson = JSON.stringify(courses);
        console.log(`Courses with subject ${subject} in JSON format:`);
        console.log(coursesJson);

        await client.close();
        
        console.log('Database connection closed');
        return coursesJson;
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
}
//Example Usage
//findCoursesBySubject('CS');

//connectToDatabase();


//Marc Amandoron

//Modified Jesus find 
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/courses/:subject', async (req, res) => {
    try{
        const subject = req.params.subject;
        const courses = await findCoursesBySubject(subject);
        res.json(courses);
    }catch (error) {
        res.status(500).json({message : 'Failed to fetch data', error});
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});