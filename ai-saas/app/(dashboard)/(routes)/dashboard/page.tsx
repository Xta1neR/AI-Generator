"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Code2Icon, ImageIcon, MessageSquare, Music4Icon, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
    {
        label: "Conversation",
        icon: MessageSquare,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/conversation"
    },
    {
        label: "Music Generation",
        icon: Music4Icon,
        href: "/music",
        color: "text-violet-500",
        bgColor: "bg-violet-500/10"
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-700",
        bgColor: "bg-pink-700/10"
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-500",
        bgColor: "bg-orange-500/10"
    },
    {
        label: "Code Generation",
        icon: Code2Icon,
        href: "/code",
        color: "text-green-700",
        bgColor: "bg-green-700/10"
    },
]

const Dashboard = () => {
    const Router = useRouter();
    return (
        <div className="mb-8 space-y-4">
            <h2 className="text-xl md:text-4xl font-bold text-center">
                Explore the power of XtainerAI
            </h2>     
            <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
                Chat with the smartest content generator AI - Experience the power of AI.
            </p>   
            <div className="px-4 md:px-20 lg:px-32 space-y-4">
                {
                    tools.map((tool) => (
                        <Card 
                            onClick={() => Router.push(tool.href)}
                            key={tool.href}
                            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
                        >
                            <div className="flex items-center gap-x-4">
                                <div className={cn("p-3 w-fit rounded-md", tool.bgColor)}>
                                    <tool.icon className={cn("w-8 h-8", tool.color)} />
                                </div>
                                <div className="font-semibold">
                                    {tool.label}
                                </div>
                                <ArrowRight className="h-5 w-5"/>
                            </div>
                        </Card>
                    ))
                }
            </div>    
        </div>
    )
}

export default Dashboard;