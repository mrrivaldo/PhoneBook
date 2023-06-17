import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AddUser from "./api/AddUser";
import getUsers from "./api/getUsers";
import AddButton from "./styled/AddButton";
import EditButton from "./styled/EditButton";
import Card from "./styled/Card";
import Header from "./styled/Header";
import ModalCard from "./styled/ModalCard";
import DeleteUser from "./api/Deleteuser";
import EditUser from "./api/EditUser";

function HomeScreen() {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const handleAddUser = () => {
    setModalVisible(false);
    setRefreshTrigger((prevTrigger) => prevTrigger + 1);
  };

  const handleDeleteUser = (userId) => {
    // Update the users state by filtering out the deleted user
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const handleUpdate = (userId, updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, ...updatedUser } : user
      )
    );
    setEditUserId(null);
  };

  const handleEditUser = (userId) => {
    setEditUserId(userId);
  };

  useEffect(() => {
    getUsers()
      .then((data) => {
        if (data) {
          const usersArray = Object.entries(data).map(([id, user]) => ({
            id,
            ...user,
          }));
          setUsers(usersArray);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [refreshTrigger]);

  return (
    <View style={styles.container}>
      <Header title="Contacts" />
      <ScrollView>
        {!isLoading && users.length === 0 ? (
          <Text style={styles.noContactsText}>No contacts</Text>
        ) : (
          users.map((user) => (
            <Card
              key={user.id}
              name={user.name}
              phoneNumber={user.number}
              profileImage={{ uri: user.image }}
            >
              <DeleteUser userId={user.id} onDelete={handleDeleteUser} />
              <EditButton onPress={() => handleEditUser(user.id)} />
              <ModalCard
                visible={editUserId === user.id}
                onRequestClose={() => setEditUserId(null)}
              >
                <EditUser
                  userId={user.id}
                  name={user.name}
                  number={user.number}
                  onUpdate={handleUpdate}
                />
              </ModalCard>
            </Card>
          ))
        )}
      </ScrollView>
      <AddButton onPress={() => setModalVisible(true)} />
      <ModalCard
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <AddUser
          onUserAdded={handleAddUser}
          onClose={() => setModalVisible(false)}
        />
      </ModalCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafbf9",
  },
  noContactsText: {
    fontSize: 24,
    justifyContent: "center",
    textAlign: "center",
  },
});

export default HomeScreen;
