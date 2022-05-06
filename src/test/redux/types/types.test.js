import "@testing-library/jest-dom";
import {
  typesLogin,
  typesRegister,
  typesProductos,
  typesToppingsN,
} from "../../../redux/types/types";

describe("Verificar types", () => {
  // TypesLogin elementos necesarios para ejecución
  test("comparar objetos de Login", () => {
    expect(typesLogin).toEqual({
      login: "login",
      logout: "logout",
    });
  });

  // TypesRegister elementos necesarios para ejecución
  test("comparar objetos de Register", () => {
    expect(typesRegister).toEqual({
      register: "register",
    });
  });

  // TypesRegister elementos necesarios para ejecución
  test("comparar objetos de Productos", () => {
    expect(typesProductos).toEqual({
      list: "list",
    });
  });

  // TypesRegister elementos necesarios para ejecución
  test("comparar objetos de Toppings", () => {
    expect(typesToppingsN).toEqual({
      add: "add",
      list: "list",
      edit: "edit",
      delete: "delete",
      detail: "detail",
      search: "search",
      addFormik: "addFormik",
    });
  });
});
