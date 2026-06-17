function createBtnPreLoader(btn) {
    btn.disabled = true;
    btn.innerHTML = "PROCESSING <i class='bx  bx-arrow-right-stroke'  ></i>";
    console.log("Pre-loader shown on button.");
}

function removeBtnPreLoader(btn, text) {
    btn.disabled = false;
    btn.innerHTML = text;
}

export function showBtnPreLoader(btn, status, text) {
    if (status) {
        createBtnPreLoader(btn);
    } else {
        removeBtnPreLoader(btn, text);
    }
}