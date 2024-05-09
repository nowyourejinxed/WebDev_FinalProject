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

async function findCoursesByFilters(filters) {
    const uri = `mongodb+srv://${username}:${password}@${host}/${databaseName}?retryWrites=true&w=majority`;

    const formattedFilters = Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== "") {
            switch (key) {
                case "dept":
                    acc.subject = value;
                    break;
                case "time":
                    acc["class start time"] = value === "AM" ? { "$lt": 11 } : { "$gt": 13 };
                    break;
                case "freq":
                    acc["class days"] = value.replace(",", "");
                    break;
                case "number":
                    acc.catalog = ` ${value}`;
                    break;
                case "component":
                    acc.component = value;
                    break;
                default:
                    break;
            }
        }
        return acc;
    }, {});

    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log('Connected to the database successfully');

        const db = client.db(databaseName);
        const coursesCollection = db.collection('Courses');

        const courses = await coursesCollection.find(formattedFilters).toArray();

        // Convert the result to JSON format
        // const coursesJson = JSON.stringify(courses);
        // console.log(`Courses with subject ${subject} in JSON format:`);
        // console.log(coursesJson);

        // Remove the spaces in the keys
        const formattedCourses = courses.map(obj => {
            const newObj = {};
            Object.keys(obj).forEach(key => {
                newObj[key.replace(/\s+/g, '')] = obj[key];
            });
            return newObj;
        });
        await client.close();
        console.log('Database connection closed');
        return formattedCourses;
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
}
//Example Usage
//findCoursesBySubject('CS');

// connectToDatabase();


//Marc Amandoron

//Modified Jesus find 
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());


// Static Files
app.use('/public', express.static(__dirname + '/public'));

// Set View's
app.set('views', './views');
app.set('view engine', 'ejs');


// View
app.get('', (req, res) => {
    res.render('index');
})

app.get('/api/courses', async (req, res) => {
    try {
        const fitlers = req.query;
        const courses = await findCoursesByFilters(fitlers);
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch data', error });
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});