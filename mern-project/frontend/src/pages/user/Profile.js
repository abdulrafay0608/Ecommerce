import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [btnDisable, setBtnDisable] = useState(false);

  useEffect(() => {
    const { name, email, address, phone } = auth?.user || {};
    setName(name || "");
    setEmail(email || "");
    setAddress(address || "");
    setPhone(phone || "");
  }, [auth?.user]);

  const updateProfile = async (e) => {
    e.preventDefault();
    setBtnDisable(true);
    try {
      const { data } = await axios.put("/api/auth/profile-update", {
        name,
        email,
        password,
        phone,
        address,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        setAuth((prevAuth) => ({
          ...prevAuth,
          user: data.updateUser,
        }));
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updateUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile updated successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(`Something went wrong: ${error}`);
    } finally {
      setBtnDisable(false);
    }
  };

  return (
    <Layout title={"Your Profile"}>
      <div className="container d-flex justify-content-center mt-4 p-0  rounded-2 overflow-hidden ">
        <div className="col-lg-7 col-12 text-white bg-dark  p-4 p-md-5">
          <h3 className="mb-3 fs-2 heading">Update Profile</h3>
          <form onSubmit={updateProfile} className="">
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
                    disabled
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
                      {btnDisable ? "Updating..." : "Update Profile"}
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

export default Profile;
