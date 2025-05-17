import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className='text-primary-color text-4xl text-center py-8 mb-5 border-[3px] border-dark-blue-color rounded'>
            <Link to={"/"}>
                Quiz App
            </Link>
        </header>
    )
}

export default Header;