import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import auth from "../_Firebase_init";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    const password = e.target.password.value;

    const terms = e.target.terms.checked;
    console.log(email, password, terms);
    setErrorMessage("");
    setSuccess(false);

    if (password.length < 6) {
      setErrorMessage("password should be 6 character");
      return;
    }
    if (!terms) {
      setErrorMessage("plx accept terms and condition");
      return;
    }
    const regularExpression =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (!regularExpression.test(password)) {
      setErrorMessage(
        "Without it, your current regex only matches that you have 6 to 16 valid characters, it doesnt validate that it has at least a number, and at least a special character"
      );
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);

        // send mail verification
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("verification main sent");
        });
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
        setSuccess(false);
      });
  };
  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto my-10">
      <h3 className="text-2xl font-bold text-center">Sign Up Now!!!</h3>
      <form onSubmit={handleSignUp} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            name="email"
            type="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control relative ">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            name="password"
            type={showPass ? "text" : "password"}
            placeholder="password"
            className="input input-bordered"
            required
          />
          <div>
            <button
              onClick={() => setShowPass(!showPass)}
              className="btn btn-xs absolute right-5 top-12"
            >
              {showPass ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-3">
            <input
              type="checkbox"
              name="terms"
              defaultChecked
              className="checkbox"
            />
            <span className="label-text">Remember me</span>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Sign Up Now</button>
        </div>
      </form>
      {errorMessage && <p className="text-red-300">{errorMessage}</p>}
      {success && <p className="text-green-400">Sign is successfull</p>}
    </div>
  );
};

export default Register;
