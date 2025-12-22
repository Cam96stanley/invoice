const dotenv = require('dotenv');
const app = require('./app');
const sequelize = require('./config/database');
require('./models/Associations');

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB Connected');

    await sequelize.sync({ alter: true });
    console.log('Tables synced');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
};

startServer();
