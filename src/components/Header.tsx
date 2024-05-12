import { Heading } from "@yamada-ui/react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <Heading>Yukis Army knife</Heading>
      </Link>
    </header>
  );
};

export default Header;
