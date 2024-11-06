"use client";

import styles from "./page.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from 'next/image';

//this makes it so the state can hold the data, without this it don know wtf its holding so it causes error on line 32
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
          //this gets the data from strapi using the api link. The populate things is to make sure it delivers all the data
          //that might be inside different components n stuff like that
          "http://localhost:1337/api/homepages?populate[headerImages][populate]=*&populate=headerNames"
        );
        const fetchedData = response.data.data[0];
        setHomeData({
          //this is where we set the data into all the names u see on the left most. Those names are what we get them by.
          welkom: fetchedData.welkom,
          welkomDescription: fetchedData.welkomDescription,
          headerImages: {
            //this is getting the stuff inside the component. The || null makes it so that if nothing shows up it dont tweak out (break or worse idk)
            overMij: fetchedData.headerImages?.overMij || null,
            mijnWerk: fetchedData.headerImages?.mijnWerk || null,
            contact: fetchedData.headerImages?.contact || null,
          },
          headerNames: {
            //Here i do || "name of thing". This is also so if data aint there, we have a temporary thing!! :)
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
      //loading state my absolute beloved i think it turned out very pretty <3
        <div className={styles.container}>
          Loading...
          <div className={styles.spinner}></div>
        </div>
    )
  }

  if (error) {
    return <div>{error}</div>;
  }

  //ah nah they got the homepage data- *gets shot*
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
          {/* using <Image> to load in the images like a boss :3*/}
            <Image
            //The source was kinda tricky for me but ik that this makes it so we have multiple tries, i dont have a fallback image yet
            //for if it doesn't work
              src={headerImages?.overMij?.url ? `http://localhost:1337${headerImages.overMij.url}` : "/fallback-image.jpg"}
              alt={headerNames.overMij}
              className={`${styles.portfolioImage} ${styles.firstImage}`}
              width={500}
              height={300}
            />
            <div className={styles.imageText}>{headerNames.overMij}</div>
          </a>
          <a href="/projects" className={styles.imageContainer}>
            <Image
              src={headerImages?.mijnWerk?.url ? `http://localhost:1337${headerImages.mijnWerk.url}` : "/fallback-image.jpg"}
              alt={headerNames.mijnWerk}
              className={`${styles.portfolioImage} ${styles.secondImage}`}
              width={500}
              height={300}
            />
            <div className={styles.imageText}>{headerNames.mijnWerk}</div>
          </a>
          <a href="/contact" className={styles.imageContainer}>
            <Image
              src={headerImages?.contact?.url ? `http://localhost:1337${headerImages.contact.url}` : "/fallback-image.jpg"}
              alt={headerNames.contact}
              className={`${styles.portfolioImage} ${styles.thirdImage}`}
              width={500}
              height={300}
            />
            <div className={styles.imageText}>{headerNames.contact}</div>
          </a>
        </div>
      </main>
    </div>
  );
}