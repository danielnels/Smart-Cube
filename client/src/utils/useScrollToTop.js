import { useEffect } from "react";

//custom hooks in react must start with 'use' or it wont work
const useScrollToTop = (url) => {
    useEffect(() => {
        //scroll to the top of the page
        window.scrollTo(0, 0);
    });
};

export default useScrollToTop;
