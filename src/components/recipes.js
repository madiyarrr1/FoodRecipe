import { View, Text, Pressable, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function Recipe({ categories, foods }) {
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => (
    <ArticleCard item={item} index={index} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <View testID="recipesDisplay">
        <FlatList
          data={foods}
          keyExtractor={(item) => item.idFood}
          numColumns={2}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </View>
  );
}

const ArticleCard = ({ item, index, navigation }) => {
  return (
    <TouchableOpacity
      style={[styles.cardContainer, { paddingLeft: index % 2 === 0 ? 20 : 10, paddingRight: index % 2 === 0 ? 10 : 20 }]}
      testID="articleDisplay"
      onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}
    >
      <Image
        source={{ uri: item.recipeImage }}
        style={styles.articleImage}
      />
      <Text style={styles.articleText}>{item.recipeName}</Text>
      <Text style={styles.articleDescription}>
        {item.cookingDescription || "No description available."}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4), // mx-4 equivalent
    marginTop: hp(2),
  },
  flatListContent: {
    paddingBottom: hp(2),
  },
  cardContainer: {
    flex: 1,
    marginBottom: hp(1.5),
    borderRadius: 35,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  articleImage: {
    width: "100%",
    height: hp(20),
    borderRadius: 35,
    backgroundColor: "rgba(0, 0, 0, 0.05)", // bg-black/5
  },
  articleText: {
    fontSize: hp(1.8),
    fontWeight: "600", // font-semibold
    color: "#52525B", // text-neutral-600
    marginLeft: wp(2),
    marginTop: hp(1),
  },
  articleDescription: {
    fontSize: hp(1.4),
    color: "#6B7280", // gray-500
    marginLeft: wp(2),
    marginTop: hp(0.5),
    marginBottom: hp(1),
  },
});