// Include packages needed for this application
const inquirer = require("inquirer");
const { Circle, Square, Triangle } = require("./lib/shapes");
const fs = require("fs");

class Svg {
  constructor() {
    // Stores the SVG text and shape element markup
    this.textElement = "";
    this.shapeElement = "";
  }
  render() {
    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`;
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
    message: "Text Color: Enter a color keyword (OR a hexadecimal number): ",
  },
  {
    type: "list",
    name: "pixel-image",
    message: "Choose which pixel image you would like?",
    choices: ["Circle", "Triangle", "Square"],
  },
  {
    type: "input",
    name: "shape",
    message: "Shape Color: Enter a color keyword (OR a hexadecimal number): ",
  },
];
// Function to write data to file
function writeToFile(fileName, data) {
  console.log("Writing [" + data + "] to file [" + fileName + "]");
  fs.writeFile(fileName, data, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Congratulations, you have generated a logo.svg!");
  });
}
async function init() {
  console.log("Starting init");
  var svgString = "";
  var svg_file = "logo.svg";

  // Prompt the user for answers
  const answers = await inquirer.prompt(questions);
  //user text
  var user_text = "";
  if (answers.text.length > 0 && answers.text.length < 4) {
    user_text = answers.text;
  } else {
    console.log(
      "Invalid user text field detected! Please enter 1-3 characters."
    );
    return;
  }
  console.log("User text: [" + user_text + "]");

  user_font_color = answers["text-color"];
  console.log("User font color: [" + user_font_color + "]");

  user_shape_color = answers.shape;
  console.log("User shape color: [" + user_shape_color + "]");

  user_shape_type = answers["pixel-image"];
  console.log("User entered shape: [" + user_shape_type + "]");

  let user_shape;
  if (user_shape === "Square" || user_shape_type === "square") {
    user_shape = new Square();
    console.log("User selected Square shape");
  } else if (user_shape_type === "Circle" || user_shape_type === "circle") {
    user_shape = new Circle();
    console.log("User selected Circle shape");
  } else if (user_shape_type === "Triangle" || user_shape_type === "triangle") {
    user_shape = new Triangle();
    console.log("User selected Triangle shape");
  } else {
    console.log("Invalid shape!");
  }
  user_shape.setColor(user_shape_color);

  var svg = new Svg();
  svg.setTextElement(user_text, user_font_color);
  svg.setShapeElement(user_shape);
  svgString = svg.render();

  console.log("Displaying shape:\n\n" + svgString);
  console.log("Shape generation complete!");
  console.log("Writing shape to file...");
  writeToFile(svg_file, svgString);
}

init();
