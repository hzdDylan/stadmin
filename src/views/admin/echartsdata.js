
const getProgressBar = function ([lessonInfo, classCollectiveInfo]) {
  // 因没有课程数据，故使用伪数据
  // 首先是坐标轴构建
  const xAxisData = lessonInfo;

  // 数据构建
  // 课程完成度处理
  // 未完成人数
  const underachieveList1 = refactorClassProgress(classCollectiveInfo.classOne, lessonInfo.length).underachieveCount;
  const underachieveList2 = refactorClassProgress(classCollectiveInfo.classTwo, lessonInfo.length).underachieveCount;
  const underachieveList3 = refactorClassProgress(classCollectiveInfo.classThr, lessonInfo.length).underachieveCount;

  const achieveList1 = underachieveList1.map(val => classCollectiveInfo.classOne.length - val);
  const achieveList2 = underachieveList2.map(val => classCollectiveInfo.classTwo.length - val);
  const achieveList3 = underachieveList3.map(val => classCollectiveInfo.classThr.length - val);


  // 需要构建三个班各自完成/未完成共计六分数据，每份数据带上每个班的人
  const series = [
    {
      name: "电信20-1班完成人数",
      type: "bar",
      stack: "One",
      emphasis: {
        focus: "series",
      },
      data: achieveList1
    },
    {
      name: "电信20-1班未完成人数",
      type: "bar",
      stack: "One",
      emphasis: {
        focus: "series",
      },
      data: underachieveList1
    },
    {
      name: "电信20-2班完成人数",
      type: "bar",
      stack: "Two",
      emphasis: {
        focus: "series",
      },
      data: achieveList2
    },
    {
      name: "电信20-2班未完成人数",
      type: "bar",
      stack: "Two",
      emphasis: {
        focus: "series",
      },
      data: underachieveList2
    },
    {
      name: "电信20-3班完成人数",
      type: "bar",
      stack: "Three",
      emphasis: {
        focus: "series",
      },
      data: achieveList3
    },
    {
      name: "电信20-3班未完成人数",
      type: "bar",
      stack: "Three",
      emphasis: {
        focus: "series",
      },
      data: underachieveList3
    },
  ]

  return [xAxisData, series]
}

const getRatioBar = function (lessonInfo, classPercent) {
  // 清空数据内容
  const ratiobarDatasetSource = [];
  const ratiobarSeries = [];

  // 修改x轴
  ratiobarDatasetSource.unshift(["Product", '电信20-1班', '电信20-2班', '电信20-3班', ]);

  for (let i = 0; i < lessonInfo.length; i++) {
    // 添加数据内容
    ratiobarDatasetSource.push(
      refactorClassPercent(
        lessonInfo[i],
        classPercent.classOnePercent[i],
        classPercent.classTwoPercent[i],
        classPercent.classThrPercent[i]
      )
    )
    ratiobarSeries.push({ type: "bar" });
  }

  return [ratiobarDatasetSource, ratiobarSeries]
}

const getScoreLine = function ([lessonInfo, classCollectiveInfo], idx) {
  // 如果没有数据就返回模板

  //有数据就修改数据后返回
  const legendData = [`电信20-${idx}班平均分`, `电信20-${idx}班最高分`, `电信20-${idx}班非零最低分`]; // 构建折线群内容
  // 注释了 扩展内容
  // idx.forEach((index) => {
  //   scoreLine.legend.data.push([`电信20-${index}班平均分`, `电信20-${index}班最高分`, `电信20-${index}班非零最低分`]) // 修改折线群内容
  // })

  // 修改x轴
  const xAxisData = [...lessonInfo];

  let series = [];  // 清空各折线数据

  // 处理
  if (idx == 1) {
    series.push(
      ...refactorClassScore(classCollectiveInfo.classOne, 1)
    );
  } else if (idx == 2) {
    series.push(
      ...refactorClassScore(classCollectiveInfo.classTwo, 2)
    );
  } else {
    series.push(
      ...refactorClassScore(classCollectiveInfo.classThr, 3)
    );
  }

  // 处理完成，回调
  return [legendData, xAxisData, series]
}

