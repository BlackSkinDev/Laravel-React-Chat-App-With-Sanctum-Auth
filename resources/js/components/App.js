import React, { Component } from 'react'
import ReactDOM from "react-dom";
import Axios from 'axios'
import Pusher from "pusher-js";
import  styles  from '../styles/style.css'
import $ from "jquery";

class App extends Component {
    state ={

        BASE_URL:process.env.MIX_API_BASE_URL,
        message:'',
        username:'',
        messages:[],
        PUSHER_APP_KEY:process.env.MIX_PUSHER_APP_KEY,
        PUSHER_CLUSTER:process.env.MIX_PUSHER_APP_CLUSTER

    }

    async componentDidMount() {
        await this.getMessages();
        this.listenForNewMessage();
        //console.log(this.state)
    }


    listenForNewMessage = ()=>{
        let broadcastMessage ={};
        Pusher.logToConsole = true;
        const pusher = new Pusher(this.state.PUSHER_APP_KEY, {
            cluster: this.state.PUSHER_CLUSTER
        });

        const channel = pusher.subscribe('chat');
        channel.bind('message',(data)=>{
           let msg = this.state.messages
           msg.push(data);
           this.setState({messages:msg});
           var objDiv = document.getElementById("scroller");
           objDiv.scrollTop = objDiv.scrollHeight;
        })

    }

    getMessages = async () => {

        const response = await Axios.get(`${this.state.BASE_URL}/messages`)
        this.setState({messages: response.data.data})
        var objDiv = document.getElementById("scroller");
        objDiv.scrollTop = objDiv.scrollHeight;

    };


    submit = async(e)=>{
        e.preventDefault(0)
        const body = {
            username:"locci",
            message:this.state.message
        }
        const response = await Axios.post(`${this.state.BASE_URL}/messages`,body)
        this.setState({message:""})
        //console.log(response.data.data)
        // let msg = this.state.messages;
        // msg.push(response.data.data)
        // this.setState({messages:msg})


    }

    handleInput = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }


    render() {
        return (
            <div className="container">
            <div className="row my-row justify-content-center">
            <div className="col-md-6 my-column">
                <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                <div className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
                    <input className="fs-5 fw-semibold" name="username" value="locci" readOnly />
                </div>
                <div className="list-group list-group-flush border-bottom scrollarea" id="scroller">
                    {this.state.messages.map(message => {
                        return (
                            <div className="list-group-item list-group-item-action py-3 lh-tight" key={message.id}>
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                    <strong className="mb-1">{message.username}</strong>
                                </div>
                                <div className="col-10 mb-1 small">{message.message}</div>
                            </div>
                        )
                    })}

                </div>
            </div>
            <form onSubmit={this.submit} className="mt-2">
                <input className="form-control" name="message" placeholder="Write a message"  value={this.state.message}
                      onChange={(e)=>this.handleInput(e)}/>

            </form>
                </div>
            </div>

        </div>
        )
    }
}
export default App;


if (document.getElementById("app")) {
  ReactDOM.render(<App />, document.getElementById("app"));
}
