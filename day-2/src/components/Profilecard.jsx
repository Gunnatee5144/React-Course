import { usestate } from "react";

function ProfileCard({ name, role }) {
    const [isFavorite, setIsFavorite] = usestate(false);
    console.log("isFavorite ProfileCard onClick >>", isFavorite);

    return (
        <div className="border rounded p-4">
            <h2>{name}</h2>
            <p>{role}</p>
            <button onClick={() => setIsFavorite(!isFavorite)}>{isFavorite ? "ถูกใจแล้ว" : "กดถูกใจ"}</button>
        </div>
    )
}

export default ProfileCard;
