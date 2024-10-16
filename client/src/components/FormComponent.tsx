import React, { useState, useCallback } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./DialogComponent";
import CustomFormComponent from './CustomFormComponent';
import { SquareCheck } from 'lucide-react';


interface ValidationRule {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | null; // Custom validation returns error message or null
}



export interface InputField {
    name: string;
    label: string;
    type: string; // e.g., 'text', 'email', 'password', 'number', etc.
    placeholder?: string;
    validation?: ValidationRule;
    options?: { label: string; value: string }[];

}

interface FormProps<T> {
    fields: InputField[];
    onSubmit: (values: { [key: string]: string | boolean | number | null }) => void;
    initialValues?: T;
    setFields: React.Dispatch<React.SetStateAction<InputField[]>>; // New prop for updating fields
}
const renderField = (field: InputField, formValues: { [x: string]: unknown; }, handleChange: (e: React.ChangeEvent<HTMLInputElement>, type: string) => void, errors: { [x: string]: unknown; }) => {
    switch (field.type) {
        case 'radio':
            return field.options?.map((option) => (
                <div key={option.value} className="form-group">
                    <label>
                        <input
                            type="radio"
                            name={field.name}
                            value={option.value}
                            checked={formValues[field.name] === option.value}
                            onChange={(e) => handleChange(e, field.type)}
                            className="form-input"
                        />
                        {option.label}
                    </label>
                </div>
            ));
        case 'select':
            return (
                <select
                    name={field.name}
                    value={String(formValues[field.name]) || ''}
                    onChange={(e) => handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>, field.type)}
                    className="form-input"
                >
                    <option value="">Select an option</option>
                    {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            );
        default:
            return (
                <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={String(formValues[field.name]) || ""}
                    onChange={(e) => handleChange(e, field.type)}
                    defaultChecked={formValues[field.name] as unknown as boolean}
                    className={`form-input ${errors[field.name] ? "border-red-500" : "border-gray-300"}
                     p-2
                     border
                      rounded-md text-base
                       bg-white
                        text-gray-800 
                        outline-none ${["checkbox", "radio"].includes(field.type)
                            ? "w-full h-4"
                            : ""
                        }`}
                />
            );
    }
};

const FormComponent = <T,>({ fields, onSubmit, initialValues, setFields }: FormProps<T>) => {
    const [formValues, setFormValues] = useState<{ [key: string]: string | boolean | number | null | InputField[] }>(initialValues || {});
    const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
    const [open, setOpen] = useState(false);
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const { name, value, checked } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
        }));
    }, []);

    const validateField = (_name: string, value: string, validation?: ValidationRule) => {
        if (!validation) return null;
        if (validation.required && !value) return 'This field is required';
        if (validation.minLength && value.length < validation.minLength) return `Minimum length is ${validation.minLength}`;
        if (validation.maxLength && value.length > validation.maxLength) return `Maximum length is ${validation.maxLength}`;
        if (validation.pattern && !validation.pattern.test(value)) return 'Invalid format';
        if (validation.custom) return validation.custom(value);
        return null;
    };

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        let valid = true;
        const newErrors: { [key: string]: string | null } = {};
        fields.forEach((field) => {
            const error = validateField(field.name, String(formValues[field.name] || ''), field.validation);
            if (error) valid = false;
            newErrors[field.name] = error;
        });
        setErrors(newErrors);
        if (valid) onSubmit(formValues as { [key: string]: string | boolean | number | null });
    }, [fields, formValues, onSubmit]);

    return (
        <>
            <div className="">
                <form
                    className="flex flex-col gap-4 w-1/2"
                    onSubmit={handleSubmit}

                >
                    {fields.map((field) => (
                        <div key={field.name} className="flex flex-col gap-1">
                            <label htmlFor={field.name} className="text-sm">
                                {field.label}
                            </label>
                            {renderField(field, formValues, handleChange, errors)}
                            {errors[field.name] && <span className="
                            text-red-500
                            ">{errors[field.name]}</span>}
                        </div>
                    ))}

                    <Dialog open={open} onOpenChange={setOpen} modal={true}>
                        <DialogTrigger asChild>
                            <button className='add-sub-item'>
                                + Add Sub Item
                            </button>
                            {/* <Button variant="outline">Edit Profile</Button> */}
                        </DialogTrigger>
                        <DialogContent >
                            <DialogHeader>
                                <DialogTitle>
                                    Add Sub Item
                                </DialogTitle>
                                <DialogDescription>
                                    {/* Add a new sub item */}
                                </DialogDescription>

                            </DialogHeader>
                            <CustomFormComponent
                                onSubmit={(values) => {
                                    console.log('Sub Item:', values);
                                    if (!values.name || !values.label || !values.type) return;

                                    const newField: InputField = {
                                        name: values.name,
                                        label: values.label,
                                        type: values.type,
                                        placeholder: values.placeholder,
                                        validation: {
                                            required: values.validation.required,
                                            minLength: values.validation.minLength,
                                            maxLength: values.validation.maxLength,
                                            pattern: new RegExp(values.validation.pattern), // Convert string to RegExp
                                        },
                                        options: values.options.map((option: { label: string; value: string }) => ({
                                            label: option.label,
                                            value: option.value,
                                        })),
                                    };
                                    setFields((prevFields) => [...prevFields, newField]);
                                    setFormValues((prevValues) => ({
                                        ...prevValues,
                                        [values.name]: values.type === 'checkbox' ? false : '',
                                        customItems: [...((prevValues.customItems as never) || []), values], // Ensure customItems is initialized as an array
                                    }));
                                    setOpen(false);
                                }}
                            />
                        </DialogContent>
                    </Dialog>
                </form>
                {/* <div className="card-footer">
                    <button onClick={handleSubmit} className="submit-button">Submit</button>
                </div> */}
                <button
                    type="submit"
                    className="bg-[#2F4829] text-white px-2 py-2 rounded-md w-24 flex items-center justify-center gap-2"
                    onClick={handleSubmit}
                >
                    <SquareCheck
                        className="h-4 w-4"
                    />
                    Add
                </button>
            </div>
        </>
    );
};

export default FormComponent;