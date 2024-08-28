import React, { useState } from "react";
import Layout from "../../components/Layout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confrimPassword, setConfrimPassword] = useState("");
  const [btnDisable, setBtnDisable] = useState(false);

  const navigate = useNavigate();

  const forgotPasswordFunc = async (e) => {
    e.preventDefault();
    setBtnDisable(true);
    console.log(email, answer , newPassword , confrimPassword );
    try {
      if (newPassword !== confrimPassword) {
        toast.error("Both password do not match!");
        setBtnDisable(false);
      } else {
        console.log(email, answer , newPassword , confrimPassword );
        const res = await axios.post(`/api/auth/forgot-password`, {
          email,
          newPassword,
          answer,
        });
        console.log(res.data);
        if (res && res.data.success) {
          toast.success(res.data.message);
          console.log("Success true");

          navigate("/sign-in");
        } else {
          toast.error(res.data.message);
          console.log("Success False");
        }
      }
    } catch (error) {
      setBtnDisable(false);
      toast.error("Something went wrong");
      console.log(`Something went wrong ${error}`);
    }
    setBtnDisable(false);
  };

  return (
    <Layout>
      <div className="container d-flex justify-content-center p-0 rounded-2 overflow-hidden mt-4">
        <div className="col-lg-7 col-12 bg-dark text-white  p-4 p-md-5">
          <h3 className="mb-3 fs-2">Forgot Password</h3>
          <form onSubmit={forgotPasswordFunc} className="">
            <div className="row">
              <div className="col-md-12 my-lg-3 my-3">
                <div className="d-block d-md-flex align-items-center gap-4">
                  <label className="label fs-6 text-nowrap">Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                    className="form-control my-lg-0 my-3"
                    placeholder="Name"
                  />
                </div>
              </div>

              <div className="col-md-12 my-lg-3 my-3">
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

              <div className="col-md-12 my-lg-3 my-3">
                <div className="d-block d-md-flex align-items-center gap-4">
                  <label className="label fs-6 text-nowrap">
                    New Password:
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                    required
                    className="form-control my-lg-0 my-3"
                    placeholder="New Password"
                  />
                </div>
              </div>

              <div className="col-md-12 my-lg-3">
                <div className="d-block d-md-flex align-items-center gap-4">
                  <label className="label fs-6 text-nowrap">
                    Confrim Password:
                  </label>
                  <input
                    type="password"
                    value={confrimPassword}
                    onChange={(e) => {
                      setConfrimPassword(e.target.value);
                    }}
                    required
                    className="form-control my-lg-0 my-3"
                    placeholder="Confrim Password"
                  />
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
                      className="btn-secondary btn submit p-3"
                    >
                      Forgot Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
