const FileIO = {

    onInput(input) {
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            reader.onload = e => {
                $('#file-input-display').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    },

    onConvert(input) {
        let oldCvs = document.createElement('canvas');
        let newCvs = document.createElement('canvas');
        let oldImg = document.getElementById('file-input-display');
        Editor.edit(oldImg, oldCvs, newCvs);
        let newImgUrl = newCvs.toDataURL('image/png');
        $('#file-output-display').attr('src', newImgUrl);
    }

}