// User.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Import the sequelize instance

class User extends Model {}

// Initialize the User model
User.init(
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

// Export the User model
module.exports = User;
