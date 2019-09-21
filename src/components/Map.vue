<template>
   <div>
      <!-- <div>{{this.$store.state.lat}}</div>
      <div>{{this.$store.state.lng}}</div> -->
      <div ref="map" class="map"></div>
   </div>
</template>

<script>
import { mapMutations } from "vuex";
import MarkerClusterer from '@google/markerclusterer';
import gmapsInit from '../utils/gmaps';
import axios from 'axios'
export default {
  name: 'Location',
  data() {
    return {
      locations: [],
      titles: [],
      content: [],
    }
  },
  methods: {
    getUsersInfo(){
      axios.post(`http://localhost:3000/usersPosition`)
          .then((response) => {
            console.log(response.data);

           response.data.map((user) => {
             console.log(user.position);

             this.locations.push(user)
             this.content.push(user.content)
             this.titles.push(user.title)
           });

          })
    }
  },
  async mounted() {
    await this.getUsersInfo();
    const latlng = {lat: this.$store.state.lat, lng: this.$store.state.lng};
    try {
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(this.$refs.map);

      geocoder.geocode({ location: {lat: this.$store.state.lat, lng: this.$store.state.lng} }, (results, status) => {
        if (status !== 'OK' || !results[0]) {
          throw new Error(status);
        }


        map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.viewport);
        map.setZoom(13)


        const markerClickHandler = (marker) => {
        map.setZoom(14);
        // map.setCenter(marker.getPosition());
        };
        console.log(this.locations);

        const markers = this.locations.map((location) => {
          console.log(location);

          const marker = new google.maps.Marker({ ...location, map, title: 's;ld' });
          const infowindow = new google.maps.InfoWindow({
          content: `<h5>${location.title}</h5><div class="bodyContent">${location.content}</div>`,
          maxWidth: 600
          });
          marker.addListener('click', () => {
            markerClickHandler(marker)
            infowindow.open(map, marker)
            });
          google.maps.event.addListener(map, "click", function(event) {
            infowindow.close();
        });
          return marker;
        });

      //   new MarkerClusterer(map, markers, {
      //   imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
      // });

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
.bodyContent {
  font-size: 20px;
}
</style>
