import { useEffect } from "react";




export function Popup({ header, footer, children, onSetPopup }) {

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") {
                onSetPopup();
            }
        };

        document.body.addEventListener("keydown", handleEsc);
        return () => document.body.removeEventListener("keydown", handleEsc);
    }, [onSetPopup]);

    return ( 
        <div className="popup-container">

        <div className="popup">

            <header className="">{header}</header>
         <main className="">{children}</main>
         <footer className="">{footer}</footer>
        </div>
        </div>
    )
}