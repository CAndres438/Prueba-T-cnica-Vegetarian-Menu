// Material UI
import { makeStyles } from '@material-ui/core';




const Navbar = () => {
  const classes = useStyles();

  

  return (
    <div className={classes.navbar}>
      <div className={classes.navbar__container}>
        <div className={classes.header__links}>
          
        </div>
        
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  navbar: {
    width: "100%",
    padding: ".8rem 0",
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "#3ADE4E",
   
  },
  navbar__container: {
    width: "98%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: theme.spacing(2),
  },
  header__link: {
    color: "#FFF",
    textDecoration: "none",
  },
  header__links: {
    display: "flex",
    gap: theme.spacing(2),
    zIndex: "100000",
  },
  header__search: {
    width: "100%",
    display: "flex",
    flex: ".4",
    alignItems: "center",
  },
  header__searchInput: {
    height: "12px",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    width: "100%",
    paddingLeft: "25px",
    color: 'black',
    fontWeight: '600'

  },
  header__searchIcon: {
    padding: "5px",
    height: "18px !important",
    backgroundColor: "#FFF",
    borderRadius: "5px",
    position: "absolute"
  },
}));

export default Navbar;