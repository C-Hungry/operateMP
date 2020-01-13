function goUrl(url, mode = 1, callback) {
    switch (mode) {
        case 1: {
            wx.navigateTo({
                url,
                success: () => {
                    typeof callback === 'function' && callback();
                }
            });
            break;
        }
        case 2: {
            wx.redirectTo({
                url,
                success: () => {
                    typeof callback === 'function' && callback();
                }
            });
            break;
        }
        case 3: {
            wx.switchTab({
                url,
                success: () => {
                    typeof callback === 'function' && callback();
                }
            });
            break;
        }
    }
}
export default goUrl;