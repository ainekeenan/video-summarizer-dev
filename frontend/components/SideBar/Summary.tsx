import React from "react";
import { Button } from "@nextui-org/react";

interface SummaryProps {
    title: string;
}

export const Summary: React.FC<SummaryProps> = (props) => {
    return (
        <div className="mt-[10%]">
            <Button
                className="w-full rounded-[5px] text-sm text-white"
                variant="bordered"
            >
                {props.title}
            </Button>
        </div>
    );
};
