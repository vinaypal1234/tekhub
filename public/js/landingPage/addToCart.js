function addToCart(courseId) {
    fetch(`http://localhost:4000/addToCart/${courseId}`)
        .then((res) => res.json())
        .then((data) => {
            alert(data.message);
        });
}