<script setup>
import Messages from '@/Components/Chat/Messages.vue';
import Footer from '@/Components/Chat/Footer.vue';
import Header from '@/Components/Chat/Header.vue';
import Nav from '@/Components/Chat/Nav.vue';
import { useMessageStore } from '@/Store/useMessageStore';
import { useUsersStore } from '@/Store/useUsersStore';
import { onUnmounted } from 'vue';

const props = defineProps({
    room:{
        type: Object,
        required: true
    }

});

onUnmounted(() => {
    window.Echo.leave(`room.${props.room.id}`);
});

const messagesStore = useMessageStore();
const userStore = useUsersStore();

      messagesStore.fetchMessages(props.room.slug);

const storeMessage = (payload) => {
    messagesStore.storeMessage(props.room.slug, payload);
}

const channel = window.Echo.join(`room.${props.room.id}`);

      channel.listen("MessageCreated", (e) => {
            messagesStore.pushMessage(e);
      }).here(users => userStore.setUsers(users))
        .joining((user) => userStore.addUser(user))
        .leaving((user) => userStore.removeUser(user))
        .listenForWhisper('typing', (e) => {
            userStore.setTyping(e)
        });


</script>

<template>
    <Head title="Messages" />
        <div>
            <!-- Page Container -->
            <div
                id="page-container"
                class="relative mx-auto h-screen min-w-[320px] bg-white lg:ms-80"
            >
                <!-- Page Sidebar -->
                <Nav/>
                <!-- Page Sidebar -->

                <!-- Page Header -->
                <Header/>
                <!-- END Page Header -->

                <!-- Page Content -->
                <Messages :room="room"/>
                <!-- END Page Content -->

                <!-- Page Footer -->
                <Footer
                    v-on:valid="storeMessage({ content: $event })"
                    v-on:typing="channel.whisper('typing',{
                        user_id: $page.props.auth.user.id,
                        typing: $event
                    })"
                    />
                <!-- END Page Footer -->
            </div>
            <!-- END Page Container -->
        </div>
</template>
