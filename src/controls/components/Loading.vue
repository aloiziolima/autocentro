<template type="x/template" id="loading">
    <div class="modal-mask" v-show="isLoading" transition="modal">
        <div class="modal-container"></div>
    </div>
</div>
</template>
<script>
    export default {
        vuex: {
            getters: {
                isLoading: store => store.Controls.loading
            }
        }
    }
</script>

<style scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }
    .modal-container {
        width: 120px;
        height: 120px;
        position: absolute;    
        left: 47%;
        top: 40%;     
        margin: 0px auto;
        background-color: #fff;
        background-image: url("src/controls/components/pie.gif");   
    }
    .modal-enter, .modal-leave {
        opacity: 0;
    }
    .modal-leave .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>