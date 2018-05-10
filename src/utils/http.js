import util from "./util"
import StaticCommonConst from "./StaticCommonConst"
import CSRFToken from "./CSRFToken"
import { GraphQLClient } from "graphql-request"
import ui from "./ui"


const sessionId = util.getCookie(StaticCommonConst.COOKIE_NAMES.MIS.SESSION_ID);
const gtk = CSRFToken(sessionId);
const JwtToken = util.getCookie(StaticCommonConst.COOKIE_NAMES.MIS.JWT_TOKEN_NAME);

let loading = document.getElementById("loading");
function showLoading(needLoading) {
    if(needLoading) loading.style.display = "";
    else loading.style.display = "none";
}

const client = new GraphQLClient('/api/mis', {
    headers: {
        Authorization: JwtToken,
        gtk
    }
});

let http = {};

showLoading(false);
http.post = function(action,params,needLoading = true) {
    showLoading(needLoading);
    
    const client = new GraphQLClient('/api/mis', {
        headers: {
            Authorization: JwtToken,
            gtk
        }
    });
    return new Promise((reslove,reject) => {
        client.request(action,params).then(data => {
                reslove(data);
                showLoading(false)
        }).catch(error => {
            let _errors = JSON.parse(JSON.stringify(error));
            const { errors } = _errors.response;
            showLoading(false);
            if(errors && errors.length > 0) {
                try {
                    let message = JSON.parse(errors[0].message);
                    ui.toast("error",message.msg);
                    if(message.ret == -3) {      //未登录
                        ui.toast("error","请重新登录");
                        window.location.replace("#/login")
                    }
                } catch (error) {
                    console.log("error1",error);
                    ui.toast("error",error.message);
                }
            }
        })
    })
}

export default http