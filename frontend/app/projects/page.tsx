"use client";

import styles from "../page.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

interface ProjectData {
  projectImages: {
    image1: {
      url: string;
    };
    image2: {
      url: string;
    };
    image3: {
      url: string;
    };
  };
  info: {
    info1: string;
    info2: string;
    info3: string;
  };
}

export default function Projects() {
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/projects?populate[info]=*&populate[projectImages][populate]=*"
        );
        const fetchedData = response.data.data[0];

        setProjectData({
          projectImages: fetchedData.projectImages || null,
          info: fetchedData.info || null,
        });
      } catch (error) {
        console.error("Error fetching project data:", error);
        setError("Error loading project data");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
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

  if (!projectData) {
    return <div>Mijn werk data is missend of onkrijgbaar</div>;
  }

  const { projectImages, info } = projectData;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Mijn werk</h1>

        <div style={containerStyles}>
          <div style={imageSection}>
            <div style={imageContainerStyles}>
              <img
                src={projectImages.image1?.url ? `http://localhost:1337${projectImages.image1.url}` : "/fallback-image.jpg"}
                alt="Image 1"
                style={imageStyles}
              />
              <div style={labelStyles}>Project 1</div>
            </div>
          </div>
          <div style={infoSection}>
            <div style={infoContainerStyles}>
              <div style={infoTextStyles}>{info.info1}</div>
            </div>
          </div>
        </div>

        <div style={containerStyles}>
          <div style={infoSection}>
            <div style={infoContainerStyles}>
              <div style={infoTextStyles}>{info.info2}</div>
            </div>
          </div>
          <div style={imageSection}>
            <div style={imageContainerStyles}>
              <img
                src={projectImages.image2?.url ? `http://localhost:1337${projectImages.image2.url}` : "/fallback-image.jpg"}
                alt="Image 2"
                style={imageStyles}
              />
              <div style={labelStyles}>Project 2</div>
            </div>
          </div>
        </div>

        <div style={containerStyles}>
          <div style={imageSection}>
            <div style={imageContainerStyles}>
              <img
                src={projectImages.image3?.url ? `http://localhost:1337${projectImages.image3.url}` : "/fallback-image.jpg"}
                alt="Image 3"
                style={imageStyles}
              />
              <div style={labelStyles}>Project 3</div>
            </div>
          </div>
          <div style={infoSection}>
            <div style={infoContainerStyles}>
              <div style={infoTextStyles}>{info.info3}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* Styles */
const containerStyles: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
  padding: "20px",
};

const imageContainerStyles: React.CSSProperties = {
  backgroundColor: "#D9D9D9",
  padding: "10px",
  borderRadius: "5px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const labelStyles: React.CSSProperties = {
  backgroundColor: "#94BFBE",
  padding: "5px",
  borderRadius: "5px",
  marginTop: "5px",
  width: "100%",
  textAlign: "center",
};

const imageSection: React.CSSProperties = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
};

const imageStyles: React.CSSProperties = {
  width: "100%",
  height: "auto",
  borderRadius: "5px",
};

const infoSection: React.CSSProperties = {
  flex: 1,
  textAlign: "center",

};

const infoContainerStyles: React.CSSProperties = {
  backgroundColor: "#8D99AE",
  padding: "10px",
  borderRadius: "5px",
};

const infoTextStyles: React.CSSProperties = {
  backgroundColor: "#ABB4C4",
  padding: "10px",
  borderRadius: "5px",
  fontSize: "18px",
};
