import React, { useState } from 'react'
import { ButtonPrincipal, MarkPrice } from '../styled/styledComponents';

//Material UI
import { makeStyles, Typography } from '@material-ui/core';
import { formatoCOP } from '../utils/Moneda';
import Sidebar from './Sidebar';
import { deleteAsync } from '../redux/actions/actionTopping';
import { useDispatch } from 'react-redux';
//  

const ToppingN = ({item}) => {

  const classes = useStyles();

  const dispatch = useDispatch()

  const handleDelete=(nombre)=>{
    dispatch(deleteAsync(nombre))
    alert('tu sugerencia será saludablemente eliminada 💚')
}

  const [showSidebar, setShowSidebar] = useState([]);
  const [modal, setModal] = useState(false);

  const editarModal = (productItem) => {
    alert("Presiona Nuevamente si aun no te aparece después de aceptar 💚")
    
    if(!modal) {
      setModal(true);
      setShowSidebar(productItem);
    } else {
      setModal(false);
      setShowSidebar([]);
    }

  }

  return (
    <div className={classes.product}>
        
        <img  className={classes.product__image} src={item.image} alt="editar"/>
        <div className={classes.product__content}>
        <Typography variant='body' className={classes.product__title}>{item.nombre}</Typography><br/>
        <Typography variant='body' className={classes.product__title1}>{item.beneficio}</Typography>
        <MarkPrice>{formatoCOP.format(item.precio)}</MarkPrice>
        <div className={classes.buttons}>
        <ButtonPrincipal onClick={() => editarModal(item)} >Editar ...</ButtonPrincipal>
        </div>
        <div className={classes.buttons}>
        <ButtonPrincipal onClick={()=>handleDelete(item.nombre)}>Eliminar</ButtonPrincipal>
        </div>
        </div>

        {
          modal === true ? <Sidebar modalSidebar={showSidebar}  modalBoolean={modal}/> : ''
        }
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  product: {
    textAlign: 'center',
    position: 'flex',
    width:'100%',
    height: '520px',
    cursor: 'pointer',
    borderRadius: '5px',
    padding: theme.spacing(1),
    background:'#3ADE4E',
    '&:hover': {
      boxShadow: ' 6px 6px 22px #b1b1b1, -6px -6px 22px #ffffff;'

    }
  },
  buttons:{
    float:'left',
    position:'relative',
    marginTop: '30px',
    marginLeft: '50px'
  },
  product__image: {
    width: '100%',
    height: '240px',
    borderRadius: '5px',
    objectFit: 'content'
  },
  product__content: {
    padding: theme.spacing(1.2),
    height: '100px'
  }
}))

export default ToppingN