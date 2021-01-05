const fs = require('fs')
const yargs = require('yargs')
const chalk = require('chalk')
const exec = require('child_process').exec; //异步子进程
const execSync = require('child_process').execSync; //同步子进程

let gitChash= execSync('git show -s --format=%H').toString().trim();
let timeStamp = new Date()
let isVersionExsit = fs.readdirSync(__dirname).find((i) => i === 'version.json')
    // console.log(isVersionExsit);
    //检查是否有version.json的存在
let defualtVersion = {
    version:'V.0.0.1-init',
    detail:{
        symbol:'V',
        marjor:0,
        middle:0,
        last:0,
        tail:'init'
    },
    updateHistory:[]
}
    // console.log(argv.d);
    yargs.version('1.1.1')
    yargs.command({
        command:'mode',
        describe:'select update mode',
        builder:{
            dev:{
                default:false,
                type:'boolean'
            },
            test:{
                default:false,
                type:'boolean'
            },
            prod:{
                default:false,
                type:'boolean'
            }
        },  
        handler: argv => {
            if(argv.dev){
            if(isVersionExsit){
                    let data = JSON.parse(fs.readFileSync('version.json'))
                    data.detail.last += 1,
                    data.detail.tail = timeStamp.getTime().toString().slice(0,10) + '-'+gitChash.slice(-6)
                    data.version = `${data.detail.symbol}.${data.detail.marjor}.${data.detail.middle}.${data.detail.last}.${data.detail.tail}`
                    let item = {
                        mode:'dev',
                        version : data.version,
                        gitHash:gitChash,
                        time:timeStamp
                    }
                    data.updateHistory.unshift(item)
                    fs.writeFileSync('version.json',JSON.stringify(data))
                    console.log(chalk.green('开发版本升级完成'));
                }else{
                    fs.writeFileSync('version.json',JSON.stringify(defualtVersion))
                    console.log(chalk.green('MXM版本管理工具初始化完成'));
                    let data = JSON.parse(fs.readFileSync('version.json'))
                    data.detail.last += 1,
                    data.detail.tail = timeStamp.getTime().toString().slice(0,10) + '-'+gitChash.slice(-6)
                    data.version = `${data.detail.symbol}.${data.detail.marjor}.${data.detail.middle}.${data.detail.last}.${data.detail.tail}`
                    let item = {
                        mode:'dev',
                        version : data.version,
                        gitHash:gitChash,
                        time:timeStamp
                    }
                    data.updateHistory.unshift(item)
                    fs.writeFileSync('version.json',JSON.stringify(data))
                    console.log(chalk.green('开发版本升级完成'));
                }
            }else if(argv.test){
                if(isVersionExsit){
                    let data = JSON.parse(fs.readFileSync('version.json'))
                    data.detail.middle += 1,
                    data.detail.last = 0,
                    data.detail.tail = timeStamp.getTime().toString().slice(0,10) + '-'+gitChash.slice(-6)
                    data.version = `${data.detail.symbol}.${data.detail.marjor}.${data.detail.middle}.${data.detail.last}.${data.detail.tail}`
                    let item = {
                        mode:'dev',
                        version : data.version,
                        gitHash:gitChash,
                        time:timeStamp
                    }
                    data.updateHistory.unshift(item)
                    fs.writeFileSync('version.json',JSON.stringify(data))
                    console.log(chalk.green('线上版本升级完成'));
                }else{
                    fs.writeFileSync('version.json',JSON.stringify(defualtVersion))
                    console.log(chalk.green('MXM版本管理工具初始化完成'));
                    let data = JSON.parse(fs.readFileSync('version.json'))
                    data.detail.middle += 1,
                    data.detail.tail = timeStamp.getTime().toString().slice(0,10) + '-'+gitChash.slice(-6)
                    data.version = `${data.detail.symbol}.${data.detail.marjor}.${data.detail.middle}.${data.detail.last}.${data.detail.tail}`
                    let item = {
                        mode:'dev',
                        version : data.version,
                        gitHash:gitChash,
                        time:timeStamp
                    }
                    data.updateHistory.unshift(item)
                    fs.writeFileSync('version.json',JSON.stringify(data))
                    console.log(chalk.green('线上版本升级完成'));
                }
            }else if(argv.prod){
                if(isVersionExsit){
                    let data = JSON.parse(fs.readFileSync('version.json'))
                    data.detail.marjor += 1
                    data.detail.middle = 0,
                    data.detail.last = 0,
                    data.detail.tail = timeStamp.getTime().toString().slice(0,10) + '-'+gitChash.slice(-6)
                    data.version = `${data.detail.symbol}.${data.detail.marjor}.${data.detail.middle}.${data.detail.last}.${data.detail.tail}`
                    let item = {
                        mode:'dev',
                        version : data.version,
                        gitHash:gitChash,
                        time:timeStamp
                    }
                    data.updateHistory.unshift(item)
                    fs.writeFileSync('version.json',JSON.stringify(data))
                    console.log(chalk.green('产品版本升级完成'));
                }else{
                    fs.writeFileSync('version.json',JSON.stringify(defualtVersion))
                    console.log(chalk.green('MXM版本管理工具初始化完成'));
                    let data = JSON.parse(fs.readFileSync('version.json'))
                    data.detail.marjor += 1,
                    data.detail.tail = timeStamp.getTime().toString().slice(0,10) + '-'+gitChash.slice(-6)
                    data.version = `${data.detail.symbol}.${data.detail.marjor}.${data.detail.middle}.${data.detail.last}.${data.detail.tail}`
                    let item = {
                        mode:'dev',
                        version : data.version,
                        gitHash:gitChash,
                        time:timeStamp
                    }
                    data.updateHistory.unshift(item)
                    fs.writeFileSync('version.json',JSON.stringify(data))
                    console.log(chalk.green('产品版本升级完成'));
                }
                console.log(chalk.red('请填写版本升级模式 --dev , --test or --prod'));
            } 
        }
    })
    .parse();
