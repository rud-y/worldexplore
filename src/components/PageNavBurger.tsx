import PageNavBurgerList from "./PageNavBurgerList";
import Button from "./Button";
import { useState } from "react";

function PageNavBurger() {
 const [open, setOpen] = useState(false);
  const burger = <img src="burger-menu.svg" alt="Burger menu navigation" />;
  const openMenu = <div>X</div>

  function handleBurgerClick() {
   setOpen(open => !open)
  }

  return (
   <>
    <Button type={Button} onClick={handleBurgerClick}>{open ? openMenu : burger}</Button>
    {open && 
    (<PageNavBurgerList />)
    }
   </>
  )
}

export default PageNavBurger;
