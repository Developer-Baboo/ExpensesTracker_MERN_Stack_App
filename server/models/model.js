const mongoose =  require('mongoose')

const Schema = mongoose.Schema;

// Define schemas for categories and transactions


const categories_model =new Schema({
    type: { type : String, default: "Investment"},
    color : {type: String, default: '#FCBE44'}
})


const transaction_model = new Schema({
    name: { type : String, default:"Anonymous"},
    type: { type : String, default:"Investment"},
    amount: { type : Number},
    date: { type : Date, default : Date.now}
})


// Create models for categories and transactions
const Categories = mongoose.model('categories', categories_model)
const Transaction = mongoose.model('transaction', transaction_model);


// Export the models
exports.default = Transaction;
module.exports = {
    Categories,
    Transaction
}
