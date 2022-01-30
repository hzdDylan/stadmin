// 这个文件是xlsx文件处理方法

// 导入XLSX文件读取方法
import getXLSX from '../../http/excelrequest'

// 建立信息总库（只限sheet0页内容）
const sheetInfo = [];

// 建立信息模板
class StudentInfo {
    /**
     * 
     * @param {姓名} name 
     * @param {学号} id 
     * @param {学校} school 
     * @param {院系} department 
     * @param {专业} major 
     * @param {班级} grade 
     * @param {课程(数组)，包含各类课程及其状态} courses 
     */
    constructor(
        name, id, school, 
        department, major, grade, 
        courses
    ) {
        this.name = name; 
        this.id = id;
        this.school = school;
        this.department = department;
        this.major = major;
        this.grade = grade; 
        this.course = courses;
    }
}


// 建立课程信息库
let lessonInfo = [];
// 建立状态列表（因只有三项，故我直接写在这了，没有采用获取方法
const stateInfo = ["成绩","提交时间","状态"]; //这个状态变量没有采用
// 建立班级信息库
const classCollectiveInfo = {
    classOne: [],
    classTwo: [],
    classThr: []
};

const fn = async function() {
    await getXLSX().then((res) => {
        // 获取到数据
        const data = res[0].sheet
        
        // console.log(data)

        // 数据处理
        // 获取课程列表
        lessonInfo = getBasicInfo(data[1]);

        // 获取学生信息，并构建学生个人信息库，从第三行开始
        for(let i=3, len=data.length; i<len; i++) {
            const studentInfoTemp = getStudentInfo(data[i]);
            sheetInfo.push(studentInfoTemp);

            // 以学生所属班级进行分类
            switch(studentInfoTemp.grade) {
                case "电信20-1": 
                    classCollectiveInfo.classOne.push(studentInfoTemp);
                    break;
                case "电信20-2": 
                    classCollectiveInfo.classTwo.push(studentInfoTemp);
                    break;
                case "电信20-3": 
                    classCollectiveInfo.classThr.push(studentInfoTemp);
                    break;
            }
        }
    })

    let classOnePercent, classTwoPercent, classThrPercent;
    [classCollectiveInfo.classOne, classOnePercent] = CourseCompletionCompute(classCollectiveInfo.classOne);
    [classCollectiveInfo.classTwo, classTwoPercent] = CourseCompletionCompute(classCollectiveInfo.classTwo);
    [classCollectiveInfo.classThr, classThrPercent] = CourseCompletionCompute(classCollectiveInfo.classThr);

    const classPercent = {classOnePercent, classTwoPercent, classThrPercent};
    // 至此学生信息获取完毕,并回调
    return {sheetInfo, classCollectiveInfo, lessonInfo, classPercent}
}

function getBasicInfo(arr) {
    // 其实是获取第一行信息的课程信息 （xlsx文件里第一行是"课程：计算机软件基础    班级：电信20级  导出时间：2022-01-11 13:24:59"，故跳过
    // console.log(arr);
    
    // 获取课程信息和学号等信息
    const lessons = Object.values(arr);

    // 剔除学号姓名等信息,splice会改变原数组
    lessons.splice(0, 6);
    // 此时一个正确的课程列表出来了，并将其提取出来
    return lessons;
}

function getStudentInfo(arr) {
    // 获取该学生的信息
    const studentInfoList = Object.values(arr);
    // console.log(studentInfoList)

    // 构建课程及课程状态
    // const lessonsStatus = new Map();
    // 拒绝乱使用Map方法从我做起。
    const lessonsStatus = [];


    lessonInfo.map((curriculum, index) => {
        //  赋予起始下标，最小为6，刚好是第一课的分数的下标
        const startIndex = 6 + index * 3;
        const [scoreindex, timeindex, fulfillindex] = [startIndex, startIndex+1, startIndex+2];

        // lessonsStatus.set(
        //     curriculum, [
        //         studentInfoList[scoreindex], 
        //         studentInfoList[timeindex], 
        //         studentInfoList[fulfillindex]
        //     ]
        // )
        lessonsStatus.push(
            [curriculum, studentInfoList[scoreindex],studentInfoList[timeindex], studentInfoList[fulfillindex]]
            );
    })


    // 构建学生信息档案
    const studentInfo = new StudentInfo (
        studentInfoList[0],  // 姓名
        studentInfoList[1],  // 学号
        studentInfoList[2],  // 学校
        studentInfoList[3],  // 学院
        studentInfoList[4],  // 专业
        studentInfoList[5],  // 班级
        lessonsStatus   //课程信息
    )

    return studentInfo
}

function CourseCompletionCompute(classRaw) {
    // 每节课的完成度数组变量设置
    let classCompletePercent = [];
    // 初始化完成度
    for(let i=0; i<lessonInfo.length; i++) {
        classCompletePercent.push(0)
    }

    let personalScore = [];

    classRaw.map((info) => {
      // 添加基本情况
      personalScore.unshift({name:info.name, course:[], id:info.id, grade: info.grade})
      info.course.forEach((item, index) => {
        // 添加学科名和分数
        personalScore[0].course.push([item[0], item[1], item[2]]);
        if(item[1]) { // 此处未做错误输入容错，仅做了0和空字符串的排除
          // 如果此处学科有分数，则班级该课完成度人数加一
          classCompletePercent[index]++;
        }
      })

    })
    // 将完成度人数转换为百分比
    classCompletePercent = classCompletePercent.map(num => {
        return (num / classRaw.length).toFixed(3)
    })

    // 最后将取巧弄的数组进行翻转复原
    personalScore = personalScore.reverse();

    return [personalScore, classCompletePercent]
}

export default fn