import { FC, FormEvent, useState } from "react";
import { TodoProps } from "interfaces";
import { AnimatePresence, motion } from "framer-motion";
import useTodo from "hooks/useTodo";
import { useTranslation } from "next-i18next";

const todoItemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

const backdropVariants = {
  hidden: { opacity: 0.5 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const TodoItem: FC<TodoProps> = ({ text, id, isComplete }) => {
  const [showModal, setShowModal] = useState(false);
  const { removeTodo, completeTodo, updateTodos } = useTodo();
  const [edit, setEdit] = useState<TodoProps>({
    text: "",
    id: 0,
    isComplete: false,
  });

  const showEditModal = () => {
    setEdit({ text, id, isComplete });
    setShowModal(!showModal);
  };

  const updateSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateTodos(edit);
    closeModal();
  };

  const closeModal = () => setShowModal(false);

  const { t } = useTranslation();

  return (
    <>
      <motion.li
        layout
        layoutId={id.toString()}
        variants={todoItemVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="todo__item"
        transition={{ duration: 0.2 }}
      >
        <span className={`${isComplete ? "done" : ""}`}>{text}</span>
        <div className="flex items-center gap-3">
          <button className="btn info icon" onClick={() => completeTodo(id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </button>
          <button className="btn icon success" onClick={showEditModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button className="btn danger icon" onClick={() => removeTodo(id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </motion.li>
      {/* <AnimatePresence initial={false} exitBeforeEnter>
        {showModal && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="backdrop"
            onClick={() => setShowModal(false)}
            transition={{ duration: 0.25 }}
          >
            <motion.form
              onSubmit={updateSubmit}
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="modal"
              transition={{ duration: 0.25 }}
            >
              <h1 className="text-2xl dark:text-gray-300">
                {t("editTitleText")}
              </h1>
              <input
                type={"text"}
                autoFocus
                className="form__field"
                value={edit.text}
                onChange={(e) => setEdit({ ...edit, text: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-4">
                <button type="submit" className="btn success">
                  {t("updateBtnText")}
                </button>
                <button onClick={closeModal} className="btn default">
                  {t("cancelBtnText")}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence> */}
    </>
  );
};

export default TodoItem;
