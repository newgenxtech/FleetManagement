import { SquareChevronLeft } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import VehicleForm, { CustomField } from "@/components/FormComponentV2";
import { z } from "zod";

const VehicleDetails = () => {

    const { id } = useParams();

    const location = useLocation();
    const navigate = useNavigate();

    const isEdit = location.state?.isEdit;

    console.log('id', id);
    console.log('isEdit', isEdit);

    const formFields: CustomField[] = [
        {
            name: 'vehicle_number',
            label: 'Vehicle Number',
            type: 'text',
            isInputProps: {
                placeholder: "Please Enter Vehicle's Number",
            },
            validation: {
                required: true,
                pattern: z.string().min(1, 'Vehicle number is required')
            }
        },
        {
            name: 'vehicle_type',
            label: 'Vehicle Type',
            type: 'text',
            isInputProps: {
                placeholder: "Please Enter Vehicle's Type",
            },
            validation: {
                required: true,
                pattern: z.string().min(1, 'Vehicle type is required')
            }
        },
        {
            name: 'chassis_number',
            label: 'Chassis Number',
            type: 'text',
            isInputProps: {
                placeholder: "Please Enter Chassis Number",
            },
            validation: {
                required: true,
                pattern: z.string().min(1, 'Chassis number is required')
            }
        },
        {
            name: 'chassis',
            label: 'Chassis',
            type: 'text',
            isInputProps: {
                placeholder: "Please Enter Chassis",
            },
            validation: {
                required: true,
                pattern: z.string().min(1, 'Chassis is required')
            }
        },
        {
            name: 'no_of_tyres',
            label: 'Number of Tyres',
            type: 'number',
            isInputProps: {
                placeholder: "Please Enter Number of Tyres",
            },
            validation: {
                required: true,
                pattern: z.number().min(1, 'Number of tyres is required')
            }
        },
        {
            name: 'fast_tag_id',
            label: 'Fast Tag ID',
            type: 'text',
            isInputProps: {
                placeholder: "Please Enter Fast Tag ID",
            },
            validation: {
                required: true,
                pattern: z.string().min(1, 'Fast Tag ID is required')
            }
        },
        {
            name: 'insurance_number',
            label: 'Insurance Number',
            type: 'text',
            isInputProps: {
                placeholder: "Please Enter Insurance Number",
            },
            validation: {
                required: true,
                pattern: z.string().min(1, 'Insurance number is required')
            }
        },
        {
            name: 'insurance_exp_date',
            label: 'Insurance Expiry Date',
            type: 'date',
            isInputProps: {
                placeholder: "Please Enter Insurance Expiry Date",
            },
            validation: {
                required: true,
                pattern: z.date().refine(date => date instanceof Date, 'Invalid date')
            }
        },
        {
            name: 'roadta_exp_date',
            label: 'Road Tax Expiry Date',
            type: 'date',
            isInputProps: {
                placeholder: "Please Enter Road Tax Expiry Date",
            },
            validation: {
                required: true,
                pattern: z.date().refine(date => date instanceof Date, 'Invalid date')
            }
        },
        {
            name: 'pollution_exp_date',
            label: 'Pollution Expiry Date',
            type: 'date',
            isInputProps: {
                placeholder: "Please Enter Pollution Expiry Date",
            },
            validation: {
                required: true,
                pattern: z.date().refine(date => date instanceof Date, 'Invalid date')
            }
        }
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
            <VehicleForm fields={formFields} onSubmit={handleFormSubmit} />
        </div>
    )
}

export default VehicleDetails