import { Link } from "react-router-dom";
const NotFound = (params) => {
    //get bgColor from parent component
    const bgColor = params.bgColor;
    return (
        <>
            <div className="viewport">
                <div
                    className="image image-overlay image-blur"
                    style={{ backgroundColor: bgColor }}
                ></div>
                <div className="container">
                    <div className="row justify-content-center align-items-center vh-100">
                        <div className="col-md-6 col-lg-4 text-white text-center">
                            <h1 className="error-text">404</h1>
                            <p>
                                The page you were looking for wasn't found.
                                <Link to="/" className="link">
                                    Click Here to Return Home
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotFound;
