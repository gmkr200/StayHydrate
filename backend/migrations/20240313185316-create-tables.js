"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // product_title,product_description,available_stock,product_rating,sold_by,brand,product_category,age_group,product_price,image_url
    await queryInterface.createTable("products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      product_description: {
        type: Sequelize.TEXT,
        unique: true,
      },
      available_stock: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      product_rating: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      sold_by: {
        type: Sequelize.STRING,
      },
      brand: {
        type: Sequelize.STRING,
      },
      product_category: {
        type: Sequelize.STRING,
      },
      age_group: {
        type: Sequelize.STRING,
      },
      product_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      image_url: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("categories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      category_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // await queryInterface.createTable("users", {
    //   id: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: Sequelize.INTEGER,
    //   },
    //   username: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //     unique: true,
    //   },
    //   email: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //     unique: true,
    //   },
    //   password: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //   },
    //   created_at: {
    //     allowNull: false,
    //     type: Sequelize.DATE,
    //   },
    //   updated_at: {
    //     allowNull: false,
    //     type: Sequelize.DATE,
    //   },
    // });

    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      is_admin: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      is_verified: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      is_disabled: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      token_text: {
        type: Sequelize.TEXT,
      },
      last_login: {
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    await queryInterface.createTable("password_resets", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      token_text: {
        type: Sequelize.TEXT,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    await queryInterface.createTable("carts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("products");
    await queryInterface.dropTable("categories");
    await queryInterface.dropTable("users");
    await queryInterface.dropTable("carts");
    // await queryInterface.dropTable("product_categories");
    await queryInterface.dropTable("password_resets");
    // await queryInterface.dropTable("users");
  },
};

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable('Products', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       product_title: {
//         type: Sequelize.STRING
//       },
//       product_description: {
//         type: Sequelize.STRING
//       },
//       available_stock: {
//         type: Sequelize.INTEGER
//       },
//       sold_by: {
//         type: Sequelize.STRING
//       },
//       product_rating: {
//         type: Sequelize.INTEGER
//       },
//       product_category: {
//         type: Sequelize.STRING
//       },
//       tag: {
//         type: Sequelize.STRING
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       }
//     });

// await queryInterface.createTable("product_categories", {
//   id: {
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//     type: Sequelize.INTEGER,
//   },
//   product_id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     references: {
//       model: "products",
//       key: "id",
//     },
//   },
//   category_id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     references: {
//       model: "categories",
//       key: "id",
//     },
//   },
//   createdAt: {
//     allowNull: false,
//     type: Sequelize.DATE,
//   },
//   updatedAt: {
//     allowNull: false,
//     type: Sequelize.DATE,
//   },
// });

//     await queryInterface.createTable('Categories', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       category_name: {
//         type: Sequelize.STRING
//       },
//       tag: {
//         type: Sequelize.STRING
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       }
//     });

//     await queryInterface.createTable('Carts', {
//       id: {
//         allowNull: false,
//         // autoIncrement: true,
//         // primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       product_title: {
//         type: Sequelize.STRING
//       },
//       quantity: {
//         type: Sequelize.STRING
//       },
//       user_id: {
//         type: Sequelize.INTEGER
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       }
//     });
//   },
//   async down(queryInterface, Sequelize) {
//     await queryInterface.dropTable('Products');
//   }
// };
