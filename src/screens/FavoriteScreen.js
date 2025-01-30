import React from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function FavoriteScreen() {
  const navigation = useNavigation();

  // Получаем данные о избранных рецептах из Redux
  const favoriteRecipes = useSelector((state) => state.favorites);
  const favoriteRecipesList = favoriteRecipes?.favoriterecipes || [];

  // Логируем данные для отладки
  console.log('favoriteRecipesList:', favoriteRecipesList);

  // Если список пуст, отображаем сообщение
  if (favoriteRecipesList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorite recipes yet!</Text>
        {/* Кнопка для возврата */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: "#2563EB",
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
            width: 100,
            alignItems: "center ",
          }}
        >
          <Text style={{ color: "#fff" }}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Если рецепты есть, отображаем их список
  return (
    <>
      {/* Заголовок */}
      <View testID="FavoriteRecipes">
        <Text
          style={{ fontSize: hp(3.8), marginTop: hp(4), marginLeft: 20 }}
          className="font-semibold text-neutral-600"
        >
          My Favorite Recipes
        </Text>
      </View>

      {/* Список избранных рецептов */}
      <FlatList
        data={favoriteRecipesList}
        keyExtractor={(item) => item.idFood.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            {/* Проверка на наличие изображения */}
            <Image
              source={{ uri: item.image || 'https://via.placeholder.com/150' }} // Заглушка, если изображения нет
              style={styles.recipeImage}
            />
            <Text style={styles.recipeTitle}>{item.name || 'No Name'}</Text> {/* Заглушка для названия */}
          </View>
        )}
        contentContainerStyle={styles.listContentContainer}
      />

      {/* Кнопка возврата */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: "#2563EB",
          padding: 10,
          borderRadius: 5,
          marginTop: 10,
          width: 100,
          alignItems: "center",
          marginLeft: 20,
        }}
      >
        <Text style={{ color: "#fff" }}>Go back</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: hp(2.5),
    color: "#6B7280", // text-neutral-600
  },
  listContentContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  cardContainer: {
    backgroundColor: "white",
    marginBottom: hp(2),
    padding: wp(4),
    borderRadius: 10,
    elevation: 3, // Для Android тени
    shadowColor: "#000", // Для iOS тени
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  recipeImage: {
    width: wp(20),
    height: wp(20),
    borderRadius: 10,
    marginRight: wp(4),
  },
  recipeTitle: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: "#4B5563", // text-neutral-700
  },
});
