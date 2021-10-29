import { Link } from "react-router-dom"

export const Nav = () => {
    return (
        <div className="bg-blue-200 flex justify-between items-center p-4">
            <div className="px-4">
                <Link to="/" >Logo</Link>
            </div>
            <div className="flex justify-around items-center">
                <div className="px-4">
                    <Link to="register" >Register</Link>
                </div>
                <div className="px-4">
                    <Link to="login" >Login</Link>
                </div>
            </div>
        </div>
    )
}