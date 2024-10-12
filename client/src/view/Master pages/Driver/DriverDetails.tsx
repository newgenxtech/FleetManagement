import { Link, useLocation, useParams } from "react-router-dom";

const DriverDetails = () => {

    const { id } = useParams();

    const location = useLocation();

    const isEdit = location.state?.isEdit;

    console.log('id', id);
    console.log('isEdit', isEdit);


    return (
        <div className="flex flex-col gap-6">
            <button
                className="flex items-center gap-1 border border-gray-300 p-2 rounded-md text-gray-500"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 transform rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
                <Link to={{
                    pathname: '/master/driver',
                }}>Drivers</Link>
            </button>
            <h3>
                {isEdit ? 'Edit' : 'Add'} Driver</h3>
            <hr />
            <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log('submit');
                }}
            >
                <div className="flex flex-col">
                    <span>Name</span>
                    <input type="text" placeholder="Please Enter Driver's Name"
                        className="border border-gray-300 p-2 rounded-md"
                    />
                </div>
                <div className="flex flex-col">
                    <span>Address</span>
                    <input type="text" placeholder="Please Enter Driver's Address"
                        className="border border-gray-300 p-2 rounded-md"
                    />
                </div>
                <div className="flex flex-col">
                    <span>Contact</span>
                    <input type="text" placeholder="Please Enter Driver's Contact"
                        className="border border-gray-300 p-2 rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-[#2F4829] text-white p-2 rounded-md w-20"
                >
                    Add
                </button>
            </form>
        </div>
    )
}

export default DriverDetails