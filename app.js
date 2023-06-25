$(document).ready(function() {
    var items = []; // Local array to store the items

    // Function to render the items
    function renderItems() {
        var itemList = $("#itemList");
        itemList.empty(); // Clear the item list

        if (items.length === 0) {
            itemList.append("<p>No items found.</p>");
        } else {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var itemHtml = `
                    <div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                            <p class="card-text">${item.description}</p>
                            <p class="card-text"><small class="text-muted">Created on ${item.timestamp}</small></p>
                            <button type="button" class="btn btn-primary btn-sm mr-2 edit-item" data-item-id="${i}">Edit</button>
                            <button type="button" class="btn btn-danger btn-sm delete-item" data-item-id="${i}">Delete</button>
                        </div>
                    </div>
                `;
                itemList.append(itemHtml);
            }
        }
    }

    // Function to add a new item
    function addItem(title, description) {
        var newItem = {
            title: title,
            description: description,
            timestamp: new Date().toLocaleString() // Add timestamp to the item
        };
        items.push(newItem);
        renderItems();
    }

    // Function to delete an item
    function deleteItem(itemId) {
        items.splice(itemId, 1);
        renderItems();
    }

    // Event listener for form submission
    $("#addItemForm").submit(function(event) {
        event.preventDefault();
        var title = $("#itemTitle").val();
        var description = $("#itemDescription").val();
        addItem(title, description);
        this.reset();
    });

    // Event listener for delete item button
    $("#itemList").on("click", ".delete-item", function() {
        var itemId = $(this).data("item-id");
        deleteItem(itemId);
    });

    // Initial rendering of items
    renderItems();
});
