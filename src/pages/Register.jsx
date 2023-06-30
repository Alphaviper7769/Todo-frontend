import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context, server } from "../main";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated,setIsAuthenticated} = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(`${server}/users/new`);

    try {
      const { data } = await axios.post(
        `${server}/users/new`,
        { name, email, password },
        {
          withCredentials: true,
        }
      );
      console.log("Done")
      toast.success(data.message);
      isAuthenticated(true);
    } catch (error) {
      toast.error("Some error");
      console.log(error)
      setIsAuthenticated(false);
    }
  };

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
          />

          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />

          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />

          <button type="submit">Sign Up</button>
          <h4>Or</h4>
          <Link to="/login">Log In</Link>
        </form>
      </section>
    </div>
  );
};

export default Register;
