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
    };
    mijnWerk: {
      url: string;
    };
    contact: {
      url: string;
    };
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
          "http://localhost:1337/api/homepages?populate=headerImages&populate=headerNames"
        );
        const fetchedData = response.data.data[0]; // Access the first thingie i narray
        setHomeData({
          welkom: fetchedData.welkom,
          welkomDescription: fetchedData.welkomDescription,
          headerImages: {
            overMij: fetchedData.headerImages.overMij,
            mijnWerk: fetchedData.headerImages.mijnWerk,
            contact: fetchedData.headerImages.contact,
          },
          headerNames: {
            home: fetchedData.headerNames.home,
            overMij: fetchedData.headerNames.overMij,
            mijnWerk: fetchedData.headerNames.mijnWerk,
            contact: fetchedData.headerNames.contact,
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
    return <div>Loading...</div>;
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
          <a href="/" className={styles.imageContainer}>
            <img
              src={`http://localhost:1337${headerImages.overMij.url}`}
              alt={headerNames.overMij}
              className={styles.portfolioImage}
            />
            <div className={styles.imageText}>{headerNames.overMij}</div>
          </a>
          <a href="/projects" className={styles.imageContainer}>
            <img
              src={`http://localhost:1337${headerImages.mijnWerk.url}`}
              alt={headerNames.mijnWerk}
              className={styles.portfolioImage}
            />
            <div className={styles.imageText}>{headerNames.mijnWerk}</div>
          </a>
          <a href="/contact" className={styles.imageContainer}>
            <img
              src={`http://localhost:1337${headerImages.contact.url}`}
              alt={headerNames.contact}
              className={styles.portfolioImage}
            />
            <div className={styles.imageText}>{headerNames.contact}</div>
          </a>
        </div>
      </main>
    </div>
  );
}
