import { Box, Container, Text, Stack } from "@mantine/core";
// import {
//   IconBrandFacebook,
//   IconBrandTwitter,
//   IconBrandInstagram,
// } from "@tabler/icons-react";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      style={{
        position: "absolute",
        bottom: "0",
        backgroundColor: "#black",
        width: "100%",
      }}
    >
      <Container>
        <Stack spacing="md">
          <Box>
            <Text size="lg" weight={700}>
              Bliss Pte Ltd
            </Text>
            <Text size="sm" color="dimmed">
              © 2024 Bliss. All rights reserved.
            </Text>
          </Box>
          {/* <Stack spacing="xs">
            <link href="/" color="dimmed">
              Home
            </link>
            <link href="/" color="dimmed">
              About Us
            </link>
            <link href="/" color="dimmed">
              Services
            </link>
            <link href="/" color="dimmed">
              Contact
            </link>
          </Stack>
          <Stack spacing="xs">
            <Text size="sm" weight={500}>
              Follow us:
            </Text>
            <Stack spacing={5} style={{ flexDirection: "row" }}>
              <link href="https://facebook.com" target="_blank" color="dimmed">
                <IconBrandFacebook size={24} />
              </link>
              <link href="https://twitter.com" target="_blank" color="dimmed">
                <IconBrandTwitter size={24} />
              </link>
              <link href="https://instagram.com" target="_blank" color="dimmed">
                <IconBrandInstagram size={24} />
              </link>
            </Stack>
          </Stack> */}
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
