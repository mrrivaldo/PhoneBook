import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";

const DeleteUser = ({ userId, onDelete }) => {
  const handleDelete = () => {
    axios
      .delete(
        `https://telephonebook-29c4e-default-rtdb.firebaseio.com/users/${userId}.json`
      )
      .then(() => {
        onDelete(userId); // Call the onDelete function to update the UI
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  deleteButton: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DeleteUser;
