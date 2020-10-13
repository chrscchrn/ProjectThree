module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      handle: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imageurl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true
      }
    });

    User.associate = function(models) {
      // Associating User with Posts
      // When an User is deleted, also delete any associated Posts
      User.hasMany(models.Post, {
        onDelete: "cascade"
      });
    };
    
    return User;
  };