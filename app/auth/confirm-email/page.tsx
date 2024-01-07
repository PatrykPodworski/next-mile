import Container from "@/components/Layout/Container";
import Heading from "@/components/Layout/Heading";
import Paragraph from "@/components/Layout/Paragraph";

const ConfirmEmailPage = () => {
  return (
    <>
      <Container>
        <Heading data-testid="success-heading">
          Thank you for creating an account!
        </Heading>
        <Paragraph>
          Please check your email and click on the confirmation link to activate
          your account.
        </Paragraph>
      </Container>
    </>
  );
};

export default ConfirmEmailPage;
