<script setup>
import {ref} from 'vue';

const message = ref('');
const shift = ref(false);
const emit = defineEmits();

const handleEnter = (e) => {

    if(shift.value && message.value.length){
        message.value +='\n';
        return;
    }

    if(message.value.length){
        emit('valid', message.value);
        message.value = "";

        handleFinishedTyping();
    }
}

let typingTimeOut = null;

const handleTyping = () => {
    clearTimeout(typingTimeOut);
    emit('typing', true);
    typingTimeOut = setTimeout(handleFinishedTyping,3000);
}

const handleFinishedTyping = () => {
    clearTimeout(typingTimeOut);
    emit('typing', false);
}
</script>

<template>
    <footer
        id="page-footer"
        class="fixed bottom-0 end-0 start-0 items-center border-t border-slate-200/75 bg-white lg:start-80"
    >
            <textarea
                v-model="message"
                v-on:keydown.enter.prevent="handleEnter"
                v-on:keydown.shift="shift = true"
                v-on:keyup="shift = false"
                type="text"
                v-on:keydown="handleTyping"

                class="-mx-5 block w-full rounded-lg border-0 px-5 py-4 leading-6 focus:border-indigo-500 focus:ring focus:ring-indigo-500/75"
                placeholder="Type a new message and hit enter.."
            ></textarea>

    </footer>
</template>
