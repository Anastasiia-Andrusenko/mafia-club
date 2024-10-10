import Container from "@/components/Container/Container";
import css from "../../styles/vip.module.css";
import ExtraServices from "@/components/ExtraServices/ExtraServices";

const VipPage = () => {
  return (
    <>
      <div className={css.bgImg}>
        <Container>
          <p>VIP Page</p>
        </Container>
      </div>
      <Container>
        <p>something</p>
      </Container>
      <ExtraServices />
    </>
  );
};

export default VipPage;
