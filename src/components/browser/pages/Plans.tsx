import styled from "styled-components";
const PlansSt = styled.div`
  width: 100%;
  height: calc(100% - 5rem);
  /* background: #131212; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    margin-top: 1rem;
    font-family: "Roboto 300";
    font-size: 1rem;
    color: #c7c7c7;
    /* background: red; */
    width: 80%;
  }
  .plans-container {
    width: 100%;
    height: auto;
    /* background: red; */
    display: grid;
    grid-template-columns: repeat(3, 30%);
    grid-template-rows: 100%;
    /* gap: 1rem; */
    justify-content: center;
    align-content: center;
    .plan {
      /* background: #0c0c0c; */
      display: grid;
      grid-template-columns: 100%;
      grid-template-rows: 10rem 5rem 5rem 5rem 5rem;
      gap: 1rem;
      justify-content: center;
      align-content: center;
      .section {
        justify-self: center;
        align-self: center;
        font-family: "Roboto 300";
        font-size: 1rem;
        color: white;
        text-align: center;
      }
      .section-titles {
        width: 100%;
        height: 100%;
        line-height: 5rem;
        background: #080012;
        text-align: start;
        padding: 0 5rem;
        font-family: "Roboto 700";
      }
      .box-plan {
        width: 6rem;
        height: 6rem;
        background: #5900ff;
        line-height: 6rem;
        font-family: "Roboto 900";
        font-size: 1rem;
      }
      .section-content {
        width: 100%;
        height: 100%;
        /* line-height: 5rem; */
        background: #080012;
        /* background: red; */
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-content: center;
        .label {
          display: block;
          font-size: 0.8rem;
          /* font-family: "Roboto 300"; */
          color: #e0e0e0;
          /* text-align: center; */
        }
      }
    }
    .display-none {
      display: none;
    }
  }
  // !Estilos para DESKTOP
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: calc(100% - 5rem);
    display: flex;
    justify-content: center;
    align-items: center;
    .plans-container {
      width: 84rem;
      height: auto;
      display: grid;
      grid-template-columns: 20rem 20rem 20rem 20rem;
      grid-template-rows: 100%;
      justify-content: center;
      align-content: center;
      .plan {
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 15rem 5rem 5rem 5rem 5rem;
        gap: 1rem;
        justify-content: center;
        align-content: center;
        .section {
          justify-self: center;
          align-self: center;
          font-family: "Roboto 300";
          font-size: 1rem;
          color: white;
          text-align: center;
        }
        .section-titles {
          width: 100%;
          height: 100%;
          line-height: 5rem;
          background: #080012;
          text-align: start;
          padding: 0 5rem;
          font-family: "Roboto 700";
        }
        .box-plan {
          width: 10rem;
          height: 10rem;
          background: #5900ff;
          line-height: 10rem;
          font-family: "Roboto 900";
          font-size: 1rem;
        }
        .section-content {
          width: 100%;
          height: 100%;
          /* line-height: 5rem; */
          background: #080012;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-content: center;
          .label {
            display: none;
          }
        }
      }
    }
    .display-none {
      display: grid;
    }
  }
`;
const Plans = () => {
  return (
    <PlansSt>
      <div className="plans-container">
        <div className="plan display-none">
          <section className="section"></section>
          <section className="section section-titles">Pantallas</section>
          <section className="section section-titles">Precio mensual</section>
          <section className="section section-titles">Resolución</section>
          <section className="section"></section>
        </div>

        <div className="plan">
          <section className="section box-plan ">Basic</section>
          <section className="section section-content">
            {" "}
            <p className="label" style={{ opacity: 0 }}>
              {"gap"}
            </p>
            1
          </section>
          <section className="section section-content">
            <p className="label" style={{ opacity: 0 }}>
              {" "}
              {"gap"}
            </p>
            55 Bs
          </section>
          <section className="section section-content">
            {" "}
            <p className="label" style={{ opacity: 0 }}>
              {"gap"}
            </p>
            1080p
          </section>
          <section className="section button"></section>
        </div>

        <div className="plan">
          <section className="section box-plan">Standar</section>
          <section className="section section-content">
            <p className="label" style={{ opacity: 1 }}>
              Pantallas
            </p>
            2
          </section>
          <section className="section section-content">
            <p className="label" style={{ opacity: 1 }}>
              Precio mensual
            </p>
            80 Bs
          </section>
          <section className="section section-content">
            <p className="label" style={{ opacity: 1 }}>
              Resolución
            </p>
            1080p
          </section>
          <section className="section button"></section>
        </div>

        <div className="plan">
          <section className="section box-plan">Premium</section>
          <section className="section section-content">
            {" "}
            <p className="label" style={{ opacity: 0 }}>
              {"gap"}
            </p>
            4
          </section>
          <section className="section section-content">
            <p className="label" style={{ opacity: 0 }}>
              {"gap"}
            </p>
            100 Bs
          </section>
          <section className="section section-content">
            {" "}
            <p className="label" style={{ opacity: 0 }}>
              {"gap"}
            </p>
            1080p
          </section>
          <section className="section button"></section>
        </div>
      </div>
      <p>Velocidad mínima recomendada por pantalla 15Mbps.</p>
    </PlansSt>
  );
};

export default Plans;
