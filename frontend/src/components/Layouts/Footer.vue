<template>
  <footer class="page-footer pt-4">
    <div class="container-fluid text-center text-md-left mt-4">
      <div class="row" id="footer-wrap">
        <div class="col-md-4 mt-md-0 mt-3 ml-auto">
          <img src="@/assets/images/Group5Copy.png" class="logo" />
          <p class="mt-5">© 2021 TEZ LOMBARD</p>
        </div>
        <div class="col-md-3 mb-md-0 mb-3">
          <h4>Филиалы по всему Казахстану</h4>

          <ul class="list-unstyled">
            <li>
              <a href="#!">Найти ближайший</a>
            </li>
          </ul>
          <a href="http://test.tezlombard.kz/media/Pravila_MK_TEZ_LOMBARD.pdf" target="_blank" style="color: white; text-decoration: underline;"> Правила предоставления микрокредитов </a>
        </div>
        <div class="col-md-2 mb-md-0 mb-3">
          <h4>С 09:00 до 21:00</h4>

          <ul class="list-unstyled">
            <li>
              Без выходных
            </li>
          </ul>
          <a href="tel:88000807171" style="color: white;">8 800 080 71 71</a>
        </div>
        <div class="col-md-2 mb-md-0 mb-3"></div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>
<style scoped lang="scss">
@import "../../assets/style/variables";
footer {
  background-color: #002e90;
  color: #fff;
  height: $footer-desctop-height;
  p {
    font-size: 16px;
  }
  h4 {
    font-size: 14px;
    font-weight: bold;
  }
  ul {
    li {
      font-size: 14px;
      a {
        font-size: 14px;
        color: #fff;
        text-decoration: underline;
      }
    }
  }
}
@media only screen and (max-width: 700px) {
  footer {
    height: $footer-mobile-height;
    overflow: hidden;
    .logo {
      width: 150px;
      // height: 100%;
    }
  }
}
@media (max-width: 1000px) and (min-width: 600px) {
  #footer-wrap {
    align-items: flex-end;
  }
}
</style>
