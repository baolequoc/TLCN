<template>
  <vue-final-modal
    v-slot="{ close }"
    v-bind="$attrs"
    @before-open="handleShow(taskId)"
  >
    <div class="relative p-4 w-full max-w-6xl h-full mx-auto mt-[5%]">
      <!-- Modal content -->
      <div class="relative bg-white rounded-md shadow ">
        <!-- Modal header -->
        <div class="flex justify-between items-start p-4 rounded-t border-b ">
          <h2 class="text-xl font-semibold text-gray-900 ">
            {{ taskDetail.code }}
          </h2>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-toggle="defaultModal"
            @click="close"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            ><path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            /></svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="px-6 grid grid-cols-6 gap-2">
          <!-- Left body -->
          <div class="col-span-4">
            <div class="font-medium my-4">
              <input
                v-model="taskDetail.title"
                class="w-full p-2"
                placeholder="Title"
              >
            </div>
            <div class="font-medium my-4">
              <ckeditor
                v-model="editorData"
                :editor="editor"
                @input="changeDescription"
              />
            </div>
            <div class="font-medium my-4">
              {{ taskDetail }}
            </div>
          </div>
          <!-- Right body -->
          <div class="col-span-2">
            <div class="font-normal my-4">
              Status:
              <select
                v-model="taskDetail.status"
                class="mt-1 block w-full rounded-md bg-gray-100 border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option
                  v-for="option in statuses"
                  :key="`key-${option.value}`"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
            </div>
            <div class="font-normal my-4">
              Assignee:
              <select
                v-model="taskDetail.assignTo"
                class="mt-1 block w-full rounded-md bg-gray-100 border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option
                  v-for="option in listMember"
                  :key="`key-${option._id}`"
                  :value="option._id"
                >
                  {{ option.name }}
                </option>
              </select>
            </div>
            <div class="font-normal my-4">
              Created: {{ taskDetail.createdByFilter ? taskDetail.createdByFilter.name : 'none' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>
<script>
import { mapGetters } from 'vuex';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  name: 'TaskDetailModal',
  inheritAttrs: false,
  props: {
    // eslint-disable-next-line vue/require-prop-type-constructor, vue/require-default-prop
    taskId: '',
  },
  data () {
    return {
      editor: ClassicEditor,
      editorData: '',
      statuses: [
        { text: 'TODO', value: 'TODO' },
        { text: 'PENDING', value: 'PENDING' },
        { text: 'IN PROCESS', value: 'IN_PROCESS' },
        { text: 'DONE', value: 'DONE' },
      ],
    };
  },
  computed: {
    ...mapGetters('auth', [
      'userId', 'userEmail', 'userRole', 'token',
    ]),
    ...mapGetters('url', [
      'page', 'module', 'section', 'id',
    ]),
    ...mapGetters('task', [
      'listScheduleTopic', 'listTopic', 'listMember', 'taskDetail',
    ]),
  },
  methods: {
    async handleShow (id) {
      await this.$store.dispatch('task/fetchTaskDetail', { token: this.token, taskId: id });
      if (this.taskDetail) {
        this.editorData = this.taskDetail.description;
      }
    },
    async changeDescription (data) {
      if (this.taskDetail) {
        this.taskDetail.description = data;
      }
    },
  },
};
</script>
