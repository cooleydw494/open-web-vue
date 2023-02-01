export default {
    methods: {
        async sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms))
        },
    },
}
