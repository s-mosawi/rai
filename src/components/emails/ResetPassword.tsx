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

export default function ResetPassword({
  userName,
  otp,
}: {
  userName: string;
  otp: string;
}) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Reset Password</title>

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
                Reset password
              </Heading>

              <Text className="m-0 mt-[15px] text-[14px] px-[35px] text-[#97909D]">
                Hey {userName}, thanks for using Responsble.ai! We want to make
                sure its really you. Please enter the following otp when
                prompted. If you don't want to reset your password, you can
                ignore this message.
              </Text>
            </Section>

            <Section className="mt-[35px]">
              <Heading
                as="h3"
                className="m-0 mb-[5px] px-[35px] text-[14px] font-bold text-center text-[#1B1529]"
              >
                OTP
              </Heading>

              <Heading
                as="h2"
                className="m-0 px-[35px] text-[28px] font-bold text-center text-[#420A8D]"
              >
                {otp}
              </Heading>

              <Text className="m-0 mt-[5px] text-[14px] px-[35px] text-center text-[#97909D]">
                Expires in 2 minutes
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
