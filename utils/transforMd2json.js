const path = require("path")
const fs = require('fs')
const commonmark = require('commonmark');
// md文件存放的路径
const inputDirPath = path.resolve(__dirname, '../static/md')

// json文件输出的路径
const outputDirPath = path.resolve(__dirname, '../static')
const problemJson = {};
const solutionJson = {};
const { encrypt } = require("./crypto.js");

// 需要放到题目描述里的标题
// 因为部分题解不规范，标题名不能使用完全等于而应该使用include
const problemTitleDimWordArr = ['入选', '地址', '描述', '前置', '公司']
// 最终生成的题解的key，与上面的模糊匹配的词一一对应
const problemTitleWordMap = ['why', 'link', 'description', 'pres', 'company']


// 递归读取某一目录下的所有md文件
function recursionAllMdFile (dir, cb) {
    const files = fs.readdirSync(dir);
    files.forEach((fileName) => {
        var fullPath = path.join(dir, fileName);
        const childFile = fs.statSync(fullPath);
        if (childFile.isDirectory()) {
            recursionAllMdFile(path.join(dir, fileName), cb); //递归读取文件
        } else {
            let fildData = fs.readFileSync(fullPath).toString();
            cb(fullPath, fildData)
        }
    });
}

// 预先对文件内容进行处理
// 1. 根据文件名过滤掉非题解的md
// 2. 去除精选题解
function preprocessFile(fullPath, fileData){
    let fileName = path.basename(fullPath).trim().toLowerCase()
    if( !/d[0-9]+.*\.md$/.test(fileName) || fileName.includes('selec')){
        return
    }
    transformFileToJSon(fullPath, fileData)
}

// 通过遍历ast节点树找到type为text节点的值
// isDeep 为false在找到第一个文案时就中止
// isDeep 为true在找到下一个heading节点时中止
function getAstNodeVal(walker, isDeep = false) {
    if(!walker.current) return null
    let result = [],
        now = walker.current;
    // 如果当前就是head节点那就将指针向后值一下
    if(now.type === 'heading') now = walker.next()
    do {
        if(!now.entering) continue
        let { node = {} } = now
        if(node.type === 'heading') break
        if (['text', 'code_block'].includes(node.type)) {
            result.push(node.literal || node.info);
            if(isDeep === false) break
        }
    }while((now = walker.next()))
    if(!result.length) return null
    return result.length > 1 ? result : result[0]
}

// 当前标题是否属于题目描述的内容, 不属于返回-1, 属于则返回模糊匹配词组中的索引值
function findIndexProblemDimWorld (title) {
    // 把括号内的内容删掉
    // 避免类似这样的标题： 题目地址(239. xxx)
    // 括号内的内容与关键字重复导致误判
    title = title.replace(/(\(.*\))/,'')
    return problemTitleDimWordArr.findIndex(item => title.includes(item))
}

// 获取文件某行之后的所有内容（包含该行）
function getFileDataAfterLine (fullPath, lineNum) {
    try {
        const data = fs.readFileSync(fullPath, 'UTF-8');
        const lines = data.split(/\r?\n/);
        return lines.slice(lineNum - 1)
    } catch (err) {
        console.error(err);
    }
}

// 写入json对象
function writeToJsonObject (fullPath, problemData, soluteContentStartLine){
    // 将题目相关的内容写入json
    problemData = formateProblemValue(problemData)
    problemJson[problemData.day] = problemData
    // 将题解相关的内容写入json
    let solutionFileData = getFileDataAfterLine(fullPath, soluteContentStartLine)
    solutionJson[problemData.day] = solutionFileData
}

// 格式化题目的相关数据
function formateProblemValue (data) {
    return Object.assign({
        day: 1,
        title: "当前暂时没有对应的数据，请联系当前讲师进行处理~",
        link: "当前暂时没有对应的数据，请联系当前讲师进行处理~",
        // tags: [], // 目前所有 README 都是没有的。因此如果没有的话，你可以先不返回，有的话就返回。后面我慢慢补
        pres: ["当前暂时没有对应的数据，请联系当前讲师进行处理~"],
        description: "当前暂时没有对应的数据，请联系当前讲师进行处理~",
        company: "暂无"
    }, data)
}

// 将某个md文件解析为 题解与题目介绍
function transformFileToJSon(fullPath, fileData){
    // 根据题解名获取这是第几天的题解和题目title
    let fileName = path.basename(fullPath).trim().toLowerCase()
    let problemData = {
        day: +fileName.match(/d([0-9]+)/)[1],
        // title: fileName.split('.').slice(1, -1).join('.')
    }
    let walker = new commonmark.Parser().parse(fileData.toString()).walker();
    let nowNode = walker.next(), nextNode
    while (nowNode) {
        // 当前讲义的基本格式为标题紧跟着是对应的内容，
        // 所以碰到 heading 类型的节点时，因此将ast的节点按heading进行分割
        if(nowNode.node.type === 'heading'){
            // 这里做下兼容处理，有部分md有一级标题，碰到就直接忽视，当前指针迭代到下一个head
            if(nowNode.node.level === 1){
                nowNode = walker.next()
                continue
            }

            let key = getAstNodeVal(walker)
            // 如果不是题目相关的标题，代表从这一行开始就是题解的内容了
            // 结束ast循环，将该行即该行之下的内容全部截取，就是题解的md内容
            if(findIndexProblemDimWorld(key) === -1) break
            // 如果是 题目地址(821. xxx) 的形式，则在这里取一下括号内的内容做title，没有就显示为空
            if(/题目地址.*[\(（].*?([0-9]+\..*)[\)）]/.test(key)){
                problemData.title = key.match(/题目地址.*[\(（].*?([0-9]+\..*)[\)）]/)[1]
            }
            key = problemTitleWordMap[findIndexProblemDimWorld(key)]

            nextNode = walker.next();
            while(walker.entering === false){
                nextNode = walker.next();
            }
            if(!nextNode) break
            let nextNodeVal = getAstNodeVal(walker, true)
            problemData[key] = nextNodeVal.length > 1 ? nextNodeVal : nextNodeVal[0]
            nowNode = nextNode
        } else {
            nowNode = walker.next()
        }
    }
    // 这一行（包括本行）之下的内容为题解，
    let hasSourceNode = walker.current
    while(!Array.isArray(hasSourceNode.sourcepos) && hasSourceNode){
        hasSourceNode = hasSourceNode.parent
    }
    let soluteContentStartLine = hasSourceNode ? hasSourceNode.sourcepos[0][0] : 1;
    // 将该文件解析出的内容写入json对象
    writeToJsonObject(fullPath, problemData, soluteContentStartLine)
    // 将该文件解析出的内容写入json文件
    // writeFile(fullPath, problemData, soluteContentStartLine)
}

function run(){
    recursionAllMdFile(inputDirPath, preprocessFile)
    if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath);
    }

    // 将题目相关的内容写入json
    fs.writeFile(path.resolve(outputDirPath, `problem/problem.json`), JSON.stringify(problemJson, null, 4), function (err) {
        if (err) console.log(`problem.json写入失败`, err);
    })

    // 将题解相关的内容写入json
     Object.keys(solutionJson).forEach((key) => {
         let content = encrypt(solutionJson[key].join('\n'))
         solutionJson[key] = {
             content
         }
    });
    fs.writeFile(path.resolve(outputDirPath, `solution/solutions.json`), JSON.stringify(solutionJson, null, 4), function (err) {
        if (err) console.log(`加密前的solution.json写入失败`, err);
    })
    return {
        problemJson,
        solutionJson
    }
}

run()
