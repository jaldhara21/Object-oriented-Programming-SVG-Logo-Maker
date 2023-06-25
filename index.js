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
// Function to write data to file
function writeToFile(fileName, data) {
  console.log(`Writing [${data}] to file [${fileName}]`);
  filesystem.writeFile(fileName, data, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Congratulations, you have generated a logo.svg!");
  });
}
async function init() {
  console.log("Starting init");

  // Prompt the user for answers
  const answers = await inquirer.prompt(questions);

  const userText = answers.text;
  if (userText.length === 0 || userText.length > 3) {
    console.log("Invalid user text field detected! Please enter 1-3 characters.");
    return;
  }
  console.log(`User text: [${userText}]`);

  const userFontColor = answers["text-color"];
  console.log(`User font color: [${userFontColor}]`);

  const userShapeColor = answers["shape-color"];
  console.log(`User shape color: [${userShapeColor}]`);

  const userShapeType = answers.shape;
  console.log(`User entered shape: [${userShapeType}]`);

  let userShape;
  if (userShapeType === "Square" || userShapeType === "square") {
    userShape = new Square();
    console.log("User selected Square shape");
  } else if (userShapeType === "Circle" || userShapeType === "circle") {
    userShape = new Circle();
    console.log("User selected Circle shape");
  } else if (userShapeType === "Triangle" || userShapeType === "triangle") {
    userShape = new Triangle();
    console.log("User selected Triangle shape");
  } else {
    console.log("Invalid shape!");
  }
  userShape.setColor(userShapeColor);

  const svg = new Svg();
  svg.setTextElement(userText, userFontColor);
  svg.setShapeElement(userShape);
  const svgString = svg.render();

  console.log("Displaying shape:\n\n" + svgString);
  console.log("Shape generation complete!");
  console.log("Writing shape to file...");
  writeToFile("logo.svg", svgString);
}

init();