import cookie from "./util"
import StaticCommonConst from "./StaticCommonConst"
import CSRFToken from "./CSRFToken"
import {request, GraphQLClient} from "graphql-request"

const sessionId = cookie.get(StaticCommonConst.COOKIE_NAMES.MIS.SESSION_ID);
const gtk = CSRFToken(sessionId);
const JwtToken = cookie.get(StaticCommonConst.COOKIE_NAMES.MIS.JWT_TOKEN_NAME);
// console.log('Jwt token', JwtToken, sessionId, document.cookie);

function getNameContent() {
    let name ="";
    let content = "";
    return {name, content}
}

const client = new GraphQLClient('/api/mis', {
    headers: {
        Authorization: JwtToken,
        gtk
    }
});
export default client