<script>
import { cityIcon, affiliateIcon } from "@/constants/markerSettings";
export default {
  props: {
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
    marker: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      contentString: "ajsajdjasdjasdj"
    };
  },
  mounted() {
    const marker = new this.google.maps.Marker({
      position: this.marker.position,
      marker: this.marker,
      map: this.map,
      icon: this.type === "city" ? cityIcon : affiliateIcon
    });

    const infoWindow = new this.google.maps.InfoWindow({
      content: this.contentString
    });

    marker.addListener("click", function() {
      infoWindow.open(this.map, this.marker);
    });
  },
  watch: {
    marker() {
      console.log("watch");
    }
  },

  render(h) {
    return h;
  }
};
</script>
