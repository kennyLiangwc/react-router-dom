import util from "./util"
import StaticCommonConst from "./StaticCommonConst"
import CSRFToken from "./CSRFToken"
import {request, GraphQLClient} from "graphql-request"
import { message } from 'antd';
import ui from "../utils/ui"
import { browserHistory } from 'react-router'



const sessionId = util.getCookie(StaticCommonConst.COOKIE_NAMES.MIS.SESSION_ID);
const gtk = CSRFToken(sessionId);
const JwtToken = util.getCookie(StaticCommonConst.COOKIE_NAMES.MIS.JWT_TOKEN_NAME);
// console.log('Jwt token', JwtToken, sessionId, document.cookie);

const client = new GraphQLClient('/api/mis', {
    headers: {
        Authorization: JwtToken,
        gtk
    }
});

let http = {};

http.post = function(action,params) {
    const client = new GraphQLClient('/api/mis', {
        headers: {
            Authorization: JwtToken,
            gtk
        }
    });
    // try {
    //     // ui.toast("success","1")
    //     let result = await client.request(action);

    // } catch (error) {
    //     console.log(error)
    //     ui.toast("error",error)
    // }
    return new Promise((reslove,reject) => {
        client.request(action).then(data => {
                reslove(data)
        }).catch(error => {
            let _errors = JSON.parse(JSON.stringify(error));
            const { errors } = _errors.response;
            if(errors && errors.length > 0) {
                try {
                    let message = JSON.parse(errors[0].message);
                    console.log("message",message)
                    if(message.ret == -3) {      //未登录
                        ui.toast("error","请重新登录");
                        window.location.replace("#/login")
                    }
                } catch (error) {
                    console.log("error1",error);
                    ui.toast("error",errors[0].message);
                    reject(error)
                }
            }
        })
    })
}

export default http