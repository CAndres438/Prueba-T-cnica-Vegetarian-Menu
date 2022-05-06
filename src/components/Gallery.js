import React, { useEffect, useState } from "react";
import { Box, makeStyles, Modal, Typography } from "@material-ui/core";
import {
  ButtonPrincipal1,
  GrayLightTypographyStyled,
  GrayTitleStyled,
  GrayTitleStyled1,
  MarkPrice1,
} from "../styled/styledComponents";
import { useDispatch, useSelector } from "react-redux";
import { listAsync } from "../redux/actions/actionProducts";
import { formatoCOP } from "../utils/Moneda";
import { url } from "../utils/url";

/***************Componente dde funcionalidad para posterior importación el Home***********************/

const Gallery = () => {
  /***************Estados Relacionados para las modificaciones en los pedidos***********************/
  const [cantidad, setCantidad] = useState(0);
  const [total, setTotal] = useState(0);
  const [carrito, setCarrito] = useState([]);
  const [reserva1, setreserva1] = useState([]);
  const [envio, setEnvio] = useState(0);

  /**Estilos basados en clases uso de Material, dispatch, selector de store products */

  const classes = useStyles();

  const dispatch = useDispatch();

  const { products } = useSelector(
    (store) => store.products
  ); /**Conexión con store para traer el arreglo de productos*/
  /*Esta petición es una acción que si se ejecuta mediante axios*/

  /******Eventos para Modal de simulación de Compra*/
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false)
  const handleOpen = () => {
    if (total === 0) {
      setOpen1(true)
    } else {
      setOpen(true); /*abre el modal*/
      setCantidad(0); /****Reinica la cantidad */
    }
  };
  const handleClose = () => {
    setOpen(false);
    setEnvio(0); /*Reinicia el valor del envio al hacer la supuesta compra*/
    setTotal(0);
  };

  const handleClose1 = () => {
      setOpen1(false)
  }

  /********Selección de los elementos y envío del estado referido por posiciones en valor númerico dado
   con el parámetro index*****************************************/

  const [checkedState, setCheckedState] = useState(new Array(7).fill(false));
  const handleOnChange = (product) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === product ? !item : item
    );

    setCheckedState(updatedCheckedState);
    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return sum + products[index].price;
        }
        return sum;
      },
      0
    );
    setTotal(totalPrice);
    setEnvio(
      totalPrice === 0 ? 0 : 7
    ); /***Uso de operador ternario para colocar valor al envio solo si hay ingredientes */
  };

  /****Petición ayncrona */

  const data = async () => {
    const resp = await fetch(url);
    const reserva =
      await resp.json(); /*Si bien se usa axios, se ejemplifica usando fetch, la ejecución de la función permite la actualización"*/
    setreserva1(reserva);
  };

  const handleCambiar = (topping, e) => {
    /****Entrada de valores númeriocs, cambios, representaciones, estructura para actualización*/
    const amount = Number(e.target.value);
    const precio = Number(topping.price);
    const totale = precio * amount;

    /***Productos del carrito o mejor parte de la compra (ingredientes en ingles Toppings)*/
    const Topping = {
      nombre: topping.product,
      precio: topping.price,
      amount,
      totale,
    };

    const existTopping = carrito.find((item) => item.nombre === Topping.nombre);

    if (existTopping) {
      const indice =
        carrito.indexOf(
          existTopping
        ); /**El metodo indexOf me ayuda a obtener el indice*/

      const Carrito = [...carrito];
      Carrito[indice] = Topping;
      setCarrito(Carrito);
    } else {
      setCarrito([...carrito, Topping]);
    }
  };

  /**Estados en totales, que se establecen a apartir de las cantidades y precios */
  const handleTotal = () => {
    let sumaTotal = 0;
    let sumaCantidad = 0;

    /**Recorrido de las entradas del carrito o lista de compras de ingredientes */

    carrito.forEach((control) => {
      const { amount } = control;
      const { totale } = control;

      sumaCantidad = sumaCantidad + amount;
      sumaTotal = sumaTotal + totale;

      setTotal(sumaTotal);
      setCantidad(sumaCantidad);

      if (sumaCantidad === 0) {
        setEnvio(0);
      } else {
        setEnvio(7);
      }
    });
  };

  /*** Hora de la renderización, se puede apreciar el dispatch (para la const products), los totales, y la reserva data*/
  useEffect(() => {
    handleTotal();
    dispatch(listAsync());
    data();
  }, [carrito]); /****Permite que haya una actualización constante */

  return (
    <div className={classes.cart}>
      <div className={classes.cart__container}>
        <div className={classes.cart__containerTitle}>
          <GrayTitleStyled>Risotto de setas (vegano)</GrayTitleStyled>
        </div>
      </div>
      <div className={classes.cart__container}>
        <div className={classes.cart__containerLabels}></div>

        {products.map((topping, index) => (
          <div key={topping.product} className={classes.checkoutProduct}>
            <input
              type="checkbox"
              className={classes.check}
              name="control"
              id={topping.product}
              checked={checkedState[index]}
              onChange={() => handleOnChange(index)}
              aria-label="option 1"
              value={topping.product}
            />

            <input
              className={classes.checkoutProduct__image}
              type="number"
              min="0"
              onChange={(e) => handleCambiar(topping, e)}
            />

            <div className={classes.checkoutProduct__info}>
              <p className={classes.checkoutProduct__title}>
                {topping.product}
                <br />
                {topping.brand}
                <br />
                {topping.quantity}
              </p>
              <p className={classes.checkoutProduct__price}>
                <MarkPrice1>{formatoCOP.format(topping.price)}</MarkPrice1>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className={classes.cart__containerTitle}>
        <GrayTitleStyled1>Items: {cantidad} </GrayTitleStyled1>
        <GrayTitleStyled1>
          Subtotal: {formatoCOP.format(total)}{" "}
        </GrayTitleStyled1>
        <GrayTitleStyled1>
          Gastos de Envio: {formatoCOP.format(envio)}{" "}
        </GrayTitleStyled1>
        <GrayTitleStyled1>
          Total: <MarkPrice1>{formatoCOP.format(total + envio)}</MarkPrice1>
        </GrayTitleStyled1>
        <GrayLightTypographyStyled>
          Los códigos de descuento, los costes de envío y los impuestos se
          añaden durante el pago.
        </GrayLightTypographyStyled>
        <div className={classes.ButtonPrincipal}>
          <ButtonPrincipal1 onClick={handleOpen}>
            Comprar Ingredientes: {formatoCOP.format(total + envio)}
          </ButtonPrincipal1>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Acabas de comprar con Vegetarian Menu
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Nosotros recibiremos de tu parte al entregarte los ingredientes la
            suma de:
            <br />
            {formatoCOP.format(total + envio)}
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            No has comprado con Vegetarian Menu
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Ve y pide alguito saludable 💚
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#04AF2B",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const useStyles = makeStyles((theme) => ({
  checkoutProduct: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid #5C5C5C",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  ButtonPrincipal: {
    textAlign: "center",
    alignItems: "center",
    marginLeft: "40%",
    marginTop: "50px",
  },
  checkoutProduct__info: {
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    paddingRight: theme.spacing(3),
    width: "50%",
    color: "black",
  },
  checkoutProduct__image: {
    objectFit: "contain",
    alignText: "center",
    paddingLeft: "3%",
    paddingTop: "0.5%",
    marginBottom: "20px",
    color: "#0DBDF0",
    fontSize: "60px",
    width: "100px",
    height: "100px",
    background: "white",
    borderColor: "#0DBDF0",
    borderRadius: "10px",
  },
  checkoutProduct__title: {
    display: "flex",
    alignItems: "center",
    fontSize: "17px",
    fontWeight: "700",
    height: "100%",
    gap: theme.spacing(2),
  },
  checkoutProduct__price: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(4),
  },
  check: {
    color: "green",
    background: "white",
    border: "none",
  },
  cart: {
    width: "100%",
    minHeight: "60vh",
    margin: "4rem 0",
  },
  cart__container: {
    width: "94%",
    margin: "0 auto",
  },
  cart__containerTitle: {
    paddingBottom: "4rem",
    textAlign: "center",
    color: "green",
  },
  cart__containerLabels: {
    width: "100%",
    borderBottom: "2px solid #5C5C5C",
    display: "flex",
    justifyContent: "space-between",
  },
  form__orderFlex: {
    display: "flex",
    justifyContent: "space-between",
    gap: theme.spacing(20),
  },
  cart__containerForm: {
    width: "100%",
  },
  cart__form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(4),
  },
  cart__formTextarea: {
    width: "100%",
    border: "none",
    outline: "none",
    borderRadius: "10px",
    borderBottom: "2px solid #333",
    resize: "vertical",
    minHeight: "60px",
    maxHeight: "200px",
  },
  cart__formContainerCheckbox: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    color: "white",
  },
  cart__order: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    border: "2px solid #EFEFEF",
    gap: theme.spacing(2),
  },
  cart__orderBox: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default Gallery;
