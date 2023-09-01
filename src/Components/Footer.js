import { Link } from "react-router-dom";
import "../Pages/style.css"
 

const Footer = () => {

  return (
    <footer>
        <nav>
            <Link className="Links" to={"/"}>Home</Link>
            <Link className="Links" to={"/Search"}>Search</Link>
        </nav>
    </footer>
  );
};

export default Footer;