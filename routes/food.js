const express = require("express");
const router = express.Router();
const Food = require("../models/Food");
const cloudinary = require("../middlewares/cloudinary");
const upload = require("../middlewares/multer");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");



router.post("/addFood", [isAuth], upload.single("image"), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        let newFood = new Food({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            profile_img: result.secure_url,
            cloudinary_id: result.public_id
        });
        await newFood.save();
        res.status(200).send({success : [{msg : "Food added successfully"}], food: newFood});
    } catch (error) {
        res.status(400).send({msg : "Failed to add food", error});

    }
});


router.get("/allFoods", async (req, res) => {
    try {
        const listfood = await Food.find();
        res.status(200).send({success : [{msg : "Foods retrieved successfully"}], foods: listfood});
    }
    catch (error) {
        res.status(400).send({msg : "Failed to retrieve foods", error});
    }
});

router.delete("/:_id", [isAuth, isAdmin], async (req, res) => {
    try {
        const foodToDelete = await Food.findById(req.params._id);
        if (!foodToDelete) {
            return res.status(404).send({msg : "Food not found"});
        }
        if (foodToDelete.cloudinary_id) {
            await cloudinary.uploader.destroy(foodToDelete.cloudinary_id);
        }
        await foodToDelete.deleteOne();
        res.status(200).send({success : [{msg : "Food deleted successfully"}]});
    } catch (error) {
        res.status(400).send({msg : "Failed to delete food", error});
    }
});

router.put("/:_id", [isAuth], upload.single("image"), async (req, res) => {
    try {
        let foodToUpdate = await Food.findById(req.params._id);
        if (!foodToUpdate) {
            return res.status(404).send({ msg: "Food not found" });
        }

        // Déclarer result pour éviter référence non définie
        let result;

        if (req.file) {
            if (foodToUpdate.cloudinary_id) {
                await cloudinary.uploader.destroy(foodToUpdate.cloudinary_id);
            }
            result = await cloudinary.uploader.upload(req.file.path);
        }

        const data = {
            name: req.body.name || foodToUpdate.name,
            price: req.body.price || foodToUpdate.price,
            category: req.body.category || foodToUpdate.category,
            profile_img: result ? result.secure_url : foodToUpdate.profile_img,
            cloudinary_id: result ? result.public_id : foodToUpdate.cloudinary_id
        };

        const updatedFood = await Food.findByIdAndUpdate(req.params._id, data, { new: true });
        res.status(200).send({ success: [{ msg: "Food updated successfully" }], food: updatedFood });
    } catch (error) {
        console.log(error); // Affiche l’erreur exacte dans le terminal
        res.status(400).send({ msg: "Failed to update food", error });
    }
});

router.get("/:_id", async (req, res) => {
    try {
        const food = await Food.findById(req.params._id);
        if (!food) {
            return res.status(404).send({msg : "Food not found"});
        }
        res.status(200).send({success : [{msg : "Food retrieved successfully"}], food});
    }
    catch (error) {
        res.status(400).send({msg : "Failed to retrieve food", error});
    }   
});

module.exports = router;



