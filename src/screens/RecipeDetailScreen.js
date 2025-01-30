import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
  } from "react-native";
  import React from "react";
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import { useNavigation } from "@react-navigation/native";
  import { useDispatch, useSelector } from "react-redux"; // Redux hooks
  import { toggleFavorite } from "../redux/favoritesSlice"; // Redux action
  
  export default function RecipeDetailScreen(props) {
    const recipe = props.route.params.recipe; // Get the recipe data from navigation params
    const dispatch = useDispatch();
    const favoriteRecipes = useSelector(
      (state) => state.favorites.favoriteRecipes
    );
    const isFavorite = favoriteRecipes?.some(
      (favRecipe) => favRecipe.idFood === recipe.idFood
    ); // Check if the recipe is a favorite
  
    const navigation = useNavigation();
  
    const handleToggleFavorite = () => {
      dispatch(toggleFavorite(recipe)); // Dispatch the recipe to favorites
    };
  
    return (
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Recipe Image */}
        <View style={styles.imageContainer} testID="imageContainer">
          <Image
            source={{ uri: recipe.recipeImage }}
            style={styles.recipeImage}
          />
        </View>
  
        {/* Back Button and Favorite Button */}
        <View style={styles.topButtonsContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleToggleFavorite}
            style={[
              styles.favoriteButton,
              { backgroundColor: isFavorite ? "red" : "white" },
            ]}
          >
            <Text style={styles.favoriteButtonText}>
              {isFavorite ? "♥" : "♡"}
            </Text>
          </TouchableOpacity>
        </View>
  
        {/* Recipe Description */}
        <View style={styles.contentContainer}>
          {/* Title and Category */}
          <View style={styles.recipeDetailsContainer} testID="recipeDetailsContainer">
            <Text style={styles.recipeTitle} testID="recipeTitle">
              {recipe.recipeName}
            </Text>
            <Text style={styles.recipeCategory} testID="recipeCategory">
              {recipe.recipeCategory}
            </Text>
          </View>
  
          {/* Miscellaneous Details */}
          <View style={styles.miscContainer} testID="miscContainer">
            <View style={styles.miscItem}>
              <Text style={styles.miscIcon}>🕒</Text>
              <Text style={styles.miscText}>35 Mins</Text>
            </View>
            <View style={styles.miscItem}>
              <Text style={styles.miscIcon}>👥</Text>
              <Text style={styles.miscText}>03 Servings</Text>
            </View>
            <View style={styles.miscItem}>
              <Text style={styles.miscIcon}>🔥</Text>
              <Text style={styles.miscText}>103 Cal</Text>
            </View>
            <View style={styles.miscItem}>
              <Text style={styles.miscIcon}>🎚️</Text>
              <Text style={styles.miscText}>Medium</Text>
            </View>
          </View>
  
          {/* Ingredients */}
          <View style={styles.sectionContainer} testID="sectionContainer">
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <View style={styles.ingredientsList} testID="ingredientsList">
              {recipe.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <View style={styles.ingredientBullet} />
                  <Text style={styles.ingredientText}>
                    {ingredient.ingredientName}: {ingredient.measure}
                  </Text>
                </View>
              ))}
            </View>
          </View>
  
          {/* Instructions */}
          <View style={styles.sectionContainer} testID="sectionContainer">
            <Text style={styles.sectionTitle}>Instructions</Text>
            <Text style={styles.instructionsText}>
              {recipe.recipeInstructions}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 30,
    },
    imageContainer: {
      flexDirection: "row",
      justifyContent: "center",
    },
    recipeImage: {
      width: wp(98),
      height: hp(40),
      borderRadius: 20,
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      marginTop: 4,
    },
    topButtonsContainer: {
      width: "100%",
      position: "absolute",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: hp(4),
    },
    backButton: {
      padding: 8,
      borderRadius: 50,
      marginLeft: wp(5),
      backgroundColor: "white",
    },
    backButtonText: {
      fontSize: hp(2),
      color: "#333",
      fontWeight: "bold",
    },
    favoriteButton: {
      padding: 8,
      borderRadius: 50,
      borderWidth: 1,
      marginRight: wp(5),
    },
    favoriteButtonText: {
      fontSize: hp(2),
      color: "red",
    },
    contentContainer: {
      paddingHorizontal: wp(4),
      paddingTop: hp(4),
    },
    recipeDetailsContainer: {
      marginBottom: hp(2),
    },
    recipeTitle: {
      fontSize: hp(3),
      fontWeight: "bold",
      color: "#4B5563", // text-neutral-700
    },
    recipeCategory: {
      fontSize: hp(2),
      fontWeight: "500",
      color: "#9CA3AF", // text-neutral-500
    },
    miscContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: hp(2),
    },
    miscItem: {
      alignItems: "center",
    },
    miscIcon: {
      fontSize: hp(3),
    },
    miscText: {
      fontSize: hp(1.8),
      color: "#6B7280", // text-neutral-500
    },
    sectionContainer: {
      marginBottom: hp(2),
    },
    sectionTitle: {
      fontSize: hp(2.5),
      fontWeight: "bold",
      color: "#4B5563", // text-neutral-700
      marginBottom: hp(1),
    },
    ingredientsList: {
      marginLeft: wp(2),
    },
    ingredientItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: hp(1),
    },
    ingredientBullet: {
      width: hp(1),
      height: hp(1),
      borderRadius: hp(0.5),
      backgroundColor: "#F59E0B", // amber-400
      marginRight: wp(2),
    },
    ingredientText: {
      fontSize: hp(1.8),
      color: "#4B5563", // text-neutral-700
    },
    instructionsText: {
      fontSize: hp(1.8),
      color: "#4B5563", // text-neutral-700
      lineHeight: hp(2.5),
    },
  });