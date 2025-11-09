    const arr = [];

    function addName() {
        const inputNameElement = document.querySelector('.js-input-name');
        const nameValue = inputNameElement.value;
        if(nameValue) {
            arr.push(nameValue);
            console.log(arr);
            inputNameElement.value = '';
        }
    }
