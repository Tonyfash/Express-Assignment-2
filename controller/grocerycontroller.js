const groceryDB = require('../database/groceryDB.json');
const {v4: uuid} = require('uuid');
const router = require('../routes/groceryRoute');
const fs = require('fs');

const updateDB = (data) => {
    fs.writeFile(
      "./database/groceryDB.json",
      JSON.stringify(data, null, 2),
      "utf-8", (err, data) => {
        if (err) {
          console.log("Error wrting to file", err);
        } else {
          console.log("File successfully written");
          return data;
        }
      }
    );
  };

const createGrocery = (req, res)=> {
const {storeName, goods, unitPrice, quantity} = req.body;
const totalPrice = unitPrice * quantity;
let isAvailable;
if (totalPrice === 0){
    isAvailable = false
} else {
    isAvailable = true
}
const grocery = {
    storeName,
    goods,
    unitPrice,
    quantity,
    totalPrice,
    isAvailable,
    id: uuid()
};
console.log(grocery)
groceryDB.push(grocery);
updateDB(groceryDB)
res.status(200).json({
    message: `Grocery added successfully`,
    data: grocery
})
};

const getGrocery = (req, res) => {
  if(groceryDB.length == 0){
    res.status(200).json({
      message: `Grocery database is empty`
    })
  }else {
  res.status(200).json({
    message: 'All groceries found',
    total: groceryDB.length,
    data: groceryDB
  })
  }
} 

const updateGrocery = (req, res) => {
    const id = req.params.id;
    const groceryIndex = groceryDB.findIndex((e)=> e.id === id)
    if(groceryIndex === -1) {
        res.status(404).json({
            message: `grocery not found`
        })
    } else {
        const update = {...groceryDB[groceryIndex], ...req.body};
        groceryDB[groceryIndex] = update 
        updateDB(groceryDB);
        res.status(200).json({
            message: `Grocery updated successfully`,
            data: update
        })
    }
}

const deleteAGrocery = (req, res) => {
    const id = req.params.id;
    const groceryIndex = groceryDB.findIndex((e)=> e.id === id)
    if (groceryIndex === -1) {
        res.status(404).json({
            message: `No grocery found`
        })
    } else {
        groceryDB.splice(groceryIndex, 1);
        updateDB(groceryDB)
        res.status(200).json({
            message: `Grocery deleted successfully`,
        })
    }
}





module.exports = {
    createGrocery,
    getGrocery,
    updateGrocery,
    deleteAGrocery
};