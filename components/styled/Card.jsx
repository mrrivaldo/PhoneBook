import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Card = ({ profileImage, name, phoneNumber, children }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.profileImage} source={profileImage} />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.phoneNumber}>{phoneNumber}</Text>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    margin: 10,
    alignSelf: "center",

    width: 130,
    flexDirection: "column",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  phoneNumber: {
    fontSize: 16,
    color: "#888",
  },
});

export default Card;
