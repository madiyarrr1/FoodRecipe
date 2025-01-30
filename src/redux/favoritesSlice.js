import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriterecipes: [], // Массив избранных рецептов
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const recipe = action.payload;

      // Проверяем, есть ли рецепт в избранном по уникальному idFood
      const existingRecipeIndex = state.favoriterecipes.findIndex(
        (item) => item.idFood === recipe.idFood
      );

      if (existingRecipeIndex === -1) {
        // Если рецепта нет в избранном, добавляем его
        state.favoriterecipes.push(recipe);
      } else {
        // Если рецепт уже есть в избранном, удаляем его
        state.favoriterecipes.splice(existingRecipeIndex, 1);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
