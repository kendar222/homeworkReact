import React, { Component } from 'react'

export default class Brand extends Component {
    constructor(){
        super()
        this.state = {
            brandList:[
                {
                    id:2,
                    name:'iPhone',
                    time:new Date()         
                },
                {
                    id:1,
                    name:'HUAWEI',
                    time:new Date()
                }
            ],
            current:{}
        }
    }
    submit(e){
        console.log(e);
        if(e.keyCode === 13){
            let name = e.target.value
            if(name === ''){
                alert('请输入品牌名称');
                return
            }
            if(this.state.current.id){
                this.update(this.state.current,name)
            }else{
               this.add(name)
            }
            e.target.value = ''
        }  
    }
    //添加品牌
    add(name){
        const {brandList} = this.state
        let id = brandList.length > 0 ? brandList[0].id + 1 : 1;
        let time = new Date()
        let params = {
            id,
            name,
            time
        }
        brandList.unshift(params);
        this.setState({brandList})
    }
    //修改品牌
    update(row,name){
        const {brandList} = this.state;
        const newList = brandList.map(item=>{
            if(item.id === row.id){
                return {
                    ...item,
                    name:name
                }
            }else{
                return item
            }
        })
        this.setState({brandList:newList});
        //将current值清空
        this.setState({current:{}})
    }
    edit(row){
        document.querySelector('input').value = row.name;
        this.setState({current:row})
    }
    del(index){
        this.state.brandList.splice(index,1)
        this.setState({brandList:this.state.brandList})
    }
    render() {
        const {brandList}  = this.state
        return (
            <div className='container'>
                <div className='well'>
                    <h1>品牌管理案例</h1>
                    <input type="text" className='form-control' placeholder='请输入品牌名称' onKeyDown={(e)=>this.submit(e)}/>
                </div>
                <table className = 'table table-hover'>
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>品牌名称</th>
                            <th>创建时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brandList.length > 0 ? brandList.map((item,index)=>(
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.time.toLocaleString()}</td>
                                <td>
                                    <button className='btn btn-primary' onClick={()=>this.edit(item)}>编辑</button>
                                    <button className='btn btn-danger' onClick={()=>this.del(index)}>删除</button>
                                </td>
                            </tr>
                        )):<tr>
                            <td colSpan='4'>暂无数据</td>
                            </tr>}
                       
                    </tbody>
                </table>
            </div>
        )
    }
}
