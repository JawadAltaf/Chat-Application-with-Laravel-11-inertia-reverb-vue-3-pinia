<script setup>
    import { useMessageStore } from '@/Store/useMessageStore';
    import { useIntersectionObserver } from '@vueuse/core';
    import { ref } from 'vue';

    const props = defineProps({
        room:{
            type: Object,
            required: true
        }
    });

    const messagesStore = useMessageStore();
    const target = ref(null);

    const {stop} = useIntersectionObserver(
        target,
        ([{isIntersecting}], observerElement) => {
            if(isIntersecting && messagesStore.getIsLoaded){
                messagesStore.fetchPreviousMessages(props.room.slug);
            }
        });
</script>

<template>
    <main id="page-content" class="absolute inset-0">
        <div
            class="container mx-auto space-y-6 space-y-reverse px-4 py-24 lg:p-8 lg:pb-28 xl:max-w-7xl
            flex flex-col-reverse h-full overflow-y-auto"
        >
            <!-- Messages Received -->

            <div v-for="message in messagesStore.allMessages" :key="message.id"
                class="flex w-5/6 flex-col gap-2 lg:w-2/3 xl:w-1/3"
                :class="{
                    'items-start' : message.user.id != $page.props.auth.user.id,
                    'items-end ms-auto' : message.user.id == $page.props.auth.user.id
                }"
            >
                <p v-if="message.user.id != $page.props.auth.user.id" class="text-sm font-medium text-slate-500">
                    {{ message.user?.name || 'Unknown User' }}
                </p>
                <div
                    class="rounded-2xl px-5 py-3 bg-gray-100"
                    :class="{
                        'bg-indigo-600 rounded-br-none text-white' : message.user.id == $page.props.auth.user.id,
                        'rounded-tl-none' : message.user.id != $page.props.auth.user.id
                    }"
                >
                    <p class="font-semibold"
                        :class="{
                            'text-white' : message.user.id == $page.props.auth.user.id,
                            'text-slate-500' : message.user.id != $page.props.auth.user.id
                        }"
                    >
                        {{ message.content }}
                    </p>
                </div>
                <p class="text-xs font-medium text-slate-500"
                    :class="{
                        'text-right' : message.user.id == $page.props.auth.user.id,
                    }"
                >
                    {{ message.created_at }}
                </p>
            </div>
            <!-- END  Messages Received -->

            <div ref="target" class="translate-y-20"></div>
        </div>

    </main>
</template>
