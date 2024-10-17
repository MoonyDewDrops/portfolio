export default function Footer() {
    return (
      //The style={} refers to the style function that you create with const insertFunctionName. Hier in zet je de style voor
      //Het hele ding. Eigenlijk net zoals als je een divje hebt, en je in je css de class ervan
      <footer style={footerStyle}>
        <p style={{ color: "white" }}>© 2024 Julia Brouwer's Portfolio</p>
        <ul style={footerListStyle}>
          <li><a href="https://twitter.com" style={linkStyle}>Insert name of link</a></li>
          <li><a href="https://github.com" style={linkStyle}>Insert name of link</a></li>
          <li><a href="https://linkedin.com" style={linkStyle}>Insert name of link</a></li>
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
  