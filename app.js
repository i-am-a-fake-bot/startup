let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

function calcCostPerUnit(cost, units) {
    return cost / units;
}

function calcRecommendedPrice(cpu, markup) {
    return cpu + (cpu * (markup / 100));
}

function render() {
    const table = document.getElementById("inventoryTable");
    table.innerHTML = "";

    inventory.forEach((item, index) => {
        const cpu = calcCostPerUnit(item.supplierCost, item.unitsPerPack);
        const recPrice = calcRecommendedPrice(cpu, item.markup);

        table.innerHTML += `
         <tr>
            <td>${item.name}</td>
            <td>${cpu.toFixed(2)}</td>
            <td>${item.markup}%</td>
            <td>${recPrice.toFixed(2)}</td>
            <td>${item.stock}</td>
            <td>${item.sellingPrice || recPrice.toFixed(2)}</td>
            <td><button onclick="removeItem(${index})">Delete</button></td>
        </tr>
        `;
    });

    localStorage.setItem("inventory", JSON.stringify(inventory));
}
function addItem() {
    const item = {
        name: document.getElementById("name").value,
        supplierCost: parseFloat(document.getElementById("supplierCost").value),
        unitsPerPack: parseInt(document.getElementById("unitsPerPack").value),
        stock: parseInt(document.getElementById("stock").value),
        markup: parseFloat(document.getElementById("markup").value),
        sellingPrice: null
    };

    inventory.push(item);
    render();

    syncToGitHub();
}

function removeItem(index) {
    inventory.splice(index, 1);
    render();
    syncToGitHub();
}
render();
