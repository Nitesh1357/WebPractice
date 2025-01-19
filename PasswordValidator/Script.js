function validatePassword() {
    var password = document.getElementById('password').value;
    var message = document.getElementById('message');

    var lowerCase = /[a-z]/.test(password);
    var upperCase = /[A-Z]/.test(password);
    var numeric = /[0-9]/.test(password);
    var specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    var minLength = password.length >= 8;

    if (lowerCase && upperCase && numeric && specialChar && minLength) {
        message.style.color = 'green';
        message.innerHTML = 'Password is valid!';
    } else {
        message.style.color = 'red';
        message.innerHTML = 'Password must contain:<br>' +
                            '- At least one lowercase letter<br>' +
                            '- At least one uppercase letter<br>' +
                            '- At least one numeric digit<br>' +
                            '- At least one special character<br>' +
                            '- Minimum length of 8 characters';
    }
}
