import { createStore } from 'vuex'

export default createStore({
  state: {
    adminRoute: "学生信息管理",
    adminRouteHistory: ["欢迎页", "学生信息管理"],
    studentsInfo: [],
    classCollectiveInfo: [],
    curriculumInfo: [],
    classPercent: {}
  },
  mutations: {
    changeAdminRoute(state, key) {
      console.log("changeAdminRoute")

      // 判断是否历史内包含了，包含了则转移，否则添加后转移
      if(state.adminRouteHistory.indexOf(key) === -1) {
        state.adminRouteHistory.push(key)
      }
      state.adminRoute = key;
    },
    deleteAdminRoute(state, key) {
      // 提取标签的位置信息
      const keyIndex = state.adminRouteHistory.findIndex(panelName => panelName === key)
      // 判断标签位置信息是否合法，合法就从数组里删了
      if (!~keyIndex) return 
          state.adminRouteHistory.splice(keyIndex, 1)
      // 如果关闭的标签正好是当前标签，则活动标签向右或向左
      if (key === state.adminRoute) {
          state.adminRoute = state.adminRouteHistory[Math.min(keyIndex, state.adminRouteHistory.length - 1)]
      }
    },
    uploadStudentsInfo(state, Infos) {
      console.log(Infos)
      // 加载学生信息进入
      state.studentsInfo = Infos.sheetInfo;

      // 加载班集体信息进入
      state.classCollectiveInfo = Infos.classCollectiveInfo;

      // 加载课程列表进入
      state.curriculumInfo = Infos.lessonInfo;

      // 加载各班进度进入
      state.classPercent = Infos.classPercent;

      console.log(`共计录入学生信息${Infos.sheetInfo.length}条，\
      三个班级分别录入${Infos.classCollectiveInfo.classOne.length}, ${Infos.classCollectiveInfo.classTwo.length}, ${Infos.classCollectiveInfo.classThr.length}条信息`)
    }
  },
  actions: {
  },
  modules: {
  }
})
