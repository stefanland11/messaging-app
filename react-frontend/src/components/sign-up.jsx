import { useState } from "react";

function SignUp({ sendUserToParent, toggleSignUp }) {
  const [signUp, setSignUp] = useState({
    username: "",
    password: "",
    confirmPass: "",
  });
  const [err, setError] = useState();

  const handleSubmit = async () => {
    event.preventDefault();
    const username = signUp.username;
    const password = signUp.password;
    const confirmPass = signUp.confirmPass;

    if (password !== confirmPass) {
      setError("Passwords must match");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/sign-up", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid sign up.");
      }

      const loginResponse = await fetch("http://localhost:3000/log-in", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!loginResponse.ok) {
        throw new Error("Invalid login");
      }

      const data = await loginResponse.json();
      const { token } = data;

      localStorage.setItem("token", token);
      toggleSignUp();
      sendUserToParent();
      
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setSignUp((values) => ({ ...values, [name]: value }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={signUp.username}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={signUp.password}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPass"
          value={signUp.confirmPass}
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={toggleSignUp}>Cancel</button>
      {err && <div>{err}</div>}
    </>
  );
}

export default SignUp;
