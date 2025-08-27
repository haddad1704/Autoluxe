import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../redux/authActionCreators";
import Spinner from "../Loading/Loading";
import "./Auth.css"; 

const Auth = ({ notify }) => {
  const [mode, setMode] = useState("Login");
  const [showPassword, setShowPassword] = useState(true);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    user_type: "client",
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const authLoading = useSelector((state) => state.authLoading);

  const switchModeHandler = () => {
    setMode((prevMode) => (prevMode === "Inscription" ? "Login" : "Inscription"));
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!formValues.email) {
      errors.email = "Requis";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.email)
    ) {
      errors.email = "Adresse e-mail invalide";
    }
    if (!formValues.password) {
      errors.password = "Requis";
    } else if (formValues.password.length < 4) {
      errors.password = "Doit comporter au moins 4 caractères";
    }
    if (mode === "Inscription") {
      if (!formValues.passwordConfirm) {
        errors.passwordConfirm = "Requis";
      } else if (formValues.password !== formValues.passwordConfirm) {
        errors.passwordConfirm = "Les mots de passe ne correspondent pas";
      }
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      dispatch(
        auth(
          formValues.email,
          formValues.password,
          formValues.passwordConfirm,
          formValues.user_type,
          mode
        )
      );
    }
  };

  return (
    <div className="auth-container">
      {authLoading ? (
        <Spinner />
      ) : (
        <div className="auth-form">
          <div className="auth-switch">
            <button
              className="auth-switch-btn"
              onClick={switchModeHandler}
            >
              Passer à {mode === "Inscription" ? "Connexion" : "Inscription"}
            </button>
          </div>
          <form onSubmit={handleSubmit} className="auth-form-inner">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Entrez votre e-mail"
                className="form-control"
                value={formValues.email}
                onChange={handleChange}
              />
              <span className="error">{errors.email}</span>
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type={showPassword ? "password" : "text"}
                name="password"
                placeholder="Mot de passe"
                className="form-control"
                value={formValues.password}
                onChange={handleChange}
              />
              <span className="error">{errors.password}</span>
              <div className="show-password">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onClick={handleShowPassword}
                  checked={!showPassword}
                />
                <label>Afficher le mot de passe</label>
              </div>
            </div>
            {mode === "Inscription" && (
              <div>
                <div className="form-group">
                  <label htmlFor="passwordConfirm">Confirmer le mot de passe</label>
                  <input
                    type={showPassword ? "password" : "text"}
                    name="passwordConfirm"
                    placeholder="Confirmer le mot de passe"
                    className="form-control"
                    value={formValues.passwordConfirm}
                    onChange={handleChange}
                  />
                  <span className="error">{errors.passwordConfirm}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="user_type">Type d'utilisateur</label>
                  <select
                    name="user_type"
                    className="form-select"
                    value={formValues.user_type}
                    onChange={handleChange}
                  >
                    <option value="client">Client</option>
                    <option value="car_owner">Propriétaire</option>
                  </select>
                </div>
              </div>
            )}
            <button type="submit" className="btn btn-primary">
              {mode === "Inscription" ? "Inscription" : "Connexion"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Auth;