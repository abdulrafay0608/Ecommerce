import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  items: [{ id: 1, text: "Hello World" }],
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    itemsAdded: (state, action) => {
      const item = {
        id: nanoid(),
        text: action.payload,
      };
      state.items.push(item);
    },
    itemsDeleted: (state, action) => {
      state.items = state.items.filter((item) => {
        item.id !== action.payload;
      });
    },
  },
});

export const { itemsAdded, itemsDeleted } = itemsSlice.actions;
export default itemsSlice.reducer;
