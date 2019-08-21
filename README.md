## 基于飞冰编写的表单组件


- RIcTable组件传入参数tableData

- 参数结构
```
{
    queryUrl:'' 请求接口，
    button:[        类型Array
        {
            type:'',  按钮类型 默认primary       类型String
            value:'',  按钮内容                  类型String
            onClick:function(){                 类型func
                按钮事件
            }
        }
    ],
    field:[
        {
            type:' ',  筛选类型  目前只支持     可选：'Select'
            data:[                             如果是选择的需要写入数据
                {value:'',label:""}
            ]
        }
    ],
    column:[
        align：""     内容方向  默认'center'
        title：""     标题
        dataIndex:'', 与数据对应的KEY
        cell:function(value, index, record){  过滤器  可以根据方法修改数据

        }
    ]
}
```
