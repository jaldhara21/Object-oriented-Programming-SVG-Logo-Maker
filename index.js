// Include packages needed for this application
const inquirer = require("inquirer");
const { Circle, Square, Triangle } = require("./lib/shapes");

class Svg {
  constructor() {
    // Stores the SVG text and shape element markup
    this.textElement = "";
    this.shapeElement = "";
  }
  render() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`;
  }
  // Set the SVG text element markup with the provided text and color
  setTextElement(text, color) {
    this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`;
  }
  // Set the SVG shape element markup using the render method of the provided shape instance
  setShapeElement(shape) {
    this.shapeElement = shape.render();
  }
}

// Create an array of questions using the "inquirer" library for user input
const questions = [
  {
    type: "input",
    name: "text",
    message: "Text: Enter up to three characters: ",
  },
  {
    type: "input",
    name: "text-color",
    message: "Text color: Enter a color keyword (OR a hexadecimal number): ",
  },
  {
    type: "list",
    name: "shape",
    message: "Choose a shape: ",
    choices: ["circle", "triangle", "square"],
  },
  {
    type: "input",
    name: "shape's color",
    message: "enter a color keyword (OR a hexadecimal number): ",
  },
];
