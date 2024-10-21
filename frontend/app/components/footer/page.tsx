export default function Footer() {
    return (
      //The style={} refers to the style function that you create with const insertFunctionName. Hier in zet je de style voor
      //Het hele ding. Eigenlijk net zoals als je een divje hebt, en je in je css de class ervan
      <footer style={footerStyle}>
        <p style={{ color: "white" }}>
          <span style={squareSpanStyle}>
            © 2024 Julia Brouwer's Portfolio
          </span>
        </p>
        <ul style={footerListStyle}>
          <li><a href="https://twitter.com" style={linkStyle}><span style={squareSpanStyle}>Insert name of link</span></a></li>
          <li><a href="https://github.com" style={linkStyle}> <span style={squareSpanStyle}>Insert name of link</span></a></li>
          <li><a href="https://linkedin.com" style={linkStyle}> <span style={squareSpanStyle}>Insert name of link</span></a></li>
        </ul>
      </footer>
    );
  }
  
  const footerStyle = {
    padding: "1rem",
    backgroundColor: "#2B2D42",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };
  
  const footerListStyle = {
    listStyle: "none",
    display: "flex",
    gap: "1rem",
  };
  
  const linkStyle = {
    color: "white",
    textDecoration: "none",
  };

  const squareSpanStyle = {
    backgroundColor: "#8D99AE", // The color for the square
    padding: "0.7rem", // Padding to simulate the size of the square
    borderRadius: "5px", // Optional: Add rounded corners to the square
  };