import PageNavBurgerList from "./PageNavBurgerList";
import Button from "./Button";
import { useState } from "react";
import styles from './PageNavBurger.module.css';

function PageNavBurger() {
 const [open, setOpen] = useState(false);

  function handleBurgerClick() {
   setOpen(open => !open)
  }

  return (
    <>
      <Button
        className={styles.btn}
        onClick={handleBurgerClick}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        {open ? "X" : <img src="burger-menu.svg" alt="Open navigation menu" />}
      </Button>
      {open && <PageNavBurgerList />}
    </>
  );
}

export default PageNavBurger;
