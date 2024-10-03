"use client";
import React from "react";
import { Card, CardBody, Divider, Avatar, Button } from "@nextui-org/react";

export const UserCard = () => {
    return (
        <Card className="mt-[40px] rounded-[15px] bg-[#17132A] text-white">
            <CardBody>
                <div className="flex space-x-4 px-4 py-3">
                    <div className="space-y-2">
                        <h1 className="text-lg">Hello, User!</h1>
                        <div className="flex space-x-2">
                            <Button
                                color="success"
                                className="text-md rounded-[5px] bg-[#00BB8E] text-white"
                                size="sm"
                            >
                                Logout
                            </Button>
                            <div>
                                <Button
                                    isIconOnly
                                    color="success"
                                    className="rounded-[5px] bg-[#7C81FF] text-white"
                                    size="sm"
                                ></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
            <Divider />
        </Card>
    );
};
