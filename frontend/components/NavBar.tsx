import React from "react";

import Link from 'next/link';
import {
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
} from "@nextui-org/react";

import logo from "./Images/logo_white.svg";
import silhouette from "./Images/silhouette.svg";

interface NavBarProps {
    user: string;
    email: string;
    page: boolean;
}

export const NavBar: React.FC<NavBarProps> = ({ user, email, page }) => {
     // This is the circle. If the user is not logged in, the user name is "", use silloette. If the user is logged in, use the initals. 
    return (
        <header>
            <nav className="sticky top-0 flex items-center justify-between bg-[#17132A] p-5 shadow-lg">
                <div>
                    <img className="h-5 object-contain" src={logo.src} />
                </div>
                {page && (
                    <div className="space-x-10">
                        <Dropdown>
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    as="button"
                                    className="transition-transform"
                                    name={user}
                                    size="md"
                                    src={silhouette.src}
                                />
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Profile Actions"
                                variant="flat"
                            >
                                <DropdownItem key="profile" className="h-15 gap-2">
                                    <p className="font-semibold">Signed in as</p>
                                    <p className="font-semibold">{email}</p>
                                </DropdownItem>
                                <DropdownItem key="settings">
                                    My Settings
                                </DropdownItem>
                                <DropdownItem key="clear">Clear Chats</DropdownItem>
                                <DropdownItem key="logout" color="danger">
                                    <Link href="../login">
                                        Log Out</Link>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                )}
            </nav>
        </header>
    );
};