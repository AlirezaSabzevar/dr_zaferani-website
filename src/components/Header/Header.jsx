import "./Header.css";
import { MenuIcon } from "../../icons";
import logo from "../../assets/images/logo.png";
import heroData from "../../data/heroData";
import { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";
import navigation from "../../data/navigation";


const Header = () => {

  const [menuOpen,setMenuOpen]=useState(false);


  const openMenu=()=>{

    setMenuOpen(true);

  }

  const closeMenu=()=>{

    setMenuOpen(false);

  }


  useEffect(()=>{

    if(menuOpen){

        document.body.style.overflow="hidden";

    }else{

        document.body.style.overflow="";

    }

    return ()=>{

        document.body.style.overflow="";

    }

  },[menuOpen]);


  return (
    <>
    <header className="header">

      <div className="header__container">

        <button
          type="button"
          className="header__menuButton"
          onClick={openMenu}
          aria-label="باز کردن منو"
        >
          <MenuIcon />
        </button>

        <div className="header__text">

          <h2>{heroData.name}</h2>

          <p>{heroData.specialty}</p>

        </div>


          <nav className="header__nav">
            {
              navigation.map((item)=>(
                <a href={item.href} key={item.id} className="header__link">
                  {item.title}


                  {/* {
                    item.badge && 
                      <span className="header__badge">
                        {item.badge}
                      </span>
                  } */}
                </a>
              ))
            }
          </nav>


        <div className="header__logo">

          <img src={logo} alt={heroData.name}/>

        </div>

      </div>

    </header>


    {
      menuOpen &&
      <div className="mobileMenu__overlay" onClick={closeMenu}/>
    }

    <MobileMenu isOpen={menuOpen} onClose={closeMenu}/>

    </>
  );
};

export default Header;