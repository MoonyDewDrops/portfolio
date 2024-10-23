"use client";

import styles from "../page.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

interface ContactData {
  "names": {
    "name1": string,
    "name2": string,
    "name3": null,
  },
  "linked": {
    "link1": string,
    "link2": string,
    "link3": null,
  }
}

export default function Projects() {
  const [ContactData, setContactData] = useState<ContactData | null>(null); // State to hold the project data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // State for error handling

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/contacts?populate[names]=*&populate[linked][populate]=*"
        );
        const fetchedData = response.data.data[0];

        setContactData({
          names: fetchedData.names || null,
          linked: fetchedData.linked || null,
        });
      } catch (error) {
        console.error("Error fetching project data:", error);
        setError("Error loading project data");
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
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

  if (!ContactData) {
    return <div>Contact data is missend of onkrijgbaar</div>;
  }

  const { names, linked } = ContactData;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Contact</h1>

        {/* Single container to hold both sections */}
        <div style={containerStyles}>
          <div style={infoSection}>
            <div style={infoContainerStyles}>
              <div style={infoTextStyles}>
                {names.name1}
                <br />
                {linked.link1}
              </div>
            </div>
          </div>

          <div style={infoSection}>
            <div style={infoContainerStyles}>
              <div style={infoTextStyles}>
                {names.name2}
                <br />
                <a href={linked.link2}>Click hier voor LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>


  );
}

const containerStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "20px",
  padding: "20px",
  width: "100%",
};

const infoSection: React.CSSProperties = {
  flex: 1,
  textAlign: "center",
};

const infoContainerStyles: React.CSSProperties = {
  backgroundColor: "#8D99AE",
  padding: "20px",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const infoTextStyles: React.CSSProperties = {
  backgroundColor: "#ABB4C4",
  padding: "10px",
  borderRadius: "5px",
  fontSize: "18px",
  width: "100%",
  textAlign: "center",
};
