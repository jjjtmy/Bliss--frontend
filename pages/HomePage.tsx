import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core"; // Add this import
import "@mantine/carousel/styles.css";

export default function HomePage(): JSX.Element {
  const navigate = useNavigate();

  const images = [
    "http://res.cloudinary.com/dagpbzoqq/image/upload/v1724764381/ppjdoq8vmmrnoifhcwrp.jpg",
    "http://res.cloudinary.com/dagpbzoqq/image/upload/v1724456692/etelng1hemsjziwfdxl8.jpg",
    "http://res.cloudinary.com/dagpbzoqq/image/upload/v1724457027/lknokqubkautqxpgg0l5.jpg",
  ];

  const slides = images.map((image, index) => (
    <Carousel.Slide key={index}>
      <Image src={image} alt={`Slide ${index}`} /> {/* Corrected src */}
    </Carousel.Slide>
  ));

  return (
    <div className="container">
      <Carousel
        withIndicators
        slideSize={{ base: "100%" }}
        slideGap={{ base: "xl", sm: 2 }}
        align="start"
      >
        {slides}
      </Carousel>
      <div className="homepageHeader">
        <h1>Make the most</h1>
        <h1> of your big day</h1>
        <h3> Let us help you every step of the way</h3>
        <button className="button" onClick={() => navigate("/explore")}>
          Find a Venue
        </button>
      </div>
    </div>
  );
}
