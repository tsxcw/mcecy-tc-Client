/*
 * @Author: your name
 * @Date: 2021-12-30 10:23:34
 * @LastEditTime: 2021-12-30 14:51:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \picture-website\src\views\dataCenter\chart.js
 */
import moment from "moment";
class ChartFormat {
    info = [];
    data = {};
    time_key = "";
    data_key = "";
    constructor(e) {
        this.info = e;
    }
    format() {
        let Tmp = {};
        this.info.forEach(element => {
            Tmp[element[this.time_key]] = element;
        });
        this.info = Tmp;
        Object.keys(this.data).map(e => {
            if (this.info[e]) {
                this.data[e] = this.info[e];
            }
        })
        return this;
    }
    moment(days) {
        const time = new Date().getTime();
        const day = 1000 * 60 * 60 * 24;
        for (let index = 0; index < days; index++) {
            const key_time = moment(time - (index * day)).format("YYYY-MM-DD");
            this.data[key_time] = {}
        }
        return this;
    }
    get() {
        let tpm = {};
        tpm[this.data_key] = [];
        tpm[this.time_key] = [];
        Object.keys(this.data).map(e => {
            if (this.data[e][this.data_key]) {
                tpm[this.data_key].push(this.data[e][this.data_key])
            } else {
                tpm[this.data_key].push(0)
            }
            if (this.data[e][this.time_key]) {
                tpm[this.time_key].push(this.data[e][this.time_key])
            } else {
                tpm[this.time_key].push(e)
            }
        })
        tpm[this.data_key].reverse()
        tpm[this.time_key].reverse()
        tpm['max'] = Math.max(...tpm[this.data_key])
        return tpm;
    }
}
export default ChartFormat;