const Badge = ({ children }) => {
    return (
        <div className="rounded-2xl bg-red-500 font-bold text-lg w-fit px-2 py-1">
            { children }
        </div>
    );
};

export default Badge;