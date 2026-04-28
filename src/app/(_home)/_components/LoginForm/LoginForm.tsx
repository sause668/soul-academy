"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/(_home)/_actions/user-actions";
import { LoginFormState } from "@/app/lib/definitions";

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<LoginFormState>(undefined);
    const [pending, startTransition] = useTransition();
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        startTransition(async () => {
            e.preventDefault();
            const result = await loginUser(email, password);

            if (result instanceof Error) console.error(result);
            
            if (result && "errors" in result) setErrors(result);

            router.push('/');
        });
    }

    return (
        <div className="flex justify-center items-center pt-20">
            <div className="flex flex-col items-start justify-center gap-2 bg-screenWhite border border-primary text-screenBlack rounded-md ">
                <div className='formCon'>
                    <h1 className='inputTitle'>Log In</h1>
                    <form onSubmit={handleSubmit}>
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
                        <div className="submitCon">
                            <button
                                className='btn submitButton'
                                type="submit"
                                disabled={pending}
                            >{pending ? "Logging in..." : "Log In"}</button>
                        </div>
                        {errors?.errors && <p className='labelTitle error'>{errors.errors.join(', ')}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}