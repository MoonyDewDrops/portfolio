"use client";

import styles from "../page.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

interface ProjectData {
  projectImages: {
    image1: { url: string };
    image2: { url: string };
    image3: { url: string };
  };
  info: {
    info1: Array<{ type: string; children: Array<{ type: string; text: string; url?: string }> }>;
    info2: Array<{ type: string; children: Array<{ type: string; text: string; url?: string }> }>;
    info3: Array<{ type: string; children: Array<{ type: string; text: string; url?: string }> }>;
  };
  dateStarted: {
    dateMade1: string | null;
    dateMade2: string | null;
    dateMade3: string | null;
  } | null;
  dateFinished: {
    dateFinished1: string | null;
    dateFinished2: string | null;
    dateFinished3: string | null;
  } | null;
  live: {
    live1: boolean;
    live2: boolean;
    live3: boolean;
  } | null;
}

export default function Projects() {
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:1337/api/projects?populate[projectImages][populate]=*&populate[info][populate]=*&populate[dateStarted][populate]=*&populate[dateFinished][populate]=*&populate[live][populate]=*");
        const fetchedData = response.data.data[0];

        if (!fetchedData) {
          throw new Error("No project data found");
        }

        setProjectData({
          projectImages: fetchedData.projectImages || [],
          info: fetchedData.info || {
            info1: [],
            info2: [],
            info3: [],
          },
          dateStarted: fetchedData.dateStarted || null,
          dateFinished: fetchedData.dateFinished || null,
          live: fetchedData.live || null,
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
    return <div className={styles.container}>Loading...<div className={styles.spinner}></div></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!projectData) {
    return <div>Mijn werk data is missend of onkrijgbaar</div>;
  }

  const { projectImages, info, dateStarted, dateFinished, live } = projectData;

  // Function to convert rich text structure to HTML
  const renderRichText = (infoArray: Array<{ type: string; children: Array<{
    [x: string]: any; type: string; text: string; url?: string 
}> }>) => {
    return infoArray.map((paragraph, index) => (
      <p key={index}>
        {paragraph.children.map((child, childIndex) => {
          const textStyle = { color: '#000000' }; // Change this to your desired color
          
          if (child.type === 'link' && child.url) {
            return (
              <a key={childIndex} href={child.url} target="_blank" rel="noopener noreferrer" style={textStyle}>
                {child.children[0]?.text}
              </a>
            );
          }
          return (
            <span key={childIndex}>
              {child.text}
            </span>
          );
        })}
      </p>
    ));
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Mijn werk</h1>

        {/* Project 1 */}
        <div style={containerStyles}>
          <div style={imageSection}>
            <div style={imageContainerStyles}>
              <img src={projectImages.image1?.url ? `http://localhost:1337${projectImages.image1.url}` : "/fallback-image.jpg"} alt="Image 1" style={imageStyles} />
              <div style={labelStyles}>Project 1</div>
              {live && live.live1 ? <div style={liveIndicator}>Live</div> : <div style={notLiveIndicator}>Niet Live</div>}
            </div>
          </div>
          <div style={infoSection}>
            <div style={infoContainerStyles}>
              {renderRichText(info.info1)}
              <br></br>
              <div>Begonnen: {dateStarted?.dateMade1 || "N/A"}</div>
              <div>Afgerond: {dateFinished?.dateFinished1 || "N/A"}</div>
            </div>
          </div>
        </div>

        {/* Project 2 */}
        <div style={containerStyles}>
          <div style={infoSection}>
            <div style={infoContainerStyles}>
              {renderRichText(info.info2)}
              <br></br>
              <div>Begonnen: {dateStarted?.dateMade2 || "N/A"}</div>
              <div>Afgerond: {dateFinished?.dateFinished2 || "N/A"}</div>
            </div>
          </div>
          <div style={imageSection}>
            <div style={imageContainerStyles}>
              <img src={projectImages.image2?.url ? `http://localhost:1337${projectImages.image2.url}` : "/fallback-image.jpg"} alt="Image 2" style={imageStyles} />
              <div style={labelStyles}>Project 2</div>
              {live && live.live2 ? <div style={liveIndicator}>Live</div> : <div style={notLiveIndicator}>Niet Live</div>}
            </div>
          </div>
        </div>

        {/* Project 3 */}
        <div style={containerStyles}>
          <div style={imageSection}>
            <div style={imageContainerStyles}>
              <img src={projectImages.image3?.url ? `http://localhost:1337${projectImages.image3.url}` : "/fallback-image.jpg"} alt="Image 3" style={imageStyles} />
              <div style={labelStyles}>Project 3</div>
              {live && live.live3 ? <div style={liveIndicator}>Live</div> : <div style={notLiveIndicator}>Niet Live</div>}
            </div>
          </div>
          <div style={infoSection}>
            <div style={infoContainerStyles}>
              {renderRichText(info.info3)}
              <br></br>
              <div>Begonnen: {dateStarted?.dateMade3 || "N/A"}</div>
              <div>Afgerond: {dateFinished?.dateFinished3 || "N/A"}</div>
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

const liveIndicator: React.CSSProperties = {
  backgroundColor: "#94BFBE",
  padding: "5px",
  borderRadius: "5px",
  marginTop: "5px",
  width: "100%",
  textAlign: "center",
  color: "green",
};

const notLiveIndicator: React.CSSProperties = {
  backgroundColor: "#94BFBE",
  padding: "5px",
  borderRadius: "5px",
  marginTop: "5px",
  width: "100%",
  textAlign: "center",
  color: "red",
};