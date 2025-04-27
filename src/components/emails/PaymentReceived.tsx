import {
  Body,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export default function PaymentReceived({
  userName,
  price,
}: {
  userName: string;
  price: string;
}) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Payment Received</title>

        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>

      <Tailwind>
        <Body className="my-auto mx-auto bg-[#420A8D]/5">
          <Container className="my-[40px] bg-white">
            <Section className="bg-[#420A8D]/25">
              <Img
                src={"https://responsble.vercel.app/images/icon.png"}
                alt=""
                width={75}
                className="my-[20px] mx-auto"
              />
            </Section>

            <Section className="mt-[35px]">
              <Heading className="m-0 px-[35px] text-[18px] font-bold text-[#1B1529]">
                Payment received
              </Heading>

              <Text className="m-0 mt-[15px] text-[14px] px-[35px] text-[#97909D]">
                Hey admin, {userName} has completed the payment of {price}.
                Please login to dashboard and assign the certificate.
              </Text>
            </Section>

            <Hr className="mt-[35px] mb-[25px]" />

            <Section className="mb-[25px]">
              <Text className="m-0 text-[14px] px-[35px] text-[#97909D]">
                Responsble.ai will never email you and ask you to disclose or
                verify your password, credit card, or banking account number.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
