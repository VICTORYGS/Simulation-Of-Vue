<template>
    <div class="container">
        <div class="top">
            <div class="title">{{title}}</div>
            <div class="content">{{content}}</div>
        </div>

        <div class="btn">
            <button @click="confirm">确认</button>
            <button @click="cancel">取消</button>
        </div>
    </div>
</template>
<script>
  export default {
    name: "toastCom",
    props:{
      title:{
        default:'提示'
      },
      content:{
        default: '内容...'
      },
      confirm:Function,
      cancel:Function,
    }
  }
</script>

<style scoped>
    .container{
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        align-items: center;
        border: 4px solid #5e9eff;
        box-shadow: 1px 1px 20px #c5c5c5;
        border-radius: 5%;
        position: fixed;
        width: 20vw;
        min-height: 12vw;
        top: 20vh;
        left: 50%;
        transform: translateX(-50%);
        z-index: 99999;
        background: #fff;
    }
    .top{
        width: 100%;
    }
    .title{
        font-size:45px;
        padding: 20px 0;
        color: dodgerblue;
        text-align: center;
    }
    .content{
        font-size: 25px;
        text-align: left;
        padding:0 30px;
        box-sizing: border-box;
        word-break: break-all;
    }
    .btn{
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 30px;
        width: 100%;
    }
    .btn>button{
        border: none;
        background: none;
        border-top: 1px solid grey;
        width: 50%;
        text-align: center;
        padding:10px 0;
    }
    .btn>button:last-child{
        border-left: 1px solid #d7d7d7;
        color: #909090;
    }
    .btn>button:first-child{
        border-left: 1px solid grey;
        color: dodgerblue;
    }

</style>
