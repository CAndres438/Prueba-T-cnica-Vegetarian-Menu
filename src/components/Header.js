import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutAsync } from "../redux/actions/actionLogin";
import { makeStyles, Typography } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";


const Header = () => {
  const classes = useStyles();

  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth().currentUser;
    setUser(auth);
  }, []);

  const handleLogout = () => {
    dispatch(logoutAsync());

    navigate("/login");
  };

  return (
    <div className={classes.header}>
      <div className={classes.header__container}>
        <Typography variant="h4">Vegetarian Menu</Typography>
        <div className={classes.header__links}>
          <Link className={classes.header__link} to="/">
            Inicio
          </Link>
          <Link className={classes.header__link} to="/newToppings">
            New Topping
          </Link>
        </div>
        <div className={classes.header__socialIcons}>
          {/* /login */}
          <Link className={classes.header__link} to="/login">
            <div onClick={handleLogout} className={classes.header__option}>
              <span className={classes.header__optionLineOne}>
                Hola,{" "}
                {!user
                  ? "Guest"
                  : !user.displayName
                  ? user.email
                  : user.displayName}
              </span>

              {user ? "Sign Out" : "Sign In"}
              <PersonIcon />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  header: {
    width: "100%",
    zIndex: "10000",
    padding: "1rem 0",
    backgroundColor: "#3ADE4E",
    color: "white",
    borderBottom: "1px solid",
  },
  header__container: {
    width: "95%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header__links: {
    display: "flex",
    gap: theme.spacing(2),
  },
  header__socialIcons: {
    display: "flex",
    gap: theme.spacing(2),
  },
  header__link: {
    color: "white",
    textDecoration: "none",
    zIndex: "100000",
  },
  header__option: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },
  header__optionLineOne: {
    marginRight: theme.spacing(2),
  },
  header__optionBasket: {
    display: "flex",
    alignItems: "center",
    color: "green",
  },
  header__basketCount: {
    color: "green",
  },
}));

export default Header;
