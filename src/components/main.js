import React, { Component } from "react";
import "./main.css"
//form 
import { FaPlus, FaEdit, FaWindowClose } from "react-icons/fa";

export default class Main extends Component{
    state = {
        novaTarefa: "",
        tarefas: [],
        index:-1,
    }
   

    handleChange = (e) => {
        this.setState({
            novaTarefa: e.target.value,
        });
    }
    handleSubmit = (e) =>{
        e.preventDefault()
        //atribuindo os valores a propriedade state
        const { novaTarefa } = this.state;
        let { tarefas, index } = this.state;
        novaTarefa.trim()
        //condicioal para verificar se existe uma tarefa
        if(tarefas.indexOf(novaTarefa) !== -1){
            return;
        }
        //copiando os dados para um novo array
        let novasTarefas = [...tarefas]
        //setando tarefas
        if(index === -1){
        this.setState({
            tarefas: [...novasTarefas, novaTarefa],
            novaTarefa: "",
        })
        //editando tarefas
        }else{
            novasTarefas[index] = novaTarefa;
        
            this.setState({
                tarefas:[...novasTarefas],
                index: -1,
                novaTarefa:"",
            })
        }
    }

    handleEdit = (e, index) =>{
        const { tarefas } = this.state;
        this.setState({
            index,
            novaTarefa: tarefas[index]
        })
    }

    handleDelete = (e, index) =>{
        const { tarefas } = this.state;
        const novasTarefas = [...tarefas];
        novasTarefas.splice(index, 1);
        this.setState({
            tarefas:[...novasTarefas],
        })
    }

    render(){
         const {  novaTarefa, tarefas  } = this.state
      return  <div className="main">
        <h1>Lista de Tarefas</h1>

        <form onSubmit={this.handleSubmit} action="#" className="form">
            <input onChange={this.handleChange} type="text" value={ novaTarefa }/>
            <button type="submit"><FaPlus/></button>
        </form>

        <ul className="listaTarefas">
            {tarefas.map((tarefas, index) => (
                <li key={ tarefas }>
                    { tarefas } <span>
                        <FaEdit className="edit"
                        onClick={(e) => this.handleEdit(e,index)}
                        />
                        <FaWindowClose   onClick={(e) => this.handleDelete(e,index)} className="delete"/>
                    </span>
                    </li>
            ))}
        </ul>
    </div>
    }
 };