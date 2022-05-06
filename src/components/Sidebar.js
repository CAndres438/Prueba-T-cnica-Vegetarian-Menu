import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import { ButtonStyled, MarkPrice } from "../styled/styledComponents";
import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { editAsync } from "../redux/actions/actionTopping";
import { formatoCOP } from "../utils/Moneda";

const ToppingSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  beneficio: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  precio: Yup.number(),
});

const Sidebar = ({ modalSidebar }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [clicked, setClicked] = useState(true);

  const handleClicked = () => {
    setClicked(false);
  };

  const handleSubmit = (values) => {
    const nombre = modalSidebar.nombre;
    dispatch(editAsync(nombre, values));
  };

  return (
    <div className={clicked ? classes.sidebar : classes.none}>
      <div className={classes.sidebar__container}>
        <div className={classes.sidebar__modal}>
          
            <CancelPresentationIcon  className={classes.sidebar__close} onClick={handleClicked}/>
      

          <h2>{modalSidebar.nombre}</h2>
          <img
            className={classes.sidebar__image}
            src={modalSidebar.image}
            alt="Modal Edit"
          />
          <h2>{modalSidebar.beneficio}</h2>
          <MarkPrice>{formatoCOP.format(modalSidebar.precio)}</MarkPrice>

          <Formik
            initialValues={{
              nombre: modalSidebar.nombre,
              beneficio: modalSidebar.categoria,
              precio: modalSidebar.precio,
            }}
            validationSchema={ToppingSchema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({ errors, touched }) => (
              <Form className={classes.sidebar__form} style={{}}>
                <h1>Editar</h1>
                <Field
                  className={classes.sidebar__input}
                  placeholder="Nombre del Ingrediente"
                  name="nombre"
                />
                {errors.nombre && touched.nombre ? (
                  <div>{errors.nombre}</div>
                ) : null}

                <Field
                  className={classes.sidebar__input}
                  placeholder="Beneficios"
                  name="beneficio"
                />
                {errors.beneficio && touched.beneficio ? (
                  <div>{errors.beneficio}</div>
                ) : null}
                <Field
                  className={classes.sidebar__input}
                  placeholder="Precio"
                  name="precio"
                />
                {errors.precio && touched.precio ? (
                  <div>{errors.precio}</div>
                ) : null}

                <ButtonStyled type="submit">Editar</ButtonStyled>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  sidebar: {
    position: "absolute",
    padding: theme.spacing(2),
    backgroundColor: "#CCC",
    top: "800px",
    bottom: "0",
    right: "0",
    left: "0",
    zIndex: "1000",
    opacity: ".9",
    transition: "3s all ease",
  },
  sidebar__container: {
    position: "relative",
    width: "80%",
    height: "100%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  sidebar__modal: {
    position: "relative",
    width: "100%",
    backgroundColor: "#FFF",
    padding: theme.spacing(4),
  },
  none: {
    display: "none",
    pointerEvents: "none",
  },
  sidebar__image: {
    widht: "200px",
    height: "200px",
  },
  sidebar__form: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
  },
  sidebar__input: {
    padding: ".4rem .6rem",
  },
  sidebar__close: {
    position: "absolute",
    top: "0%",
    right: "0px",
    fontSize: "4rem",
  },
}));

export default Sidebar;
