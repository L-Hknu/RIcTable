import React, { Component } from 'react'
import RIcTable from "@/components/RIcTable";

export default  class Manager  extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData:{
                queryUrl:'queryConfigBusinessArea',
                column:[
                    {align:'center',title:'我的天',dataIndex:'name'},
                    {align:'center',title:'我的天',dataIndex:'name'},
                    {align:'center',title:'我的天',dataIndex:'name'},
                ],
                field:[
                    {type:'Cascader'}
                ],
                button:[
                    {type:'primary',
                    value:'按钮',
                    onClick:function () {
                        console.log('111');
                    }
                }
                ]
                
            }
        };
    }
    render() {
   
        return (
            <div > 

                <RIcTable tableData={this.state.tableData}
                >
                </RIcTable>
            </div>
        )
    }
}

