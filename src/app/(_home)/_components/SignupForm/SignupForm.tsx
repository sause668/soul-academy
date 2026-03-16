"use client";

import { useState, useTransition } from "react";
import { signupUser } from "@/app/(_home)/_actions/user-actions";
import { SignupFormState } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import "./SignupForm.css";

export default function SignupForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<SignupFormState>(undefined);
  const [pending, startTransition] = useTransition();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await signupUser(firstName, lastName, username, email, password, confirmPassword);

      if (result instanceof Error) console.error(result);

      if (result && "errors" in result) setErrors(result);

      router.push('/');
    });

  };

  return (
    <div className="flex justify-center items-center pt-10">
      <div className="flex flex-col items-start justify-center gap-2 bg-screenWhite border border-primary text-screenBlack rounded-md ">
        <div className='formCon'>
          <h1 className='inputTitle'>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className='inputCon' >
              <label className='labelCon' htmlFor='username'>
                <p className='labelTitle'>
                  Username
                </p>
              </label>
              <input
                className='formInput'
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              {errors?.properties?.username && <p className='labelTitle error'>{errors.properties.username.errors.join(', ')}</p>}
            </div>
            {/* Email */}
            <div className='inputCon'>
              <label className='labelCon' htmlFor='emailS'>
                <p className='labelTitle'>Email</p>
              </label>
              <input
                id="emailS"
                className='formInput'
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors?.properties?.email && <p className='labelTitle error'>{errors.properties.email.errors.join(', ')}</p>}
            </div>
            {/* First Name */}
            <div className='inputCon'>
              <label className='labelCon' htmlFor='firstName'>
                <p className='labelTitle'>First Name</p>
              </label>
              <input
                className='formInput'
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              {errors?.properties?.firstName && <p className='labelTitle error'>{errors.properties.firstName.errors.join(', ')}</p>}
            </div>
            {/* Last Name */}
            <div className='inputCon'>
              <label className='labelCon' htmlFor='lastName'>
                <p className='labelTitle'>Last Name</p>
              </label>
              <input
                className='formInput'
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              {errors?.properties?.lastName && <p className='labelTitle error'>{errors.properties.lastName.errors.join(', ')}</p>}
            </div>
            {/* Password */}
            <div className='inputCon'>
              <label className='labelCon' htmlFor='passwordS'>
                <p className='labelTitle'>Password</p>
              </label>
              <input
                className='formInput'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errors?.properties?.password && <p className='labelTitle error'>{errors.properties.password.errors.join(', ')}</p>}
            </div>
            {/* Confirm Password */}
            <div className='inputCon'>
              <label className='labelCon' htmlFor='confirmPassword'>
                <p className='labelTitle'>Confirm Password</p>
              </label>
              <input
                className='formInput'
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {errors?.properties?.confirmPassword && <p className='labelTitle error'>{errors.properties.confirmPassword.errors.join(', ')}</p>}
            </div>
            <div className="submitCon">
              <button
                className='btn submitButton'
                type="submit"
                disabled={pending}
              >{pending ? "Signing up..." : "Sign Up"}</button>
            </div>
            {errors?.errors && <p className='labelTitle error'>{errors.errors.join(', ')}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}


