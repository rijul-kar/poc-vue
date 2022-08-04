<script lang="ts">
import { defineComponent, computed } from 'vue';
import HeaderView from './views/HeaderView.vue';
import ContainerView from './views/ContainerView.vue';
import { useStore } from 'vuex';

export default defineComponent({
  components: { HeaderView, ContainerView },
  setup() {
    const store = useStore();

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

<template>
  <!-- <template v-if="isLoggedIn"> -->
  <HeaderView />
  <ContainerView />
  <!-- <button @click="logout">logout</button>
  </template>
  <div v-else>
    <p class="p-logut">You have been logged out</p>
    <button @click="login">Login</button>
  </div> -->
</template>

<style scoped>
.p-logout {
  text-align: center;
}
</style>
