import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { typesToppingsN } from "../types/types";

export const editAsync = (nombre, topping) => {
  console.log(nombre, topping);
  return async (dispatch) => {
    const collectionTraer = collection(db, "toppingsDB");
    const q = query(collectionTraer, where("nombre", "==", nombre));
    const traerDatosQ = await getDocs(q);
    let id;
    traerDatosQ.forEach(async (docu) => {
      id = docu.id;
    });
    const documRef = doc(db, "toppingsDB", id);
    await updateDoc(documRef, topping)
      .then((resp) => {
        dispatch(listAsync());
      })
      .catch((err) => console.log(err));
    dispatch(editSync(topping));
  };
};

export const editSync = (topping) => {
  return {
    type: typesToppingsN.editSync,
    payload: topping,
  };
};

//-------------------delete--------------------//
export const deleteAsync = (nombre) => {
  return async (dispatch) => {
    const collectionTraer = collection(db, "toppingsDB");
    const q = query(collectionTraer, where("nombre", "==", nombre));
    const traerDatosQ = await getDocs(q);
    traerDatosQ.forEach((docum) => {
      deleteDoc(doc(db, "toppingsDB", docum.id));
    });
    dispatch(deleteSync(nombre));
    dispatch(listAsync());
  };
};

export const deleteSync = (topping) => {
  return {
    type: typesToppingsN.delete,
    payload: topping,
  };
};

//---------------listar----------------//
export const listAsync = () => {
  return async (dispatch) => {
    const collectionTraer = await getDocs(collection(db, "toppingsDB"));
    const toppings = [];
    collectionTraer.forEach((doc) => {
      toppings.push({
        ...doc.data(),
      });
    });
    dispatch(listSync(toppings));
  };
};

export const listSync = (toppings) => {
  return {
    type: typesToppingsN.list,
    payload: toppings,
  };
};

//-------------agregar---------------//
export const addAsync = (topping) => {
  return (dispatch) => {
    addDoc(collection(db, "toppingsDB"), topping)
      .then((resp) => {
        dispatch(addSync(topping));
      })
      .catch((error) => {
        console.warn(error);
      });
  };
};

export const addSync = (topping) => {
  return {
    type: typesToppingsN.add,
    payload: topping,
  };
};

// ------- Agregar desde formik ------- //
export const addFormikAsync = (toppingN) => {
  return (dispatch) => {
    addDoc(collection(db, "toppingsDB"), toppingN)
      .then((resp) => {
        dispatch(addFormikSync(toppingN));
      })
      .catch((error) => {
        console.warn(error);
      });
  };
};

export const addFormikSync = (toppingN) => {
  return {
    type: typesToppingsN.addFormik,
    payload: toppingN,
  };
};
