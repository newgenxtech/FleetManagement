import LoginForm from "@/components/loginForm";
import { useNavigate } from "react-router-dom";
// import Image from "next/image";

export default function Login() {
    const navigate = useNavigate();
    return (
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <LoginForm
                onLogin={() => {
                    navigate('/dashboard');
                }}
            />
        </main>
    );
}
