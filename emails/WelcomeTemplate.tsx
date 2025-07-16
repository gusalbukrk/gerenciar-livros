import * as React from "react";
import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Preview,
  Tailwind,
} from "@react-email/components";

function WelcomeTemplateEmail({ name }: { name: string }) {
  return (
    <Html>
      <Preview>Welcome aboard!</Preview>
      <Tailwind>
        <Body style={body}>
          {/* use <Container> to centralize content */}
          {/* <Container> */}
          <Text className="text-lg font-bold">Welcome, {name ?? "user"}!</Text>
          <Link href="http://localhost:3000">Go to site</Link>
          {/* </Container> */}
        </Body>
      </Tailwind>
    </Html>
  );
}

const body: React.CSSProperties = {
  backgroundColor: "lightgray",
};

export default WelcomeTemplateEmail;
