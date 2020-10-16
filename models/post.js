module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 240]
        }
      },
      likeCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      commentCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      handle: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 50]
        }
      },
      imageURL: {
        type: DataTypes.STRING,
      }
    });

    Post.associate = (models) => {
      Post.belongsTo(models.User, { 
        foreignKey: {
          allowNull: false,
        },
        targetKey: "email"
      });
    };

    return Post;
};