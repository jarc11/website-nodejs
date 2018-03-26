document.addEventListener('DOMContentLoaded', function () {

    $('#desc-header').click(function(){
            $('#desc-content').fadeToggle('3000');     
    })

    $('#store').on("change", function(){
            $('#storefields').fadeToggle('2000');
    })

    if (document.getElementById("cookie").value === "true") {
        document.getElementById('storageContainer').style.display = "flex";
    }
    
});