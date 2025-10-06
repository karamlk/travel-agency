import { useContext } from "react";
import stateContext from "./stateContext";

const useStateContext = () =>
    useContext(stateContext)


export default useStateContext;