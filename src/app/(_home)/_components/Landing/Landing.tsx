"use client";

import { useState, useTransition } from "react";
import { loginUser } from "@/app/(_home)/_actions/user-actions";
import { useRouter } from "next/navigation";
import { LoginFormState } from "@/app/lib/definitions";
import "./Landing.css";

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
      <div id="landingCon">
        <div id="titleSide">
          <div id="titleCon">
            <h1 id="titleMain" className="font-title">Soul Academy</h1>
            <h2 id="titleSub">Learning with Soul</h2>
          </div>
        </div>
        <div id="loginSide">
          <div id="loginCon" className="whiteBox">
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
                  className='btn submitBtn btnLanding'
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
          <div id="demoCon" className="whiteBox">
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
