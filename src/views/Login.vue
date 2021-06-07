<template>
    <div>
        <p>Redirecting to login page ...</p>
    </div>
</template>

<script>
export default {
    name:'Login',
    created(){
        window.location.href = "https://recipe-share.auth.us-east-1.amazoncognito.com/login?client_id=6qa580mpo6fk1g1l7529sftado&response_type=code&scope=email+openid+profile&redirect_uri=https://api.respishare.com/auth/authorize"
    }
}
</script>



