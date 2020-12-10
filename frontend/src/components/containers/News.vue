<template>
  <section id="news">
    <div
      id="carouselExampleControls"
      class="carousel slide"
      data-ride="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-news carousel-item active">
          <div class="row ">
            <div class="col-6 ml-auto">
              <h1>ТЕКСТ АКЦИИ НОВОСТИ</h1>
            </div>
            <div class="col-5">
              <img src="https://placeimg.com/200/200/any?1" />
            </div>
          </div>
        </div>
        <div class="carousel-news carousel-item">
          <div class="row">
            <div class="col-6 ml-auto">
              <h1>ТЕКСТ АКЦИИ НОВОСТИ</h1>
            </div>
            <div class="col-5">
              <img src="https://placeimg.com/200/200/any?1" />
            </div>
          </div>
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleControls"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleControls"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    <div class="triangle"></div>
  </section>
</template>

<script>
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  name: "News",
  data() {
    return {
      slickOptions: {
        infinite: false,
        speed: 500,
        slidesToShow: 1
      },
      blocks: 10000,
      months: 3
    };
  },
  components: {}
};
</script>

<style scoped lang="scss">
#news {
  height: 690px;
  // width: 100%;
  h1 {
    font-size: 80px;
    font-weight: bold;
    color: #2b2a29;
    width: 523px;
  }
  .carousel {
    height: 100%;
    width: 1240px;
    margin: auto;
    .carousel-news {
      padding-top: 180px;
    }
    .carousel-control-prev {
      height: 40px;
      width: 40px;
      top: 45%;
      border-radius: 50%;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
      background-color: #ffffff;
      span {
        width: 6px;
        height: 6px;
        border: solid 2px #e41c3c;
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 3px;
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
        background-image: none;
      }
    }
    .carousel-control-next {
      height: 40px;
      width: 40px;
      top: 45%;
      border-radius: 50%;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
      background-color: #ffffff;
      span {
        width: 6px;
        height: 6px;
        border: solid 2px #e41c3c;
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 3px;
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
        background-image: none;
      }
    }
  }
  .triangle {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0px 120px 31vw;
    border-color: transparent transparent #002e90 transparent;
    top: 680px;
    left: 69%;
  }
}
</style>
