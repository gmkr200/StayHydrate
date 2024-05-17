"use strict";
const fs = require("fs");
const path = require("path");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const productsCsvFilePath = path.join(
      __dirname,
      "..",
      "seedData",
      "productsV2.csv"
    );
    const productsCsvData = fs
      .readFileSync(productsCsvFilePath, "utf-8")
      .split("\n")
      .map((row) => row.split(","));

    const [headers, ...rows] = productsCsvData;
    const columns = headers.map((header) => header.trim());

    const productsData = rows.map((row) => {
      const rowData = Object.fromEntries(
        columns.map((col, index) => [col, row[index].trim()])
      );
      // Add createdAt and updatedAt fields with current timestamps
      rowData.created_at = new Date();
      rowData.updated_at = new Date();
      return rowData;
    });

    // Delete existing data from the products table
    await queryInterface.bulkDelete("products", null, {});
    await queryInterface.bulkInsert("products", productsData, {});

    const categoriesCsvFilePath = path.join(
      __dirname,
      "..",
      "seedData",
      "categories.csv"
    );
    const categoriesCsvData = fs
      .readFileSync(categoriesCsvFilePath, "utf-8")
      .split("\n")
      .map((row) => row.trim());

    // Extract category names from CSV
    const categoriesData = categoriesCsvData.map((categoryName) => ({
      category_name: categoryName.trim(),
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkDelete("categories", null, {});
    await queryInterface.bulkInsert("categories", categoriesData, {});

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
    await queryInterface.bulkDelete("categories", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
