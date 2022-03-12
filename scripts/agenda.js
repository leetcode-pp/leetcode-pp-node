const {
    startTime
} = require("../config/index");
const BASIC_DAYS = 36
const TOPIC_DAYS = 36
const ADVANCED_DAYS = 19


function getAgenda() {
    const MS_PER_DAY = 24 * 60 * 60 * 1000
    const basic = [startTime, startTime + (BASIC_DAYS - 1) * MS_PER_DAY]
    const topic = [basic[1] + MS_PER_DAY, basic[1] + MS_PER_DAY + (TOPIC_DAYS - 1) * MS_PER_DAY]
    const advanced = [topic[1] + MS_PER_DAY, topic[1] + MS_PER_DAY + (ADVANCED_DAYS - 1) * MS_PER_DAY]
    return {
        basic: basic.map(time => { return new Date(time).toLocaleDateString('zh-CN') }),
        topic: topic.map(time => { return new Date(time).toLocaleDateString('zh-CN') }),
        advanced: advanced.map(time => { return new Date(time).toLocaleDateString('zh-CN') }),
    }
}

console.log(getAgenda())