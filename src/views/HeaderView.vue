<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <RouterLink to="/" class="navbar-brand" aria-current="page"
          >DemoAppVue</RouterLink
        >
        <b-button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </b-button>
        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink to="/users" class="nav-link" aria-current="page"
                >Users</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink to="/posts" class="nav-link" aria-current="page"
                >Posts</RouterLink
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
  components: {},
  setup() {
    const store = useStore();
    // console.log(store, store.getters['auth/isLoggedIn']);

    const isLoggedIn = computed(() => store.getters['auth/isLoggedIn']);

    const login = () => {
      store.dispatch('auth/login');
    };

    const logout = () => {
      store.dispatch('auth/logout');
    };

    return { login, logout, isLoggedIn };
  },
});
</script>

<style scoped lang="scss">
header {
  margin-bottom: 20px;
}
</style>
