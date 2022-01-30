import axios from "axios"

// 定义读取的excel文档的名称。
const Xlsxpath = "电信20级.xlsx"

const serviceHttp = axios.create({
    withCredentials: true,
    headers: {
        'Content-disposition': 'attachment; filename=rzjl.xls',
        'Content-Type': 'application/msexcel'
    },
    responseType: 'blob', //二进制流
});

function fetchApi(url, method, data) {
    return new Promise((resolve, reject) => {
        serviceHttp({
            url,
            method,
            data
        })
            .then(res => {
                // console.log('返回数据', res)
                resolve(res.data)
            })
            .catch(error => {
                console.error(error)
                reject()
            })
    })
}

const getXLSX = async function () {
    const res = new Promise((resolve, reject) => {
        resolve(
            fetchApi('../../'+Xlsxpath, 'get').then((data) => {
                return new Promise(function (resolve, reject) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        const data = e.target.result;
                        this.wb = XLSX.read(data, {
                            type: "binary",
                        });
                        const result = [];
                        this.wb.SheetNames.forEach((sheetName) => {
                            result.push({
                                sheetName: sheetName,
                                sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName]),
                            });
                        });
                        resolve(result);
                    };
                    reader.readAsBinaryString(data);
                })
            })
        )
    })
    return res;
}
    // 输出方法
export default getXLSX