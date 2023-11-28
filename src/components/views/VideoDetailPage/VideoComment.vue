<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useDetailVideoStore } from "../../../stores/useDetailVideo";
import { convertRelativeTimeToVietnamese } from "../../../composables/formatDate";
import { useRoute } from "vue-router";
import LoadingComment from "../../Loading/LoadingComment.vue";

const route = useRoute();
const videoId = ref("");
videoId.value = route.query.v;
const {
  state,
  actionGetDetailReplyComments,
  actionGetNextComment,
  actionGetMoreComments,
} = useDetailVideoStore();
watch(
  () => route.query.v,
  (newVideoId) => {
    videoId.value = newVideoId;
  }
);

const isSortComment = ref(false);
const isLoading = ref(false);
const handleSortComment = () => {
  isSortComment.value = !isSortComment.value;
};
const handleReplyComments = async (idVideo, comment) => {
  comment.showingReplies = !comment.showingReplies;
  comment.isLoading = true;

  if (!comment.replies) {
    await actionGetDetailReplyComments(idVideo, comment.repliesPage);
    comment.replies = state.ReplyComments.comments;
  }

  comment.isLoading = false;
};
const handleLoadMoreComments = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  await actionGetMoreComments(videoId.value, state.VideoComments.nextpage);
  isLoading.value = false;
};
const loadMoreComments = async () => {
  if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 100) {
    handleLoadMoreComments();
  }
};

onMounted(async () => {
  window.addEventListener("scroll", loadMoreComments);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", loadMoreComments);
});

