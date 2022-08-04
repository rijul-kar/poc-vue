<template>
  <b-card no-body class="overflow-hidden">
    <template v-if="show">
      <b-row class="g-0">
        <b-col md="6">
          <div class="card-body">
            <b-row>
              <b-form @submit.prevent="onFormSubmit" @reset="onFormReset">
                <p v-if="errors.length" class="list-error">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>
                </p>
                <!-- title -->
                <b-form-group
                  id="input-group-1"
                  label="Title:"
                  label-for="input-1"
                >
                  <select
                    v-model="user.title"
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Select title</option>
                    <option value="mr">Mr.</option>
                    <option value="mrs">Mrs.</option>
                    <option value="ms">Ms.</option>
                    <option value="miss">Miss.</option>
                  </select>
                </b-form-group>
                <!-- fname -->
                <b-form-group
                  id="input-group-2"
                  label="First Name:"
                  label-for="input-2"
                >
                  <b-form-input
                    v-model="user.firstName"
                    id="input-2"
                    placeholder="Enter First name"
                    
                  ></b-form-input>
                </b-form-group>
                <!-- lname -->
                <b-form-group
                  id="input-group-2"
                  label="Last Name:"
                  label-for="input-2"
                >
                  <b-form-input
                    v-model="user.lastName"
                    id="input-2"
                    placeholder="Enter Last name"
                    
                  ></b-form-input>
                </b-form-group>
                <!-- gender -->
                <b-form-group
                  id="input-group-2"
                  label="Gender:"
                  label-for="radio-group-2"
                >
                  <div
                    class="btn-group"
                    role="group"
                    aria-label="Basic radio toggle button group"
                  >
                    <input
                      type="radio"
                      class="btn-check"
                      name="gender"
                      id="btnradio1"
                      autocomplete="off"
                      v-model="user.gender"
                      value="male"
                    />
                    <label class="btn btn-outline-primary" for="btnradio1"
                      >Male</label
                    >

                    <input
                      type="radio"
                      class="btn-check"
                      name="gender"
                      id="btnradio2"
                      autocomplete="off"
                      v-model="user.gender"
                      value="female"
                    />
                    <label class="btn btn-outline-primary" for="btnradio2"
                      >Female</label
                    >
                  </div>
                </b-form-group>
                <!-- avatar -->
                <b-form-group
                  id="input-group-2"
                  label="Upload Avatar:"
                  label-for="radio-group-2"
                >
                  <div v-image-drag-drop-upload class="avtr-">
                    <div class="avtr-overlay"></div>
                    <p class="avtr-para hide">Drop an Image</p>
                    <img :src="user.picture" class="img-thumbnail" />
                  </div>
                  <div class="input-group avatar-input-grp">
                    <input
                      @change.prevent="avatarUplaod"
                      type="file"
                      class="form-control"
                      id="inputGroupFile04"
                      aria-describedby="inputGroupFileAddon04"
                      aria-label="Upload"
                    />
                  </div>
                  <div>
                    <span class="file-info"
                      >Or Drag and Drop the File(Blue Border Area).</span
                    >
                  </div>
                </b-form-group>
                <!-- email -->
                <b-form-group
                  id="input-group-2"
                  label="Email:"
                  label-for="radio-group-2"
                >
                  <b-form-input
                  :type="'email'"
                    v-model="user.email"
                    id="input-2"
                    placeholder="Enter Email"
                    
                  ></b-form-input>
                </b-form-group>
                <!-- dob -->
                <b-form-group
                  id="input-group-2"
                  label="Date of Birth:"
                  label-for="radio-group-2"
                >
                  <Datepicker v-model="user.dateOfBirth"></Datepicker>
                </b-form-group>
                <!-- phone -->
                <b-form-group
                  id="input-group-2"
                  label="Phone:"
                  label-for="radio-group-2"
                >
                  <b-form-input
                  :type="'number'"
                    v-model="user.phone"
                    id="input-2"
                    placeholder="Enter Phone"
                  ></b-form-input>
                </b-form-group>
                <b-button class="form-btns" type="submit" variant="primary"
                  >Submit</b-button
                >
                <b-button class="form-btns" type="reset" variant="danger"
                  >Reset</b-button
                >
              </b-form>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </template>
  </b-card>
  <Popup
    :show="showPopup.show"
    :variant="showPopup.variant"
    @hide="(flag:boolean)=>showPopup.show = flag"
    :redirect="true"
  >
    <template v-slot:title>{{ showPopup.title }}</template>
    <template v-slot:body> {{ showPopup.body }}</template>
    <template v-slot:footer> </template>
    <template v-slot:btnSecondary>Redirect to User's List </template>
  </Popup>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from 'vue';
import { UserDetail } from '../../interface/users';
import { useRouter, useRoute } from 'vue-router';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import directive from '../../directives/index';
import Popup from '../Popup.vue';
import { useStore } from 'vuex';
import { computed } from '@vue/reactivity';
export default defineComponent({
  props: {},
  components: { Datepicker, Popup },
  directives: directive,
  setup(props) {
    // const router = useRouter();
    const route = useRoute();
    const show = ref(false);
    let showPopup = ref({
      show: false,
      variant: 'primary',
      title: '',
      body: '',
      footer: '',
    });
    const store = useStore();
    let user = ref<any>({});

    watch(
      () => route.params.userId,
      (newId) => {
        if (newId) {
          store.dispatch('users/getUser', { id: newId }).then((res) => {
            user.value = store.getters['users/user'];
            show.value = true;
          });
        }
      },
      {
        immediate: true,
      }
    );

    // image url transform
    const transformAvatar = (url: string) => {
      if (url.indexOf('base64') > -1) return url;
      let splitted = url.split('portraits');
      return (
        splitted[0] + `portraits/lego/${Math.floor(Math.random() * 10)}.jpg`
      );
    };

    const errors = computed(() => store.getters['users/error']);

    const onFormSubmit = (e: Event) => {
      store.dispatch('users/validate');
       if(!errors.value.length){
        store.dispatch('users/updatedUsers');
        showPopup.value.variant = 'success';
        showPopup.value.title = 'Success!';
        showPopup.value.body = 'Your data saved successfully!';
        showPopup.value.show = true;
       }      
    };

    const onFormReset = (e: Event) => {
      store.dispatch('users/reset');
    };

    // image upload
    const avatarUplaod = (e: Event | any) => {
      const file = <File>e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', (e1) => {
        user.value.picture = (e1.target as FileReader).result as string;
      });
      reader.readAsDataURL(file);
    };

    return {
      user,
      errors,
      show,
      transformAvatar,
      onFormSubmit,
      onFormReset,
      avatarUplaod,
      showPopup,
    };
  },
});
</script>

<style scoped>
.avtr- {
  position: relative;
  outline: 2px solid #0d6efd;
}
.avtr-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.avtr-para {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.hide {
  display: none;
}
.show {
  display: block;
}
.user-avatar {
  margin: auto;
  display: block;
  width: 83%;
}
button.form-btns {
  margin-right: 5px;
}
.avatar-input-grp {
  margin-top: 18px;
}
.img-thumbnail {
  width: 75%;
}
.dotted-outline {
  outline: 2px red dotted;
}
.backgroundDDD {
  background: #ddd;
}

.file-info {
  color: #0d6efd;
}

.list-error {
  color: red;
}
</style>
