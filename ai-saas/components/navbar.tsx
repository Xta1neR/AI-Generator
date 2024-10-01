"use client";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import MobileSidebar from "./mobile-sidebar";

const Navbar = () => {
    const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const toggleMobileSidebar = () => {
        setMobileSidebarOpen(!isMobileSidebarOpen);
    };

    return (
        <>
            <div className="flex items-center p-4 ">
                <Button 
                    variant={"ghost"} 
                    size={"icon"} 
                    className="md:hidden text-gray"
                    onClick={toggleMobileSidebar} 
                >
                    <Menu />
                </Button>
                <div className="flex w-full justify-end">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
            <MobileSidebar isOpen={isMobileSidebarOpen} onClose={toggleMobileSidebar} />
        </>
    );
};

export default Navbar;
