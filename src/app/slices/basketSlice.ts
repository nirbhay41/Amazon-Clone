import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BasketState{
    products: Product[];
    quantity: number;
}

const initialState:BasketState = {
    products: [],
    quantity: 0,
}

export const basketSlice = createSlice({
    name:"basket",
    initialState,
    reducers:{
        addToBasket: (state: BasketState,action:PayloadAction<Product>) => {
            const idx = state.products.findIndex((e) => e.id === action.payload.id);
            if(idx != -1)
                state.products[idx].quantity++;
            else state.products = [...state.products,action.payload];
            state.quantity += action.payload.quantity;
        },
        removeFromBasket: (state: BasketState,actions:PayloadAction<number>) => {
            const idx = state.products.findIndex((e) => e.id === actions.payload);
            state.quantity -= state.products[idx].quantity;
            state.products = state.products.filter(item => item.id !== actions.payload);
        },
        updateBasket: (state: BasketState, actions: PayloadAction<{id: number,qty: number}>) =>{
            const idx = state.products.findIndex((e) => e.id === actions.payload.id);
            state.quantity = state.quantity - state.products[idx].quantity + actions.payload.qty;
            state.products[idx].quantity = actions.payload.qty;
        }
    },
});

export const {addToBasket,removeFromBasket, updateBasket} = basketSlice.actions;
export default basketSlice.reducer;