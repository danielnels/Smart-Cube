import { Link, useHistory } from "react-router-dom";
const Error = (params) => {
    //get styling from parent component via params
    const bgColor = params.bgColor;
    //use react router history
    const history = useHistory();
    //get data passed via history on another component
    const errorData = history.location.state?.data;
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
                            <h1>Error</h1>
                            <p>{errorData?.message}</p>
                            <p>
                                <Link to="/" className="link">
                                    Click here to return home.
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Error;
