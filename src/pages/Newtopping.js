import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addFormikAsync, listAsync } from "../redux/actions/actionTopping";
import { makeStyles } from "@material-ui/core";
import { FileUp } from "../helper/FileUp";
import { useNavigate } from "react-router-dom";
import { ButtonStyled } from "../styled/styledComponents";
import ToppingN from "../components/ToppingN";

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

const Newtopping = () => {
  const classes = useStyles();
  const [fileImage, setFileImage] = useState("");

  const { toppingsN } = useSelector((store) => store.toppingsN);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    //el FileUp es la configuracion con cloudinary y le asigno la respuesta de cloudi a la foto
    FileUp(file)
      .then((resp) => {
        console.log(resp);
        setFileImage(resp);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const handleSubmit = (values) => {
    values.image = fileImage;
    dispatch(addFormikAsync(values));
    navigate('/')
    alert('Tu producto ahora se encuentra en NewTopping 💚')
  };

  useEffect(() => {
    dispatch(listAsync());
  }, []);

  return (
    <div className={classes.order}>
      <div className={classes.order__container}>
        <img
          className={classes.order__image}
          src="https://cdn.pixabay.com/photo/2019/12/15/15/10/apple-4697330_960_720.jpg"
          alt="Register Banner"
        />
        <Formik
          initialValues={{
            nombre: "",
            beneficio: "",
            image: "",
            precio: 0,
          }}
          validationSchema={ToppingSchema}
          onSubmit={(values) => {
            // same shape as initial values
            console.log(values);
            handleSubmit(values);
          }}
        >
          {({ errors, touched, handleSubmit, handleChange, handleReset }) => (
            <Form className={classes.order__form} style={{}}>
              <h1>Registra los ingredientes que quisieras</h1>
              <div className={classes.order__box}>
                <label>Nombre del ingrediente que sugieres</label>
                <Field placeholder="Nombre del Ingrediente" name="nombre" />
                {errors.nombre && touched.nombre ? (
                  <div>{errors.nombre}</div>
                ) : null}
              </div>

              <div className={classes.order__box}>
                <label>Beneficios para el cuerpo</label>
                <Field placeholder="Beneficios" name="beneficio" />
                {errors.beneficio && touched.beneficio ? (
                  <div>{errors.beneficio}</div>
                ) : null}
              </div>
              <div className={classes.order__box}>
                <label>Precio en el mercado</label>
                <Field placeholder="Precio en el mercado" name="precio" />
                {errors.precio && touched.precio ? (
                  <div>{errors.precio}</div>
                ) : null}
              </div>
              <Field
                onChange={handleFileChange}
                name="image__front"
                type="file"
              />
              {/* {errors.file && touched.file ? <div>{errors.file}</div> : null} */}

              <ButtonStyled type="submit">Submit</ButtonStyled>
            </Form>
          )}
        </Formik>
      </div>

      {
        <div className={classes.toppingsN__container}>
          {toppingsN.map((item, index) => (
            <ToppingN key={index} item={item} />
          ))}
        </div>
      }
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  order: {
    width: "100%",
    height: "100%",
  },
  toppingsN__container: {
    width: "85%",
    margin: "4rem auto",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "3",
    gap: theme.spacing(4),
  },
  order__container: {
    width: "90%",
    margin: "2rem auto",
    display: "flex",
    justifyContent: "center",
  },
  order__image: {
    width: "40%",
    height: "500px",
    objectFit: "cover",
  },
  order__form: {
    width: "100%",
    color: "white",
    padding: theme.spacing(4),
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    background: "#3ADE4E",
    gap: theme.spacing(1),
    borderRadius: "5px",
    "& input": {
      width: "100%",
      padding: theme.spacing(0.8),
      borderRadius: "5px",
    },
  },
  order__box: {
    width: "100%",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1.2),
  },
}));

export default Newtopping;
