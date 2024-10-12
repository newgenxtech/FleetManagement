import { SquareChevronLeft } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DriverForm, { CustomField } from "@/components/FormComponentV2";
import { z } from "zod";

const DriverDetails = () => {

    const { id } = useParams();

    const location = useLocation();
    const navigate = useNavigate();

    const isEdit = location.state?.isEdit;

    console.log('id', id);
    console.log('isEdit', isEdit);

    const formFields: CustomField[] = [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            isInputProps: { 
                placeholder: "Please Enter Driver's Name",
            },
            validation: {
                required: true,
                pattern: z.string().min(1, 'Name is required')
            }
        },
        {
            name: 'address',
            label: 'Address',
            type: 'text',
            isInputProps: { placeholder: "Please Enter Driver's Address" },
            validation: {
                required: true,
                pattern: z.string().min(1, 'Address is required')
            }
        },
        {
            name: 'contact',
            label: 'Contact',
            type: 'text',
            isInputProps: { placeholder: "Please Enter Driver's Contact" },
            validation: {
                required: true,
                pattern: z.string().min(1, 'Contact is required')
            }
        },
        {
            label: 'Email',
            name: 'email',
            type: 'email',
            isInputProps: { placeholder: "Please Enter Driver's Email" },
            validation: {
                required: true,
                pattern: z.string().email('Invalid email')
            }
        }
        // { name: 'username', label: 'Username', type: 'text', validation: z.string().min(1, 'Username is required') },
        // { name: 'email', label: 'Email', type: 'email', validation: z.string().email('Invalid email') },
        // { name: 'password', label: 'Password', type: 'password', validation: z.string().min(6, 'Password must be at least 6 characters') },
        // { name: 'role', label: 'Role', type: 'select', options: ['User', 'Admin'] },
    ];

    const handleFormSubmit = (data: unknown) => {
        console.log('Form Data:', data);
    };


    return (
        <div className="flex flex-col gap-6">
            <button
                className="flex items-center gap-1 border border-gray-300 p-2 rounded-md text-gray-500 w-24"
                onClick={() => {
                    navigate(-1);
                }}
            >
                <SquareChevronLeft
                    className="h-4 w-4"
                />
                <span>Drivers</span>
            </button>
            <h3 className="font-bold text-xl">
                {isEdit ? 'Edit' : 'Add'} Driver</h3>
            <hr />
            <DriverForm fields={formFields} onSubmit={handleFormSubmit} />
        </div>
    )
}

export default DriverDetails