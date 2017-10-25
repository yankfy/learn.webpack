// 引入CSS文件
import css from './css/index.css';
// 引入less文件
import less from './css/black.less'
// 引入scss文件
import less from './css/white.scss'

// 引入
import pom from './pom'
// 第一种引入jquery
// import $ from 'jquery';

// 引入json
var json = require('../config.json'); {
    let name = "Pony"

    let base = "webpack"

    // document.getElementById('title').innerHTML = `Hello My ${base}.3.0base my name is ${name}`
    $('#title').html(`Hello My ${base}.3.0base my name is ${name}`)
}
pom()

document.getElementById("json").innerHTML = json.name + ":website" + json.site;