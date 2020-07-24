function displayMessage($response, $isError = false) {
    let $m = $response.data.message;
    if($isError){
        new Noty({
            type: "error",
            text: "<strong style='color: whitesmoke'>Error: </strong><br>" + $m,
            progressBar: true,
            timeout: 3500,
        }).show();
    }else{
        new Noty({
            type: "success",
            text: "<strong>Éxito: </strong><br>" + $m,
            progressBar: true,
            timeout: 3500,
        }).show();
    }

}

module.exports = displayMessage;
