import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Error,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "") return;
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      alert("Email Sent! Login with new Password!");
      navigate("/login");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Wrapper>
      <Title>Change Password</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          type="submit"
          value={isLoading ? "Loading..." : "Send Password Reset Email"}
        />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Don't have an account?
        <Link to="/create-account">Create One &rarr;</Link>
      </Switcher>
      <Switcher>
        Don't want to change password?
        <Link to="/login">Log In &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}
