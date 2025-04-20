import { createContext, useContext } from "react";

const SelectContext = createContext<{
    selectedOption: string;
    changeSelectedOption: (option: unknown) => void;
}>({
    selectedOption: "",
    changeSelectedOption: (option: unknown) => { }
});

const useSelectContext = () => {
    const context = useContext(SelectContext);
    if (!context) {
        throw new Error("Error in creating the context");
    }
    return context;
};

export { useSelectContext, SelectContext };
