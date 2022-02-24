import { FC, useState } from "react";
import TodoItem from "./TodoItem";
import useTodo from "hooks/useTodo";
import { SelectProps, TodoProps } from "interfaces";
import FilterSelect from "components/forms/Select";
import { AnimatePresence, motion } from "framer-motion";

const filterItems: SelectProps[] = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Completed",
    value: "completed",
  },
  {
    label: "Not Completed",
    value: "uncompleted",
  },
];

const TodoList: FC = () => {
  const [filters, setFilters] = useState<TodoProps[]>([]);
  const { todos } = useTodo();

  const selectHandler = (selected: SelectProps) => {
    switch (selected.value) {
      case "all":
        return setFilters([]);
      case "completed":
        return setFilters(todos.filter((todo) => todo.isComplete));
      case "uncompleted":
        return setFilters(todos.filter((todo) => !todo.isComplete));
      default:
        return setFilters([]);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center max-w-sm">
        <FilterSelect items={filterItems} onChange={selectHandler} />
        <span className="block dark:text-gray-300">Todos {todos.length}</span>
      </div>
      <motion.ul className="todo__list">
        <AnimatePresence initial={false} presenceAffectsLayout>
          {!filters.length
            ? todos.map((todo, i) => <TodoItem key={todo.id} {...todo} />)
            : filters.map((todo, i) => <TodoItem key={todo.id} {...todo} />)}
        </AnimatePresence>
      </motion.ul>
    </>
  );
};

export default TodoList;
