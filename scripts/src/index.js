(function () {
    var number = 0;

    const imageCount = imageArray.length;
    function image(num) {
        if (num == 1) {
            if (number < imageCount - 1) {
                number++;
                document.getElementById('images').src = imageArray[number];
                document.getElementById('num_img').innerHTML = `${number + 1}/${imageCount}`;
            }
        } else if (number > 0) {
            number--;
            document.getElementById('images').src = imageArray[number];
            document.getElementById('num_img').innerHTML = `${number + 1}/${imageCount}`;
        }
    }
    const leftArrow = document.getElementById('leftArrow');
    const rightArrow = document.getElementById('rightArrow');

    leftArrow.addEventListener('click', () => {
        image(0);
    });

    rightArrow.addEventListener('click', () => {
        image(1);
    });
}());

