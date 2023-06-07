import "../blocks/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>Developed by Jonathan Brandt</p>
      <p>{currentYear}</p>
    </footer>
  );
};

export default Footer;
