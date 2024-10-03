export const DropDown = ({}) => {
    return (
        <div
            className="
            container
            bottom-[100px]
            flex h-[220px]
            justify-between
            rounded-b-[30px]
            bg-[#24212E]
            p-5 text-left"
        >
            <div className="text-center text-white">
                <h1 className="text-2xl">Youtube Title</h1>
                <iframe
                    width="100%"
                    height="80%"
                    src="https://www.youtube.com/embed/0YeON4p0ogw?autoplay=1&mute=1"
                ></iframe>
            </div>
            <div className="w-[300px]">
                <div className="flex-row">
                    <div>
                        <div className="mt-3 flex justify-between text-center text-white">
                            <div className="flex-row">
                                <h1 className="text-xl">150</h1>
                                <p className="text-xs">Words</p>
                            </div>
                            <div className="flex-row text-center">
                                <h1 className="text-xl">650</h1>
                                <p className="text-xs">Words</p>
                            </div>
                        </div>
                        <div className="text-center">
                            <input
                                className="w-[90%] accent-[#7C81FF]"
                                id="default-range"
                                type="range"
                            ></input>
                        </div>
                    </div>
                    <div className="flex justify-between rounded-[5px] bg-[#4F4F4F] p-[8px] text-center text-sm">
                        <div className="w-[130px] rounded-[5px] bg-[#7C81FF] p-[5px]">
                            <h1>Paragraph</h1>
                        </div>
                        <div className="w-[130px] p-[5px]">
                            <h1>Bullet Points</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
