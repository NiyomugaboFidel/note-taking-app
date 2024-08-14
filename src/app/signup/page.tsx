"use client"; // This line must be the first line in the file
import Button from "@/components/common/Button";
import Input from "@/components/forms/inputField";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import useSignup from "@/hooks/useSignup";
import toast from "react-hot-toast";
import Image from "next/image";

const RegisterPage = () => {
  const [inputs, setInputs] = useState({ username: '', email: '', password: '' });
  const { loading, signup } = useSignup();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Basic client-side validation
    if (!inputs.username || !inputs.email || !inputs.password) {
      return toast.error("Please fill in all fields.");
    }
        
    try {
      await signup(inputs);
      setInputs({ email: '', password: '', username: '' });
    } catch (error) {
      // Handle potential errors from signup
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="h-full w-full bg-white">
      <div className="flex flex-col items-center gap-2 justify-center w-full h-full px-2">
        <div className="py-2">
          <Image width={100} height={100} src="/notefy-logo.svg" alt="Notefy Logo" /> {/* Ensure path is correct */}
        </div>
        <form onSubmit={handleSubmit}>
          <h2 className="text-primary-300 font-serif text-bodyLarge md:text-display4 text-center font-bold">
            Get Into Notefy Community <br /> Of Users
          </h2>
          <div className="py-2 px-2 w-full h-full">
            <Input
              type="text"
              label="UserName"
              placeholder="John Doe"
              value={inputs.username}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
            <Input
              type="email"
              label="Email"
              placeholder="example@gmail.com"
              value={inputs.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInputs({ ...inputs, email: e.target.value })
              }
            />
            <Input
              type="password"
              label="Password"
              placeholder="******"
              value={inputs.password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>
          <Button type="submit" label={loading ? 'Sign up...' : 'Sign Up'} disabled={loading} />
          <p className="text-bodySmall py-2 text-center text-primary-300">
            If you have an account, please
            <Link className="px-1 text-Blue-400 underline" href='/login'>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
