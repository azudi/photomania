
import React from "react";
import App from "./randapp";
import { Themes } from "./context";

export const Themer=React.createContext(Themes)
export default function Pager(){
    return (
        <Themer.Provider value={Themes}>
        <App/>
        </Themer.Provider>
    )
}