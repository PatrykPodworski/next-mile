import Container from "@/components/Layout/Container";
import Heading from "@/components/Layout/Heading";
import Paragraph from "@/components/Layout/Paragraph";

const SuccessPage = () => {
  return (
    <Container>
      <Heading data-testid="success-heading">Success!</Heading>
      <Paragraph>Your order has been processed.</Paragraph>
    </Container>
  );
};

export default SuccessPage;
