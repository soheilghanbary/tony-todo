import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AddTodo from "components/todo/AddTodo";
import TodoList from "components/todo/TodoList";
import { ToastContainer } from "react-toastify";

const HomePage = () => {
  return (
    <div>
      <AddTodo />
      <TodoList />
      <ToastContainer />
    </div>
  );
};

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default HomePage;
