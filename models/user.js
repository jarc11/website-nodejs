'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    }
  },
  {
    underscored: true
  });

  return User;
};