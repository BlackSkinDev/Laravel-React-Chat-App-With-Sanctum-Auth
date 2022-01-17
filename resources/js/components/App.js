import React from 'react';
import ReactDOM from 'react-dom';
import {useEffect, useState} from "react";
import Axios from 'axios'
import Pusher from "pusher-js";

function App() {
    const [BASE_URL] = useState(process.env.MIX_API_BASE_URL)
    const [PUSHER_APP_KEY] = useState(process.env.MIX_PUSHER_APP_KEY)
    const [PUSHER_CLUSTER] = useState(process.env.MIX_PUSHER_APP_CLUSTER)

    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('username');
    const [messages, setMessages] = useState([]);



    useEffect(() => {
        // fetch all current messages
        const all_messages = Axios.get(`${BASE_URL}/messages`)
        .then((messages) => {
            console.log(messages)
        })
        .catch((err) => {
            console.log("error")
        })

        Pusher.logToConsole = true;
            const pusher = new Pusher(PUSHER_APP_KEY, {
            cluster: PUSHER_CLUSTER
        });

        const channel = pusher.subscribe('chat');
        channel.bind('message', function (data) {

        });

    }, []);

    const submit = async e => {
        e.preventDefault();
        const body = {
            username:username,
            content:message
        }
        const response = await Axios.post(`${BASE_URL}/messages`,body)
        setMessage('');

    }

    return (
        <div className="container">
            <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                <div className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
                    <input className="fs-5 fw-semibold" value={username} onChange={e => setUsername(e.target.value)}/>
                </div>
                <div className="list-group list-group-flush border-bottom scrollarea">
                    {messages.map(message => {
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
            <form onSubmit={e => submit(e)}>
                <input className="form-control" placeholder="Write a message" value={message}
                       onChange={e => setMessage(e.target.value)}
                />
            </form>
        </div>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
