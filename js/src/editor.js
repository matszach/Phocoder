const Editor = {

    putDefault() {
        $('#code-area').val(
            'function(p) {\n' + 
            '  return {\n' + 
            '    red: p.red,\n' + 
            '    green: p.green,\n' + 
            '    blue: p.blue,\n' + 
            '    alpha: p.alpha\n' + 
            '  };\n' + 
            '}'
        );
    },

    getUserFunction() {
        let content = $('#code-area').val();
        let userFunction = eval('(' + content + ')');
        return userFunction;
    },

    toPixel(pixelData, x, y) {
        return {
            x: x,
            y: y,
            red: pixelData[0],
            green: pixelData[1],
            blue: pixelData[2],
            alpha: pixelData[3]
        };
    },

    toColor(pixel) {
        return `rgba(${pixel.red}, ${pixel.green}, ${pixel.blue}, ${pixel.alpha})`;
    },

    edit(oldImg, oldCvs, newCvs) {
        let oldCtx = oldCvs.getContext('2d');
        let newCtx = newCvs.getContext('2d');
        let userFunction = this.getUserFunction();
        this._setCvsSizes(oldImg, oldCvs, newCvs);
        oldCtx.drawImage(oldImg, 0, 0);
        this._transform(oldImg, oldCtx, newCtx, userFunction);
    },

    _transform(oldImg, oldCtx, newCtx, userFunction) {
        for(let x = 0; x < oldImg.clientWidth; x++) {
            for(let y = 0; y < oldImg.clientHeight; y++) {
                let pixelData = oldCtx.getImageData(x, y, 1, 1).data;
                let pixel = this.toPixel(pixelData, x, y);
                pixel = userFunction(pixel);
                newCtx.fillStyle = this.toColor(pixel);
                newCtx.fillRect(x, y, 1, 1);
            }
        }
    },

    _setCvsSizes(oldImg, oldCvs, newCvs) {
        oldCvs.width = oldImg.clientWidth;
        newCvs.width = oldImg.clientWidth;
        oldCvs.height = oldImg.clientHeight;
        newCvs.height = oldImg.clientHeight;
    }

}