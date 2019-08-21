import React, { Component ,Http} from 'react'
import Cascader from '@/components/Cascader'
import { Select, Button, Icon, Table, Pagination} from '@alifd/next';
import { Form, Field } from '@ice/form';
import IceContainer from '@icedesign/container';
const CustomLoading = (props) => (
  <Loading
    indicator={indicator}
    {...props}
  />
);
export default class RIcTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      page:0,
      size:10,
      list:[],
      totalElements:0
    }
  }
  componentDidMount() {
    this.queryList()
  }
  
  onSubmit(values) {
    this.queryList(values)
  }
  queryList(value){
    let size=this.state.size,page=this.state.page
    let params={...value,size,page}
    Http.$get(this.props.tableData.queryUrl,params).then(res=>{
      const {resultCode,data}=res
      if (resultCode===0) {
        this.setState({list:data.content,totalElements: data.totalElements })
      }
    })
  }
  onSize(value){
    this.setState({size:value},()=>{
      this.queryList()
    })
  }
  onPage(value){
    value=value-1
    this.setState({page:value},()=>{
      this.queryList()
    })
  }
  render() {
    return (
      <div className='my-table'>
        <IceContainer>
          <Form
            className="ice-inline-form"
            onSubmit={this.onSubmit.bind(this)}
            layout={{
              labelTextAlign: 'left',
              labelCol: 6,
              wrapperCol: 6,
            }}
          >
            {this.props.tableData.field.map(val=>{
                if (val.type==='Cascader') {
                   return <Field className='area' label="区域入口：" name="area" component={Cascader} placeholder="请输入名字" />
                }else if(val.type==='select'){
                   return <Field label="一级入口：" size="small" name={val.type} component={Select} placeholder="请选择" >
                            {
                                val.data.map(val => {
                                return <Select.Option value={val.value} key="small">{val.label}</Select.Option>
                                })
                            }
                    </Field>

                }
            })}
            <Field className="submit" layout={
              { wrapperCol: 12 }
            }>
              <Button htmlType="submit" type="primary" size="small"><Icon type="search" /></Button>
            </Field>
            <br /><br />
          </Form>
            {
                this.props.tableData.button.map(val=>{
                  return  <Button type={val.type||'primary'} onClick={()=>val.onClick()}>{val.value}</Button>
                })
            }
        </IceContainer>
        <IceContainer>
          <Table
            dataSource={this.state.list}
            loading={this.state.loading}
            loadingComponent={CustomLoading}
            isZebra
            indent={2}
            isTree
            hasExpandedRowCtrl
            primaryKey='id'
          >
              {
                  this.props.tableData.column.map(val=>{
                    return  <Table.Column align={val.align||'center'} title={val.title||''} dataIndex={val.dataIndex||''} cell={val.cell} />
                  })
              }
          </Table>
          <Pagination pageSizeSelector="filter" onChange={(value)=>{this.onPage(value)}} pageSize={this.state.size}  total={this.state.totalElements}
           onPageSizeChange={(value)=>this.onSize(value)}  useFloatLayout />
        </IceContainer>

      </div>
    )
  }
}
