import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/authContext";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [btnDisable, setBtnDisable] = useState(false);
 
  
  // custom hook
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();


  const SignInFunc = async (e) => {
    e.preventDefault();
    setBtnDisable(true);

    try {
      if (password !== repeatPassword) {
        toast.error("Both password do not match!");
        setBtnDisable(false);
      } else {
        const res = await axios.post(`/api/auth/sign-in`, {
          email,
          password,
        });

        if (res && res.data.success) {
          toast.success(res.data.message);
          console.log("Success true");

          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
          });

          localStorage.setItem("auth", JSON.stringify(res.data));
          navigate(location.state || "/");
        } else {
          toast.error(res.data.message);
          console.log("Success False");
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(`Something went wrong ${error}`);
    }
    setBtnDisable(false);
  };

  return (
    <Layout>
      <div className="container d-flex justify-content-center p-0 rounded-2 overflow-hidden mt-4">
        <div className="col-lg-7 col-12 bg-dark text-white  p-4 p-md-5">
          <h3 className="mb-3 fs-2">Sign In Your Account</h3>
          <form onSubmit={SignInFunc} className="">
            <div className="row">
              <div className="col-md-12 my-lg-3">
                <div className="d-block d-md-flex align-items-center gap-4">
                  <label className="label fs-6 text-nowrap" htmlFor="email">
                    Email Address :
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                    className="form-control my-lg-0 my-3"
                    placeholder="example@gmail.com"
                  />
                </div>
              </div>

              <div className="col-md-12 my-lg-3">
                <div className="d-block d-md-flex align-items-center gap-4">
                  <label className="label fs-6 text-nowrap" htmlFor="password">
                    Password:
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                    className="form-control my-lg-0 my-3"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="col-md-12 my-lg-3">
                <div className="d-block d-md-flex align-items-center gap-4">
                  <label
                    className="label fs-6 text-nowrap"
                    htmlFor="repeat-password"
                  >
                    Repeat Password:
                  </label>
                  <input
                    type="password"
                    value={repeatPassword}
                    onChange={(e) => {
                      setRepeatPassword(e.target.value);
                    }}
                    required
                    className="form-control my-lg-0 my-3"
                    placeholder="Repeat Password"
                  />
                </div>
              </div>

              <div className="col-md-12 my-5">
                <div className="form-group">
                  <div onClick={()=>{navigate("/forgot-password")}} className="fs-6 w-100 cursor-pointer text-white-hover text-secondary">
                     Forgot your password?

                    {/* <label className="d-flex align-items-center gap-1 fs-6 checkbox-wrap checkbox-primary">
                      <input
                        type="checkbox"
                        required
                      />
                      <span className="checkmark" />I agree all statements in
                      terms of service
                    </label> */}
                  </div>
                </div>
              </div>
              <div className="col-md-12 my-1">
                <div className="position-relative text-center">
                  <div className="d-flex justify-content-center align-items-center">
                    <div
                      className={`${
                        btnDisable === true ? "d-block" : "d-none"
                      } position-absolute spinner-border text-light`}
                    ></div>
                    <button
                      type="submit"
                      className="btn-secondary btn submit p-3"
                    >
                      {btnDisable ? "Sign...." : "  Sign In"} 
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className="w-100 text-center">
            <p className="d-flex justify-content-center align-items-center gap-1 fs-6 mt-4">
              Don't have an account?
              <Link className="nav-link text-secondary " to="/sign-up">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SigninPage;
