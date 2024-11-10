import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import auth from "../_Firebase_init";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [logInMessage, setLogInMessage] = useState("");
  const emailRef = useRef();

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    setLogInMessage("");
    setSuccess(false);

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
        if (!res.user.emailVerified) {
          setLogInMessage("plz verify");
        } else {
          setSuccess(true);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setLogInMessage(err.message);
      });
  };
// forget password
  const handleForgetPass = () => {
    const email = emailRef.current.value;
    if (!email) {
      console.log("provide valid email");
    } else {
      sendPasswordResetEmail(auth, email).then(() => {
        alert("resent email; sent");
      });
    }
  };
  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center">Log In Now !!</h1>
      <form onSubmit={handleLogIn} className="card-body my-10">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            ref={emailRef}
            name="email"
            type="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            name="password"
            type="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <label onClick={handleForgetPass} className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      {success && "Sign is Success"}
      {logInMessage && <p className="text-red-300">{logInMessage}</p>}
      <p>
        plz <Link to="/register">Sign Up</Link>{" "}
      </p>
    </div>
  );
};

export default Login;
