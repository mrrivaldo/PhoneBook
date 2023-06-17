import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

const AddUser = ({ onUserAdded, onClose }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const addUser = async () => {
    if (name.trim() === "" || number.trim() === "") {
      alert("Name and number fields cannot be empty.");
      return;
    }
    try {
      const response = await axios.get("https://randomuser.me/api/");
      const userData = response.data.results[0];
      const newUser = {
        image: userData.picture.large,
        name: name,
        number: number,
      };

      await axios.post(
        "https://telephonebook-29c4e-default-rtdb.firebaseio.com/users.json",
        newUser
      );

      setName("");
      setNumber("");

      alert("User added successfully!");

      onUserAdded();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <View>
      <View style={styles.TitleContainer}>
        <Text style={styles.Title}>New Contact</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.CloseButton}>X</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.Input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.Input}
        placeholder="Number"
        value={number}
        onChangeText={(text) => setNumber(text)}
        maxLength={15}
      />
      <TouchableOpacity style={styles.ButtonContainer} onPress={addUser}>
        <Text style={styles.ButtonText}>Add User</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  TitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  Title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  CloseButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
  Input: {
    marginVertical: 5,
    padding: 5,
    borderWidth: 1,
  },
  ButtonContainer: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  ButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default AddUser;
