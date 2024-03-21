import React from "react";
import imageA from "../../assets/foto imageA.jpg";
import imageB from "../../assets/foto imageB.jpeg";
import imageC from "../../assets/imageC.jpeg";
import imageD from "../../assets/foto imageD.jpg";
import imageE from "../../assets/foto imageE.jpg";
import imageF from "../../assets/imageF.jpg";
import imageG from "../../assets/foto imageG.jpg";
import imageH from "../../assets/imageH.jpg";
import "./linkedInProfile.css";

const linkedInProfiles = [
  {
    name: "Roberto Daniel Zaracho",
    image: imageA,
    link: "https://www.linkedin.com/in/roberto-zaracho/",
  },
  {
    name: "Tomas Callenius",
    image: imageB,
    link: "https://www.linkedin.com/in/tomas-callenius-9a9149219",
  },
  {
    name: "Facundo Gabriel Fernandez",
    image: imageC,
    link: "https://www.linkedin.com/in/facundo-fernandez-19369926a",
  },
  {
    name: "Juan Cruz Loker Boc-ho",
    image: imageD,
    link: "https://www.linkedin.com/in/juan-cruz-loker-boc-ho-b09167269",
  },
  {
    name: "Julian Andrés Sosa",
    image: imageE,
    link: "https://www.linkedin.com/in/julian-andres-sosa",
  },
  {
    name: "Tomas Agustin Lona",
    image: imageF,
    link: "https://github.com/NitsugaSamot",
  },
  {
    name: "Mateo Jeremias Pinto",
    image: imageG,
    link: "https://www.linkedin.com/in/mateo-jeremias-pg",
  },
  {
    name: "Alejandra León",
    image: imageH,
    link: "https://www.linkedin.com/in/alejandra-león-b080a8234",
  },
];

const LinkedInProfile = () => {
  const circleStyles = {
    width: "200px",
    height: "200px",
    borderRadius: "70%", // Hace que el contenedor sea un círculo
    border: "3px solid #ed6c02", // Borde naranja
    overflow: "hidden", // Oculta cualquier contenido fuera del círculo
  };

  const imageStyles = {
    width: "100%",
    height: "100%",
    objectFit: "cover", // Ajusta la imagen al tamaño del círculo
  };

  const profileStyles = {
    marginBottom: "20px",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
  };

  const nameStyles = {
    fontSize: "16px",
  };

  return (
    <div className="linkedin-profiles">
      {linkedInProfiles.map((profile, index) => (
        <div className="profile" style={profileStyles} key={index}>
          <a href={profile.link.startsWith("http") ? profile.link : `https://${profile.link}`} target="_blank" rel="noopener noreferrer">
            <div style={circleStyles}>
              <img
                src={profile.image}
                alt={`LinkedIn Profile ${index + 1}`}
                style={imageStyles}
              />
            </div>
          </a>
          <p style={nameStyles}>{profile.name}</p>
        </div>
      ))}
    </div>
  );
};

export default LinkedInProfile;
