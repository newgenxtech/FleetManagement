import React from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SquareCheck } from 'lucide-react';

type FieldType = 'text' | 'email' | 'number' | 'password' | 'checkbox' | 'select' | 'textarea' | 'radio';

export interface CustomField {
    name: string;
    label: string;
    type: FieldType;
    isInputProps?: {
        placeholder?: string,
        defaultValue?: string,
        defaultChecked?: boolean,
        defaultSelected?: boolean,
    };
    options?: string[];  // For select fields
    validation?: {
        required?: boolean;
        pattern?: z.ZodTypeAny;

    }
}

interface ReusableFormProps {
    fields: CustomField[];
    onSubmit: SubmitHandler<FieldValues>;
}

const ReusableForm: React.FC<ReusableFormProps> = ({ fields, onSubmit }) => {

    const SchemaObject = Object.fromEntries(
        fields.map((field) => [
            field.name,
            field.validation?.pattern ?? z.string()
        ])
    );

    const schema = z.object(
        SchemaObject
    ).required();

    const setDefaultValues = (field: CustomField) => {
        switch (field.type) {
            case 'text':
            case 'email':
            case 'number':
            case 'password':
            case 'textarea':
                return field?.isInputProps?.defaultValue ?? '';
            case 'checkbox':
                return field?.isInputProps?.defaultChecked ?? false;
            case 'select':
                return field?.isInputProps?.defaultSelected ?? '';
            default:
                return '';
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: Object.fromEntries(
            fields.map((field) => [
                field.name,
                setDefaultValues(field)
            ])
        )
    });

    const renderField = (field: CustomField) => {
        switch (field.type) {
            case 'text':
                return (
                    <input
                        type={field.type}
                        {...register(field.name)}
                        placeholder={field?.isInputProps?.placeholder}
                        className={` p-2 border rounded-md text-base bg-whitetext-gray-800 `}
                    />
                )
            case 'email':
                return (
                    <input
                        type={field.type}
                        {...register(field.name)}
                        placeholder={field?.isInputProps?.placeholder}
                        className={` p-2 border rounded-md text-base bg-whitetext-gray-800 `}
                    />
                )
            case 'number':
                return (
                    <input
                        type={field.type}
                        {...register(field.name)}
                        placeholder={field?.isInputProps?.placeholder}
                        className={` p-2 border rounded-md text-base bg-whitetext-gray-800 `}
                    />
                )
            case 'password':
                return (
                    <input
                        type={field.type}
                        {...register(field.name)}
                        placeholder={field.label}
                        className='p-2 border rounded-md text-base bg-whitetext-gray-800'
                    />
                );
            case 'checkbox':
                return (
                    <input
                        type="checkbox"
                        {...register(field.name)}

                    />
                );
            case 'select':
                return (
                    <select {...register(field.name)}
                        className='p-2 border rounded-md text-base bg-whitetext-gray-800'
                    >
                        {field.options?.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                );
            case 'textarea':
                return (
                    <textarea
                        {...register(field.name)}
                        placeholder={field.label}
                        className='p-2 border rounded-md text-base bg-whitetext-gray-800'
                    />
                );
            default:
                return null;
        }
    };

    return (
        <form
            className="flex flex-col gap-4 w-1/2"
            onSubmit={handleSubmit(onSubmit)}
        >
            {fields.map((field) => (
                <div key={field.name} className="flex flex-col gap-1">
                    <label htmlFor={field.name} className="text-sm" >{field.label}
                        {field?.validation?.required && <span className="text-red-500">*</span>}
                    </label>
                    {renderField(field)}
                    {errors[field.name] && (
                        <p style={{ color: 'red' }}>{
                            errors[field.name]?.message?.toString() ?? 'This field is required'
                        }</p>
                    )}
                </div>
            ))}
            {/* <button type="submit">Submit</button> */}
            <button
                type="submit"
                className="bg-[#2F4829] text-white px-2 py-2 rounded-md w-24 flex items-center justify-center gap-2"
            // onClick={handleSubmit}
            >
                <SquareCheck
                    className="h-4 w-4"
                />
                Add
            </button>
        </form>
    );
};

export default ReusableForm;
