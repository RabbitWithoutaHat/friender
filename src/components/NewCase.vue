<template><div class="row col s6 offset-s3">
   <form @submit.prevent="newCase" class="container mt-5 col s6 offset-s3">
      <input v-model="title" type="text" name="" id="" placeholder="Я хочу..." maxlength="70" required>

      <textarea v-model="content" id="textarea1" class="materialize-textarea" placeholder="Подробнее" required></textarea>
          <label for="textarea1"></label>

      <div class="file-field input-field">
      <div class="btn">
        <span>Фото</span>
        <input type="file">
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" type="text">
      </div>
         <button class="btn waves-effect waves-light  col newCaseButton" type="submit" name="action">Submit
         <i class="material-icons right">send</i>
         </button>
    </div>
   </form>
   </div>
</template>


<style>
input[type=text]:not(.browser-default), textarea.materialize-textarea {
   font-size: 28px;
}
.newCaseButton {
   margin-left: 88%;
}
</style>

<script>
import axios from 'axios'
import { mapMutations } from "vuex";
export default {
   name: 'NewCase',
   data() {
      return {
         title: '',
         content: '',
      }
   },

   methods: {
      ...mapMutations(["loginToggle"]),
      newCase() {
         axios.post(`http://localhost:3000/new`, {
          title: this.title,
          content: this.content,
      },{ withCredentials: true })
      .then(res => {
          this.$router.push('/map');
        })
      },

   }
}
</script>