const getCodeBar = function (projectList, classCodeCondition, page) {
  // 本函数功能： 1. 每次提供一页数据（5个），并处理数据
  // （1）要求以班级为单位展示各个项目平均时长，（2）项目为单位展示每个学生代码效率，每个学生运行调试次数，每个学生报错次数
  // 因为无代码数据导入，故使用其它数据代替
  let projectListTemp = ["常用算法性能分析与对比", "类的继承性与多态性实现", "线性表的基本操作","栈的基本操作","队列的基本操作","图形结构基本操作","数据库的创建与修改","树形结构基本操作","软件工程项目开发实践"];

  // 导入各科目开始时间参考
  const referenceTime = ["15:00:00", "10:50:00", "14:35:00", "10:40:00", "10:49:00", "14:33:00", "10:35:00", "10:34:00", "14:32:00", "10:38:00", "10:25:00", "20:00:00", "10:36:00", "14:29:00"];

  // 获得平均数据（伪）
  const timeDif1 = refactorCodeScore(classCodeCondition.classOne, referenceTime);
  const timeDif2 = refactorCodeScore(classCodeCondition.classTwo, referenceTime);
  const timeDif3 = refactorCodeScore(classCodeCondition.classThr, referenceTime);

  // 构造回调数据
  // 起始下标，终止下标
  const sidx = 0 + 5 * (page - 1), eidx = 5 * page;
  const yAxisData = projectListTemp.slice(sidx, eidx)
  const series = []
  series.push({
    name: `电信20-1班`,
    type: "bar",
    label: {
      show: true,
      formatter: '{b}'
    },
    emphasis: {
      focus: "series",
    },
    data: timeDif1.slice(sidx, eidx),
  },
    {
      name: `电信20-2班`,
      type: "bar",
      label: {
        show: true,
        formatter: '{b}'
      },
      emphasis: {
        focus: "series",
      },
      data: timeDif2.slice(sidx, eidx),
    },
    {
      name: `电信20-3班`,
      type: "bar",
      label: {
        show: true,
        formatter: '{b}'
      },
      emphasis: {
        focus: "series",
      },
      data: timeDif3.slice(sidx, eidx),
    })

  // 回调的数据为[yAxis.data, series]
  return [yAxisData, series]
}

const getPersonProgress = function (lessonInfo, classCollectiveInfo, cidx) {
  let personsInfo;
  if (cidx === 1) {
    personsInfo = refactorPersonProgress(classCollectiveInfo.classOne, lessonInfo);
  } else if (cidx === 2) {
    personsInfo = refactorPersonProgress(classCollectiveInfo.classTwo, lessonInfo);
  } else {
    personsInfo = refactorPersonProgress(classCollectiveInfo.classThr, lessonInfo);
  }

  return personsInfo
}

const getUsagerateLine = function () {
  return 
}

const getPersonScore = function (lessonInfo, classCollectiveInfo, name, grade, id) {
  // 该函数为个性化数据信息里的从特定名字，班级，学号，周之中提取信息。
  // 首先是检测name,grade,id对应的人是否存在
  let stdSco = null;
  // 根据不同班级进行查找，并导出其所在下标和成绩数组
  switch(grade) {
    case "电信20-1班": 
      stdSco = findStudentFromClass(classCollectiveInfo.classOne, name, id);
      break;
    case "电信20-2班": 
      stdSco = findStudentFromClass(classCollectiveInfo.classTwo, name, id);
      break;
    case "电信20-3班": 
      stdSco = findStudentFromClass(classCollectiveInfo.classThr, name, id);
      break;
  }
  // 若查无此人的处理
  if(stdSco.idx === -1) {return "-1"}

  // 进行到此时则查找到此人并导出了成绩数组，对成绩数组进行处理，
  const datasetSource = refactorPersonalScore(stdSco.score, lessonInfo)
  return datasetSource
}

export {
  getUsagerateLine,
  getRatioBar,
  getScoreLine,
  getCodeBar,
  getProgressBar,
  getPersonProgress,
  getPersonScore
}

function refactorClassPercent(cname, cone, ctwo, cthr) {
  return [cname, cone, ctwo, cthr]
}

function refactorClassScore(cstd, cidx) {
  // 在这个函数里要处理的是 平均值， 最高分， 最低分
  // 构建分数数组
  const scoreArr = [];
  for (let i = 0; i < cstd.length; i++) {
    // 将分数进行提取后存入
    scoreArr.push(cstd[i].course.map((item) => parseFloat(item[1])))
  }
  // scoreArr就是分数矩阵了

  // 数值处理
  // 构建均值，最大值，最小值
  let average = new Array(scoreArr[0].length).fill(0),
    max = new Array(scoreArr[0].length).fill(0),
    min = new Array(scoreArr[0].length).fill(100);

  for (let i = 0, len = scoreArr.length; i < len; i++) {
    // 均值方案
    for (let j = 0; j < scoreArr[i].length; j++) {
      average[j] += scoreArr[i][j] || 0;
    }
    if (i === len - 1) {
      average = average.map((score) => {
        return (score / len).toFixed(1)
      })
    }

    // 最大值方案
    // 非零最小值方案
    for (let j = 0; j < scoreArr[i].length; j++) {
      max[j] = max[j] < (scoreArr[i][j] || 0) ? scoreArr[i][j] : max[j];
      min[j] = min[j] > (scoreArr[i][j] || 0) ? (scoreArr[i][j] || 0) === 0 ? min[j] : (scoreArr[i][j] || 0) : min[j];
    }
  }

  // 构建series曲线对象，需要构造三个
  // 平均数曲线
  const lineAva = {
    name: `电信20-${cidx}班平均分`,
    type: 'line',
    data: average
  };
  // 最大值曲线
  const lineMax = {
    name: `电信20-${cidx}班最高分`,
    type: 'line',
    data: max
  };
  // 最小值曲线
  const lineMin = {
    name: `电信20-${cidx}班非零最低分`,
    type: 'line',
    data: min
  };

  // 曲线回调
  return [lineAva, lineMax, lineMin]
}

