<template>
  <!-- {{ users.data }} -->
  <div class="users">
    <b-card
      v-for="user in users"
      :key="user.id"
      :title="
        UpperCaseFirstChar(user.title) +
        ' ' +
        user.firstName +
        ' ' +
        user.lastName
      "
      :img-src="user.picture"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem"
      class="mb-2 img-class"
    >
      <b-card-text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </b-card-text>

      <b-button :href="'/user/' + user.id" variant="primary">Edit</b-button>
    </b-card>
  </div>
</template>

<script lang="ts">
import {
  ref,
  reactive,
  onMounted,
  defineComponent,
  computed,
  onUnmounted,
  onUpdated,
  onBeforeMount,
} from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
  props: {},
  setup(props) {
    const scrollState = ref(true);
    const store = useStore();
    onBeforeMount(() => {
      store.dispatch('users/fetchFirst'); // dispatch actions
    });
    onMounted(() => {
      window.addEventListener('scroll', scrollHandler, false);
    });
    onUnmounted(() => {
      window.removeEventListener('scroll', () => {}, true);
    });
    onUpdated(() => {});
    const users = computed(() => store.getters['users/all']); //retrieval from getters through computed

    const scrollHandler = () => {
      if (
        scrollState.value &&
        window.scrollY > 0 &&
        Math.ceil(window.scrollY + window.innerHeight) >=
          document.documentElement.scrollHeight
      ) {
        store.dispatch('users/loadMoreUsers'); // dispatch actions
      }
    };

    const UpperCaseFirstChar = (string: string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return { users, UpperCaseFirstChar, store };
  },
});
</script>

<style scoped>
.users {
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 4px;
}

.img-class img.card-img-top {
  height: 170px;
  width: 170px;
  margin: 0 auto;
}
</style>
