import React, { useState } from "react";
import { Text, View, Button, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MainScreen = () => {
  const [task, setTask] = useState("");
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {task ? (
        <Text style={styles.text}>{task}</Text>
      ) : (
        <Text style={styles.text}>Задача пока отсутствует</Text>
      )}
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("AddTask", { setTask })}
      >
        <Text style={styles.btnText}>Add Task</Text>
      </Pressable>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4A3780",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  button: {
    backgroundColor: "#f3ecff",
    marginTop: 20,
    padding: 10,
    borderRadius: 35,
  },
  btnText: {
    fontSize: 20,
  },
});
