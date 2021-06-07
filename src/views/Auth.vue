<template>
  <div>
    <h1>Authenticating...</h1>
  </div>
</template>

<script>
import store from '@/store';
export default {
  name: 'Auth',
  data() {
    return {
      access_token: String,
      refresh_token: String,
      expires_in: Number
    }
  },
  created() {
    this.access_token = this.$route.query.access_token;
    this.refresh_token = this.$route.query.refresh_token;
    this.expires_in = new Date(this.$route.query.expires_in);

    store.commit("AUTH", {
      access_token: this.access_token,
      refresh_token: this.refresh_token,
      expires_in: this.expires_in
    });

    this.$router.push({ name: 'Recipe'});

  }
}
</script>