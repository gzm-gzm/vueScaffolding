export const getBaseUrl = () => {
    const VUE_APP_API_TYPE = process.env.VUE_APP_API_TYPE;
    const apiObj = {
        dev: '/', //这个必须这样写
        test: 'https://m.study.163.com/',
        pre: 'http://gateway-pre-zto.songyelin.com/',
        production: 'http://gateway.songyelin.com/'
    };
    console.log(apiObj.dev)
        //因为是使用npm run dev 所以他这个要是apiObj.dev
    if (process.env.NODE_ENV === 'development') {
        return apiObj.dev;
    }
    return apiObj[VUE_APP_API_TYPE];
};
