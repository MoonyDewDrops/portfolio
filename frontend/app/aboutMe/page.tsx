"use client";

import styles from "../page.module.css";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface AboutMeData {
  title: string;
  name: string;
  introductionSelf: string;
  buttonName: string;
  image: {
    url: string;
  } | null;
  typeCode: string;
}

export default function Home() {
  const [AboutMeData, setAboutMeData] = useState<AboutMeData | null>(null); // State to hold the homepage data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // State for error handling

  useEffect(() => {
    const fetchAboutMeData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/about-mes?populate=image"
        );
        const fetchedData = response.data.data[0];
        setAboutMeData({
          title: fetchedData.title,
          name: fetchedData.name,
          introductionSelf: fetchedData.introductionSelf,
          buttonName: fetchedData.buttonName,
          image: fetchedData.image || null,
          typeCode: fetchedData.typeCode,
        });
      } catch (error) {
        console.error("Error fetching about me page data:", error);
        setError("Error loading about me page data");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutMeData();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        Loading...
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!AboutMeData) {
    return <div>Over mij data is missend of onkrijgbaar</div>;
  }
  const { title, name, introductionSelf, buttonName, image, typeCode } = AboutMeData;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>{title}</h1>

        <div style={aboutMeContainer}>
          <div style={aboutMeImage}>
            <Image
              src={image?.url ? `http://localhost:1337${image.url}` : "/fallback-image.jpg"}
              alt={name}
              style={overMij}
              width={500}
              height={500}
            />
            <div style={imageName}>{name}</div>
          </div>

          <div style={centering}>
            <div style={aboutMeText}>
              <ul style={introduction}>
                <li>
                  <p>{introductionSelf}</p>
                  <br></br>
                  <p>Code talen/Software waarmee ik kan werken</p>
                  <p>-</p>
                  <p>{typeCode}</p>
                </li>
                <li>
                  <a href="/projects">
                    <div style={imageText}>{buttonName}</div>                  
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* About me styles */

const aboutMeContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center", 
  justifyContent: "center", 
  gap: "5%", 
  padding: "20px",
  width: "100%",
};

const aboutMeImage: React.CSSProperties = {
  backgroundColor: "#8D99AE",
  width: "30%", 
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderRadius: "10px",
};

const overMij: React.CSSProperties = {
  width: "100%",
  height: "auto",
  borderRadius: "5px",
};

const imageName: React.CSSProperties = {
  backgroundColor: "#94BFBE",
  width: "100%",
  textAlign: "center",
  fontSize: "24px",
  padding: "10px",
  color: "#EDF2F4",
  borderRadius: "5px",
};

const aboutMeText: React.CSSProperties = {
  backgroundColor: "#8D99AE",
  padding: "20px",
  width: "70%",
  color: "#2B2D42",
  borderRadius: "10px",
  textAlign: "center",
  fontSize: "24px",
};

const introduction: React.CSSProperties = {
  backgroundColor: "#ABB4C4",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "5px",
  fontSize: "24px",
  textAlign: "center",
};

const imageText: React.CSSProperties = {
  backgroundColor: "#94BFBE",
  padding: "10px",
  textAlign: "center",
  color: "#2B2D42",
  borderRadius: "5px",
};

const centering: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%", 
};
