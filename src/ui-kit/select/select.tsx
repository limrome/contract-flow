import React, { ReactNode, useState, useRef, useEffect } from "react";
import useOnClickOutside from "../../components/customHooks/useOnClickOutside";
import { SelectContext } from "./selectContext";
import styled from "styled-components";

const Container = styled.div`
    display: inline-block;
    position: relative;
    width: 100%;
    background-color: rgb(248, 251, 252);;
    border-radius: 5px;
    font-size: 14px;
    line-height: 140%;
    ul {
    margin: 0;
    padding: 0;
    text-align: center;
    border-radius: 5px;
    background: white;
    }

    .select-options {
    position: absolute;
    margin-top: 5px;
    width: 100%;
    border: 1px solid #e4e4e4;
    }

    li {
    list-style-type: none;
    padding: 6px 20px;
    border-bottom: 1px solid #e4e4e4;
    cursor: pointer;
        &:last-child {
        border-bottom: none;
        }

        &:hover {
        background-color: rgba(0, 76, 204, 0.1);
        }
    }

    .show-dropdown-options {
    min-height: 50px;
    opacity: 1;
    visibility: visible;
    }

    .hide-dropdown-options {
    min-height: 0;
    opacity: 0;
    visibility: hidden;
    }
`

const SelectedText = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  &::after {
    content: "";
    position: absolute;
    right: 10px;
    top: 16px;
    border: 7px solid transparent;
    border-color: black transparent transparent transparent;
  }
`

const Select: React.FC<{
    children: ReactNode | ReactNode[];
    defaultValue?: string;
    placeholder?: string;
    resolveValue: (elem: unknown) => unknown
    onSelect: (elem: unknown) => void

}> = ({ children, defaultValue, placeholder, resolveValue, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState(defaultValue || null);
    const [showDropdown, setShowDropdown] = useState(false);
    const showDropdownHandler = () => setShowDropdown(!showDropdown);
    const selectPlaceholder = placeholder || "Choose an option";
    const selectContainerRef = useRef(null);

    const clickOutsideHandler = () => setShowDropdown(false);

    useOnClickOutside(selectContainerRef, clickOutsideHandler);

    const updateSelectedOption = (option: string) => {
        setSelectedOption(option);
        setShowDropdown(false);
    };

    useEffect(() => {
        if (selectedOption)
            onSelect(selectedOption);
    }, [selectedOption])


    return (
        <SelectContext.Provider
            value={{ selectedOption, changeSelectedOption: updateSelectedOption }}
        >
            <Container className="select-container" ref={selectContainerRef}>
                <SelectedText
                    className={showDropdown ? "selected-text active" : "selected-text"}
                    onClick={showDropdownHandler}
                >
                    {selectedOption ? resolveValue(selectedOption) : selectPlaceholder}
                </SelectedText>
                <ul
                    className={
                        showDropdown
                            ? "select-options show-dropdown-options"
                            : "select-options hide-dropdown-options"
                    }
                >
                    {children}
                </ul>
            </Container>
        </SelectContext.Provider>
    );
};

export default Select;
