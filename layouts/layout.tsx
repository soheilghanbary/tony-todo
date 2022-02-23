import { FC } from "react";
import Header from "./header";

const Layout: FC = ({ children }) => (
    <div className="px-5 max-w-screen-xl mx-auto">
        <Header />
        { children }
    </div>
)

export default Layout;