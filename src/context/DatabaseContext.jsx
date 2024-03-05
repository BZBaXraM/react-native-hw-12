import React, { createContext, useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("todo.db");

export const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = () => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM todo", [], (_, { rows: { _array } }) =>
        setTodos(_array)
      );
    });
  };

  const addTodo = (task) => {
    db.transaction(
      (tx) => {
        tx.executeSql("INSERT INTO todo (task, completed) VALUES (?, 0)", [
          task,
        ]);
      },
      null,
      fetchTodos
    );
  };

  const deleteTodo = (id) => {
    db.transaction(
      (tx) => {
        tx.executeSql("DELETE FROM todo WHERE id = ?", [id]);
      },
      null,
      fetchTodos
    );
  };

  const updateTodo = (id, completed) => {
    db.transaction(
      (tx) => {
        tx.executeSql("UPDATE todo SET completed = ? WHERE id = ?", [
          completed ? 0 : 1,
          id,
        ]);
      },
      null,
      fetchTodos
    );
  };

  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS todo (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT, completed INTEGER);"
        );
      },
      null,
      fetchTodos
    );
  }, []);

  return (
    <DatabaseContext.Provider
      value={{ todos, addTodo, deleteTodo, updateTodo }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
