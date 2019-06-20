module.exports = function(){
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+~-={}|:"?><[]\;'
    let alpha = alphabet[Math.floor(Math.random() * alphabet.length)]
    return alpha + Math.floor(Math.random() * 99999) + 1000 + alpha
}