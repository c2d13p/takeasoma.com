function subscribe() {
    var type = document.getElementById('subscription-type').value;
    var input = document.getElementById('subscription-input').value;
    var button = document.getElementById('subscribe-button');

    if (input.trim() === "") {
        alert("please enter an email or phone number");
        return;
    }

    // Simulate sending email (replace with actual email sending code)
    console.log(`New subscription by ${type} @ ${input}`);

    button.textContent = "subscribed!";
    button.disabled = true;
}