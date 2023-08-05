<template>
  <v-footer>
    <v-card class="flex" flat tile>
      <v-card-text class="py-2 text-center">
        {{ new Date().getFullYear() }} — <strong>Wahyu Septiadi Fajri</strong>
        <v-spacer></v-spacer>
        <!-- <v-btn v-for="icon in icons" :key="icon" class="mx-2" black icon>
          <v-icon size="20px">
            {{ icon }}
          </v-icon>
        </v-btn> -->
        <v-btn icon black>  
          <a href="#"><v-icon>mdi-facebook</v-icon></a>
        </v-btn>
        <v-btn icon>
          <a href="#"><v-icon>mdi-twitter</v-icon></a>
        </v-btn>
        <v-btn icon>
          <a href="https://www.linkedin.com/in/wahyu-septiadi-fajri-/"><v-icon>mdi-linkedin</v-icon></a>
        </v-btn>
        <v-btn icon>
          <a href="https://www.instagram.com/hyuuue_11/"><v-icon>mdi-instagram</v-icon></a>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  // data: () => ({
  //   icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  // }),
};
</script>

<style></style>
