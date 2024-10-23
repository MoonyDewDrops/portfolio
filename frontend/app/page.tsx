"use client";

import styles from "./page.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

interface HomePageData {
  welkom: string;
  welkomDescription: string;
  headerImages: {
    overMij: {
      url: string;
    } | null;
    mijnWerk: {
      url: string;
    } | null;
    contact: {
      url: string;
    } | null;
  };
  headerNames: {
    home: string;
    overMij: string;
    mijnWerk: string;
    contact: string;
  };
}

export default function Home() {
  const [homeData, setHomeData] = useState<HomePageData | null>(null); // State to hold the homepage data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // State for error handling

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/homepages?populate[headerImages][populate]=*&populate=headerNames"
        );
        const fetchedData = response.data.data[0];
        setHomeData({
          welkom: fetchedData.welkom,
          welkomDescription: fetchedData.welkomDescription,
          headerImages: {
            overMij: fetchedData.headerImages?.overMij || null,
            mijnWerk: fetchedData.headerImages?.mijnWerk || null,
            contact: fetchedData.headerImages?.contact || null,
          },
          headerNames: {
            home: fetchedData.headerNames?.home || "Home",
            overMij: fetchedData.headerNames?.overMij || "Over mij",
            mijnWerk: fetchedData.headerNames?.mijnWerk || "Mijn werk",
            contact: fetchedData.headerNames?.contact || "Contact",
          },
        });
      } catch (error) {
        console.error("Error fetching homepage data:", error);
        setError("Error loading homepage data");
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
        <div className={styles.container}>
          Loading...
          <div className={styles.spinner}></div>
        </div>
    )
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!homeData) {
    return <div>Homepage data is missing or unavailable</div>;
  }

  const { welkom, welkomDescription, headerImages, headerNames } = homeData;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ul className={styles.introduction}>
          <li>
            <h1>{welkom}</h1>
          </li>
          <li>
            <p>{welkomDescription}</p>
          </li>
        </ul>

        <div className={styles.imageGallery}>
          <a href="/aboutMe" className={styles.imageContainer}>
            <img
              src={headerImages?.overMij?.url ? `http://localhost:1337${headerImages.overMij.url}` : "/fallback-image.jpg"}
              alt={headerNames.overMij}
              className={styles.portfolioImage&&styles.firstImage}
            />
            <div className={styles.imageText}>{headerNames.overMij}</div>
          </a>
          <a href="/projects" className={styles.imageContainer}>
            <img
              src={headerImages?.mijnWerk?.url ? `http://localhost:1337${headerImages.mijnWerk.url}` : "/fallback-image.jpg"}
              alt={headerNames.mijnWerk}
              className={styles.portfolioImage&&styles.secondImage}
            />
            <div className={styles.imageText}>{headerNames.mijnWerk}</div>
          </a>
          <a href="/contact" className={styles.imageContainer}>
            <img
              src={headerImages?.contact?.url ? `http://localhost:1337${headerImages.contact.url}` : "/fallback-image.jpg"}
              alt={headerNames.contact}
              className={styles.portfolioImage&&styles.thirdImage}
            />
            <div className={styles.imageText}>{headerNames.contact}</div>
          </a>
        </div>
      </main>
    </div>
  );
}