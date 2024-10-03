import logo from "./Images/logo_white.png";

export const Footer = () => {
    return(
        <footer className="bg-[#00BB8E] pt-12 pb-5">
            <div className="flex align-text-bottom justify-between px-7">
                <div><img className="h-4 object-contain" src={logo.src} alt="Logo" /></div>
                <div className="text-[#EEEEEE]">Created by CodeLab</div>
            </div>
        </footer>
    );
};

