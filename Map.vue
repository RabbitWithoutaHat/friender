<template>
   <div>
      <div>{{this.$store.state.startLat}}</div>
      <div>{{this.$store.state.startLon}}</div>
      <div ></div>
   </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: 'Location',
  methods: {
    ...mapMutations(["currentLoccation"]),
  },
  mounted() {window.onload = () => {
    let startPos;
    const geoSuccess = (position) => {
      startPos = position;
      const lat = startPos.coords.latitude
      const lng = startPos.coords.longitude
      this.currentLoccation({lat, lng})
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);

    };
  },

}
</script>


<style>

    </style>
