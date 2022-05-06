import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useForm } from "../hooks/useForm";

import { registerAsync } from "../redux/actions/actionRegister";
//Material UI
import { makeStyles } from "@material-ui/core";
import {
  ButtonFacebook1,
  ButtonGoogle1,
  LinkRedirect,
} from "../styled/styledComponents";
import { loginFacebook, loginGoogle } from "../redux/actions/actionLogin";
import googleIcon from "../assets/google.png";
import facebookIcon from "../assets/facebook.png";

const Register = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, handleInputChange, reset] = useForm({
    nombre: '',
    email: '',
    pass1: '',
    pass2: ''
  });

  const { nombre, email, pass1, pass2  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerAsync(email, pass1, nombre));
    reset();
    navigate("/");
  };

  const handleGoogle = () => {
    dispatch(loginGoogle());
    navigate("/");
  };

  const handleFacebook = () => {
    dispatch(loginFacebook());
    navigate("/");
  };

  return (
    <div className={classes.root}>
      <div className={classes.root__sidebar}>
        <img
          className={classes.root__sidebarImage}
          src="https://cdn.pixabay.com/photo/2019/12/15/15/10/apple-4697330_960_720.jpg"
          alt="sidebar auth"
        />
      </div>

      <div className={classes.login__container}>
        <h1>Regístrate Gratis</h1>

        <form onSubmit={handleSubmit} className={classes.form}>
          <h5>E-Mail</h5>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Ingresa tu Email"
            onChange={handleInputChange}
          />

          <h5>Contraseña</h5>
          <input
            type="password"
            name="pass1"
            value={pass1}
            placeholder="Crea una Contraseña"
            onChange={handleInputChange}
          />

          <h5>Repite la Contraseña</h5>
          <input
            type="password"
            name="pass2"
            value={pass2}
            placeholder="Repite tu Contraseña"
            onChange={handleInputChange}
          />

          <button type="submit" className={classes.login__signUpButton}>
            Registro y Logueo
          </button>

          <ButtonGoogle1 type="button" onClick={handleGoogle}>
            <img
              width="20px"
              height="20px"
              src={googleIcon}
              alt="Google Icon"
            />
            SignUp with Google
          </ButtonGoogle1>

          <ButtonFacebook1 type="button" onClick={handleFacebook}>
            <img
              width="20px"
              height="20px"
              src={facebookIcon}
              alt="Facebook Icon"
            />
            SignUp with Facebook
          </ButtonFacebook1>
        </form>
        <h3>Vegetarian Menu</h3>
        <LinkRedirect to="/login">Inicio de Sesión</LinkRedirect>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    height: "100vh",
    padding: theme.spacing(4),
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr",
  },
  root__sidebar: {
    width: "100%",
    height: "100%",
  },
  root__sidebarImage: {
    width: "100%",
    height: "auto",
  },
  login__logo: {
    marginTop: "20px",
    marginBottom: "20px",
    objectFit: "contain",
    width: "100px",
    marginRight: "auto",
    marginLeft: "auto",
  },
  login__container: {
    width: "360px",
    height: "100%",
    color: "#FFF",
    backgroundColor: "#3ADE4E",
    background:
      "#3ADE4E",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    marginLeft: "0px",
    marginRight: "10px",
    borderRadius: "5px",
    "& h1": {
      fontWeight: "500",
      marginBottom: "20px",
    },
    "& p": {
      marginTop: "15px",
      fontSize: "12px",
    },
  },

  form: {
    "& h5": {
      marginBottom: "5px",
    },
    "& input": {
      height: "30px",
      marginBottom: "10px",
      backgroundColor: "white",
      width: "100%",
      borderRadius: "5px",
      fontWeight: "600",
      paddingLeft: "5px",
    },
    "& select": {
      height: "25px",
      width: "100%",
      borderRadius: "5px",
      fontWeight: "600",
      paddingLeft: "5px",
    },
  },
  login__signUpButton: {
    background: "#04AF2B",
    borderRadius: "5px",
    color: "white",
    width: "100%",
    height: "30px",
    border: "1px solid",
    marginTop: "10px",
    borderColor: "white",
    cursor: "pointer",
    "&:hover": {
      opacity: ".9",
    },
  },
}));

export default Register;
