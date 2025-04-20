import React, { ReactNode } from "react";
import { useSelectContext } from "./selectContext";

const Option: React.FC<{
    children: ReactNode | ReactNode[];
    value: unknown;
}> = ({ children, value }) => {
    const { changeSelectedOption } = useSelectContext();

    return (
        <li className="select-option" onClick={() => changeSelectedOption(value)}>
            {children}
        </li>
    );
};

export default Option;
