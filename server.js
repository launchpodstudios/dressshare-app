require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(express.json());

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || 'dressshare';

let db;

async function connectDB() {
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  console.log('Connected to MongoDB');
}

connectDB().catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

// Sample API endpoints
app.get('/api/dresses', async (req, res) => {
  try {
    const { circleId } = req.query;
    const filter = circleId ? { circleId } : {};
    const dresses = await db.collection('dresses').find(filter).toArray();
    res.json(dresses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/dresses', async (req, res) => {
  try {
    const doc = req.body;
    const result = await db.collection('dresses').insertOne(doc);
    res.json({ id: result.insertedId, ...doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Additional endpoints for borrows, messages etc. can be added here

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
