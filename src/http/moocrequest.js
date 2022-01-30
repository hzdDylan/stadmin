import axios from "../utils/request"

export function UserPost(data) {
    return axios({
        url: "/fanyalogin",
        method: "post",
        data,
        config: {
            headers: {
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
                'Content-Length': 118,
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Cookie': 'fid=11135; JSESSIONID=06AE7B5D918B13F73C3192A7458B6FB9; route=fb0878d2b253f576b9614a77ccc901db; source=""',
                'DNT': 1,
                'Host': 'passport2.chaoxing.com',
                'Origin': 'http://passport2.chaoxing.com',
                'Proxy-Connection': 'keep-alive',
                'Referer': 'http://passport2.chaoxing.com/login?fid=&newversion=true&refer=http%3A%2F%2Fi.chaoxing.com',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 Edg/96.0.1054.62',
                'X-Requested-With': 'XMLHttpRequest'
            },
            timeout: 10000
        }
    })
}

