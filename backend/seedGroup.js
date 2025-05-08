const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Group = require('./models/Groups');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/your-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    return Group.insertMany([
      {
        name: 'Friends you haven’t met yet',
        location: 'Brisbane, AU',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        memberCount: 2000,
        visibility: 'public',
        color: '#C48181',
      },
      {
        name: 'Hiking South East Queensland',
        location: 'Brisbane, AU',
        description: 'Lorem ipsum dolor sit amet...',
        memberCount: 5600,
        visibility: 'private',
        color: '#46514C',
      },
      {
        name: 'Helping New Motorcyclist',
        location: 'Brisbane, AU',
        description: 'Lorem ipsum dolor sit amet...',
        memberCount: 800,
        visibility: 'public',
        color: '#2J6858C',
      },
      {
        name: 'Helping New Motorcyclist',
        location: 'Brisbane, AU',
        description: 'Lorem ipsum dolor sit amet...',
        memberCount: 800,
        visibility: 'public',
        color: '#2E618C',
      },
      {
        name: 'Helping New Motorcyclist',
        location: 'Brisbane, AU',
        description: 'Lorem ipsum dolor sit amet...',
        memberCount: 800,
        visibility: 'public',
        color: '#2E238C',
      },
    ]);
  })
  .then(() => {
    console.log('Groups seeded successfully');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('Seeding error:', err);
    mongoose.disconnect();
  });
