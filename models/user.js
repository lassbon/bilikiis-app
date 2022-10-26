'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    user_id:  DataTypes.STRING,
    lastname: DataTypes.STRING,
    othernames: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    password_salt: DataTypes.STRING,
    createdAt:  DataTypes.DATE,
    updatedAt:  DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};