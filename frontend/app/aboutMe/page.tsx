"use client"; // Add this line to mark the component as a Client Component

import styles from "../page.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

// Define the interface for homepage data
interface AboutMeData {
  title: string;
  name: string;
  introductionSelf: string;
  buttonName: string;
  image: {
    url: string;
  } | null;
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
        const fetchedData = response.data.data[0]; // Access the first item in the array
        setAboutMeData({
          title: fetchedData.title,
          name: fetchedData.name,
          introductionSelf: fetchedData.introductionSelf,
          buttonName: fetchedData.buttonName,
          image: fetchedData.image || null,
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Check if AboutMeData is defined
  if (!AboutMeData) {
    return <div>Homepage data is missing or unavailable</div>;
  }

  const { title, name, introductionSelf, buttonName, image} = AboutMeData;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ul className={styles.introduction}>
          <li>
            <h1>{title}</h1>
          </li>
          <li>
            <p>{name}</p>
          </li>
          <li>
            <p>{introductionSelf}</p>
          </li>
        </ul>

        <div className={styles.imageGallery}>
          <a href="/" className={styles.imageContainer}>
            <img
              src={image?.url ? `http://localhost:1337${image.url}` : "/fallback-image.jpg"}
              alt={image?.url}
              className={styles.portfolioImage&&styles.firstImage}
            />
            <div className={styles.imageText}>{buttonName}</div>
          </a>
        </div>
      </main>
    </div>
  );
}