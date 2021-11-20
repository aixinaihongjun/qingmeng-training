<template>
    <div class='my-box'>
        <h1>
            {{someText}}
        </h1>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                someText: ''
            }
        },
        methods: {
            loadData(){
                this.axios.get('/testToken').then(res => {
                    this.someText = res.someText;
                });
            }
        },
        created(){
            // this.loadData() 
        }
    }
</script>

<style lang="scss" scoped>
    .my-box h1{
        position: absolute;
        top: 200px;
        left: 300px;
    }
</style>