import axios from "axios";
import { defineStore }  from "pinia";

export const useMessageStore = defineStore('messages',{
    state: () => {
        return { page:1, messages:[], isLoaded: false }
    },

    actions: {
        fetchMessages(roomSlug, page=1){
            axios.get(`/rooms/${roomSlug}/messages?page=${page}`)
            .then((response) => {
                // this.messages = [...this.messages, response.data.data];
                this.messages = [...this.messages, ...response.data.data];
                this.page = response.data.meta.current_page;

                this.isLoaded = true;
            });
        },

        fetchPreviousMessages(roomSlug){
            this.fetchMessages(roomSlug, this.page + 1);
        },

        storeMessage(roomSlug, payload){
            axios.post(`/rooms/${roomSlug}/messages`, payload, {
                headers:{
                    'X-Socket-Id' : window.Echo.socketId(),
                },
            })
            .then((response) => {
                // this.messages = [response.data, ...this.messages];
                this.pushMessage(response.data);
            })
        },

        pushMessage(message){
            this.messages.pop();
            this.messages = [message, ...this.messages];
        }
    },

    getters: {
        allMessages(state){
            return state.messages;
        },

        getIsLoaded(state){
            return state.isLoaded;
        }
    }
})
