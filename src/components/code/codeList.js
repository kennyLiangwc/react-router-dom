import React, { Component } from "react";
import client from "../../utils/client"

export default class CodeList extends Component {
    componentWillMount() {
        const query = `{
            queryInviteTokenList(roleId: null, page: {pageSize: 100, pageNumber: 1}) {
              token
              roleId
              roleName
              uid
              state
              createAt
              updateAt
              createUid
              updateUid
            }
          }`;
        client.request(query).then(function(data) {
            console.log("data---",data)
        }).catch(function(err) {

        })
    }
    render() {
        return(
            <div>This is CodeList</div>
        )
    }
}