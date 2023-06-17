import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

function MenuScreen() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Home")}
    >
      <View>
        <Image style={styles.logo} source={require("../assets/contacts.png")} />
        <Text style={styles.title}>PhoneBook</Text>
        <Text style={styles.subtitle}>
          Stay Connected, Stay Organized with PhoneBook{" "}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafbf9",
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
  },
});
export default MenuScreen;
