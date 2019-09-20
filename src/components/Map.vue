<template>
   <div>
      <div>{{this.$store.state.startLat}}</div>
      <div>{{this.$store.state.startLon}}</div>
      <div ref="map" class="map"></div>
   </div>
</template>

<script>
import { mapMutations } from "vuex";
import gmapsInit from '../utils/gmaps';
export default {
  name: 'Location',
  methods: {
    ...mapMutations(["currentLoccation"]),
    onload() {
    let startPos;
    const geoSuccess = (position) => {
      startPos = position;
      const lat = startPos.coords.latitude
      const lng = startPos.coords.longitude
      this.currentLoccation({lat, lng})
    };
      navigator.geolocation.getCurrentPosition(geoSuccess);
    }
  },
  async mounted() {
    await this.onload();
    const latlng = {lat: this.$store.state.startLat, lng: this.$store.state.startLon};
    try {
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(this.$refs.map);

      geocoder.geocode({ location: {lat: this.$store.state.startLat, lng: this.$store.state.startLon} }, (results, status) => {
        if (status !== 'OK' || !results[0]) {
          throw new Error(status);
        }
        const locations = [
        {
          position: {
            lat: 55.712471799999996,
            lng: 37.591457599999996,
          },
        },
      ];
        map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.viewport);
        const markers = locations.map(x => new google.maps.Marker({ ...x, map }));
      });

    } catch (error) {
      console.error(error);
    }
  },

}
</script>


<style>
.map {
  width: 99vw;
  height: 77vh;
}
    </style>
