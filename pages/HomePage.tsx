import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import "@mantine/carousel/styles.css";

export default function HomePage(): JSX.Element {
  const navigate = useNavigate();

  const images = [
    "http://res.cloudinary.com/dagpbzoqq/image/upload/v1724910258/qyyphhf7sjgdficrawyd.jpg",
    "http://res.cloudinary.com/dagpbzoqq/image/upload/v1724910373/zrczfp0wk7fv6shfngvc.jpg",
    "http://res.cloudinary.com/dagpbzoqq/image/upload/v1724910523/fj1tubpoti5tsre02qbi.jpg",
  ];

  const slides = images.map((image, index) => (
    <Carousel.Slide key={index}>
      <Image
        src={image}
        alt={`Slide ${index}`}
        style={{
          filter: "saturate(0.5)",
          height: "60vh",
          width: "100%",
        }}
      />
    </Carousel.Slide>
  ));

  return (
    <div className="container">
      <Carousel
        withIndicators
        slideSize={{ base: "100%" }}
        slideGap={{ base: "lg", sm: 2 }}
        align="start"
        containScroll="keepSnaps"
        loop
      >
        {slides}
      </Carousel>
      <div className="homepageHeader">
        <h1>Make the most</h1>
        <h1> of your big day</h1>
        <h3> Let us help you every step of the way</h3>
        <button className="button" onClick={() => navigate("/explore")}>
          Find a Vendor
        </button>
      </div>
    </div>
  );
}