const handleViewMore = async (idVideo, nextpage, comment) => {
  if (comment.isLoadingMoreReply) return;
  comment.isLoadingMoreReply = true;
  await actionGetNextComment(idVideo, nextpage);
  comment.isLoadingMoreReply = false;
};
</script>
<template>
  <div class="w-full mt-[20px]">
    <div class="flex items-center" v-if="!state.isDetailVideos.livestream">
      <span class="text-[16px] text-[#f1f1f1] font-roboto font-medium">
        {{ state.VideoComments.commentCount }} bình luận</span
      >
      <div class="flex items-center ml-[40px] relative">
        <div @click="handleSortComment" class="cursor-pointer">
          <svg
            enable-background="new 0 0 24 24"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            focusable="false"
            style="display: block"
          >
            <path
              fill="white"
              d="M21 6H3V5h18v1zm-6 5H3v1h12v-1zm-6 6H3v1h6v-1z"
            ></path>
          </svg>
        </div>

        <span
          class="text-[16px] text-[#f1f1f1] font-roboto font-medium block ml-[10px]"
        >
          Sắp xếp theo
        </span>
        <div
          class="absolute w-[160px] top-[40px] cursor-pointer rounded-xl z-[5] opacity-0 transition-opacity duration-150 ease-in"
          :class="{ 'opacity-100': isSortComment }"
        >
          <p
            class="text-[#f1f1f1] text-[14px] bg-[#434342] font-medium font-roboto block py-[15px] px-[10px] text-center hover:bg-[#636060] duration-100 ease-in"
          >
            Bình luận hàng đầu
          </p>
          <p
            class="text-[#f1f1f1] text-[14px] bg-[#272726] font-medium font-roboto block py-[15px] px-[10px] text-center hover:bg-[#636060] duration-100 ease-in"
          >
            Mới nhất xếp trước
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="w-full mt-[20px]">
    <div class="flex items-center justify-between">
      <div class="">
      
        <div
          class="flex"
          v-for="comment in state.VideoComments.comments"
          :key="comment.commentId"
        >
          <div class="max-w-[40px] max-h-[40px] rounded-full w-[20%] h-[40px] mt-[14px]">
            <router-link :to="comment.commentorUrl">
              <img
                :src="comment.thumbnail"
                alt="avatar user"
                class="w-full h-full rounded-full bg-[#313131] text-transperant"
              />
            </router-link>
          </div>

          <div class="ml-[20px] w-[95%] relative">
            <div class="flex items-center mb-[10px] absolute translate-y-[-10px]" v-if="comment.pinned">
              <div class="mr-2">
                <svg
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  focusable="false"
                  style="
                    pointer-events: none;
                    display: block;
                    width: 14px;
                    height: 14px;
                  "
                >
                  <path
                    fill="white"
                    d="M16 11V3h1V2H7v1h1v8l-2 2v2h5v6l1 1 1-1v-6h5v-2l-2-2zm1 3H7v-.59l1.71-1.71.29-.29V3h6v8.41l.29.29L17 13.41V14z"
                  ></path>
                </svg>
              </div>
              <span
                class="text-[#ccc] text-[11px] block font-semibold cursor-text z-10"
                >{{ state.isDetailVideos.uploader }} đã ghim
              </span>
            </div>
            <div class="flex items-center mt-[14px]">
              <router-link :to="comment.commentorUrl">
                <span
                  class="text-[#f1f1f1] font-medium font-roboto text-[13px] cursor-pointer flex items-center justify-center"
                  :class="{
                    'bg-[#575656] pr-2 pl-2 rounded-full  !font-bold h-[25px]':
                      comment.pinned,
                  }"
                  >{{ comment.author }}</span
                >
              </router-link>
              <div
                class="max-w-[14px] ml-[4px] translate-y-[0.5px]"
                v-if="comment.verified"
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
              <p
                class="text-[#b9b7b7] font-medium font-roboto text-[13px] ml-[10px] translate-y-[1px]"
              >
                {{ convertRelativeTimeToVietnamese(comment.commentedTime) }}
              </p>
            </div>
            <p
              class="block text-[#f1f1f1] mt-[5px] font-large font-roboto text-[14px]"
              v-html="comment.commentText"
            ></p>
            <div class="flex items-center mt-[-10px] ml-[-10px]">
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
                  <g
                    clip-path="url(#__lottie_element_57)"
                    style="display: none"
                  >
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
              <p
                class="text-[#b9b7b7] text-[13px] font-roboto translate-x-[-24px]"
              >
                {{ comment.likeCount }}
              </p>
              <svg height="24" viewBox="0 0 24 24" width="24" focusable="false">
                <path
                  fill="white"
                  d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z"
                ></path>
              </svg>
              <p
                class="text-[#f1f1f1] font-medium ml-[20px] text-[13px] font-roboto cursor-pointer"
              >
                Phản hồi
              </p>
            </div>
            <div
              v-if="comment.repliesPage"
              @click="handleReplyComments(videoId, comment)"
              class="mb-[14px] cursor-pointer hover:bg-[#3ea5ff56] duration-200 ease-in inline-block py-[10px] px-[15px] rounded-full"
            >
              <h1
                class="text-[#3ea6ff] text-[14px] flex items-center font-roboto font-medium"
              >
                <i
                  class="fa-solid fa-angle-down block mr-[10px] text-[16px]"
                ></i>
                {{ comment.replyCount }} phản hồi
              </h1>
            </div>

            <!-- spinner -->
            <div
              v-if="comment.isLoading"
              class="h-[50px] flex items-center translate-y-[-20px] justify-center"
            >
              <LoadingComment />
            </div>

            <!-- reply part -->
            <div class="mt-3" v-if="comment.showingReplies">
              <div>
                <div
                  class="flex mt-[-15px]"
                  v-for="reply in comment.replies"
                  :key="reply.commentId"
                >
                  <div
                    class="max-w-[28px] max-h-[28px] h-[28px] rounded-full w-[20%]"
                  >
                    <img
                      :src="reply.thumbnail"
                      alt="avatar user"
                      class="w-full h-full rounded-full bg-[#313131]"
                    />
                  </div>
                  <div class="ml-[20px] w-[90%]">
                    <div class="flex items-center">
                      <h4
                        class="text-white font-roboto text-[14px] font-medium"
                      >
                        {{ reply.author }}
                      </h4>
                      <p
                        class="text-[12px] font-roboto font-large text-[#b9b7b7] ml-[10px]"
                      >
                        {{
                          convertRelativeTimeToVietnamese(reply.commentedTime)
                        }}
                      </p>
                    </div>
                    <p
                      class="text-white text-[15px] font-roboto font-large mt-[2px]"
                      v-html="reply.commentText"
                    ></p>
                    <div class="flex items-center mt-[-10px] ml-[-10px]">
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
                          <g
                            clip-path="url(#__lottie_element_57)"
                            style="display: none"
                          >
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
                      <p
                        class="text-[#b9b7b7] text-[13px] font-roboto translate-x-[-24px]"
                      >
                        {{ reply.likeCount }}
                      </p>
                      <svg
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        focusable="false"
                      >
                        <path
                          fill="white"
                          d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z"
                        ></path>
                      </svg>
                      <p
                        class="text-[#f1f1f1] font-medium ml-[10px] text-[13px] font-roboto cursor-pointer"
                      >
                        Phản hồi
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  v-if="state.ReplyComments.nextpage"
                  @click="
                    handleViewMore(
                      videoId,
                      state.ReplyComments.nextpage,
                      comment
                    )
                  "
                  class="h-[36px] rounded-full text-center mb-[20px] flex items-center justify-center max-w-[178px] cursor-pointer hover:bg-[#35536e] duration-300 ease-in"
                >
                  <h1
                    class="text-[#3ea6ff] text-[14px] flex items-center font-roboto font-medium cursor-pointer"
                  >
                    <i
                      class="fa-solid fa-angle-down block mr-[10px] text-[16px]"
                    ></i>
                    Hiện thêm phản hồi
                  </h1>
                </div>
                <div
                  class="h-[50px] flex items-center translate-y-[-20px]"
                  v-if="comment.isLoadingMoreReply"
                >
                  <LoadingComment />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="h-[50px] flex justify-center items-center translate-y-[-20px]"
      v-if="isLoading"
    >
      <LoadingComment />
    </div>
  </div>
</template>
