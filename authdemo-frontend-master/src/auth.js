module.exports.isAuthenticated = () => {
    
    if(sessionStorage.getItem(['vueauthdemo'])){
        // Logged in 
        return true;
    } else {
        // Not logged in
        return false;
    }
}