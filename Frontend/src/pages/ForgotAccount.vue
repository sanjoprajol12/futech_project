<template>
    <div>
        <h2>Forgot Account</h2>
        <form>
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required>
            <button type="submit">Submit</button>
            <p><a href="/Login">Login</a></p>
            <p><a href="/Register">Register</a></p>
        </form>
    </div>
</template>