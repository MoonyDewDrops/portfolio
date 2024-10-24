"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [footerData, setFooterData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/footers');
        setFooterData(response.data.data[0]);
      } catch (error) {
        console.error('Error fetching footer data:', error);
        setError('Error loading footer data');
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!footerData) {
    return <div>footer data is missend of onkrijgbaar</div>;
  }


  const { officialThingie } = footerData;

  return (
    <footer style={footerStyle}>
      <p style={{ color: "white" }}>
        <span style={squareSpanStyle}>
          {officialThingie}
        </span>
      </p>
    </footer>
  );
}

const footerStyle = {
  padding: "1rem",
  backgroundColor: "#2B2D42",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
};

const squareSpanStyle = {
  backgroundColor: "#8D99AE",
  padding: "0.7rem",
  borderRadius: "5px",
};