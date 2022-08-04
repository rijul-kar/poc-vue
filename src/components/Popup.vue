<script lang="ts">
import { ref, defineComponent, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
export default defineComponent({
  props: {
    show: { type: Boolean, required: true },
    redirect: { type: Boolean },
    variant: { type: String, required: true },
  },
  emits: ['hide'],
  setup(props, ctx) {
    const router = useRouter();
    const modalTarget = ref<HTMLButtonElement | null>(null);
    const randomPopupId = `example_modal_popup_${Math.floor(
      Math.random() * 10
    )}`;

    const executeSecondary = () => {
      ctx.emit('hide', false);
      if (props.redirect) {
        router.push({ path: '/users' });
      }
    };

    watch(
      () => props.show,
      (newVal) => {
        if (newVal && !modalTarget.value) {
          setTimeout(() => {
            modalTarget.value!.click();
          }, 0);
        }
      },
      {
        immediate: true,
      }
    );

    return { props, modalTarget, randomPopupId, executeSecondary };
  },
});
</script>

<template>
  <Teleport to="body" v-if="props.show">
    <div :id="randomPopupId" class="modal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div
            class="modal-header text-light"
            :class="{
              'bg-primary': props.variant == 'primary',
              'bg-success': props.variant == 'success',
              'bg-warning': props.variant == 'warning',
              'bg-danger': props.variant == 'danger',
            }"
          >
            <h5 class="modal-title">
              <slot name="title"> Success </slot>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="$emit('hide', false)"
            ></button>
          </div>
          <div class="modal-body">
            <slot name="body">
              <p>Your data saved</p>
            </slot>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="$emit('hide', false)"
            >
              Close
            </button>
            <slot name="footer">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                @click="executeSecondary()"
              >
                <slot name="btnSecondary">Save changes</slot>
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
    <button
      :style="{ display: 'none' }"
      ref="modalTarget"
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      :data-bs-target="'#' + randomPopupId"
    >
      Launch demo modal
    </button>
  </Teleport>
</template>

<!-- State management -->
