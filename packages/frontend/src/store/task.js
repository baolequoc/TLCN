import ScheduleApi from '../utils/api/schedule';
import TopicApi from '../utils/api/topic';
import TaskApi from '../utils/api/task';

const initState = {
  listScheduleTopic: [],
  listTopic: [],
  listTask: [],
  listMember: [],
  taskDetail: '',
};

const getters = {
  listScheduleTopic: (state) => state.listScheduleTopic,
  listTopic: (state) => state.listTopic,
  listTask: (state) => state.listTask,
  listMember: (state) => state.listMember,
  taskDetail: (state) => state.taskDetail,
};

const actions = {
  async fetchScheduleTopic ({ commit }, token) {
    try {
      const listScheduleTopic = await ScheduleApi.lecturerListScheduleTopicShort(token);
      commit('setListSchedules', listScheduleTopic);
    } catch (e) {
      console.log(e.message);
    }
  },
  async setListTopic ({ commit, state }, id) {
    try {
      const listSchedule = state.listScheduleTopic;
      const listTopic = listSchedule.find((element) => element._id === id);
      commit('setListTopic', listTopic.topics);
    } catch (e) {
      console.log(e.message);
    }
  },
  async fetchAllTask ({ commit }, payload) {
    try {
      const { token, topicId } = payload;
      const listTask = await TaskApi.listAllTask(token, topicId);
      commit('setListTask', listTask);
    } catch (e) {
      console.log(e.message);
    }
  },
  async fetchListMember ({ commit }, payload) {
    try {
      const { token, topicId } = payload;
      const listMember = await TopicApi.listTopicMember(token, topicId);
      commit('setListMember', listMember);
    } catch (e) {
      console.log(e.message);
    }
  },
  async fetchTaskDetail ({ commit }, payload) {
    try {
      const { token, taskId } = payload;
      const taskDetail = await TaskApi.getTaskDetail(token, taskId);
      commit('setTaskDetail', taskDetail);
    } catch (e) {
      console.log(e.message);
    }
  },

};

const mutations = {
  setListSchedules: (state, listScheduleTopic) => {
    state.listScheduleTopic = listScheduleTopic;
  },
  setListTopic: (state, listTopic) => {
    state.listTopic = listTopic;
  },
  setListTask: (state, listTask) => {
    state.listTask = listTask;
  },
  setListMember: (state, listMember) => {
    state.listMember = listMember;
  },
  setTaskDetail: (state, taskDetail) => {
    state.taskDetail = taskDetail;
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};
