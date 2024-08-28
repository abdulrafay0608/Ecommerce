import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/authContext";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [btnDisable, setBtnDisable] = useState(false);

  // custom hook
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const SignUpFunc = async (e) => {
    e.preventDefault();
    setBtnDisable(true);
    try {
      if (password !== repeatPassword) {
        toast.error("Both password do not match!");
        setBtnDisable(false);
      } else {
        const res = await axios.post(`/api/auth/sign-up`, {
          name,
          email,
          password,
          phone,
          address,
          answer,
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

          // navigate("/");
        } else {
          toast.error(res.data.message);
          console.log("Success False");
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(`Something went wrong ${error}`);
      setBtnDisable(false);
    }
    setBtnDisable(false);
  };

  return (
    <Layout>
      <div className="container d-flex justify-content-center mt-4 p-0  rounded-2 overflow-hidden ">
        <div className="col-lg-7 col-12 text-white bg-dark  p-4 p-md-5">
          <h3 className="mb-3 fs-2 heading">Create Your Account</h3>
          <form onSubmit={SignUpFunc} className="">
            <div className="row">
              <div className="col-md-12 my-lg-3">
                <div className="d-block d-md-flex align-items-center gap-4">
                  <label className="label fs-6 text-nowrap">Full Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    required
                    className="form-control my-lg-0 my-3"
                    placeholder="Full Name"
                  />
                </div>
              </div>
              <div className="col-md-12 my-lg-3">
                <div className="d-block d-md-flex align-items-center gap-4">
                  <label className="label fs-6 text-nowrap">
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
                  <label className="label fs-6 text-nowrap">Phone no:</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    required
                    className="form-control my-lg-0 my-3"
                    placeholder={"+92 0000 - 00000"}
                  />
                </div>
              </div>
              <div className="col-md-12 my-lg-3">
                <div className="d-block d-md-flex align-items-center gap-4">
                  <label className="label fs-6 text-nowrap">Password:</label>
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
                  <label className="label fs-6 text-nowrap">
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
              <div className="col-md-12 my-lg-3">
                <div className="d-block d-md-flex align-items-center gap-4">
                  <label className="label fs-6 text-nowrap">Address:</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    required
                    className="form-control my-lg-0 my-3"
                    placeholder="Address"
                  />
                </div>
              </div>
              <div className="col-md-12 my-lg-3">
                <div className="d-block d-md-flex align-items-center gap-4">
                  <label className="label fs-6 text-nowrap">Answer:</label>
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => {
                      setAnswer(e.target.value);
                    }}
                    required
                    className="form-control my-lg-0 my-3"
                    placeholder="Write Something"
                  />
                </div>
              </div>
              <div className="col-md-12 my-lg-3">
                <div className="form-group">
                  <div className="w-100">
                    <label className="d-flex align-items-center gap-1 fs-6 checkbox-wrap checkbox-primary">
                      <input type="checkbox" required />
                      <span className="checkmark" />I agree all statements in
                      terms of service
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-12 my-4">
                <div className="position-relative text-center">
                  <div className="d-flex justify-content-center align-items-center">
                    <div
                      className={`${
                        btnDisable === true ? "d-block" : "d-none"
                      } position-absolute spinner-border text-light`}
                    ></div>
                    <button
                      type="submit"
                      disabled={btnDisable}
                      className="btn btn-secondary submit p-3"
                    >
                      {btnDisable ? "Sign Up...." : "Sign Up"} 
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className="w-100 text-center">
            <p className="d-flex justify-content-center align-items-center gap-1 fs-6 mt-4">
              Already have an account?{" "}
              <Link className="nav-link text-secondary " to="/sign-in">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignupPage;
