const mesureWidth = (item) => {
    let reqItemWidth = 0;
    
    const screenWidth = $(window).width();
    const container = item.closest(".colors-acco");
    const titlesBlocks = container.find(".colors-acco__trigger");
    const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

    const textContainer = item.find(".colors-acco__container");
    const paddingLeft = parseInt(textContainer.css("padding-left"));
    const paddingRight = parseInt(textContainer.css("padding-right"));

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    

    if (isMobile) {
        reqItemWidth = screenWidth - titlesWidth;
    } else {
        reqItemWidth = 500;
    }

    return {
        container: reqItemWidth,
        textContainer: reqItemWidth - paddingLeft - paddingRight
    }
};

const closeEveryItemInContainer = container => {
    const items = container.find(".colors-acco__item");
    const content = container.find(".colors-acco__content");

    items.removeClass("active");
    content.width(0);
}

const OPENItem = item => {
    const hidenContent = item.find(".colors-acco__content");
    const reqWidth = mesureWidth(item);
    const textBlock = item.find(".colors-acco__container");

    item.addClass("active");
    hidenContent.width(reqWidth.container);
    textBlock.width(reqWidth.textContainer)
}


$(".colors-acco__trigger").on("click", e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const item = $this.closest(".colors-acco__item");
    const itemOpend = item.hasClass("active");
    const container = $this.closest(".colors-acco");

    if (itemOpend) {
        closeEveryItemInContainer(container);
    } else {
        closeEveryItemInContainer(container);
        OPENItem(item);
    }
});

$(".colors-acco__close").on("click", e => {
    e.preventDefault();
    closeEveryItemInContainer($(".colors-acco"));
});