import TopicApi from '../utils/api/topic';

const initState = {
  listTopics: [],
  listTopicByLecturer: [],
  listTopicByStudent: [],
  topicResult: null,
};

const getters = {
  listTopics: (state) => state.listTopics,
  listTopicByStudent: (state) => state.listTopicByStudent,
};

const actions = {
  async fetchListTopics ({ commit }, token) {
    const listTopics = await TopicApi.listAllTopics(token);
    commit('setListTopics', listTopics);
  },
  async fetchListTopicByStudent ({ commit }, token) {
    const listTopics = await TopicApi.listTopicAcceptRegisters(token);
    commit('setListTopicsByStudent', listTopics);
  },
  async fetchListTopicByLectures ({ commit }, value) {
    const { token, lecturerId } = value;
    const listTopics = await TopicApi.listAllTopicsByLecturerId(token, lecturerId);
    commit('setListTopicsByLecturer', listTopics);
  },

  async fetchTopicResult ({ commit }, token) {
    const topic = await TopicApi.getResultRegister(token);
    commit('setTopicResult', topic);
  },

  async addTopic ({ dispatch }, payload) {
    try {
      const { token, value } = payload;
      await TopicApi.createTopic(token, value);
      dispatch('fetchListTopics', token);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async updateTopic ({ dispatch, commit }, payload) {
    try {
      const { token, value } = payload;
      await TopicApi.updateTopicById(token, value);
      dispatch('fetchListTopics', token);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async removeTopic ({ dispatch, commit }, value) {
    const { token, id } = value;
    await TopicApi.deleteTopicById(token, id);
    dispatch('fetchListTopics', token);
  },
  async addRegisterTopic ({ dispatch, commit }, value) {
    const { token, id } = value;
    await TopicApi.addRegisterTopic(token, id);
    dispatch('fetchListTopicByStudent', token);
  },
};

const mutations = {
  setListTopics: (state, listTopics) => {
    state.listTopics = listTopics;
  },
  setListTopicsByLecturer: (state, listTopicByLecturer) => {
    state.listTopicByLecturer = listTopicByLecturer;
  },
  setListTopicsByStudent: (state, listTopicByStudent) => {
    state.listTopicByStudent = listTopicByStudent;
  },
  setTopicResult: (state, topicResult) => {
    state.topicResult = topicResult;
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};
