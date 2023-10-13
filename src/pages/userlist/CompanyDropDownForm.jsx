import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import { publicRequest, userRequest } from "../../utils/requestMethod"

function CompanyDropDownForm() {
    // state variable for selected option
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectBranchOption, setSelectedBranchOption] = useState(null)

    const [branchOptions, setBranchOptions] = useState(null)

    // function to load options from API
    const loadOptions = (inputValue) => {
        // make a GET request to the API endpoint with input value as parameter
        return userRequest.get('get_entities')
            .then(response => {
                const data = response.data;
                const options = data.map(post => {
                    return {
                        value: post.id,
                        label: post.name
                    };
                });


                return options;
            })
            .catch(error => {
                const message = error.message;
                console.error(message);
            });
    };

    // const handleOnChange = (e) => {
    //     setSelectedOption(e.target.value)
    //     console.log(e.target.value)
    // }

    // console.log(selectedOption)


    const loadBranchesOptions = (selectedOption) => {
        return userRequest.get(`get_subentities_for/${selectedOption}`)
            .then(response => {
                const data = response.data;
                const options = data.map(post => {
                    return {
                        value: post.id,
                        label: post.branch_name
                    };
                });
                return options;
            })
            .catch(error => {
                const message = error.message;
                console.error(message);
            });
    }
    return (
        <div className="app">
            <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={loadOptions}
                value={selectedOption}
                onChange={setSelectedOption}
            />
            <span>-</span>
            {/* <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={branchOptions}
                onChange={setSelectedBranchOption}
                value={selectBranchOption}
            /> */}
            <span></span>
            <span></span>
        </div>
    );
}

export default CompanyDropDownForm;

