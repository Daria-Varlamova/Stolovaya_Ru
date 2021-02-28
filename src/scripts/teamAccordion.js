const openItem = (item) => {
    const container = item.closest(".team__item");
    const contentBlock = container.find(".team__details");
    const textBlock = contentBlock.find('.team__details-block');
    const reqHeight = textBlock.height();

    container.addClass("active");
    contentBlock.height(reqHeight);
};

const clouseEveryItem = (container) => {
    const items = container.find(".team__details");
    const itemContainer = container.find(".team__item");

    itemContainer.removeClass("active");
    items.height(0);
};

$(".team__title").click((e) => {
    const $this = $(e.currentTarget);
    const container = $this.closest(".team");
    const elemContainer = $this.closest(".team__item");

    if (elemContainer.hasClass("active")) {
       clouseEveryItem(container);
    } else {
        clouseEveryItem(container);
        openItem($this);
    }
});
