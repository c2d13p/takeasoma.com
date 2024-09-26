document.getElementById('subscribe-button').addEventListener('click', subscribe);

function subscribe() {
    var type = document.getElementById('subscription-type').value;
    var input = document.getElementById('subscription-input').value;
    var button = document.getElementById('subscribe-button');

    if (input.trim() === "") {
        alert("please enter an email or phone number");
        return;
    }

    console.log(`New subscription by ${type} @ ${input}`);

    // Fill the hidden form input and submit it
    document.getElementById('hidden-entry').value = input;
    document.getElementById('hidden-form').submit();

    button.textContent = "subscribed!";
    button.disabled = true;
}