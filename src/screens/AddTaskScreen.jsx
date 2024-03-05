import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Dimensions,
  Pressable,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DatabaseContext } from "../context/DatabaseContext";

const { width } = Dimensions.get("window");

const AddTaskScreen = () => {
  const [addTask, setAddTask] = useState("");
  const [updateTask, setUpdateTask] = useState("");
  const [deleteTask, setDeleteTask] = useState("");
  const navigation = useNavigation();
  const { todos, addTodo, deleteTodo, updateTodo } =
    useContext(DatabaseContext);

  const findTodoId = (taskName) => {
    const todo = todos.find((todo) => todo.task === taskName);
    return todo ? todo.id : null;
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={addTask}
        onChangeText={setAddTask}
        placeholder="Введите задачу"
      />
      <Pressable
        style={styles.button}
        onPress={() => {
          addTodo(addTask);
          navigation.goBack();
        }}
      >
        <Text style={styles.text}>Добавить задачу</Text>
      </Pressable>
      <TextInput
        style={styles.input}
        value={updateTask}
        onChangeText={setUpdateTask}
        placeholder="Введите для обновления"
      />
      <Pressable
        style={styles.button}
        onPress={() => {
          const id = findTodoId(updateTask);
          if (id !== null) {
            updateTodo(id, 1);
            navigation.goBack();
          }
        }}
      >
        <Text style={styles.text}>Обновить задачу</Text>
      </Pressable>
      <TextInput
        style={styles.input}
        value={deleteTask}
        onChangeText={setDeleteTask}
        placeholder="Введите для удаления"
      />
      <Pressable
        style={styles.button}
        onPress={() => {
          const id = findTodoId(deleteTask);
          if (id !== null) {
            deleteTodo(id);
            navigation.goBack();
          }
        }}
      >
        <Text style={styles.text}>Удалить задачу</Text>
      </Pressable>
      <Button title="Go to Main" onPress={() => navigation.navigate("Main")} />
    </View>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d5dbef",
    width: width,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 6,
    backgroundColor: "#f3ecff",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#4A3780",
    marginTop: 20,
    padding: 10,
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
    color: "white",
  },
});
