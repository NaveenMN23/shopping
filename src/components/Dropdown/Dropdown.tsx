import React from "react";
import { AppConstants } from "../../common/appConstants";
import './dropdown.css';

interface IDropdown {
    selectedValue: string,
    data: string[],
    setFilteredData: (name: string) => void
}

// Reusable Dropdown component that accepts props
export const Dropdown = (props: IDropdown) => {
    /* Selected option value: Selected Value
       Master data set: data*/
    const { selectedValue, data } = props;
    // Method to set the selected dropdown value
    const dropdownSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.setFilteredData(event.target.value);
    }
    return (
        <select value={selectedValue} onChange={dropdownSelected}>
            <option hidden>{AppConstants.FILTER_BY_SIZE}</option>
            {
                data.map((element: string) => <option key={element} value={element}>{element}</option>)
            }
        </select>
    )
}