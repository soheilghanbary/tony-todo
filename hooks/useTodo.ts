import { todosState } from "contexts";
import { TodoProps } from "interfaces";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";

const useTodo = () => {
  const [todos, setTodos] = useRecoilState<TodoProps[]>(todosState);
  const addTodo = (text: string) => {
    const newTodo = { id: Date.now(), text: text, isComplete: false };
    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
    setTodos((prev) => [...prev, newTodo]);
    toast.success("todo was added to list", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };
  const updateTodos = (updatedTodo: TodoProps) => {
    setTodos((prev) =>
      prev.map((item) => {
        if (item.id === updatedTodo.id) {
          return { ...item, ...updatedTodo };
        } else return item;
      })
    );
    return toast.info("todo was Updated!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };
  const removeTodo = (id: number) => {
    const updateList = todos.filter((todo) => todo.id !== id);
    setTodos(updateList);
    return toast.error("todo was removed on List!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };
  const completeTodo = (id: number) =>
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) return { ...todo, isComplete: !todo.isComplete };
        else return todo;
      })
    );
  return { addTodo, removeTodo, updateTodos, completeTodo, todos };
};

export default useTodo;
