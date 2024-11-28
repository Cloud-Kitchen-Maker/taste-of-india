document.addEventListener('DOMContentLoaded', () => {
    if (location.pathname.endsWith('index.html')) {
        fetch('/menu')
            .then(res => res.json())
            .then(menu => {
                const container = document.getElementById('menu-container');
                menu.forEach(dish => {
                    const div = document.createElement('div');
                    div.innerHTML = `<h3>${dish.name}</h3><p>Price: ₹${dish.price}</p>`;
                    container.appendChild(div);
                });
            });
    }

    if (location.pathname.endsWith('admin.html')) {
        const adminForm = document.getElementById('admin-form');
        adminForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('dish-name').value;
            const price = parseInt(document.getElementById('dish-price').value);
            fetch('/menu', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ item: { name, price } })
            }).then(() => {
                alert('Dish added/updated!');
                location.reload();
            });
        });

        fetch('/menu')
            .then(res => res.json())
            .then(menu => {
                const container = document.getElementById('menu-admin-container');
                menu.forEach(dish => {
                    const div = document.createElement('div');
                    div.innerHTML = `<h3>${dish.name}</h3><p>Price: ₹${dish.price}</p>`;
                    container.appendChild(div);
                });
            });
    }
});

