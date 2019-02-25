let baseUrl = 'https://douban.uieee.com';

export default ({
    url,data,loading,navLoading
}) => new Promise(
    (resolve,reject) => {
        if(loading){
            wx.showLoading({
                title: '加载中...',
            });

        }

        if(navLoading) {
            wx.showNavigationBarLoading();
        }

        wx.request({
            url: baseUrl + url,
            data: data,
            method: 'GET',
            header: {
                "Content-Type": "json"
            },
            success: (res)=> {
                loading && wx.hideLoading();
                navLoading && wx.hideNavigationBarLoading();
                resolve(res);
            },
            fail: () => reject()
        })
    }
)