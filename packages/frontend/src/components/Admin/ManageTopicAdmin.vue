<template>
  <div class="flex">
    <div
      class=" rounded ml-auto mr-4 my-2 bg-blue-800 text-white font-sans font-semibold py-2 px-4 cursor-pointer"
      @click="$store.dispatch('url/updateSection', 'topic-import')"
    >
      Thêm đề tài
    </div>
    <form
      class="flex items-center justify-center"
      @submit.prevent="upload"
    >
      <input
        ref="uploadBtn"
        type="file"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      >
      <button type="submit">
        Tải lên tệp excel
      </button>
    </form>
  </div>
  <div class="shadow-md sm:rounded-lg m-4">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-300">
        <tr>
          <th
            scope="col"
            class="py-3 px-6"
          >
            Tên đề tài
          </th>
          <th
            scope="col"
            class="py-3 px-6"
          >
            Tên giảng viên
          </th>
          <th
            scope="col"
            class="py-3 px-6"
          >
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="topic in listTopics"
          :key="`topic-${topic._id}`"
          class="bg-slate-300 hover:bg-gray-50 "
        >
          <th
            :key="`topic-${topic._id}`"
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
          >
            {{ topic.title }}
          </th>
          <td class="py-4 px-6">
            <div class="font-bold cursor-pointer">
              {{ displayLecturer(topic.lecturerId) }}
            </div>
          </td>
          <td class="py-4 px-6 text-right">
            <a
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleUpdateTopic(topic._id)"
            >Sửa</a>
            <a
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleRemoveTopic(topic._id)"
            >Xóa</a>
            <a
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
              @click="handleShowTopic(topic._id)"
            >Xem chi tiết</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'ManageTopicAdmin',
  components: {

  },
  data () {
    return {

    };
  },
  computed: {
    ...mapState({
      isAuthenticated: ({ auth: { isAuthenticated } }) => isAuthenticated,
    }),
    ...mapGetters('auth', [
      'userId', 'userEmail', 'userRole', 'token',
    ]),
    ...mapGetters('topic', [
      'listTopics',
    ]),
    ...mapGetters('url', [
      'page', 'module', 'section', 'id',
    ]),
  },
  mounted () {
    this.$store.dispatch('topic/fetchListTopics', this.token);
  },
  methods: {
    handleUpdateTopic (id) {
      this.$store.dispatch('url/updateSection', `${this.module}-update`);
      this.$store.dispatch('url/updateId', id);
    },
    handleShowTopic (id) {
      this.$store.dispatch('url/updateSection', `${this.module}-view`);
      this.$store.dispatch('url/updateId', id);
    },
    async handleRemoveTopic (id) {
      try {
        const value = {
          id,
          token: this.token,
        };
        await this.$store.dispatch('topic/removeTopic', value);
        this.$toast.success('Đã xóa thành công!');
      } catch (e) {
        this.$toast.error('Đã có lỗi xảy ra, vui lòng kiểm tra lại dữ liệu!');
      }
    },
    displayLecturer (lecturer) {
      return lecturer ? lecturer.name : '';
    },
  },
};
</script>
