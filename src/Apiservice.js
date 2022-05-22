import axios from "axios";
import qs from 'qs';
import { getSessionToken } from '@shopify/app-bridge-utils';
import createApp from '@shopify/app-bridge';

const api = "https://promolaneglobal.com/public/index.php/api";


const instance = axios.create();
const urlParams = new URLSearchParams(window.location.search);
const host = urlParams.get('host');

if (host) {
    const app = createApp({
        apiKey: '31c664dd7677d99206c1287579653430',
        host
    });
    instance.interceptors.request.use(function (config) {
        return getSessionToken(app)
            .then((token) => {
                if (token) {
                    config.headers["Authorization"] = `Bearer ${token}`;
                } else {
                    const params = Object.fromEntries(urlParams);
                    config.headers["Authorization"] = JSON.stringify(params);
                }
                return config;
            });
    });
} else {
    instance.interceptors.request.use(function (config) {
        debugger
        const params = Object.fromEntries(urlParams);
        config.headers["Authorization"] = JSON.stringify(params);
        return config;
    });
}


export class ApiService {
    async getData(url, header) {
        const config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                ...header || {}
            }
        };
        let resData = '';
        let response = '';
        await instance.get(url, config).then((res) => {
            if (res.data.status === 200) {
                response = res.data;
            } else {
                response = res.data
            }
        }).catch((e) => {
            resData = e && e.response && e.response.data;
        })
        return resData || response
    }

    async postData(url, data, isFormData, header) {
        debugger
        const newData = qs.stringify(data);
        const config = {
            headers: {
                'content-type': isFormData ? 'multipart/form-data' : 'application/x-www-form-urlencoded',
                ...header || {}
            }
        }
        let resData = '';
        let response = '';
        await instance.post(url, isFormData ? data : newData, config).then((res) => {
            if (res.data.status === 200) {
                response = res.data;
            } else {
                response = res.data
            }
        }).catch((e) => {
            resData = e.response.data;
        })
        return resData || response
    }

    async putData(url, data, header) {
        const newData = qs.stringify(data);
        const config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                ...header || {}
            }
        }
        let resData = '';
        let response = '';
        await instance.put(url, newData, config).then((res) => {
            if (res.data.status === 200) {
                response = res.data;
            } else {
                response = res.data
            }
        }).catch((e) => {
            resData = e.response.data;
        })
        return resData || response
    }

    async deleteData(url, header) {
        const config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                ...header || {}
            }
        }
        let resData = '';
        let response = '';
        await instance.delete(url, config).then((res) => {
            if (res.data.status === 200) {
                response = res.data;
            } else {
                response = res.data
            }
        }).catch((e) => {
            resData = e.response.data;
        })
        return resData || response
    }

    async postDataAuth(url, data, header) {
        const newData = qs.stringify(data);
        const config = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                ...header || {}
            }
        }
        let resData = '';
        let response = '';
        await axios.post(url, newData, config).then((res) => {
            if (res.data.status === 200) {
                response = res.data;
            } else {
                response = res.data
            }
        }).catch((e) => {
            resData = e.response.data;
        })
        return resData || response
    }
    async postMethodInstall(url, data, headers, cancelToken) {
        const NewData = qs.stringify(data);
        const config = {
            headers: {
                ...(headers || {}),
                'content-type': 'application/x-www-form-urlencoded',
            },
        };
        if (cancelToken && cancelToken.token) {
            config.cancelToken = cancelToken.token;
        }
        let resData = '';
        const response = await axios.post(url, NewData, config).catch(thrown => {
            if (thrown.toString() === 'Cancel') {
                resData = 'cancel';
            } else {
                resData = { error: 'something went wrong' };;
            }
        });
        return resData || response.data;
    }

    async getDetails(payload) {
        return await this.postMethodInstall(`${api}/get-shop`, payload);
    }
}

export default ApiService
