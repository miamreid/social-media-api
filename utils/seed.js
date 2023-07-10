const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUser, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughtData' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughtData');
    }

    let userCheck = await connection.db.listCollections({ name: 'userData' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('userData');
    }


  // Create empty array to hold the users
  const users = [];

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {


    const username = getRandomUsername();

    userData.push({
      username
    });
  }

  // Add students to the collection and await the results
  await User.collection.insertMany(students);

  // Add courses to the collection and await the results
  await Course.collection.insertOne({
    courseName: 'UCLA',
    inPerson: false,
    students: [...students],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(students);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
