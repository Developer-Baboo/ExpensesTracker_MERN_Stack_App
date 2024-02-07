const model = require('../models/model');

// Controller functions for handling HTTP requests

// Function to create a new category
async function create_Categories(req, res) {


     // Create a new category using the Categories model
    const Create = new model.Categories({
        type: "Expense",
        color: "#C43095"
    });

    try {
        const savedCategory = await Create.save();
        return res.json(savedCategory);
    } catch (err) {
        return res.status(400).json({ message: `Error while creating categories ${err}` });
    }
}


//  get: http://localhost:8080/api/categories
async function get_Categories(req, res) {
    try {
        let data = await model.Categories.find({});
        
        // Map the data to include _id, type, and color
        let filter = data.map(v => ({
            _id: v._id,
            type: v.type,
            color: v.color
        }));
        
        return res.json(filter);
    } catch (error) {
        return res.status(500).json({ message: `Error while fetching categories: ${error.message}` });
    }
}



//  delete: http://localhost:8080/api/categories
async function delete_Category(req, res) {
    try {
        // Check if request body contains the ID of the category to delete
        if (!req.body.id) {
            return res.status(400).json({ message: "Category ID not provided in request body" });
        }

        // Attempt to delete the category by ID
        const deletedCategory = await model.Categories.findByIdAndDelete(req.body.id);

        // Check if the category was found and deleted successfully
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Respond with a success message
        return res.json({ message: "Category deleted successfully" });
    } catch (error) {
        // Handle any errors that occur during the deletion process
        return res.status(500).json({ message: `Error while deleting category: ${error.message}` });
    }
}

//  post: http://localhost:8080/api/transaction
async function create_Transaction(req, res) {
    try {
        if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
        let { name, type, amount } = req.body;

        const create = new model.Transaction({
            name,
            type,
            amount,
            date: new Date()
        });

        await create.save();
        return res.json(create);
    } catch (error) {
        return res.status(400).json({ message: `Error while creating transaction ${error}` });
    }
}


//  get: http://localhost:8080/api/transaction
async function get_Transaction(req, res){
    let data = await model.Transaction.find({});
    // console.log(data);
    return res.json(data);
}



//  delete: http://localhost:8080/api/transaction
async function delete_Transaction(req, res) {
    try {
        if (!req.body) return res.status(400).json({ message: "Request body not found" });

        await model.Transaction.deleteOne(req.body);
        
        return res.json({ message: "Record Deleted...!" });
    } catch (error) {
        return res.status(400).json({ message: `Error while deleting Transaction Record: ${error}` });
    }
}

//  get: http://localhost:8080/api/labels
async function get_Labels(req, res){

    model.Transaction.aggregate([
        {
            $lookup : {
                from: "categories",
                localField: 'type',
                foreignField: "type",
                as: "categories_info"
            }
        },
        {
            $unwind: "$categories_info"
        }
    ]).then(result => {
        let data = result.map(v => Object.assign({}, { _id: v._id, name: v.name, type: v.type, amount: v.amount, color: v.categories_info['color']}));
        res.json(data);
    }).catch(error => {
        res.status(400).json("Looup Collection Error");
    })

}

module.exports = {
    create_Categories,
    get_Categories,
    create_Transaction,
    delete_Category,
    get_Transaction,
    delete_Transaction,
    get_Labels
}