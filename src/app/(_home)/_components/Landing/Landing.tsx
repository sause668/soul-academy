"use client";

import { useState, useTransition } from "react";
import { loginUser } from "@/app/(_home)/_actions/user-actions";
import { useRouter } from "next/navigation";
import { LoginFormState } from "@/app/lib/definitions";

function Landing() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginFormState>(undefined);
  const [pendingLogin, startLogin] = useTransition();
  const [pendingDemoTeacher, startDemoTeacher] = useTransition();
  const [pendingDemoStudent, startDemoStudent] = useTransition();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    startLogin(async () => {
      e.preventDefault();
      
      const result = await loginUser(email, password);

      if (result instanceof Error) console.error(result);
      else if (result && "errors" in result) setErrors(result);
      else router.push('/');
    });
  }

  const demoTeacher = () => {
    startDemoTeacher(async () => {
      const result = await loginUser('ssnape@soulacademy.com', 'teacher123!');

      if (result instanceof Error) console.error(result);
      else if (result && "errors" in result) setErrors(result);
      else router.push('/');
    });
  }


  const demoStudent = () => {
    startDemoStudent(async () => {
      const result = await loginUser('hpotter@soulacademy.com', 'student123!');

      if (result instanceof Error) console.error(result);
      else if (result && "errors" in result) setErrors(result);
      else router.push('/');
    });
  }


  return (
    <>
      <div id="landingCon" className="fixed flex h-full w-full max-md:flex-col">
        <div id="titleSide" className="flex w-[60%] items-center justify-center bg-primary pb-24 max-md:w-auto max-md:p-6">
          <div id="titleCon" className="flex flex-col items-center justify-center text-white">
            <h1 id="titleMain" className="font-title text-6xl font-bold max-2xs:text-5xl">Soul Academy</h1>
            <h2 id="titleSub" className="font-subtitle text-3xl font-bold max-2xs:text-2xl">Learning with Soul</h2>
          </div>
        </div>
        <div id="loginSide" className="flex w-[40%] flex-col items-center justify-center max-md:w-auto max-md:pt-12">
          <div id="loginCon" className="whiteBox p-8">
            <form id="loginForm" onSubmit={handleSubmit}>
              {/* Email */}
              <div className='inputCon'>
                <label htmlFor='email'>
                  <p className='labelTitle'>
                    Email
                  </p>
                </label>
                <input
                  id='email'
                  className='formInput'
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="on"
                />
                {errors?.properties?.email && <p className='labelTitle error'>{errors.properties.email.errors.join(', ')}</p>}
              </div>
              {/* Password */}
              <div className='inputCon'>
                <label htmlFor='password'>
                  <p className='labelTitle'>
                    Password
                  </p>
                </label>
                <input
                  id='password'
                  className='formInput'
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {errors?.properties?.password && <p className='labelTitle error'>{errors.properties.password.errors.join(', ')}</p>}
              </div>
              <div className='submitCon'>
                <button
                  className='btn submitBtn w-full'
                  type="submit"
                  disabled={(
                    email.length < 4 ||
                    password.length < 4
                  )}
                >{pendingLogin ? "Logging in..." : "Log In"}</button>
              </div>
              {errors?.errors && <p className='labelTitle error'>{errors.errors.join(', ')}</p>}
            </form>
          </div>
          <div id="demoCon" className="whiteBox mt-4 flex flex-col items-center justify-center gap-2 p-4">
            <button
              className="btn demoButton"
              onClick={demoTeacher}
            >{pendingDemoTeacher ? "Logging in..." : "Demo Teacher"}</button>
            <button
              className="btn demoButton"
              onClick={demoStudent}
            >{pendingDemoStudent ? "Logging in..." : "Demo Student"}</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
