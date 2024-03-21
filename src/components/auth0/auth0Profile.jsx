import { useEffect } from "react";
import { useSelector } from "react-redux";

export const UserProfile = () => {
  const userData = useSelector((state) => state.userData);
  useEffect(() => {}, [userData]);

  return (
    <div>
      {userData.name ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: "25px",
              fontWeight: "bold",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {userData.name}
          </p>
          <hr className="hr_login" />
          <img
            src={userData.image}
            alt="Perfil"
            style={{
              borderRadius: "50px",
              border: "3px solid #007bff",
              marginTop: "10px",
              marginBottom: "10px",
              maxWidth: "100px",
            }}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserProfile;
