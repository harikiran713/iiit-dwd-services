// seed/serviceUsers.js
const mongoose = require('mongoose');
const ServiceUser = require('./models/user'); // adjust path if needed

const predefinedUsers = [
  { email: 'canteen@iiitdwd.ac.in', password: '123456', serviceType: 'canteen' },
  { email: 'laundry@iiitdwd.ac.in', password: '123456', serviceType: 'laundromat' },
  { email: 'medical@iiitdwd.ac.in', password: '123456', serviceType: 'medical' },
  { email: 'store@iiitdwd.ac.in', password: '123456', serviceType: 'store' },
  { email: 'milk@iiitdwd.ac.in', password: '123456', serviceType: 'milk' }
];

const seed = async () => {
  await mongoose.connect('mongodb+srv://harikiran:hari996633@iiitapp.wn142.mongodb.net/?retryWrites=true&w=majority&appName=iiitapp'); // Replace with your DB URL
  await ServiceUser.deleteMany({}); // Optional: clear existing users
  await ServiceUser.insertMany(predefinedUsers);
  console.log('Predefined service users seeded!');
  mongoose.disconnect();
};

seed();
