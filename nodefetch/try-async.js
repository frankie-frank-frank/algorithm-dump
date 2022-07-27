import fetch from 'node-fetch';
const getAllOrdersWithProducts = {
  carOrder: {
    products: {
      lexus: {
        quantity: 3,
        productId: 3,
      },
      benz: {
        quantity: 3,
        productId: 4,
      },
    },
  },
  motorOrder: {
    products: {
      yamaha: {
        quantity: 4,
        productId: 5,
      },
      openTop: {
        quantity: 7,
        productId: 9,
      },
    },
  },
};
let givenNumber = 0;
for (const item in getAllOrdersWithProducts) {
  for (const element in getAllOrdersWithProducts[item]) {
    for(const elementA in getAllOrdersWithProducts[item][element]){
      const productQuantity = getAllOrdersWithProducts[item][element][elementA]["quantity"];
      const productPrice = await getProductPrice(getAllOrdersWithProducts[item][element][elementA]["productId"]);
      givenNumber += productQuantity * productPrice
    };
  }
}
console.log(givenNumber);

async function getProductPrice(id) {
  try {
    return await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      ).then(val => val.json()).then(val => val["id"]);
  } catch(error) {
    console.log(error);
  }
}

