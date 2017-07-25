import RNFetchBlob from 'react-native-fetch-blob'
import {Alert} from 'react-native'
const android = RNFetchBlob.android;
const dirs = RNFetchBlob.fs.dirs;

export default {

    download(params, callback){
        let {
            url,
            filename,
            header,
            fileType,
            title,
            description,
        } = params || {};
        let config=fileType==="apk"?{
            addAndroidDownloads : {
                useDownloadManager : true,
                title : title,
                description :description,
                mime : 'application/vnd.android.package-archive',
                mediaScannable : true,
                notification : true,
                path: dirs.DownloadDir + '/' + filename
            },
            // response data will be saved to this path if it has access right.

        }:{
            path: dirs.DCIMDir + '/AnZhu/' + filename
        };
        let task = RNFetchBlob
            .config(config)
            .fetch('GET', url, header || {});
       if(fileType==='apk'){
          //  Toast.info("开始下载...");
       }
       else{
          //  Toast.info("保存中...");
       }
        return task.then(async (res) => {
            if(fileType==="apk"){
               await android.actionViewIntent(res.path(), 'application/vnd.android.package-archive');
            }
            else{
                Alert.alert('', '文件已保存到:' + res.path(), [{text: "知道了~"}]);
            }
            callback && callback(res.path(), task.cancel);
        }).catch(e => {
            if(fileType==='apk'){
                // Toast.info("下载失败");
            }
            else{
                // Toast.info("保存失败");
            }
            task.cancel && task.cancel();
        });
    },
    upload(params, progressCallback, resultCallback) {
        const {
            action,
            path,
            name,
            interval,
            data: _data,
        } = params || {};
        var task = RNFetchBlob.fetch('POST', action, {
                'Content-Type': 'multipart/form-data'
            },
            [
                {name: 'file', filename: name || 'file', data: RNFetchBlob.wrap(path)}
            ]);

        task.uploadProgress({interval: interval || 250}, (written, total) => {

        }).progress({count: 10}, (received, total) => {
            let pro = received / total;
            progressCallback(Number(pro.toFixed()))
        })
            .then((resp) => {

                console.log('resp', resp);
                if (!resp) {
                    return;
                }
                if (!resp.respInfo) {
                    return;
                }
                if (resp.respInfo.status === 200) {
                    let data, err;
                    try {
                        data = JSON.parse(resp.data);
                    }
                    catch (e) {
                        err = "上传失败";
                    }
                    finally {
                        if (err) {
                            // Toast.info(err, 1);
                        }
                        resultCallback(data);
                        task.cancel();
                    }

                }
                else {
                    // Toast.info("上传失败", 1);
                }

            })
            .catch((err) => {

                resultCallback(null, {err: "出了点儿小问题~", status: "error", message: "出了点儿小问题~"});
                task.cancel();
                console.log('err', err);
            });
    }
};
