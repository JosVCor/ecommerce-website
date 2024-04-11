import { useState } from 'react';

const useFormValidation = (initialState, validationRules) => {
    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
const [selectedSizes, setSelectedSizes] = useState([]);

    const validateField = (name, value) => {
        const rules = validationRules[name];
        if (rules) {
            for (const rule of rules) {
                const error = rule[0](value);
                if (error) {
                    return rule[1];
                }
            }
        }
        return '';
    };

    const handleChange = (e) => {
        const { name, type, files } = e.target;

        // If it's a file input, handle a single file
        const value = type === 'file' ? files[0] : e.target.value;

        // Handle color and size differently
        if (name === 'color') {
            // Update selected colors
            setSelectedColors(Array.from(e.target.selectedOptions).map(option => option.value));
        } else if (name === 'size') {
            // Update selected sizes
            setSelectedSizes(Array.from(e.target.selectedOptions).map(option => option.value));
        } else {
            // Validate the field based on its name and value
            const error = validateField(name, value);

            // Update the form data and form errors
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));

            setFormErrors((prevFormErrors) => ({
                ...prevFormErrors,
                [name]: error,
            }));
        }
    };




    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        const isValid = Object.values(formErrors).every((error) => !error);

        if (isValid) {
            console.log('Form is valid. Proceed with submission:', formData);
        } else {
            console.log('Form has errors. Please fix them.');
        }
    };

    return {
        formData,
        formErrors,
        handleChange,
        handleSubmit,
    };
};

export default useFormValidation;
