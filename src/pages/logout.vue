<template>
</template>
<script lang="ts">
import Vue from 'vue'
import { authsStore } from '~/store'
export default Vue.extend({
  created() {
    this.$fire.auth
      .signOut()
      .then(() => {
        authsStore.setUser(null)
        this.$router.push("/")

        const nil: any = null
        this.$fire.analytics.setUserId(nil)
      })
      .catch(error => {
        alert(error)
      })
  }
})
</script>
