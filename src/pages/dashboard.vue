<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Test
        </v-card-title>
        <v-card-text>
          <p>
            てすと
          </p>
          <p>
            <button @click="fetchGraph()">
              <img
                src="~/assets/svg/icons8-google-white.svg?inline"
                height="30px"
                width="30px"
                alt
              />
              Googleではじめる
            </button>
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/inspire"> Continue </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { authsStore } from '~/store'
import Swal from 'sweetalert2'
export default Vue.extend({
  layout: 'nonavbar',
  methods: {
    async fetchGraph() {
      const fetchGraph = this.$fire.functions.httpsCallable('fetchGraph')
      try {
        const data = await fetchGraph({ })
        await Swal.fire({
          icon: "success",
          title: "成功しました!",
          html: `<textarea style="width: 100%; height: 300px;" rows="16" readonly>${JSON.stringify(
            data,
            null,
            "  "
          )}</textarea>`,
          confirmButtonColor: "#4c7b57",
          confirmButtonText: "戻る"
        })
      } catch (err) {
        await Swal.fire({
          icon: "error",
          title: "失敗しました",
          html: `サーバーに接続できませんでした...<br><br><textarea style="width: 100%; height: 300px;" class="textarea" readonly>${JSON.stringify(
            err,
            null,
            "  "
          )}</textarea>`,
          confirmButtonColor: "#4c7b57",
          confirmButtonText: "戻る"
        })
      }
    },
  },
})
</script>
