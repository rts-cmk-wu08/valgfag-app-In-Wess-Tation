import { Link } from "react-router-dom";


const Header = () => {
    return ( 
        <header>
            <h1>This is the header</h1>

            <nav>
                <Link to={"/"}>Home</Link>
                <Link to={"/game"}>Game</Link>
            </nav>
        </header>
     );
}
 
export default Header;