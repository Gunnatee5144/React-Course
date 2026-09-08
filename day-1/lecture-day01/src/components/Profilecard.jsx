import Badge from "./badge";

const ProfileCard = ({ name = "" , role = "" , department = "" , isOnline = false }) => {

    let isOnlineMessage = ""

    if(isOnline) {
        isOnlineMessage = "Online"
    } else {
        isOnlineMessage = "Offline"
    }

    return (
        <div className="text-amber-300 bg-amber-700 flex items-center justify-center">
            <div className="flex items-center">
                <span>{name}</span>
                <Badge>
                    <span>Online : {isOnlineMessage}</span>
                </Badge>
            </div>
            
            <span>Role : {role}</span>
            <span>Department : {department}</span>
            
        </div>
        
    );
};

export default ProfileCard;