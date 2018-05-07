import http from "../../../utils/http"

let role = {
    getRoleList() {
        return new Promise((reslove,reject) => {
            const query = `
                query QueryRoleList($input:RoleInput){
                    queryRoleList(input:$input){
                        name
                        id
                        description
                    }
                }
            `;
            http.post(query,{
                input: {}
            },false).then(data => {
                reslove(data.queryRoleList)
            })
        })
        
    }
};
export default role