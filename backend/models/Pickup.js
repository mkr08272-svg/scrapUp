module.exports = (sequelize, DataTypes) => {
  const Pickup = sequelize.define('Pickup', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    scrapType: {
      type: DataTypes.STRING, // e.g., 'Plastic', 'Metal', 'Paper', 'E-waste'
      allowNull: false
    },
    estimatedWeight: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    actualWeight: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    estimatedValue: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    finalPayment: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    pickupTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('Requested', 'Collector Assigned', 'En Route', 'Pickup Completed'),
      defaultValue: 'Requested'
    }
  });

  return Pickup;
};
