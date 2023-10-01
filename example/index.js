const express = require('express');
const mongoose = require('mongoose');
const { getCachedData, putDataInCacheWithTTL, clearCacheData } = require('npm-cache-it');
const getCacheStatistics = require('../src/cache')

const app = express();
const port = process.env.PORT || 3000;
const cacheTTL = 60; 

mongoose.connect('mongodb://localhost:27017/your-database1');
const db = mongoose.connection;

db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to MongoDB'));

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  photo: String,
  d: String,
  e: String,
  f: String,
  g: String,
  h: String,
  i: String
});

const Person = mongoose.model('Person', personSchema);

app.use(express.json());

app.post('/people', async (req, res) => {
  const { name, age, photo, d, e, f, g, h, i } = req.body;
  const newPerson = new Person({ name, age, photo, d, e, f, g, h, i });
  try {
    const savedPerson = await newPerson.save();
    clearCacheData('people', 'GET');
    res.json(savedPerson);
  } catch (error) {
    res.status(500).json({ error: 'Error creating person' });
  }
});

app.get('/people', async (req, res) => {
  try {
    const cachedResponse = getCachedData('people', 'GET');
    if (cachedResponse) {
      console.log('Cache hit');
      return res.json(cachedResponse);
    }

    console.log('Cache miss');
    const people = await Person.find();
    putDataInCacheWithTTL('people', 'GET', people, cacheTTL);
    res.json(people);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching people' });
  }
});

app.put('/people/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  try {
    const updatedPerson = await Person.findByIdAndUpdate(id, { name, age }, { new: true });
    clearCacheData('people', 'GET');
    res.json(updatedPerson);
  } catch (error) {
    res.status(500).json({ error: 'Error updating person' });
  }
});

app.delete('/people/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Person.findByIdAndDelete(id);
    clearCacheData('people', 'GET');
    res.json({ message: 'Person deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting person' });
  }
});

app.get('/cache-stats', (req, res) => {
    const cacheStats = getCacheStatistics();
    res.json(cacheStats);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
