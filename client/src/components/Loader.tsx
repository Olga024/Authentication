

export const Loader = () => {

    return <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70 backdrop-blur-sm">
        <svg
            className="h-10 w-10 animate-spin text-lime-600"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                className="opacity-40"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
        </svg>
    </div>
}