const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'scrapup.sqlite'),
  logging: false
});

const User = require('./User')(sequelize, DataTypes);
const Pickup = require('./Pickup')(sequelize, DataTypes);

// Relationships
User.hasMany(Pickup, { foreignKey: 'customerId', as: 'customerPickups' });
Pickup.belongsTo(User, { foreignKey: 'customerId', as: 'customer' });

User.hasMany(Pickup, { foreignKey: 'collectorId', as: 'collectorPickups' });
Pickup.belongsTo(User, { foreignKey: 'collectorId', as: 'collector' });

module.exports = { sequelize, User, Pickup };
