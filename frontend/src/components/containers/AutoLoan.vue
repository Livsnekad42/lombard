<template>
  <section id="auto">
    <div class="row auto-info mx-auto">
      <div class="col-md-5 col-5 ml-lg-auto ml-md-3">
        <h1>Автоломбард</h1>
        <p class="mt-3">
          Компания "Тез Ломбард" - Первый в Казахстане ОНЛАЙН-ЛОМБАРД
          предлагающий <br />- Продление и погашение действующих займов:
          <br /><span class="ml-4"></span>- В режиме онлайн <br /><span
            class="ml-4"
          ></span
          >- Возможность погашения через терминалы и кошельки КИВИ, КАССА 24
          <br />- Получение SMS-сообщений о сроках погашения и оплаты услуг
          <br />- Контроль за историей проделанных платежей в Личном Кабинете
          <br />- Онлайн оценка вашего залога на сайте
        </p>
        <button class="btn mt-4" type="button">Подробнее</button>
      </div>
      <div class="col-lg-4 col-md-5 mx-auto">
        <div class="container auto-box pt-4 pl-4">
          <h3>Укажите срок займа</h3>
          <div class="ranges">
            <div class="input">
              <span class="range-start">100 000 тг</span>
              <span>10 000 000 тг</span>
              <input
                type="range"
                min="100000"
                max="10000000"
                v-model.number="blocks"
                class="block"
              />
            </div>
            <div class="range-text text-center pt-1">
              <span>{{ blocks }}</span>
            </div>
          </div>
          <h3 class="mt-5">Укажите срок займа</h3>
          <div class="ranges">
            <div class="input">
              <span class="range-start">3 месяца</span>
              <span>30 месяцев</span>
              <input
                type="range"
                min="3"
                max="30"
                v-model.number="months"
                class="block"
              />
            </div>
            <div class="range-text text-center pt-1">
              <span>{{ months }} месяца</span>
            </div>
          </div>
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link active"
                id="home-tab"
                data-toggle="tab"
                href="#home"
                role="tab"
                aria-controls="home"
                aria-selected="true"
                >Аннуитет</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="profile-tab"
                data-toggle="tab"
                href="#profile"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
                >Только %</a
              >
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active mx-auto"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              ...
            </div>
            <div
              class="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              ...
            </div>
          </div>
        </div>
        <img class="auto-img" :src="require('@/assets/images/9о9.png')" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AutoLoan",
  data() {
    return {
      blocks: 10000,
      months: 3
    };
  }
};
</script>

<style scoped lang="scss">
#auto {
  background-color: #f1f2f6;
  height: 748px;
  .auto-info {
    width: 1440px;
    padding-top: 80px;
    h1 {
      font-size: 64px;
      font-weight: bold;
      color: #0001ea;
      letter-spacing: -2.37px;
    }
    p {
      font-size: 20px;
    }
    button {
      background-color: #e51b56;
      border-radius: 11px;
      color: #fff;
      font-size: 15px;
      width: 353px;
      height: 48px;
      text-transform: uppercase;
    }
  }
  .auto-box {
    width: 500px;
    height: 417px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    h3 {
      color: #333333;
      font-size: 14px;
      font-weight: bold;
      text-transform: uppercase;
    }
    .ranges {
      display: flex;
      .input {
        // h: 36px;
        width: 70%;
        .range-start {
          padding-right: 40%;
        }
      }
      .range-text {
        width: 109px;
        height: 36px;
        color: #333333;
        border-radius: 3px;
        border: solid 1px #eeeeee;
        background-color: #f1f2f6;
        span {
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
    .block {
      -webkit-appearance: none;
      width: 95%;
      height: 7px;
      border-radius: 3.5px;
      background: #0001ea;
      outline: none;
      opacity: 0.7;
      -webkit-transition: 0.2s;
      transition: opacity 0.2s;
    }
    .block::-webkit-slider-thumb {
      -webkit-appearance: none; /* Override default look */
      appearance: none;
      width: 20px; /* Set a specific slider handle width */
      height: 21px; /* Slider handle height */
      background: linear-gradient(
        to bottom,
        #6869f5,
        #0001ea
      ); /* Green background */
      cursor: pointer; /* Cursor on hover */
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
      border: solid 2px #ffffff;
      border-radius: 50%;
    }
    .nav-tabs {
      .nav-item {
        // background-color: #0001ea;
        height: 34px;
        width: 226px;
        border-radius: 3px;
        .active {
          background-color: #0001ea;
          color: #fff;
          font-size: 16px;
          font-weight: bold;
          // width: 80px;
        }
      }
    }
  }
  .auto-img {
    position: absolute;
    top: 400px;
    left: 0px;
  }
}
</style>
