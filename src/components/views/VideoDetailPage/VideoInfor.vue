<script setup>
import { ref } from "vue";
import SubcribeButton from "../../Button/SubcribeButton.vue";
import { useDetailVideoStore } from "../../../stores/useDetailVideo";
import { formatViews } from "../../../composables/formatViews";
import { formatDate } from "../../../composables/formatDate";
import { renderHTML } from "../../../composables/renderHtml";
const { state } = useDetailVideoStore();
const isOpenDescript = ref(false);
const showDescription = () => {
  isOpenDescript.value = true;
};
const closeDescription = () => {
  isOpenDescript.value = false;
};
</script>
<template>
  <div class="mt-5">
    <h2 class="font-medium text-xl text-[#f1f1f1] cursor-text">
      {{ state.isDetailVideos.title }}
    </h2>

    <div class="mt-5 flex justify-between items-center">
      <div class="flex items-center">
        <div class="max-w-[40px] max-h-[40px]">
          <router-link :to="state.isDetailVideos.uploaderUrl">
            <img
              :src="state.isDetailVideos?.uploaderAvatar"
              alt="avatar author"
              class="w-full h-full rounded-full bg-[#313131] text-[9px]"
            />
          </router-link>
        </div>
        <div class="ml-4">
          <router-link :to="state.isDetailVideos.uploaderUrl">
            <div class="flex items-center">
              <h3 class="text-[#f1f1f1] text-base font-medium">
                {{ state.isDetailVideos.uploader }}
              </h3>
              <div
                class="max-w-[14px] ml-[4px] translate-y-[0.5px]"
                v-if="state.isDetailVideos.uploaderVerified"
              >
                <svg
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  focusable="false"
                  style="
                    pointer-events: none;
                    display: block;
                    width: 100%;
                    height: 100%;
                  "
                >
                  <path
                    fill="white"
                    d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z"
                  ></path>
                </svg>
              </div>
            </div>
          </router-link>

          <div class="text-[#aaaaaa] text-[13px] flex items-center">
            <p class="mr-1">
              {{
                state.isDetailVideos.uploaderSubscriberCount
                  ? formatViews(state.isDetailVideos.uploaderSubscriberCount)
                  : ""
              }}
            </p>
            <p>người đăng ký</p>
          </div>
        </div>

        <div class="ml-5"><SubcribeButton /></div>
      </div>
      <div class="flex items-center">
        <div
          class="flex items-center bg-[#2a2a2a] max-h-[36px] rounded-full cursor-pointer"
        >
          <div
            class="flex items-center h-full max-h-[36px] rounded-l-full hover:bg-[#3f3f3f]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 270 270"
              width="70"
              height="70"
              preserveAspectRatio="xMidYMid meet"
              style="transform: translateX(-10px)"
            >
              <defs>
                <clipPath id="__lottie_element_41">
                  <rect width="270" height="270" x="0" y="0"></rect>
                </clipPath>
                <clipPath id="__lottie_element_43">
                  <path d="M0,0 L120,0 L120,120 L0,120z"></path>
                </clipPath>
                <clipPath id="__lottie_element_57">
                  <path d="M0,0 L128,0 L128,128 L0,128z"></path>
                </clipPath>
              </defs>
              <g clip-path="url(#__lottie_element_41)">
                <g clip-path="url(#__lottie_element_57)" style="display: none">
                  <g style="display: none">
                    <g>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="miter"
                        fill-opacity="0"
                        stroke-miterlimit="4"
                      ></path>
                    </g>
                  </g>
                  <g style="display: none">
                    <g>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="miter"
                        fill-opacity="0"
                        stroke-miterlimit="4"
                      ></path>
                    </g>
                  </g>
                  <g style="display: none">
                    <g><path></path></g>
                    <g><path></path></g>
                    <g><path></path></g>
                    <g><path></path></g>
                    <g><path></path></g>
                    <g><path></path></g>
                  </g>
                  <g style="display: none">
                    <g>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="miter"
                        fill-opacity="0"
                        stroke-miterlimit="4"
                      ></path>
                    </g>
                  </g>
                  <g style="display: none">
                    <g>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="miter"
                        fill-opacity="0"
                        stroke-miterlimit="4"
                      ></path>
                    </g>
                  </g>
                  <g style="display: none">
                    <g><path></path></g>
                    <g><path></path></g>
                    <g><path></path></g>
                    <g><path></path></g>
                    <g><path></path></g>
                    <g><path></path></g>
                  </g>
                  <g style="display: none">
                    <g>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="miter"
                        fill-opacity="0"
                        stroke-miterlimit="4"
                      ></path>
                    </g>
                  </g>
                  <g style="display: none">
                    <g>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="miter"
                        fill-opacity="0"
                        stroke-miterlimit="4"
                      ></path>
                    </g>
                  </g>
                  <g style="display: none">
                    <g><path></path></g>
                    <g><path></path></g>
                    <g><path></path></g>
                    <g><path></path></g>
                    <g><path></path></g>
                    <g><path></path></g>
                    <g><path></path></g>
                    <g><path></path></g>
                    <g><path></path></g>
                  </g>
                  <g style="display: none">
                    <g>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="miter"
                        fill-opacity="0"
                        stroke-miterlimit="4"
                      ></path>
                    </g>
                  </g>
                </g>
                <g
                  clip-path="url(#__lottie_element_43)"
                  transform="matrix(1.0880000591278076,0,0,1.0880000591278076,69.95299530029297,67.9433822631836)"
                  opacity="1"
                  style="display: block"
                >
                  <g style="display: none">
                    <path></path>
                    <path
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      fill-opacity="0"
                      stroke-miterlimit="4"
                    ></path>
                  </g>
                  <g
                    transform="matrix(1,0,0,1,60,60)"
                    opacity="1"
                    style="display: block"
                  >
                    <path
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      fill-opacity="0"
                      stroke-miterlimit="4"
                      stroke="rgb(255,255,255)"
                      stroke-opacity="1"
                      stroke-width="4"
                      d=" M25.025999069213867,-4.00600004196167 C25.025999069213867,-4.00600004196167 5.992000102996826,-3.996999979019165 5.992000102996826,-3.996999979019165 C5.992000102996826,-3.996999979019165 11.012999534606934,-22.983999252319336 11.012999534606934,-22.983999252319336 C12.230999946594238,-26.90399932861328 13,-31.94300079345703 8.994000434875488,-31.981000900268555 C7,-32 5,-32 4.021999835968018,-31.007999420166016 C4.021999835968018,-31.007999420166016 -19.993000030517578,-5.03000020980835 -19.993000030517578,-5.03000020980835 C-19.993000030517578,-5.03000020980835 -20.027999877929688,32.025001525878906 -20.027999877929688,32.025001525878906 C-20.027999877929688,32.025001525878906 20.97599983215332,31.986000061035156 20.97599983215332,31.986000061035156 C25.010000228881836,31.986000061035156 26.198999404907227,29.562000274658203 26.99799919128418,25.985000610351562 C26.99799919128418,25.985000610351562 31.972000122070312,4.026000022888184 31.972000122070312,4.026000022888184 C33,-0.6930000185966492 30.392000198364258,-4.00600004196167 25.025999069213867,-4.00600004196167z"
                    ></path>
                  </g>
                  <g style="display: none">
                    <path></path>
                    <path
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      fill-opacity="0"
                      stroke-miterlimit="4"
                    ></path>
                  </g>
                  <g
                    transform="matrix(1,0,0,1,60,60)"
                    opacity="1"
                    style="display: block"
                  >
                    <path
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      fill-opacity="0"
                      stroke-miterlimit="4"
                      stroke="rgb(255,255,255)"
                      stroke-opacity="1"
                      stroke-width="4"
                      fill="white"
                      d=" M-19.986000061035156,-4.03000020980835 C-19.986000061035156,-4.03000020980835 -36.020999908447266,-3.996999979019165 -36.020999908447266,-3.996999979019165 C-36.020999908447266,-3.996999979019165 -36.00199890136719,31.993000030517578 -36.00199890136719,31.993000030517578 C-36.00199890136719,31.993000030517578 -20.030000686645508,32.02299880981445 -20.030000686645508,32.02299880981445 C-20.030000686645508,32.02299880981445 -19.986000061035156,-4.03000020980835 -19.986000061035156,-4.03000020980835z"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
            <span
              class="text-[#f1f1f1] text-[15px] ml-[-10px] font-roboto font-medium block translate-x-[-10px]"
            >
              {{ formatViews(state.isDetailVideos.likes) }}
            </span>
          </div>
          <div
            class="w-[50px] h-[36px] max-h-[36px] rounded-r-full hover:bg-[#3f3f3f] flex items-center justify-center relative line-seperate"
          >
            <svg height="24" viewBox="0 0 24 24" width="24" focusable="false">
              <path
                fill="white"
                d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z"
              ></path>
            </svg>
          </div>
        </div>
        <div
          class="flex items-center max-h-[36px] h-[36px] rounded-full px-[15px] cursor-pointer hover:bg-[#3a3a3a] ml-[15px] bg-[#2a2a2a]"
        >
          <div>
            <svg
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              style="color: #fff"
            >
              <path
                fill="white"
                d="M15 5.63 20.66 12 15 18.37V14h-1c-3.96 0-7.14 1-9.75 3.09 1.84-4.07 5.11-6.4 9.89-7.1l.86-.13V5.63M14 3v6C6.22 10.13 3.11 15.33 2 21c2.78-3.97 6.44-6 12-6v6l8-9-8-9z"
              ></path>
            </svg>
          </div>
          <p
            class="font-roboto font-medium block ml-[10px] text-[#f1f1f1] text-[16px]"
          >
            Chia sẻ
          </p>
        </div>
        <div
          class="flex items-center max-h-[36px] h-[36px] rounded-full px-[15px] cursor-pointer hover:bg-[#3a3a3a] ml-[15px] bg-[#2a2a2a]"
        >
          <div>
            <svg
              enable-background="new 0 0 24 24"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              style="pointer-events: none; display: block"
            >
              <path
                fill="white"
                d="m11 7 6 3.5-6 3.5V7zm7 13H4V6H3v15h15v-1zm3-2H6V3h15v15zM7 17h13V4H7v13z"
              ></path>
            </svg>
          </div>
          <p
            class="font-roboto font-medium block ml-[10px] text-[#f1f1f1] text-[16px]"
          >
            Add to playlist
          </p>
        </div>
        <div
          class="flex items-center max-h-[36px] h-[36px] rounded-full px-[15px] cursor-pointer hover:bg-[#3a3a3a] ml-[15px] bg-[#2a2a2a]"
        >
          <div>
            <svg
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              style="
                pointer-events: none;
                display: block;
                width: 100%;
                height: 100%;
                color: white;
              "
            >
              <path
                fill="#fff"
                d="M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z"
              ></path>
            </svg>
          </div>
          <p
            class="font-roboto font-medium block ml-[10px] text-[#f1f1f1] text-[16px]"
          >
            Download
          </p>
        </div>
      </div>
    </div>
    <div
      class="w-full h-[auto] rounded-xl bg-[#272727] mt-[20px] py-[9px] px-[12px] hover:bg-[#3b3b3b] cursor-pointer max-h-[200px] overflow-hidden"
      :class="{ '!max-h-[unset]': isOpenDescript }"
    >
      <div class="flex items-center">
        <p class="inline-block text-[#f1f1f1] font-medium text-[14px]">
          {{
            state.isDetailVideos.views
              ? formatViews(state.isDetailVideos.views)
              : ""
          }}
          <span>lượt xem</span>
        </p>
        <p
          class="inline-block text-[#f1f1f1] font-medium text-[14px] ml-[10px]"
        >
          {{ formatDate(state.isDetailVideos.uploadDate) }}
        </p>
      </div>
      <p
        class="block text-[#f1f1f1] font-large text-[14px] max-h-[65px] line-clamp-3"
        :class="{ '!max-h-[unset]': isOpenDescript }"
        v-html="renderHTML(state.isDetailVideos.description)"
        @click="showDescription"
      ></p>

      <p
        v-if="!isOpenDescript"
        class="block text-[#f1f1f1] font-medium text-[14px] mt-[10px] cursor-pointer hover:text-white duration-300 ease-in"
        @click="showDescription"
      >
        Hiện thêm
      </p>
      <p
        v-if="isOpenDescript"
        class="block text-[#f1f1f1] font-medium text-[14px] mt-[10px] z-[100] cursor-pointer hover:text-white duration-300 ease-in"
        @click="closeDescription"
      >
        Ẩn bớt
      </p>
    </div>
  </div>
</template>

<style scoped>
.line-seperate::before {
  content: "";
  position: absolute;
  width: 1px;
  height: 22px;
  border-radius: 2px;
  left: 0;
  background-color: rgb(228, 226, 226);
}
</style>
