(function () {

    var canvas = this.__canvas = new fabric.Canvas('canvas'),
        imgs = [],
        width = 640,
        num = 4,
        index = undefined;


    /**
     * Draws images into canvas with optional left offset
     *
     * @param {number} startOffset Optional left offset
     */
    function drawImages(startOffset) {
        for (var i = 0; i < num; i++) {
            var img = document.getElementById(i);
            imgs[i] = new fabric.Image(img, {
                top: 0,
                left: ((startOffset || 0) + width * i),
                lockMovementY: true,
                hasControls: false,
                hoverCursor: 'hand',
                moveCursor: 'hand',
                defaultCursor: 'hand'
            });
            canvas.add(imgs[i]);
        }
    }


    /**
     * Checks if we have slided to the edges of the slider
     *
     * @param {number} index Index of img which has generated event
     * @returns {boolean} true||false If sliding is out of boundaries
     */
    function isOutOfBoundaries(index) {
        var offset = imgs[index].getLeft();
        return ((index === 0 && offset >= 0) || (index === (num - 1) && offset <= 0)) ? true : false;
    }


    /**
     * Slides all images
     *
     * @param {number} index Index of img which has generated event
     */
    function slideAllImages(index) {
        for (var i = 0; i < num; i++) {
            if (i != index) {
                imgs[i].setLeft(width * i + imgs[index].getLeft() - width * index);
            }
        }
    }


    /**
     * Stops sliding if image is out of boundaries || does slide
     *
     * @param {object} Event ev
     */
    function checkImageState(ev) {
        if (isOutOfBoundaries(index)) {
            imgs[index].setLeft(0);
        } else {
            slideAllImages(index);
        }
    }


    /**
     * Sets current image index on mouseDown, processes images movement
     * or redraws all images when dragging has stopped
     *
     */
    canvas.on({
        'object:moving': checkImageState,
        'mouse:down': function (ev) {
            if (ev.target && ev.target._element) {
                index = parseInt(ev.target._element.id);
            }
        },
        'mouse:up': function (ev) {
            drawImages(imgs[0].getLeft());
        }
    });


    // Initial images drawing
    drawImages();

})();