let getCookie = require('../functions/getCookie');

export default({
    data() {
        return {
            tokenSession: '',
        }
    },
    mounted() {
        this.tokenSession = getCookie('REDIS-SESSION');
    },
    computed: {
        yourConfig: function () {
            this.tokenSession = getCookie('REDIS-SESSION');
            return {
                headers: {
                    'X-Authorization': "Bearer " + this.tokenSession,
                }
            }
        },
    }
});