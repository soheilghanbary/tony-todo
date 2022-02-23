import useTodo from "hooks/useTodo";
import { useTranslation } from "next-i18next";
import { FC, FormEvent, useRef } from "react";

const AddTodo: FC = () => {
  const todoRef = useRef<any>(null);
  const formRef = useRef<any>(null);
  const { addTodo } = useTodo();
  const { t } = useTranslation()
  const addTodoSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = todoRef.current.value.trim();
    if (!text.length) return;
    addTodo(todoRef.current.value);
    formRef.current.reset();
  };
  return (
    <form onSubmit={addTodoSubmit} ref={formRef}>
      <div className="form__group">
        <input
          type={"text"}
          placeholder={t('placeholderText')}
          className="form__field"
          ref={todoRef}
        />
        <button className="btn primary">{t('addBtnText')}</button>
      </div>
    </form>
  );
};

export default AddTodo;
