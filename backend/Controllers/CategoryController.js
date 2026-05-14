const Category = require('../models/Category');
const Event = require('../models/Event');

// Get all categories with event counts
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        
        // Get counts for each category from Event model
        const categoriesWithCounts = await Promise.all(categories.map(async (cat) => {
            const count = await Event.countDocuments({ category: cat.name });
            return {
                _id: cat._id,
                name: cat.name,
                color: cat.color,
                count: count
            };
        }));
        
        res.status(200).json(categoriesWithCounts);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des catégories", error });
    }
};

// Create a new category
const createCategory = async (req, res) => {
    try {
        const { name, color } = req.body;
        console.log("Tentative de création de catégorie:", { name, color });

        if (!name) {
            return res.status(400).json({ message: "Le nom de la catégorie est requis" });
        }
        
        const existingCategory = await Category.findOne({ name: name.trim() });
        if (existingCategory) {
            return res.status(400).json({ message: "Cette catégorie existe déjà" });
        }
        
        const newCategory = new Category({ 
            name: name.trim(), 
            color: color || '#cd7329' 
        });
        
        await newCategory.save();
        console.log("Catégorie créée avec succès:", newCategory);
        
        res.status(201).json(newCategory);
    } catch (error) {
        console.error("Erreur lors de la création de la catégorie:", error);
        res.status(500).json({ 
            message: "Erreur serveur lors de la création de la catégorie", 
            error: error.message 
        });
    }
};

// Update a category
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, color } = req.body;
        
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Catégorie non trouvée" });
        }
        
        // If name is changing, update all events with this category name
        if (name && name !== category.name) {
            await Event.updateMany({ category: category.name }, { category: name });
        }
        
        category.name = name || category.name;
        category.color = color || category.color;
        await category.save();
        
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de la catégorie", error });
    }
};

// Delete a category
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        
        if (!category) {
            return res.status(404).json({ message: "Catégorie non trouvée" });
        }
        
        await Category.findByIdAndDelete(id);
        res.status(200).json({ message: "Catégorie supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de la catégorie", error });
    }
};

module.exports = {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
};
