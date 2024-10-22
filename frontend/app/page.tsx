"use client";

import styles from "./page.module.css";
import axios from 'axios';
import { useEffect, useState } from 'react';

interface HomePageData {
  welkom: string;
  welkomDescription: string;
}

export default function Home() {
  const [homeData, setHomeData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/homepages');
        setHomeData(response.data.data[0]);
      } catch (error) {
        console.error('Error fetching homepage data:', error);
        setError('Error loading homepage data');
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

  const { welkom, welkomDescription } = homeData;

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
            <img src="https://i.pinimg.com/736x/31/35/bf/3135bf339e5692cb3e09c28197cf0b96.jpg" alt="pic of me" className={styles.portfolioImage} />
            <div className={styles.imageText}>Over mij</div>
          </a>
          <a href="/projects" className={styles.imageContainer}>
            <img src="https://i.pinimg.com/736x/59/41/61/594161f55a944ca653f35240be6e28c4.jpg" alt="pic of my work" className={styles.portfolioImage} />
            <div className={styles.imageText}>Mijn werk</div>
          </a>
          <a href="/contact" className={styles.imageContainer}>
            <img src="https://i.pinimg.com/736x/da/d7/2c/dad72c3ee7ea255e72acc32681ec35e2.jpg" alt="another pic of my work" className={styles.portfolioImage} />
            <div className={styles.imageText}>Contact</div>
          </a>
        </div>
      </main>
    </div>
  );
}