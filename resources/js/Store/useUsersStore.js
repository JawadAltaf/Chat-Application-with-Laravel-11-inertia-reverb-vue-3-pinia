import { defineStore }  from "pinia";

export const useUsersStore = defineStore('users',{
    state: () => {
        return { users:[] }
    },

    actions: {
        setUsers(users){
            this.users = users
        },

        addUser(user){
            if(typeof this.users.find(u => u.id == user.id) != 'undefined'){
                return;
            }
            this.users.push(user);
        },

        removeUser(user){
            this.users = this.users.filter(u => u.id != user.id)
        },

        setTyping(event){
            this.users.find((user) => user.id == event.user_id).typing = event.typing;
        }
    },

    getters: {
        allUsers(state){
            return state.users;
        },

        count(state){
            return state.users.length
        }
    }
})
