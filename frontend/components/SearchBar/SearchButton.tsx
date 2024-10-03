import { motion } from "framer-motion";
export const SearchButton = () => {
    return (
        <motion.button
            whileHover={{ scale: [1.05] }}
            whileTap={{ scale: 0.9 }}
            className="
            absolute
            right-[2%] top-[30%]
            flex h-[28px] w-[140px]
            items-center
            justify-between
            rounded-[15px] bg-[#69E4AF]
            px-4
            px-5
            px-[20px]
            py-1
            transition
            ease-in-out
            hover:bg-[#00BB8E]
            focus:outline-none"
        >
            <div>Generate</div>
            <div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.7}
                    stroke="currentColor"
                    className="h-5.5 w-3.5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                    />
                </svg>
            </div>
        </motion.button>
    );
};
