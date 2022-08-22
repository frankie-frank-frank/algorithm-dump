const ReadFile = (fileName) => {
  const fs = require("fs");
  const lines = fs.readFileSync(fileName).toString().split(/\r?\n/);
  let aPizza = 0,
    T2 = 0,
    T3 = 0,
    T4 = 0;
  const line = lines[0];
  let fline = line.split(" ");
  aPizza = parseInt(fline[0]);
  T2 = parseInt(fline[1]);
  T3 = parseInt(fline[2]);
  T4 = parseInt(fline[3]);
  const allIngredients = [];
  for (let i = 1; i < lines.length; i++) {
    const otherLines = lines[i].split(" ");
    const pizzaIngredients = new PizzaIng(otherLines[0], otherLines.slice(1));
    allIngredients.push(pizzaIngredients);
  }
  return new InputFileSplit(aPizza, T2, T3, T4, allIngredients);
};

const writeToFile = (fileName) => {
  const fs = require("fs");
  //new outputFile(deliveredPizza, delivery(teamType, pizza))
  let newOutputFile = new OutputFile()
  let content = newOutputFile.deliveredPizza + '\n';
  for(let item in outputFile.delivery){
    content += item.teamType + " " + item.pizza + " "
  }
    fs.writeFile(fileName, content, (err) => {
    if (err) {
      throw err;
    }
  });
};

class InputFileSplit {
  constructor(availablePizzas, T2, T3, T4, pizzaIngs) {
    this.availablePizzas = availablePizzas;
    this.T2 = T2;
    this.T3 = T3;
    this.T4 = T4;
    this.pizzaIng = pizzaIngs;
  }
}

class PizzaIng {
  constructor(numOfIng, Ingredients) {
    this.numOfIng = numOfIng;
    this.Ingredients = Ingredients;
  }
}

class OutputFile {
  constructor(deliveredPizza, delivery) {
    this.deliveredPizza = deliveredPizza;
    this.delivery = delivery
  }
}

class Delivery {
  constructor(teamType, pizza) {
    this.teamType = teamType;
    this.pizza = pizza;
  }
}

//console.log(ReadFile("./demotxtfile.txt"));
//writeToFile('./molt.txt', 'alley')
//writeToFile('./molt.txt', 'popo')
