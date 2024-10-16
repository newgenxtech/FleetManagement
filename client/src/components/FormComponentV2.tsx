import React from 'react';
import { useForm, SubmitHandler, FieldValues, UseFormRegister, UseFormHandleSubmit, FormState } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SquareCheck, SquareX } from 'lucide-react';
import { cn } from "@/lib/utils";
// import { SquareCheck } from 'lucide-react';

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
        multiple?: boolean,
    };
    options?: string[];  // For select fields
    validation?: {
        required?: boolean;
        pattern?: z.ZodTypeAny;
    }
    className?: string;
}

interface ReusableFormProps {
    fields: CustomField[];
    onSubmit: SubmitHandler<FieldValues>;
    buttonComponent?: React.ReactNode;
    AdditionalButton?: React.ReactNode;
    isUpdate?: boolean;
    CutomRender?: (
        fields: CustomField[],
        renderField: (field: CustomField) => React.ReactNode,
        ReactHookFormProps: {
            register?: UseFormRegister<{
                [k: string]: string | boolean;
            }>
            handleSubmit?: UseFormHandleSubmit<{
                [k: string]: string | boolean;
            }, undefined>
            formState?: FormState<{
                [k: string]: string | boolean;
            }>
        }
    ) => React.ReactNode;
}

const ReusableForm: React.FC<ReusableFormProps> = ({ fields, onSubmit, buttonComponent, isUpdate, AdditionalButton, CutomRender }) => {

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

    const { register, handleSubmit, formState } = useForm({
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
                        className={cn("p-2", "border", "rounded-md", "text-base", "bg-white", "text-gray-800")}
                    />
                )
            case 'email':
                return (
                    <input
                        type={field.type}
                        {...register(field.name)}
                        placeholder={field?.isInputProps?.placeholder}
                        className={cn(`p-2 border rounded-md text-base bg-whitetext-gray-800 `)}
                    />
                )
            case 'number':
                return (
                    <input
                        type={field.type}
                        {...register(field.name)}
                        placeholder={field?.isInputProps?.placeholder}
                        className={cn(`p-2 border rounded-md text-base bg-whitetext-gray-800`)}
                    />
                )
            case 'password':
                return (
                    <input
                        type={field.type}
                        {...register(field.name)}
                        placeholder={field.label}
                        className={cn('p-2 border rounded-md text-base bg-whitetext-gray-800')}
                    />
                );
            case 'checkbox':
                return (
                    <input
                        type="checkbox"
                        {...register(field.name)}
                        className={cn('p-2 border rounded-md text-base bg-whitetext-gray-800')}
                    />
                );
            case 'select':
                return (
                    <select {...register(field.name)}
                        className={cn('p-2 border rounded-md text-base bg-whitetext-gray-800')}
                        multiple={
                            field?.isInputProps?.multiple ?? false
                        }
                    >
                        <option value="" selected disabled hidden>{field?.isInputProps?.placeholder}</option>
                        {field.options?.map((option) => (
                            <option key={option} value={option}
                                className='p-2 border rounded-md text-base bg-whitetext-gray-800'
                            >
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
                        className={cn('p-2 border rounded-md text-base bg-whitetext-gray-800')}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <form
            // className="flex flex-col gap-4 w-full"
            className={`flex flex-col gap-4`}
            onSubmit={
                (e) => {
                    e.preventDefault();
                    handleSubmit(onSubmit)
                }
            }
        >
            {/* {fields.map((field) => (
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
            ))} */}
            {
                CutomRender ?

                    CutomRender!(fields, renderField, { register, handleSubmit, formState }) :

                    fields.map((field) => (
                        <div key={field.name} className="flex flex-col gap-1">
                            <label htmlFor={field.name} className="text-sm" >{field.label}
                                {field?.validation?.required && <span className="text-red-500">*</span>}
                            </label>
                            {renderField(field)}
                            {formState.errors[field.name] && (
                                <p style={{ color: 'red' }}>{
                                    formState.errors[field.name]?.message?.toString() ?? 'This field is required'
                                }</p>
                            )}
                        </div>
                    ))
                // fields.length === layoutConfig.flat().length ?
                //     layoutConfig.map((row, rowIndex) => (
                //         <div key={`row-${rowIndex}`} className="flex gap-2">
                //             {row.map((config, colIndex) => {
                //                 const fieldIndex = rowIndex * (row.length) + colIndex;
                //                 const field = fields[fieldIndex];
                //                 return (
                //                     // field.name === 'empty_space' ? (
                //                     //     <div
                //                     //         key={field.name}
                //                     //         className={config}
                //                     //     >
                //                     //         <div className="h-10 w-10 bg-gray-200"></div>
                //                     //     </div>
                //                     // ) : (
                //                     <div key={field.name} className={config}>
                //                         <label htmlFor={field.name} className="text-sm">
                //                             {field.label}
                //                             {field?.validation?.required && <span className="text-red-500">*</span>}
                //                         </label>
                //                         {renderField(field)}
                //                         {errors[field.name] && (
                //                             <p style={{ color: 'red' }}>
                //                                 {errors[field.name]?.message?.toString() ?? 'This field is required'}
                //                             </p>
                //                         )}
                //                     </div>
                //                 )
                //                 // );
                //             })}
                //         </div>
                //     )) 
                // :
                // <div>
                //     <h1 className="text-center text-xl font-semibold">Layout Configuration Error</h1>
                //     <table className="table-auto w-full border-collapse border border-gray-300">
                //         <thead className="bg-gray-50 text-gray-500 text-sm font-semibold uppercase tracking-wider">
                //             <tr>
                //                 <th className="p-2 border border-gray-300">Fields</th>
                //                 <th className="p-2 border border-gray-300">Layout Array</th>
                //             </tr>
                //         </thead>
                //         <tbody>
                //             <tr className="bg-white">
                //                 <td className="p-2 border border-gray-300 text-center">{fields.length}</td>
                //                 <td className="p-2 border border-gray-300 text-center">{layoutConfig.flat().length}</td>
                //             </tr>
                //         </tbody>
                //     </table>
                // </div>
            }
            {
                buttonComponent ? buttonComponent : (
                    <div className='flex gap-4 justify-center'>
                        <button
                            onClick={handleSubmit(onSubmit)}
                            className="bg-[#2F4829] text-white px-2 py-2 rounded-md w-24 flex items-center justify-center gap-2"
                        >
                            <SquareCheck
                                className="h-4 w-4"
                            />
                            {
                                isUpdate ? 'Update' : 'Add'
                            }
                        </button>
                        <button
                            type="reset"
                            className="bg-[#A61C1C] text-white px-2 py-2 rounded-md w-24 flex items-center justify-center gap-2"
                        >
                            <SquareX className="h-4 w-4" />
                            Clear
                        </button>
                    </div>
                )
            }
            {
                AdditionalButton && AdditionalButton
            }
        </form>
    );
};

export default ReusableForm;