function refactorCodeScore(cstd, tref) {
  // 在这个函数里要处理的是 平均值， 最高分， 最低分， 中值
  // 构建分数数组
  const scoreArr = [];
  for (let i = 0; i < cstd.length; i++) {
    // 将时间进行提取后存入
    scoreArr.push(cstd[i].course.map((item) => {
      // 将字符串转取时钟，分钟和秒钟返回
      return item[2].slice(-8)
    })
    )
  }

  // 与参考时间相比，计算耗时, timeDif为每人各项目耗时存储函数
  const timeDif = scoreArr.map((times) => {
    return times.map((time, idx) => {
      // 将每人的每一项目时间减去参考时间来返回耗时
      let h = time.slice(0, 2) - tref[idx].slice(0, 2)
      h = Math.abs(h) <= 1 ? Math.abs(h) : 0;
      let m = h * 60 + (time.slice(3, 5) - tref[idx].slice(3, 5))
      m = m >= 0 ? m : 0;
      let s = m * 60 + (time.slice(6) - tref[idx].slice(6))
      s = s >= 0 ? s : 0;
      return s
    })
  })

  let average = new Array(timeDif[0].slice(0,9).length).fill(0);
  for (let i = 0, len = timeDif.length; i < len; i++) {
    // 均值方案
    for (let j = 0; j < timeDif[i].slice(0,9).length; j++) {
      average[j] += timeDif[i][j] || 0;
    }
    if (i === len - 1) {
      average = average.map((score) => {
        return (score / len).toFixed(1)
      })
    }
  }

  // 根据要求（2-4h之间）对伪数据进行处理
  // 根据天眼获得数据最大为2490.5，最低为816.3，因此设计为800-2500的时间区间
  average = average.map((ele) => {
    // 返回 归一化后的时间再乘以2小时的分钟数120再加以120得到2-4h之间秒钟时间
    return ((ele - 800) / (2500 - 800) * 120 + 120).toFixed(0)
  })
  
  // 经过伪数据处理后得到的平均分钟数
  return average
}

function refactorClassProgress(cstd, listLength) {
  const underachieveCount = new Array(listLength).fill(0);
  const personUnderachieveCount = new Array(cstd.length).fill(0);
  cstd.forEach((info, cidx) => {
    info.course.forEach((item, idx) => {
      if (item[1] === '0' || item[1] === '' || item[1] == 'undefined') {
        // 如果成绩为零或空或无
        // 班级内的该课程未完成总人数计数加一
        underachieveCount[idx]++;

        // 个人未完成项添一
        personUnderachieveCount[cidx]++;
      }
    })
  })

  // 返回该班每个科目的未完成人数
  return { underachieveCount, personUnderachieveCount }
}

function refactorPersonProgress(cstd, lessonInfo) {
  // 构建未完成的课程的数组
  const UnderachieveArr = [];

  // 将未完成课程的名字返回的处理函数
  for (let i = 0; i < cstd.length; i++) {
    UnderachieveArr.push(cstd[i].course.filter((item) => {
      // 判断分数是否存在或不为零
      if (item[1] === '0' || item[1] === 0 || item[1] === '') {
        // 存在不合格的就给它返回
        return true
      }
      return false
    }).map((item) => {
      return item[0]
    }))
  }

  const personInfo = [];
  for (let i = 0; i < UnderachieveArr.length; i++) {
    const personInfoObj = {
      grade: cstd[i].grade,
      name: cstd[i].name,
      tags: UnderachieveArr[i],
      progress: parseFloat((
        (lessonInfo.length - UnderachieveArr[i].length) / lessonInfo.length * 100
      ).toFixed(2)),
      status: 'info'
    }
    if(UnderachieveArr[i].length === 0) {
      // 如果没有未完成则修改状态
      personInfoObj.status = 'success'
    }
    personInfo.push(personInfoObj)
  }

  return personInfo
}

function findStudentFromClass(classStudentsInfo, name, id) {
  // 输入为 某班学生信息集，查找的姓名，学号
  // 输出为 对象{score: 分数数组, idx:该学生所在 该班的数组的下标，否则返回-1}。
  const obj = {
    score: [],
    idx: -1
  };
  for(let idx in classStudentsInfo) {
    if(classStudentsInfo[idx].name === name && classStudentsInfo[idx].id === id) {
      obj.score = classStudentsInfo[idx].course.map(item => {
        return item[1];
      });
      obj.idx = idx;
      break;
    }
  }
  return obj
}

function refactorPersonalScore(scoreList, lessonList) {
  // 构建dataset.source的初始化
  const datasetSource = [["pass", "count", "project", "pointless"]];

  // dataset.source填充
  for(let i=0; i<lessonList.length; i++) {
    datasetSource.push([
      !scoreList[i] ? 0 : 1,
      scoreList[i],
      lessonList[i],
      1
    ])
  }

  return datasetSource
}