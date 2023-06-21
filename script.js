(function () {
    // const input_name = document.getElementById("input_name").value;
    var inBuildOptions = {
        showBtnClass: '',
        showBtnHtml: 'Show',
        outerBoxClass: '',
        innerBoxClass: '',
        closeBtnClass: '',
        closeBtnHtml: 'x',
        bodyContentHtml: "input_name.value",
        closeBtnCallback: function () { },
        showBtnCallback: function () { }
    }
    Element.prototype.nameBox = function (newOptions) {
        if (newOptions) {
            this.options = { ...inBuildOptions, ...newOptions };
        } else {
            this.options = inBuildOptions;
        }

        // dom named in objLocal................................
        var objLocal = this;
        var styleContent = `<style>
        .nameBox-${objLocal.id} {
            display: none;
            z-index: 0;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgb(12 10 10 / 46%)
        }

        .nameBox-content-${objLocal.id} {
            position: fixed;
            background-color:#fff;
            width: 200px;
            padding: 10%;
            top: 30%;
            left: 30%;
        }

        .close-${objLocal.id} {
            position: absolute;
            right: 5%;
            top: 5%;
            cursor: pointer;
        }
    </style>`;
// dom content.....................................................................................
        var htmlContent = `
 
        <button id="nameBox-show-btn-${objLocal.id}" class="${objLocal.options.showBtnClass}">${objLocal.options.showBtnHtml}</button>`
// ........................popup field.............................{closebutton and content }...........................
        htmlContent += ` <div id="nameBox-element-${objLocal.id}" class="nameBox-${objLocal.id} ${objLocal.options.outerBoxClass}">
        <div class="nameBox-content-${objLocal.id} ${objLocal.options.innerBoxClass}">
  
            <span id="nameBox-hide-btn-${objLocal.id}" class="close-${objLocal.id} ${objLocal.options.innerBoxClass}">${objLocal.options.closeBtnHtml}</span>
                 ${objLocal.options.bodyContentHtml}
        </div>
    </div>`;
// ...........................................................................
        objLocal.innerHTML = htmlContent;
        objLocal.innerHTML += styleContent;

        document.getElementById(`nameBox-show-btn-${objLocal.id}`).addEventListener("click", function () {
      
            document.getElementById(`nameBox-element-${objLocal.id}`).style.display = "block";
            // console.log("inputname",input_name)
            objLocal.options.showBtnCallback();
        });
        document.getElementById(`nameBox-hide-btn-${objLocal.id}`).addEventListener("click", function () {
            document.getElementById(`nameBox-element-${objLocal.id}`).style.display = "none";
            objLocal.options.closeBtnCallback();
        });
    }

})();