import userModel from "../models/userModel.js"

// add items to user cart 
const addToCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { itemId } = req.body;

        if (!userId || !itemId) {
            return res.json({ success: false, message: "Missing userId or itemId" });
        }

        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};
        cartData[itemId] = (cartData[itemId] || 0) + 1;

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
}

//remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        const userId = req.userId;     
        const { itemId } = req.body;     

        if (!itemId) {
            return res.json({ success: false, message: "Missing itemId" });
        }

        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};
        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Removed from cart" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};


// fetch items from the cart
const getCart = async (req, res) => {
    try {
        // In case middleware couldn't attach userId to req.body
        const userId = req.body?.userId || req.userId;

        if (!userId) {
            return res.json({ success: false, message: "UserId not found" });
        }

        const userData = await userModel.findById(userId);
        const cartData = userData?.cartData || {};

        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};



export { addToCart, removeFromCart, getCart }