import { todosState } from "contexts";
import { TodoProps } from "interfaces";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";

const useTodo = () => {
  const [todos, setTodos] = useRecoilState<TodoProps[]>(todosState);

  useEffect(() => {
    const getTodos = localStorage.getItem("todos");
    getTodos && setTodos(JSON.parse(getTodos)); 
  }, []);

  const addTodo = (text: string) => {
    const newTodo = { id: Date.now(), text: text, isComplete: false };
    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
    setTodos((prev) => [...prev, newTodo]);
    // return toast.success("todo was added to list", {
    //   position: "bottom-right",
    //   autoClose: 2000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   theme: "colored",
    // });
  };
  const updateTodos = (updatedTodo: TodoProps) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === updatedTodo.id) {
        return { ...todo, ...updatedTodo };
      } else return todo;
    });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    return setTodos(updatedTodos);
    // return toast.info("todo was Updated!", {
    //   position: "bottom-right",
    //   autoClose: 2000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   theme: "colored",
    // });
  };
  const removeTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    return setTodos(updatedTodos);
    // return toast.error("todo was removed on List!", {
    //   position: "bottom-right",
    //   autoClose: 2000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   theme: "colored",
    // });
  };
  const completeTodo = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) return { ...todo, isComplete: !todo.isComplete };
      else return todo;
    });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    return setTodos(updatedTodos);
  };

  return { addTodo, removeTodo, updateTodos, completeTodo, todos };
};

export default useTodo;
