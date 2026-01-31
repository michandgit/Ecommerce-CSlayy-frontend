import axios from "axios";
import axiosInstance from "./axiosInstance";

export const getProductsByCategoryMen = async () => {
    try {
        const response = await axiosInstance.get("/products/category/men");
        return response.data.products;
    } catch (error) {
        console.error("Error: ", error.message);
    }
}

export const getProductsByCategoryWomen = async () => {
    try {
        const response = await axiosInstance.get("/products/category/women");
        return response.data.products;
    } catch (error) {
        console.error("Error: ", error.message);
    }
}


export const getLatestProducts = async () =>{
    try{
        const response = await axiosInstance.get("/products/latest-products");
        return response.data.products;
    }catch(error){
        console.error("Error: ", error.message);
    }
}

export const getProductById = async (id) => {
    try {
        const response = await axiosInstance.get(`/products/${id}`);
        return response.data.product;
    } catch (error) {
        console.error("Error: ", error.message);
    }
}



export const addItemToCart = async (item) => {
    try {
        const response = await axiosInstance.post("/cart/add", {
            productId: item._id,
        });
        return response.data.cart.items;
    } catch (error) {
        console.error("Error adding item to cart: ", error);

    }
}

export const removeItemFromCart = async (productId) => {
    try {
        const response = await axiosInstance.delete(`/cart/remove/${productId}`);
        return response.data.cart.items;
    } catch (error) {
        console.error("Error removing item from cart: ", error);
    }
}


export const clearCart = async () => {
    try {
        const response = await axiosInstance.delete("/cart/clear");
        return response.data.cart.items;
    } catch (error) {
        console.error("Error clearing cart: ", error);
    }
}


export const getAllOrdersForUser = async () =>{
    try{
        const response = await axiosInstance.get("/orders/user/all");
        return response.data.orders;
    }catch(error){
        console.error("Error fetching orders: ", error);
    }
}



export const logout = async () => {
    try{
        const response = await axiosInstance.post("/auth/logout");
        return true;
    }catch(error){
        console.error("Error during logout: ", error);
        return false;
    }
}
