"use client";
import { Code2Icon, ImageIcon, InfinityIcon, LayoutDashboard, MessageSquare, MusicIcon, SettingsIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({
    weight: "600", subsets: ["latin"]
});

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500" 
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-violet-500" 
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-700" 
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-500" 
    },
    {
        label: "Music Generation",
        icon: MusicIcon,
        href: "/music",
        color: "text-emerald-500" 
    },
    {
        label: "Code Generation",
        icon: Code2Icon,
        href: "/code",
        color: "text-green-700" 
    },
    {
        label: "Settings",
        icon: SettingsIcon,
        href: "/settings",
        color: "text-sky-500" 
    },
]

const Sidebar = () => {
    const pathaname = usePathname();
    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <InfinityIcon className=" w-8 h-8 text-yellow-200"/>
                    </div>
                    <h1 className={cn("text-2xl font-bold", montserrat.className)}>XTA1NER</h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            href={route.href}
                            key={route.href}
                            className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                pathaname === route.href ? "bg-white/10" : "text-zinc-400"
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                <span className="text-sm font-medium">{route.label}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar;