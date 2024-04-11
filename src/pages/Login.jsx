import styles from "./Login.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";
import Button from "../components/Button";
export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuth, login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleLoginSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    setIsSubmitting(true);
    login(email, password);
  }
  useEffect(
    function () {
      if (isAuth) navigate("/app", { replace: true });
    },
    [isAuth, navigate]
  );
  return (
    <main className={styles.login}>
      <form className={styles.form} onSubmit={handleLoginSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            placeholder="enter email"
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            placeholder="enter password"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button type="primary">login</Button>
          {isSubmitting && !isAuth && (
            <p
              style={{
                color: "red",
              }}
            >
              email or password is incorrect
            </p>
          )}
        </div>
      </form>
    </main>
  );
}
