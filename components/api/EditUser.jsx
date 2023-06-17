import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";

const EditUser = ({
  userId,
  name: initialName,
  number: initialNumber,
  onUpdate,
}) => {
  const [name, setName] = useState(initialName);
  const [number, setNumber] = useState(initialNumber);

  const handleUpdate = () => {
    const updatedUser = { name, number };

    axios
      .patch(
        `https://telephonebook-29c4e-default-rtdb.firebaseio.com/users/${userId}.json`,
        updatedUser
      )
      .then(() => {
        onUpdate(userId, updatedUser); // Call the onUpdate function to update the UI
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Number</Text>
      <TextInput
        style={styles.input}
        value={number}
        onChangeText={setNumber}
        maxLength={15} // Set the maximum length to 15 digits
      />
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  updateButton: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default EditUser;
