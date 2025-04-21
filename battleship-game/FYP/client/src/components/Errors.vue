<template>
    <div class="alert alert-danger">{{ msg }}</div>
</template>

<script>
export default {
    name: "Errors",
    props: ["msg"]
}
</script>

<style scoped>
.alert {
    border-radius: 0px;
}
.alert-danger{
    background: red;
    color: #fff;
    margin-top: -2vmin;
    margin-bottom: 2vmin;
}
</style>